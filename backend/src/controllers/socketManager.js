
import { Server } from 'socket.io';


const connectToSocket = (server)=>{
    const io = new Server(server);

    io.on("connection" , (socket)=>{
        socket.on("join-call" , (path)=>{
            if(connection[path] === undefined){
                connection[path] = [];
            }
            connection[path].push(socket.id);
            timeOnline[socket.id] = Date.now();

            for(let a = 0 ; a < connection[path].length ; a++){
                io.to(connection[path][a]).emit("user-joined" , socket.id , connection[path]);
            }
            if(message[path] !== undefined){
                for(let a = 0 ; a<message[path].length ; ++a){
                    io.to(socket.id).emit("chat-message" , message[path][a]['data'], message[path][a]['sender'] , message[path][a]['socket-id-sender']);

                }    
            }

        })
        socket.on("signal" , (toId , message)=>{
            io.to(toId).emit("signal" , socket.id,message);
        })
        // <--(up) This is part of WebRTC signaling.
        // A user sends a signaling message (offer/answer/ICE) to another user (toId).
        // The server forwards it to the target user.
        // This helps users establish peer-to-peer video/audio connections.


        socket.on("chat-message" , (data , sender)=>{
            const [matchingRoom , found] = Object.entries(connection).reduce(([room , isFound], [roomKey , roomValue])=>{
                if(!isFound && roomValue.includes(socket.id)){
                    return [roomKey , true];
                }
                return [room , isFound];
            },["" , false]);

            if(found == true){
                if(message[matchingRoom] === undefined){
                    message[matchingRoom] = [];
                }
                message[matchingRoom].push({
                    "data" : data,
                    "sender" : sender,
                    'socket-id-sender' : socket.id
                });
                console.log("message" , key , ":" , sender , data);
                connection[matchingRoom].forEach((id)=>{
                    io.to(id).emit("chat-message" , data , sender , socket.id);
                })
            }

        })
        socket.on("disconnect" , ()=>{
            var diffTime = Math.abs(Date.now() - timeOnline[socket.id]);
            var key
            for(const [k , v] of JSON.entries(JSON.stringify(Object.entries(connection)))){
                for(let a = 0 ; a < v.length ; a++){
                    if(v[a] == socket.id){
                        key = k;

                        for(let b = 0 ; b < connection[key].length ; b++){
                            io.to(connection[key][b]).emit("user-disconnected" , socket.id);
                        }
                        var indx = connection[key].indexOf(socket.id);
                        connection[key].splice(indx, 1);
                        if(connection[key].length === 0){
                            delete connection[key];
                        }
                    }
                }
            }

        })
    })
    return io;
}
export default connectToSocket;

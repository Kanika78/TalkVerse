import express from "express";
import {createServer} from "node:http";

import {Server} from "socket.io"; 
import mongoose from "mongoose";
import cors from "cors";
import userRoutes from "./src/routes/user.routes.js";
import { connect } from "node:http2";
import connectToSocket from "./src/controllers/socketManager.js";

const app = express();
const server = createServer(app); 
const io = connectToSocket(server);


app.set("port" ,(process.env.PORT || 8080));
app.use(cors({ origin: "*" }));
app.use(express.json({limit : "40kb"}));
app.use(express.urlencoded({extended : true, limit : "40kb"}));

app.use("/api/v1/user" , userRoutes);
const start = async()=>{
    const connectionDb = await mongoose.connect("mongodb+srv://goyalkanika702:Kanika112@cluster0.qw2l7mu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
    console.log(`MongoDB connected : ${connectionDb.connection.host}`)

    server.listen(app.get("port"), ()=>{
    console.log("app is listening");
});
}
start();

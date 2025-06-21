import User from "../models/user.model.js"; 
import bcrypt , {hash} from 'bcrypt';
import httpStatus from "http-status";
import crypto from 'crypto';

const login = async(req , res)=>{
    const {username , password} = req.body;
    if(!username || !password){
        return res.status(httpStatus.BAD_REQUEST).json({message : "Username and password are required"});
    }
    try{
        const existingUser = await User.findOne({username});
        if(!existingUser){
            return res.status(httpStatus.NOT_FOUND),json({message : "User not found"});
        }
        const isPasswordValid = await bcrypt.compare(password , existingUser.password);
        if(isPasswordValid){
            let token = crypto.randomBytes(20).toString("hex");
            existingUser.token = token;
            await existingUser.save();
            return res.status(httpStatus.OK).json({message : "Login successful", token: token});
        }
    }catch(e){
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({message : `Something went wrong: ${e.message}`});
    }
}

const register = async(req , res)=>{
    const {name , username , password} = req.body;
    try{
        const existingUser = await User.findOne({username});
        if(existingUser){
            return res.status(httpStatus.FOUND).json({message :"User already exists"});
        }
        const hashedPassword = await bcrypt.hash(password,10);
        const newUser = new User({
            name : name,
            username : username,
            password : hashedPassword
        })
        await newUser.save();
        return res.status(httpStatus.CREATED).json({message : "User registered"});
    }
    catch(e){
        res.json({message : `Something went worng ${e}`});

    }
}
export {login, register};
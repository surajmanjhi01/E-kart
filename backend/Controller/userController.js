import {User} from '../model/userModel.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { verifyEmail } from '../emailVerify/VerifyEmail.js';
export const register=async(req,res)=>{
    try{
        const{firstName,lastName,email,password}=req.body;
        if(!firstName || !lastName || !email || !password){
            return res.status(400).json({message:"All fields are required"});
        }
        const user=await User.findOne({email});
        if(user){
            return res.status(400).json({
                sucees:false,
                message:"User already exists"});
        }  
        const  hashedPasswordd=await bcrypt.hash(password,10); 
        const newUser=await User.create({
            firstName,
            lastName,
          email,
          password: hashedPasswordd
    })
    const token=jwt.sign({id:newUser._id},process.env.SECRET_KEY,{expiresIn:"10m"});
    verifyEmail(token,email);//send email here
    newUser.token=token;
    await newUser.save();
    return res.status(201).json({
        success:true,
        message:"User registered successfully",
        user:newUser
    })
    }catch(error){
        return res.status(500).json({
            success:false,
            message:`${error.message}`
        })
    }
}
export const verify=async(req,res)=>{
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ success: false, message: 'Authorization header missing or malformed' });
        }
        const token=authHeader.split(" ")[1];
        let decoded
        try{
            decoded=jwt.verify(token,process.env.SECRET_KEY);
        }catch(error){
            if(error.name==="TokenExpiredError"){
                    return res.status(400).json({success:false,message:"The resigtration token has expired"});
        }
    
    }
    const user=await User.findById(decoded.id);
    if(!user){
        return res.status(404).json({success:false,message:"User not found"});
    
    }
    user.token=null
    user.isVerified=true
    await user.save();
    return res.status(200).json({success:true,message:"Email verified successfully"});
}
catch(error){
    return res.status(500).json({success:false,message:`${error.message}`});
}
}
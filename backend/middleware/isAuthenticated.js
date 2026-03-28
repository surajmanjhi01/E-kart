import { User } from "../model/userModel.js";
import jwt from "jsonwebtoken";

export const isAuthenticated = async (req, res, next) => {
    try{
    const authHeader=req.headers.authorization;
    if(!authHeader || !authHeader.startsWith("Bearer ")){
        return res.status(401).json({
            success:false,
            message:"Authorization header missing or malformed"
        })
    }
    const token=authHeader.split(" ")[1];
    let decoded
    try{
        decoded=jwt.verify(token,process.env.SECRET_KEY);
    }catch(error){
        if(error.name==="TokenExpiredError"){
            return res.status(400).json({
                success:false,
                message:"The registration token has expired"
            })
        }
        return res.status(401).json({
            success:false,
            message:"Access token is missing or Invalid token"
        })
    }
    const user = await User.findById(decoded.id);
    if(!user){
        return res.status(404).json({
            success:false,
            message:"User not found"
        })
    }
    req.user=user;
    req.id=user.id
    next();
    }catch(error){
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }

}

export const isAdmin=async(req,res,next)=>{
    if(req.user && req.user.role==="admin"){
        next();

}else{
    return res.status(403).json({
        success:false,
        message:"Access denied. Admins only."
    })
}
}

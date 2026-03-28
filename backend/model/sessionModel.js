import mongoose from "mongoose";

const session = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    }
},{timestamsps:true});
export const Session=mongoose.model("Session",sessionSchema);
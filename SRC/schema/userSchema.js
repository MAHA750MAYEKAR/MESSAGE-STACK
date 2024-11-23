import mongoose from "mongoose";

const userSchema=new mongoose.Schema({
    email:{
        type:String,
        require:[true,"email is required"],
        unique:[true,"this email is already present"],
        match: [/^[\w-\.]+@([\w-]+\.)+[a-zA-Z]{2,6}$/, "Please enter a valid email address"]

    }

},{timestamps:true})


const User=mongoose.model("User",userSchema)

export default User
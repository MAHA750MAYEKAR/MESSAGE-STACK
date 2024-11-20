import express from "express";
 
const route=express.Router()
route.get("/",(req,res)=>{
    res.json({
        message:"this is user route"
    })
})
export default route


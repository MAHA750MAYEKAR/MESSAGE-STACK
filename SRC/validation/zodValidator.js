
import { StatusCodes } from "http-status-codes"

export const validator=(schema)=>{
    return async (req,res,next)=>{
        try {
            await schema.parse(req.body)
            next()
            
        } catch (error) {
            console.log("err in zod validation",error);
            
            return res.status(StatusCodes.BAD_REQUEST).json({
                success:"false",
                message:"zod validation error",
                err:error.explanation

            })
            
        }
    }

}
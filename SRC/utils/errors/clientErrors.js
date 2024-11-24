import { StatusCodes } from "http-status-codes"



class ClientErrors extends Error{
    constructor(error){
        super()
        this.name="Client Error",
        this.message=error.message,
        this.explanation=error.explanation,
        this.statusCode=error.StatusCode?error.StatusCode:StatusCodes.BAD_REQUEST

    }
}


export default ClientErrors
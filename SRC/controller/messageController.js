import { StatusCodes } from "http-status-codes";
import { getMessagesService } from "../service/messageService.js";
import { successResponse } from "../utils/common/succesResponse.js";


export const getMessageController=async(req,res){
      try {
            const response=getMessagesService({channelId:req.params.channelId,
                 
            },
            req.query.page||1,
            req.query.limit||20,
            req.user
      )
      console.log(req.query,"req.query");
      return res
            .status(StatusCodes.OK)
            .json(successResponse(response, 'messages are fetched successfully'));
      
            
      } catch (error) {
            console.log('message controller error', error);
                return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                  success: 'false',
                  data: {},
                  message: error.message,
                  error: error.errors
                });
            
      }
}
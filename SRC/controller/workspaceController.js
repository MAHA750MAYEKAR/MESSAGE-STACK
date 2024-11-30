import { workspaceService } from '../service/workspaceService.js';
import { StatusCodes } from 'http-status-codes';
import { successResponse } from '../utils/common/succesResponse.js';

export const createworkspaceController = async (req, res) => {
  try {
     
      const datatype={...req.body,owner:req.user}
      console.log("datatype",datatype);
      
    const response = await workspaceService(datatype);
   

    

    return res
      .status(StatusCodes.CREATED)
      .json(successResponse(response, 'workspace created successfully'));
  } catch (error) {
    console.log('workspace controller', error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: 'false',
      data: {},
      message: error.message,
      error: error.errors
    });
  }
};

import { workspaceService } from '../service/workspaceService';
import { StatusCodes } from 'http-status-codes';
import { successResponse } from '../utils/common/succesResponse';

export const workspaceController = async (req, res) => {
  try {
    const response = await workspaceService({
      ...req.body,
      owner: req.user
    });

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

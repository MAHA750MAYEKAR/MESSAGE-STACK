import { isMemberPartOfWorkspaceService } from '../service/memberService.js';
import { StatusCodes } from 'http-status-codes';
import { successResponse } from '../utils/common/succesResponse.js';

export const isMemberPartOfWorkspaceController = async function (req, res) {
  try {
    const response = await isMemberPartOfWorkspaceService(
      req.params.workspaceId,
      req.user
    );
    if (!response) {
      throw new ClientErrors({
        message: 'no response at member controller',
        explanation: 'Invalid data',
        statusCode: StatusCodes.NOT_FOUND
      });
    }

    return res
      .status(StatusCodes.OK)
      .json(successResponse(response, 'This User is part of workspace'));
  } catch (error) {
    console.log('member controller', error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: 'false',
      data: {},
      message: error.message,
      error: error.errors
    });
  }
};

import { getChannelByIdService } from '../service/channelService.js';
import ClientErrors from '../utils/errors/clientErrors.js';
import { successResponse } from '../utils/common/succesResponse.js';
import { StatusCodes } from 'http-status-codes';

export const getChannelByIdController = async function (req, res) {
  try {
    const response = await getChannelByIdService(req.params.channelId);
    if (!response) {
      throw new ClientErrors({
        message: 'response not found at controlller',
        explanation: 'data not found ',
        statusCode: StatusCodes.NOT_FOUND
      });
    }
    return res
      .status(StatusCodes.OK)
      .json(
        successResponse(response, 'Successfully fetched the channel by  Id')
      );
  } catch (error) {
    console.log('Channel controller', error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: 'false',
      data: {},
      message: error.message,
      error: error.errors
    });
  }
};

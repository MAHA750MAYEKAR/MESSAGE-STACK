import channelRepository from '../repositories/channelRepository.js';
import ClientErrors from '../utils/errors/clientErrors.js';

export const getChannelByIdService = async function (channelId) {
  try {
    const channel =
      await channelRepository.getChannelWithWorkspaceDetails(channelId);

    if (!channel) {
      throw new ClientErrors({
        message: 'this channel is not found',
        explanation: 'Invalid data send by the user',
        statusCode: StatusCodes.NOT_FOUND
      });
    }
    return channel;
    // a bug to fix abt populating workspace id as id is not fetching in repository &&  to add if user is part of workspace
  } catch (error) {
    console.log('err in get channel by id service');
    throw error;
  }
};

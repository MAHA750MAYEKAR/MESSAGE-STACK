import channelRepository from '../repositories/channelRepository.js';
import ClientErrors from '../utils/errors/clientErrors.js';
import messageRepository from '../repositories/messageRepository.js';

export const getChannelByIdService = async function (channelId) {
  try {
    const channel =
      await channelRepository.getChannelWithWorkspaceDetails(channelId);
      console.log("channel in service",channel);
    

    if (!channel) {
      throw new ClientErrors({
        message: 'this channel is not found',
        explanation: 'Invalid data send by the user',
        statusCode: StatusCodes.NOT_FOUND
      });
    }
    //return channel;
    // a bug to fix abt populating workspace id as id is not fetching in repository &&  to add if user is part of workspace
    const messages = await messageRepository.getPaginatedMessages(
      {
        channelId
      },
      1,
      20
    );
    console.log('Channel in service', channel,"this are messages",messages);
    return {
      messages,
      _id: channel._id,
      name: channel.name,      
      createdAt: channel.createdAt,
      updatedAt: channel.updatedAt,
      workspaceId: channel.workspaceId
    };
  } catch (error) {
    console.log('err in get channel by id service');
    throw error;
  }
};

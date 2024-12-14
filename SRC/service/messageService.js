import messageRepository from '../repositories/messageRepository.js';
import channelRepository from '../repositories/channelRepository.js';
import { workspaceRepository } from '../repositories/workspaceRepository.js';
import ClientErrors from '../utils/errors/clientErrors.js';
import { StatusCodes } from 'http-status-codes';

export const getMessagesService = async (
  messageParams,
  page,
  limit,
  UserId
) => {
  //messageParams is object
  try {
    const channelDetails =
      await channelRepository.getChannelWithWorkspaceDetails(
        messageParams.channelId
      );
    if (!channelDetails) {
      throw console.error('channel details not found in service');
    }

    const workspace = await workspaceRepository.getWorkspaceDetailsById(
      messageParams.workspaceId
    );

    isMemberOfWorkspace = workspace.members.find((member) => {
      console.log(member.memberId.toString(), '&&', UserId);

      return member.memberId.toString() === UserId;
    });
    if (!isMemberOfWorkspace) {
      throw new ClientErrors({
        message: 'user is not member of workspace',
        Explanation: 'Invalid data sent by the user',
        StatusCode: StatusCodes.UNAUTHORIZED
      });
    }

    const response = await messageRepository.getPaginatedMessages(
      messageParams,
      page,
      limit
    );
    return response;
  } catch (error) {
    console.log('error in fetching messages');
    throw new Error(error);
  }
};

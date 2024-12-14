import crudRepository from './crudRepository.js';
import Message from '../schema/messageSchema.js';

export const messageRepository = {
  ...crudRepository(Message),
  getPaginatedMessages: async function (messageParams, page, limit) {
    const messages = await Message.find(messageParams)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .populate('senderID', 'username email avatar')
      .populate('workspaceId', 'name')
      .populate('channelId', 'name');
    return messages;
  }
};
export default messageRepository;

import crudRepository from './crudRepository.js';
import { Message } from '../schema/messageSchema.js';

export const messageRepository = {
  ...crudRepository(Message),
  getPaginatedMessages: async function (messageParams, page, limit) {
    const messages = await Message.find(messageParams)
      .sort({ createdAt: 1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .populate('senderID', 'username email avatar')
      .populate('workspaceId', 'name')
      .populate('channelId', 'name');
    return messages;
  },
  getMessageDetails: async function (messageId) {
    const message = await Message.findById(messageId).populate(
    'senderID', 'username email avatar'
     
    )
     .populate('workspaceId', 'name')
      .populate('channelId', 'name');
    return message
    
  }
};
export default messageRepository;

import { createMessage } from '../service/messageService.js';
import { NEW_MESSAGE_EVENT,NEW_MESSAGE_RECIEVED } from '../utils/common/eventConstants.js';

export default function messageHandler(io, socket) {
  socket.on(NEW_MESSAGE_EVENT, async function createMessageHandler(data, cb) {
    try {
      const response = await createMessage(data);
      console.log("Message created successfully:", response);
      
      const { channelId } = data;
      io.to(channelId).emit("newMessageRecieved", response);
  
      cb({
        success: true,
        message: "Successfully created message",
        data: response,
      });
    } catch (error) {
      console.error("Error creating message:", error);
      cb({
        success: false,
        message: "Error creating message",
        error: error.message,
      });
    }
  });
}

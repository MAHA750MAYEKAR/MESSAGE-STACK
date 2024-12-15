import { createMessage } from '../service/messageService.js';
import { NEW_MESSAGE_EVENT } from '../utils/common/eventConstants.js';
export default function messageHandler(io, socket) {
  socket.on(NEW_MESSAGE_EVENT, async function createMessageHandler(data, cb) {
    const response = await createMessage(data);
    socket.broadcast.emit('newMessageRecieved', response);
    cb({
      success: 'true',
      message: 'Successfully created message',
      data: response
    });
  });
}

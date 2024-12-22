import { createMessage } from '../service/messageService.js';
import { NEW_MESSAGE_EVENT,NEW_MESSAGE_RECIEVED } from '../utils/common/eventConstants.js';

export default function messageHandler(io, socket) {
  socket.on(NEW_MESSAGE_EVENT, async function createMessageHandler(data, cb) {
    const {channelId}=data//channel is we are getting from data
    const response = await createMessage(data);
    //socket.broadcast.emit('newMessageRecieved', response);
    io.to(channelId).emit(NEW_MESSAGE_RECIEVED,response)
    cb({
      success: 'true',
      message: 'Successfully created message',
      data: response
    });
  });
}

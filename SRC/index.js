import express, { urlencoded } from 'express';
import { PORT } from './config/serverConfig.js';
import connectDB from './config/DBConfig.js';
import messageHandlar from './controller/messageSocketController.js';

import apiRoutes from './routes/apiRoutes.js';
import bullServerAdapter from './config/bullboardConfig.js';
import { createServer } from 'http';
import { Server } from 'socket.io';
import messageHandler from './controller/messageSocketController.js';

const app = express();
const server = createServer(app);
const io = new Server(server);
// Middleware to parse incoming JSON requests
app.use(express.json());

// Middleware to parse incoming URL-encoded data
app.use(express.urlencoded({ extended: true }));

app.use('/api', apiRoutes);
app.use('/ui', bullServerAdapter.getRouter());
io.on('connection', (socket) => {
  /*console.log('a user connected');
  console.log(socket.id);
  socket.on('messagefronClient', (data) => {//whn client sends message
    console.log("message from client",data);
    
    io.emit('new message', data.toUpperCase());//collect that message and brodcaste to everyone
  });*/
  messageHandler(io, socket);
});

server.listen(PORT, async () => {
  console.log('server is listening on port', PORT);
  connectDB();
});

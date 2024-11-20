import express from 'express';
import { PORT } from './config/serverConfig.js';
import connectDB from './config/DBConfig.js';
import { StatusCodes } from 'http-status-codes';

const app = express();
app.get('/ping', (req, res) => {
  res.status(StatusCodes.OK).json({
    success: 'true',
    message: 'this is ping request'
  });
});

app.listen(PORT, () => {
  console.log('server is listening on port', PORT);
  connectDB();
});

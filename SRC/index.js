import express, { urlencoded } from 'express';
import { PORT } from './config/serverConfig.js';
import connectDB from './config/DBConfig.js';
import { StatusCodes } from 'http-status-codes';
import apiRoutes from './routes/apiRoutes.js';
import bullServerAdapter from './config/bullboardConfig.js';

const app = express();
// Middleware to parse incoming JSON requests
app.use(express.json());

// Middleware to parse incoming URL-encoded data
app.use(express.urlencoded({ extended: true }));

app.use('/api', apiRoutes);
app.use('/ui', bullServerAdapter.getRouter());

app.get('/ping', (req, res) => {
  res.status(StatusCodes.OK).json({
    success: 'true',
    message: 'this is ping request'
  });
});

app.listen(PORT, async () => {
  console.log('server is listening on port', PORT);
  connectDB();
});

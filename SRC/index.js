import express, { urlencoded } from 'express';
import { PORT } from './config/serverConfig.js';
import connectDB from './config/DBConfig.js';
import { StatusCodes } from 'http-status-codes';
import apiRoutes from './routes/apiRoutes.js'

const app = express();
// Middleware to parse incoming JSON requests
app.use(express.json());

// Middleware to parse incoming URL-encoded data
app.use(express.urlencoded({ extended: true }));

app.use("/api",apiRoutes)



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

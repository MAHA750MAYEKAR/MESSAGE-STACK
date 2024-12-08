import express from 'express';
import userRouter from './userRouter.js';
import workspaceRouter from './workspaceRoute.js';
import channelRouter from './channelRoute.js';

const router = express.Router();

router.use('/users', userRouter);
router.use('/workspaces', workspaceRouter);
router.use('/channels', channelRouter);

export default router;

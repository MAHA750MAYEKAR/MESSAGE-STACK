import express from 'express';
import userRouter from './userRouter.js';
import workspaceRouter from './workspaceRoute.js';
import channelRouter from './channelRoute.js';
import memberRoute from './memberRoute.js';
import messagesRoute from './messagesRoute.js'

const router = express.Router();

router.use('/users', userRouter);
router.use('/workspaces', workspaceRouter);
router.use('/channels', channelRouter);
router.use('/members', memberRoute);
router.use('/messages', messagesRoute);

export default router;

import express from 'express';
import userRouter from './userRouter.js';
import workspaceRouter from './workspaceRoute.js';

const router = express.Router();

router.use('/users', userRouter);
router.use('/workspaces', workspaceRouter);

export default router;

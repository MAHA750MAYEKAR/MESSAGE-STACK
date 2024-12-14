import express from 'express';
import { authMiddleware } from '../../middleware/authMiddleware.js';
import { getMessageController } from '../../controller/messageController.js';
const router = express.Router();
router.get('/messages/:messageId', authMiddleware, getMessageController);

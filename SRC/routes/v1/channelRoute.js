import express from 'express';
import { getChannelByIdController } from '../../controller/channelController.js';

const router = express.Router();

router.get('/:channelId', getChannelByIdController);

export default router;

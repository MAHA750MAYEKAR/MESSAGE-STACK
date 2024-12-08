import express from 'express';
import { isMemberPartOfWorkspaceController } from '../../controller/memberController.js';
import { authMiddleware } from '../../middleware/authMiddleware.js';

const router = express.Router();

router.get(
  '/workspaces/:workspaceId',
  authMiddleware,
  isMemberPartOfWorkspaceController
);

export default router;

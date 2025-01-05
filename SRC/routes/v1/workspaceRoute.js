import express from 'express';
import {
  addChannelToWorkspaceController,
  createworkspaceController,
  getWorkspaceByJoincodeController,
  updateWorkspaceController
} from '../../controller/workspaceController.js';
import { validator } from '../../validation/zodValidator.js';
import { workspaceZodSchema } from '../../validation/workspaceZodSchema.js';
import { authMiddleware } from '../../middleware/authMiddleware.js';
import { deleteWorkspaceController } from '../../controller/workspaceController.js';
import { getWorkspacesController } from '../../controller/workspaceController.js';
import { addMembersToWorkspaceController } from '../../controller/workspaceController.js';
import { getWorkspacesUserIsMemberController } from '../../controller/workspaceController.js';
import { joinWorkspaceByJoincodeController } from '../../controller/workspaceController.js';
   
const router = express.Router();

router.post('/', authMiddleware, createworkspaceController);
router.get('/', authMiddleware,getWorkspacesUserIsMemberController);
//authMiddleware,validator(workspaceZodSchema)
router.delete('/:workspaceId', authMiddleware, deleteWorkspaceController);
router.get('/:workspaceId', authMiddleware, getWorkspacesController);
router.get('/join/:joincode', authMiddleware, getWorkspaceByJoincodeController);
router.put('/:workspaceId/join', authMiddleware, joinWorkspaceByJoincodeController);
router.put('/:workspaceId', authMiddleware, updateWorkspaceController);
router.put(
  '/:workspaceId/members',
  authMiddleware,
  addMembersToWorkspaceController
);
router.put(
  '/:workspaceId/channels',
  authMiddleware,
  addChannelToWorkspaceController
);

export default router;

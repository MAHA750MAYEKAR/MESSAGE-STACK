import express from 'express';
import { createworkspaceController } from '../../controller/workspaceController.js';
import { validator } from '../../validation/zodValidator.js';
import { workspaceZodSchema } from '../../validation/workspaceZodSchema.js';
import { authMiddleware } from '../../middleware/authMiddleware.js';
import { deleteWorkspaceController } from '../../controller/workspaceController.js';
const router = express.Router();

router.post('/', authMiddleware, createworkspaceController);
//authMiddleware,validator(workspaceZodSchema)
router.delete('/:workspaceId', authMiddleware, deleteWorkspaceController);

export default router;

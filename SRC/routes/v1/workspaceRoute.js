import express from 'express'
import { createworkspaceController } from '../../controller/workspaceController.js'
import { validator } from '../../validation/zodValidator.js'
import { workspaceZodSchema } from '../../validation/workspaceZodSchema.js'
import { authMiddleware } from '../../middleware/authMiddleware.js'
const router=express.Router()


router.post("/",authMiddleware,createworkspaceController)
//authMiddleware,validator(workspaceZodSchema)

export default router
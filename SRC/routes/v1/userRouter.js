import express from 'express';
import { userSignUpController } from '../../controller/userController.js';
import { validator } from '../../validation/zodValidator.js';
import { signUpZodSchema } from '../../validation/signUpZodValidationSchema.js';

const router = express.Router();

router.post('/signup',validator(signUpZodSchema), userSignUpController);

export default router;

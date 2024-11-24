import express from 'express';
import {
  userSignUpController,
  userSignIn
} from '../../controller/userController.js';
import { validator } from '../../validation/zodValidator.js';
import {
  signUpZodSchema,
  signInZodSchema
} from '../../validation/signUpZodValidationSchema.js';

const router = express.Router();

router.post('/signup', validator(signUpZodSchema), userSignUpController);
router.post('/signin', validator(signInZodSchema), userSignIn);

export default router;

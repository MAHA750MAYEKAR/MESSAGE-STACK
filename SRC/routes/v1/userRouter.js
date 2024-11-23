import express from 'express';
import { userSignUpController } from '../../controller/userController.js';

const router = express.Router();

router.post('/signup', userSignUpController);

export default router;

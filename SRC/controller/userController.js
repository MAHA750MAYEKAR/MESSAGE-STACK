import {
  userSignInService,
  userSignUpService
} from '../service/userService.js';
import { StatusCodes } from 'http-status-codes';
import { successResponse } from '../utils/common/succesResponse.js';

export const userSignUpController = async (req, res) => {
  try {
    const { email, password, username } = req.body;
    console.log('email:', email, 'password:', password, 'username:', username);

    if (!email || !password || !username) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: 'Missing required fields'
      });
    }

    const newUser = await userSignUpService(req.body);

    if (!newUser) {
      return res.json({
        message: 'new user not found'
      });
    }
    return res
      .status(StatusCodes.CREATED)
      .json(successResponse(newUser, 'user is created successfully'));
  } catch (error) {
    console.log('user controller error', error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: 'false',
      data: {},
      message: error.message,
      error: error.errors
    });
  }
};

export const userSignIn = async (req, res) => {
  try {
    const response = await userSignInService(req.body);
    if (!response) {
      console.log('no response in controller singn in');
    }

    return res
      .status(StatusCodes.OK)
      .json(successResponse(response, 'user signed in successfully'));
  } catch (error) {
    console.log('user controller sign in', error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: 'false',
      data: {},
      message: error.message,
      error: error.errors
    });
  }
};

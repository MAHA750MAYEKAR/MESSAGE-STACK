import { StatusCodes } from 'http-status-codes';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/serverConfig.js';
import userRepository from '../repositories/userRepository.js';

export const authMiddleware = async (req, res, next) => {
  try {
    const token = req.headers['x-access-token']; //retrieving token from user
    if (!token) {
      return res.status(StatusCodes.FORBIDDEN).json({
        success: 'false',
        message: 'No auth Token is provided'
      });
    }

    //if token is provided verify the token

    const isTokenValid = jwt.verify(token, JWT_SECRET);
    if (!isTokenValid) {
      return res.status(StatusCodes.FORBIDDEN).json({
        success: 'false',
        message: 'Invalid auth token is provided'
      });
    }

    //since is token is valid it will hv id in object

    const user = await userRepository.findById(isTokenValid.id);
    req.user = user.id;

    next();
  } catch (error) {
    console.log('error in auth middleware', error);
    return res.status(StatusCodes.BAD_REQUEST).json({
      succes: 'false',
      message: 'middleware error',
      error: error
    });
  }
};

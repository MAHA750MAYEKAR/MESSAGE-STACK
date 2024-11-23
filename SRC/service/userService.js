import userRepository from '../repositories/userRepository.js';
import { createUser } from '../repositories/userRepository.js';

export const userSignUpService = async function (data) {
  try {
    // Validate incoming data (optional but recommended)
    if (!data || !data.email || !data.password) {
      throw new Error('Invalid data: Email and Password are required.');
    }
    if (!data) {
      return res.json({
        message: 'data not found in service'
      });
    }

    // Attempt to create a new user
    const newUser = await userRepository.create(data);

    if (!newUser) {
      throw new Error('Failed to create the user.');
    }

    console.log('New user created:', newUser);
    return newUser;
  } catch (error) {
    console.error('Error in userSignUpService:', error.message);

    // Optionally rethrow the error if it needs to be handled elsewhere
    throw error;
  }
};

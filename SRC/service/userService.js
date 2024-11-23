import userRepository from '../repositories/userRepository.js';

export const userSignUpService = async function (data) {
  try {
    const newUser = await userRepository.create(data);
    return newUser;
  } catch (error) {
    console.log('error in signIn', error);
  }
};

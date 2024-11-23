import User from '../schema/userSchema';
import crudRepository from './crudRepository';

export const getUserByEmail = async (email) => {
  try {
    const user = await User.findOne({ email });
    return user;
  } catch (error) {
    console.log('cannot get user by email');
  }
};

export const getUserByName = async (name) => {
  try {
    const user = await User.findOne({ username: name });
    return user;
  } catch (error) {
    console.log('cannot get user by username');
  }
};

const crudMethods=crudRepository(User)
export default crudMethods




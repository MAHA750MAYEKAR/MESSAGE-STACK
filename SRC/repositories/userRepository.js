import User from '../schema/userSchema.js';
import crudRepository from './crudRepository.js';

const userRepository = {
  ...crudRepository(User), //take all the key-value pairs (methods and properties) returned by the crudRepository function and include them in the userRepository object.

  getUserByEmail: async function (email) {
    const user = await User.findOne({ email });
    return user;
  },
  getUserByName: async function (username) {
    const user = await User.findOne({ username }).select('-password'); //get email,avatar but exclude password
    return user;
  }
};

export default userRepository;

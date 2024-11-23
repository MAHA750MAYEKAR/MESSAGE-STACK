import User from '../schema/userSchema';

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

export const createUser = async (user) => {
  try {
    const newUser = await User.create(user);
    return newUser;
  } catch (error) {
    console.log('cannot create newuser');
  }
};

export const findAllUsers = async () => {
  try {
    const allUsers = await User.find();
    return allUsers;
  } catch (error) {
    console.log('cannot find all users');
  }
};

export const getUserById = async (id) => {
  try {
    const userById = await User.findById(id);
    return userById;
  } catch (error) {
    console.log('cannot get user by id');
  }
};

export const deleteUserById = async (id) => {
  try {
    const deleteUser = await User.findByIdAndDelete(id);
    return deleteUser;
  } catch (error) {
    console.log('cannot delete user by id');
  }
};

export const updateUserById = async (id, user) => {
  try {
    const updateUser = await User.findByIdAndUpdate(id, user, { new: true }); //whatever is updated should be saves in dm instead of old data
    return updateUser;
  } catch (error) {
    console.log('cannot update user by id');
  }
};

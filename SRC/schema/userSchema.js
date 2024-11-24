import mongoose from 'mongoose';
import bcrypt from 'bcrypt'; // Use bcryptjs for async hashing

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: [true, 'This email is already present'],
      match: [
        /^[\w.-]+@([\w-]+\.)+[a-zA-Z]{2,}$/,
        'Please enter a valid email address'
      ]
    },
    password: {
      type: String,
      required: [true, 'Password is required']
    },
    username: {
      type: String,
      required: [true, 'Username is required'],
      unique: [true, 'Username already exists'],
      match: [
        /^[a-zA-Z0-9_]{3,16}$/,
        'Username can only contain letters, digits, and underscores'
      ]
    },
    avatar: {
      type: String
    }
  },
  { timestamps: true }
);

// Hash password before saving the user
userSchema.pre('save', function saveUser(next) {
  const user = this;
  const SALT = bcrypt.genSaltSync(9);
  const hashedPassword = bcrypt.hashSync(user.password, SALT);
  user.password = hashedPassword;
  user.avatar = `https://robohash.org/${user.username}`;
  next();
});

const User = mongoose.model('User', userSchema);

export default User;

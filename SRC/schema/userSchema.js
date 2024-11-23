import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, 'email is required'],
      unique: [true, 'this email is already present'],
      match: [
        /^[\w-\.]+@([\w-]+\.)+[a-zA-Z]{2,6}$/,
        'Please enter a valid email address'
      ]
    },
    password: {
      type: String,
      required: [true, 'password is required']
    },
    username: {
      required: [true, 'username is required'],
      unique: [true, 'Username already exist'],
      match: [
        /^[a-zA-Z0-9_]{3,16}$/,
        'username only contain letters and digits and underscores'
      ]
    },
    avatar: {
      type: String
    }
  },
  { timestamps: true }
);

userSchema.pre('save', function saveUser(next) {
  const user = this;
  user.avatar = `https://robohash.org/${user.username}`; //sets random default dp to the user before saving it to DB
  next();
});

const User = mongoose.model('User', userSchema);

export default User;

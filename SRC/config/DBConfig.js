import mongoose from 'mongoose';
import { NODE_ENV, PROD_URL, DEV_URL } from './serverConfig.js';

export default async function connectDB() {
  try {
    if (NODE_ENV === 'developement') {
      await mongoose.connect(DEV_URL);
    } else if (NODE_ENV === 'production') {
      await mongoose.connect(PROD_URL);
    }

    console.log('connected to', NODE_ENV);
  } catch (error) {
    console.log('error in connecting to DB');
  }
}

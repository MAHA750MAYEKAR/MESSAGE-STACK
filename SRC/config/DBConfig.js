import mongoose from 'mongoose';
import { NODE_ENV, PROD_URL, DEV_URL } from './serverConfig.js';

export default async function connectDB() {
  try {
    if (NODE_ENV === 'development') {
      console.log('1 in connecting to DB');
      await mongoose.connect(DEV_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      });
    } else if (NODE_ENV === 'production') {
      console.log('2 in connecting to DB');
      await mongoose.connect(PROD_URL);
    }

    console.log('connected to', NODE_ENV);
  } catch (error) {
    console.log('error in connecting to DB');
  }
}

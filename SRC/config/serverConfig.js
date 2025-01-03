import dotenv from 'dotenv';

dotenv.config();

export const PORT = process.env.PORT;
export const NODE_ENV = process.env.NODE_ENV || 'development';
export const DEV_URL = process.env.DEV_URL;
export const PROD_URL = process.env.PROD_URL;
export const JWT_SECRET = process.env.JWT_SECRET;
export const JWT_EXPIRY = process.env.JWT_EXPIRY;
export const MAIL_PASSWORD = process.env.MAIL_PASSWORD;
export const MAIL_ID = process.env.MAIL_ID;
export const REDIS_HOST = process.env.REDIS_HOST;
export const REDIS_PORT = process.env.REDIS_PORT;
export const JOIN_CHANNEL = process.env.JOIN_CHANNEL;
export const LEAVE_CHANNEL = process.env.LEAVE_CHANNEL;

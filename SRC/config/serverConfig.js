import dotenv from 'dotenv';

dotenv.config();

export const PORT = process.env.PORT;
export const NODE_ENV = process.env.NODE_ENV || 'development';
export const DEV_URL = process.env.DEV_URL;
export const PROD_URL = process.env.PROD_URL;
export const JWT_SECRET = process.env.JWT_SECRET;
export const JWT_EXPIRY = process.env.JWT_EXPIRY;

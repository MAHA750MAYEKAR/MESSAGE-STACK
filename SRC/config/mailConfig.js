import nodemailer from 'nodemailer';
import { MAIL_PASSWORD, MAIL_ID } from './serverConfig.js';
export const transporter = nodemailer.createTransport({
  //transporter object hels us to send email
  service: 'Gmail',
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: MAIL_ID,
    pass: MAIL_PASSWORD
  }
});

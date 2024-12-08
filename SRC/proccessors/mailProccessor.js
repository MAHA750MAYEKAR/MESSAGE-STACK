import mailQueue from '../Queues/mailQueue.js';
import { transporter } from '../config/mailConfig.js';
mailQueue.process(async (job) => {
  const emailData = job.data;
  console.log('job.data', job.data);
  try {
    const response = await transporter.sendMail(emailData);
    console.log('email is sent', response);
  } catch (error) {
    console.log('problem in proccessing email', error);
  }
});

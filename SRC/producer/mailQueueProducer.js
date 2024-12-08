import mailQueue from '../Queues/mailQueue.js';
import '../proccessors/mailProccessor.js';
export const addEmailToMailQueue = async function (emailDataObject) {
  try {
    await mailQueue.add(emailDataObject);
    console.log('email added to queue');
  } catch (error) {
    console.log('add email to mail queue error', error);
  }
};

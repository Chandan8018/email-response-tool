import { Job } from 'bullmq';
import nodemailer from 'nodemailer';
import { classifyAndGenerateReply } from './openaiService';
import { config } from '../config/env';

// Define the processEmailJob function
export const processEmailJob = async (job: Job) => {
  const { email } = job.data;
  const emailContent = email.body; // Assume email has a 'body' property

  const { classification, reply } = await classifyAndGenerateReply(emailContent);

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: config.emailUser,
      pass: config.emailPass,
    },
  });

  const mailOptions = {
    from: config.emailUser,
    to: email.from,
    subject: 'Re: ' + email.subject,
    text: reply,
  };

  await transporter.sendMail(mailOptions);
  return { classification, reply };
};

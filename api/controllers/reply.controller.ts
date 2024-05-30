import { Request, Response } from 'express';
import nodemailer from 'nodemailer';
import {config} from '../config/env';
import { classifyAndGenerateReply } from '../services/openaiService';

export const sendReply = async (req: Request, res: Response) => {
  const { to, subject, text } = req.body;

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: config.emailUser,
        pass: config.emailPass,
      },
    });

    const mailOptions = {
      from: config.emailUser,
      to,
      subject,
      text,
    };

    try {
      await transporter.sendMail(mailOptions);
      res.status(200).send('Reply sent successfully');
    } catch (error) {
      res.status(500).send('Failed to send reply');
    }
  }

  export const suggestReply = async (req: Request, res: Response) => {
    const { emailContent } = req.body;

    try {
      const { classification, reply } = await classifyAndGenerateReply(emailContent);
      res.status(200).json({ classification, reply });
    } catch (error) {
      res.status(500).send('Failed to generate reply');
    }

  }

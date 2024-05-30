import { Request, Response } from 'express';
import { OAuth2Client } from 'google-auth-library';
import { fetchGmailEmails, fetchOutlookEmails } from '../services/emailFetcher';
import { config } from '../config/env';
import { emailQueue } from '../config/bullmq';

const googleAuth = new OAuth2Client(config.googleClientId, config.googleClientSecret, 'http://localhost:3000/oauth2callback/google');

const googleToken = {}; // Replace with actual token
const outlookToken = ''; // Replace with actual token

export const getGmailEmails = async (req: Request, res: Response) => {
    googleAuth.setCredentials(googleToken);
    const emails = await fetchGmailEmails(googleAuth);

    emails.forEach(email => {
      emailQueue.add('processEmail', { email });
    });

    res.json(emails);
  }

export const getOutlookEmails = async (req: Request, res: Response) => {
    const emails = await fetchOutlookEmails(outlookToken);

    emails.forEach(email => {
      emailQueue.add('processEmail', { email });
    });

    res.json(emails);
  }

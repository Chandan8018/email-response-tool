import { OAuth2Client } from 'google-auth-library';
import { google } from 'googleapis';
import axios from 'axios';
import { Email } from '../models/email.model';

// Fetch emails from Gmail
export const fetchGmailEmails = async (auth: OAuth2Client): Promise<Email[]> => {
  const gmail = google.gmail({ version: 'v1', auth });
  const response = await gmail.users.messages.list({ userId: 'me', maxResults: 10 });
  
  const emails: Email[] = await Promise.all(
    response.data.messages?.map(async (message) => {
      const msg = await gmail.users.messages.get({ userId: 'me', id: message.id! });
      const snippet = msg.data.snippet!;
      const headers = msg.data.payload?.headers;
      const fromHeader = headers?.find(header => header.name === 'From');
      const subjectHeader = headers?.find(header => header.name === 'Subject');
      
      return {
        id: message.id!,
        snippet,
        body: msg.data.payload?.body?.data || '',
        from: fromHeader?.value || '',
        subject: subjectHeader?.value || '',
      };
    }) || []
  );
  
  return emails;
};

// Fetch emails from Outlook
export const fetchOutlookEmails = async (accessToken: string): Promise<Email[]> => {
  const response = await axios.get('https://graph.microsoft.com/v1.0/me/messages', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    params: {
      '$top': 10,
      '$select': 'id,subject,bodyPreview,from',
    },
  });

  const emails: Email[] = response.data.value.map((message: any) => ({
    id: message.id,
    snippet: message.bodyPreview,
    body: message.bodyPreview,
    from: message.from.emailAddress.address,
    subject: message.subject,
  }));

  return emails;
};

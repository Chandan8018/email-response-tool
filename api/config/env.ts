import * as dotenv from 'dotenv';

dotenv.config();

export const config = {
  googleClientId: process.env.GOOGLE_CLIENT_ID!,
  googleClientSecret: process.env.GOOGLE_CLIENT_SECRET!,
  outlookClientId: process.env.OUTLOOK_CLIENT_ID!,
  outlookClientSecret: process.env.OUTLOOK_CLIENT_SECRET!,
  openaiApiKey: process.env.OPENAI_API_KEY!,
  emailUser: process.env.EMAIL_USER!,
  emailPass: process.env.EMAIL_PASS!,
  redisHost: process.env.REDIS_HOST || 'localhost',
  redisPort: parseInt(process.env.REDIS_PORT || '6379', 10),
  port: process.env.PORT || 4900,
};

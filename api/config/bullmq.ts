import { Queue, Worker, QueueEvents } from 'bullmq';
import { config } from './env';
import { processEmailJob } from '../services/emailProcessor';

const connection = {
  host: config.redisHost,
  port: config.redisPort,
};

export const emailQueue = new Queue('emailQueue', { connection });
new QueueEvents('emailQueue', { connection });

export const emailWorker = new Worker('emailQueue', async job => {
  await processEmailJob(job);
}, { connection });

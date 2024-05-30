import express from 'express';
import { getGmailEmails, getOutlookEmails } from '../controllers/email.controller';

const router = express.Router();

router.get('/emails/gmail', getGmailEmails);
router.get('/emails/outlook', getOutlookEmails);

export default router;
import express from 'express';
import { sendReply, suggestReply } from '../controllers/reply.controller';

const router = express.Router();

router.post('/reply', sendReply);
router.post('/suggest-reply', suggestReply);

export default router;
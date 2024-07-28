import express from 'express';
import { register, login } from '../controllers/authController';
import { sendTelegramMessage } from '../controllers/telegramController';
import authMiddleware from '../middleware/authMiddleware';

const router = express.Router();

router.post('/sendMessage', authMiddleware, sendTelegramMessage);
export default router;

import { Router } from 'express';
import { register, login } from '../controllers/authController';
import authMiddleware from '../middleware/authMiddleware';

const router = Router();

router.post('/register', register);
router.post('/login', login);

router.get('/me', authMiddleware, (req, res) => {
    res.send('User data');
});

export default router;

import { Router } from 'express';
import { socialLogin } from '../controllers/authController';

const authRoutes = Router();

// 🌐 POST http://localhost:5000/api/auth/social
authRoutes.post('/social', socialLogin);

export { authRoutes };
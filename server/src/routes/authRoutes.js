import { Router } from 'express';
import { forgotPassword, login, logout, me, register, resendVerification, resetPassword, verifyEmail } from '../controllers/authController.js';
import { requireAuth } from '../middleware/auth.js';

const router=Router();
router.post('/register',register);
router.post('/verify-email',verifyEmail);
router.post('/resend-verification',resendVerification);
router.post('/login',login);
router.post('/forgot-password',forgotPassword);
router.post('/reset-password',resetPassword);
router.post('/logout',logout);
router.get('/me',requireAuth,me);
export default router;

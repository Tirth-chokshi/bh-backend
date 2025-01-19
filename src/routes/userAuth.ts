import { Router } from 'express';
import passport from 'passport';
import { AuthController } from '../controllers/userAuthController';
import { isAuthenticated } from '../middleware/auth';

export const authRouter = Router();

// Google OAuth routes
authRouter.get(
  '/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

authRouter.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  AuthController.googleCallback
);

// Auth routes
authRouter.get('/current-user', isAuthenticated, AuthController.getCurrentUser);
authRouter.post('/logout', isAuthenticated, AuthController.logout);
authRouter.get('/profile', isAuthenticated, AuthController.getProfile);
authRouter.put('/profile', isAuthenticated, AuthController.updateProfile);
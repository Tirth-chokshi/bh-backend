import { Router } from 'express';
import passport from 'passport';
import { getCurrentUser, logout, getProfile, updateProfile, googleCallback } from '../controllers/userAuthController';
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
  googleCallback
);

// Auth routes
authRouter.get('/current-user', isAuthenticated, getCurrentUser);
authRouter.post('/logout', isAuthenticated, logout);
authRouter.get('/profile', isAuthenticated, getProfile);
authRouter.put('/profile', isAuthenticated, updateProfile);
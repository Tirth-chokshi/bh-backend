import { Router } from 'express';
import { getAllUsers, getUserById, deleteUser } from '../controllers/userController';
import { isAuthenticated } from '../middleware/auth';
import { isAdmin } from '../middleware/admin';

export const userRouter = Router();

userRouter.get('/', isAuthenticated, isAdmin, getAllUsers);
userRouter.get('/:id', isAuthenticated, getUserById);
userRouter.delete('/:id', isAuthenticated, isAdmin, deleteUser);
import { Router } from 'express';
import { UserController } from '../controllers/userController';
import { isAuthenticated } from '../middleware/auth';
import { isAdmin } from '../middleware/admin'

export const userRouter = Router();

userRouter.get('/', isAuthenticated, isAdmin, UserController.getAllUsers);
userRouter.get('/:id', isAuthenticated, UserController.getUserById);
userRouter.delete('/:id', isAuthenticated, isAdmin, UserController.deleteUser);
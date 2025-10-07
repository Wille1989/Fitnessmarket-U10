import express from 'express';
import { Router } from "express";
import { 
    createUser, 
    deleteUser,
    getAllUsers,
    getUserById,
    updateUser
} from '../controllers/user.controller';
import { requireRole, verifyToken } from '../middleware/auth';

const userRouter: Router = express.Router();

userRouter.post('/user/new-user', createUser);

userRouter.get('/user/delete-user', verifyToken, requireRole('consumer', 'admin'), deleteUser);

userRouter.get('/user/:id', verifyToken, requireRole('consumer', 'admin'), getUserById);

userRouter.get('/user/all-users', verifyToken, requireRole('admin'), getAllUsers);

userRouter.patch('/user/update-user', verifyToken, requireRole('consumer', 'admin'), updateUser);

export default Router;
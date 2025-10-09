import express from 'express';
import { Router } from "express";
import { deleteUser, getAllUsers, getUserById, updateUser } from '../controllers/user.controller';
import { requireRole, verifyToken } from '../middleware/auth';

const userRouter: Router = express.Router();

userRouter.patch('/update', verifyToken, requireRole('customer', 'admin'), updateUser);
userRouter.delete('/delete', verifyToken, requireRole('customer', 'admin'), deleteUser);
userRouter.get('/all', verifyToken, requireRole('admin'), getAllUsers);
userRouter.get('/:id', verifyToken, requireRole('customer', 'admin'), getUserById);

export default userRouter;
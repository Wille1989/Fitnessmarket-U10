import express from 'express';
import { Router } from "express";
import { requireRole, verifyToken } from '../middleware/auth';
import { 
    deleteUser, 
    getUsers, 
    getUserById, 
    updateUser } 
    from '../controllers/user.controller';


const userRouter: Router = express.Router();

userRouter.patch('/update', 
    verifyToken, 
    requireRole('customer', 'sales', 'admin'), 
    updateUser);

userRouter.delete('/delete', 
    verifyToken, 
    requireRole('customer', 'sales', 'admin'), 
    deleteUser);

userRouter.get('/all', 
    verifyToken, 
    requireRole('admin'), 
    getUsers);

userRouter.get('/show', 
    verifyToken, 
    requireRole('customer', 'sales', 'admin'), 
    getUserById);

export default userRouter;
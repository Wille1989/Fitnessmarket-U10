import express from 'express';
import { Router } from "express";
import { requireRole, verifyToken } from '../middleware/auth';
import { 
    deleteUser, 
    getUsers, 
    getUserById,
    updateAccount,
    createUserAsAdmin,
    updateUserAccount,
    deleteUserAccount,
    getUserByToken } 
    from '../controllers/user.controller';

const userRouter: Router = express.Router();

userRouter.patch('/update/myAccount', 
    verifyToken, 
    requireRole('customer', 'sales'), 
    updateAccount);

userRouter.delete('/delete', 
    verifyToken, 
    requireRole('customer', 'sales', 'admin'), 
    deleteUser);

userRouter.get('/show', 
    verifyToken, 
    requireRole('customer', 'sales'), 
    getUserByToken);

// ADMIN SPECIFIC ROUTES
userRouter.post('/admin/register',
    verifyToken,
    requireRole('admin'),
    createUserAsAdmin);

userRouter.patch('/admin/updateUserAccount', 
    verifyToken, 
    requireRole('admin'), 
    updateUserAccount);

userRouter.get('/admin/all', 
    verifyToken, 
    requireRole('admin'), 
    getUsers);

userRouter.get('/admin/show/:id', 
    verifyToken, 
    requireRole('admin'), 
    getUserById);

userRouter.delete('/delete/:id',
    verifyToken, 
    requireRole('admin'), 
    deleteUserAccount);

export default userRouter;
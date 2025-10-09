import express from 'express';
import { Router } from "express";
import { requireRole, verifyToken } from "../middleware/auth";
import { 
    createCategory, 
    deleteCategory, 
    getCategory, 
    updateCategory,
    getCategoryById } from "../controllers/category.controller";

const catRouter: Router = express.Router();

catRouter.post('/new', 
    verifyToken, 
    requireRole('admin', 'sales'), 
    createCategory);

catRouter.delete('/delete', 
    verifyToken, 
    requireRole('admin', 'sales'), 
    deleteCategory);

catRouter.patch('/update', 
    verifyToken, 
    requireRole('admin', 'sales'),
    updateCategory);

catRouter.get('/show/:id', 
    verifyToken, 
    requireRole('admin', 'customer', 'sales'), 
    getCategoryById);

catRouter.get('/index', getCategory);

export default catRouter;

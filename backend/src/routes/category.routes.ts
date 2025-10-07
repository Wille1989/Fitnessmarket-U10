import { Router } from "express";
import express from 'express';
import { requireRole, verifyToken } from "../middleware/auth";
import { createCategory, deleteCategory, getCategory, updateCategory } from "../controllers/category.controller";

const catRouter: Router = express.Router();

catRouter.post('/category/new-category', verifyToken, requireRole('admin', 'sales'), createCategory);

catRouter.get('/category/delete-category', verifyToken, requireRole('admin', 'sales'), deleteCategory);

catRouter.patch('/category/update-category', verifyToken, requireRole('admin', 'sales'), updateCategory);

catRouter.get('/category/get-category/:id', getCategory);

catRouter.get('/category/get-category', getCategory);

export default Router;
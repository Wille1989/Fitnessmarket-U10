import express from 'express';
import { Router } from 'express';
import { createProduct, deleteProduct, getProduct, updateProduct } from '../controllers/product.controller';
import { requireRole, verifyToken } from '../middleware/auth';

const productRouter: Router = express.Router();

productRouter.get('/', getProduct);

productRouter.get('/all-products', verifyToken, requireRole('admin', 'sales'), getProduct);

productRouter.post('/product/new-product', verifyToken, requireRole('admin', 'sales'), createProduct);

productRouter.get('/product/delete/:id', verifyToken, requireRole('admin', 'sales'), deleteProduct);

productRouter.patch('/product/update-product/:id', verifyToken, requireRole('admin', 'sales'), updateProduct);
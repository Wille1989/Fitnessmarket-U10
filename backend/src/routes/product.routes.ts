import express from 'express';
import { Router } from 'express';
import { createProduct, deleteProduct, getProduct, updateProduct } from '../controllers/product.controller';
import { requireRole, verifyToken } from '../middleware/auth';

const productRouter: Router = express.Router();

productRouter.get('/', getProduct);

productRouter.post('/new', 
    verifyToken, 
    requireRole('admin', 'sales'), 
    createProduct);

productRouter.delete('/delete', 
    verifyToken, 
    requireRole('admin', 'sales'), 
    deleteProduct);

productRouter.patch('/update', 
    verifyToken, 
    requireRole('admin', 'sales'), 
    updateProduct);

/*// ADMIN ROUTES
productRouter.get('/all/admin', 
verifyToken, 
requireRole('admin', 'sales'), 
getProduct);*/

export default productRouter;
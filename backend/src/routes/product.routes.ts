import express from 'express';
import { Router } from 'express';
import { requireRole, verifyToken } from '../middleware/auth';
import { 
    compareProducts,
    createProduct, 
    deleteProduct, 
    getArrayOfProducts, 
    getProductById, 
    updateProduct,
    rateProduct } from '../controllers/product.controller';

const productRouter: Router = express.Router();

productRouter.get('/index', 
    getArrayOfProducts);

productRouter.get('/show', 
    getProductById)

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

productRouter.get('/compare',
    compareProducts);

productRouter.post('/rate',
    rateProduct);

export default productRouter;
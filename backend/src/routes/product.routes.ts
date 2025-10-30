import express from 'express';
import { Router } from 'express';
import { requireRole, verifyToken } from '../middleware/auth';
import { 
    compareProducts,
    createProduct, 
    deleteProduct, 
    getAllProducts, 
    getProductById, 
    updateProduct,
    rateProduct } from '../controllers/product.controller';

const productRouter: Router = express.Router();

productRouter.get('/index', 
    getAllProducts);

productRouter.post('/new', 
    verifyToken, 
    requireRole('admin', 'sales'), 
    createProduct);

productRouter.get('/show/:id', 
    getProductById)

productRouter.patch('/update/:id', 
    verifyToken, 
    requireRole('admin', 'sales'), 
    updateProduct);

productRouter.delete('/delete/:id', 
    verifyToken, 
    requireRole('admin', 'sales'), 
    deleteProduct);

productRouter.post('/compare',
    compareProducts);

productRouter.post('/rate',
    rateProduct);

export default productRouter;
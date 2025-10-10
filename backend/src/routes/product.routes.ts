import express from 'express';
import { Router } from 'express';
import { requireRole, verifyToken } from '../middleware/auth';
import { 
    createProduct, 
    deleteProduct, 
    getArrayOfProducts, 
    getProductById, 
    updateProduct } from '../controllers/product.controller';

const productRouter: Router = express.Router();

productRouter.get('/index', 
    getArrayOfProducts);

productRouter.get('/show/:id', 
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

/*// ADMIN ROUTES
productRouter.get('/all/admin', 
verifyToken, 
requireRole('admin', 'sales'), 
getProduct);*/

export default productRouter;
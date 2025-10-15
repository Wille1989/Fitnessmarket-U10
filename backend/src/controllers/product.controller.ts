import { Request, Response } from 'express';
import { AppError, NotFoundError } from '../classes/ErrorHandling';
import type { ApiResponse } from '../types/ApiResponse';
import type { Product, ComparedProducts } from '../types/product/Products';
import { AuthenticatedRequest } from '../types/user/UserAuth';
import { 
    createProductService, 
    deleteProductService, 
    getProductByIdService, 
    getAllProductsService, 
    updateProductService,
    compareProductsService,
    rateProductService } 
    from '../services/product/product.service';

// CREATE A PRODUCT
export async function createProduct(
    req: AuthenticatedRequest, res: Response<ApiResponse<Product>>): Promise<void> {
    try {
        const product = req.body;

        const newProduct = await createProductService(product);

        res.status(201).json({ message: 'Produkten har lagts till!', data: newProduct });

    } catch (error) {
        const err = error as any;

        if(process.env.NODE_ENV !== 'production') {
            console.error('Message:', err.message);
            console.error('Status:', err.status);
            console.error('Stack:', err.stack);
        };

        res.status(err.status || 500).json({
            message: process.env.NODE_ENV === 'production'
            ? 'Server fel'
            : err.message,
        });
    };
};

// GET PRODUCT FROM ITS ID
export async function getProductById(
    req: Request, res: Response<ApiResponse<Product>>): Promise<void> {

    try {
        const productID = req.params.id   

        const product: Product = await getProductByIdService(productID);

        res.status(200).json({ 
            message: `retunerar ${product.title} i kategory ${product.category}`, data: product });
       
    } catch (error) {
        const err = error as any;

        if(process.env.NODE_ENV !== 'production') {
            console.error('Message:', err.message);
            console.error('Status:', err.status);
            console.error('Stack:', err.stack);
        };

        res.status(err.status || 500).json({
            message: process.env.NODE_ENV === 'production'
            ? 'Server fel'
            : err.message,
        });
    }
};

// ALL PRODUCTS
export async function getAllProducts(
    _req: Request, res: Response<ApiResponse<Product[]>>): Promise<void> {
    try {

        const products = await getAllProductsService();

        res.status(200).json({ 
            message: `retunerar ${products.length} produkter`, data: products });

    } catch (error){
        const err = error as AppError;

        if(process.env.NODE_ENV !== 'production') {
            console.error('Message:', err.message);
            console.error('Status:', err.status);
            console.error('Stack:', err.stack);
        };

        res.status(err.status || 500).json({
            message: process.env.NODE_ENV === 'production'
            ? 'Server fel'
            : err.message,
        });
    }
};

// DELETE PRODUCT
export async function deleteProduct(
    req: AuthenticatedRequest, res: Response<ApiResponse<null>>): Promise<void> {
    try {
        const productID = req.params.id;

        await deleteProductService(productID);

        res.status(200).json({ message: 'Produkten togs bort!' });

    } catch (error) {
        const err = error as any;

        if(process.env.NODE_ENV !== 'production') {
            console.error('Message:', err.message);
            console.error('Status:', err.status);
            console.error('Stack:', err.stack);
        };

        res.status(err.status || 500).json({
            message: process.env.NODE_ENV === 'production'
            ? 'Server fel'
            : err.message,
        });
    }
};

// UPDATE PRODUCT
export async function updateProduct(
    req: AuthenticatedRequest, res: Response<ApiResponse<Product>>): Promise<void> {
    try {
        const { product: { _id: productID, ...productData } } = req.body;
        const result = await updateProductService(productData, productID);

        res.status(200).json({ message: 'Produkten har uppdaterats!', data: result })

    } catch (error) {
        const err = error as AppError;

        if(process.env.NODE_ENV !== 'production') {

            console.error('Message:', err.message);
            console.error('Status:', err.status);
            console.error('Stack:', err.stack);
        };

        res.status(err.status || 500).json({
            message: process.env.NODE_ENV === 'production'
            ? 'Server fel'
            : err.message,
        });
        return;
    };
};

// PRODUCT COMPARISON
export async function compareProducts(
    req: Request, res: Response<ApiResponse<ComparedProducts>>): Promise<void> {
    try {
        // Create an array of object
        const { products } = req.body;

        const { comparedProducts, comparison } = await compareProductsService(products);

        if(!products) {
            throw new NotFoundError('Det gick inte att jämföra produkterna');
        };

        res.status(200).json({ message: 'Jämförelse av datan genomförd, skickar vidare', data: { comparedProducts, comparison } });

    } catch (error) {
        const err = error as AppError;

        if(process.env.NODE_ENV !== 'production') {
            console.error('ERROR STACK PRODUCTS:');
            console.error('Name:', err.name);
            console.error('Message:', err.message);
            console.error('Status:', err.status);
            console.error('Stack:', err.stack);
        };

        res.status(err.status || 500).json({
            message: process.env.NODE_ENV === 'production'
            ? 'Server fel'
            : err.message,
        });
        return;
    };
};

// PRODUCT RATING
export async function rateProduct(
    req: Request, res: Response<ApiResponse<Product>>): Promise<void> {
    try {
        const product = req.body;
        const productID = product.id;
        const productRating = product.productRating;

        const response = await rateProductService(productID, productRating);

        res.status(200).json({ data: response });

    } catch (error) {
        const err = error as AppError;

        if(process.env.NODE_ENV !== 'production') {
            console.error('ERROR STACK PRODUCTS:');
            console.error('Name:', err.name);
            console.error('Message:', err.message);
            console.error('Status:', err.status);
            console.error('Stack:', err.stack);
        };

        res.status(err.status || 500).json({
            message: process.env.NODE_ENV === 'production'
            ? 'Server fel'
            : err.message,
        });
        return;
    };
};
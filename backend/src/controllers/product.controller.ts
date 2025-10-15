import { Request, Response } from 'express';
import { ObjectId } from 'mongodb';
import type { ApiResponse } from '../types/ApiResponse';
import type { Product, ComparedProducts } from '../types/product/Products';
import { ValidationError, AppError, NotFoundError } from '../classes/ErrorHandling';
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
import { ProductRating } from '../types/product/ProductRating';

// CREATE A PRODUCT
export async function createProduct(
    req: AuthenticatedRequest, res: Response<ApiResponse<Product>>): Promise<void> {
    try {
        const fromBody = req.body.product;

        const newProduct = await createProductService(fromBody);

        res.status(201).json({ message: 'Produkten har lagts till!', data: newProduct });

    } catch (error) {
        const err = error as any;

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
    };
};

// GET PRODUCT FROM ITS ID
export async function getProductById(
    req: Request, res: Response<ApiResponse<Product>>): Promise<void> {

    try {
        const productID = req.body._id;    

        const product: Product = await getProductByIdService(productID);

        res.status(200).json({ 
            message: `retunerar ${product.title} i kategory ${product.category}`, data: product });
       
    } catch (error) {
        const err = error as any;

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
    }
};

// ARRAY OF PRODUCTS
export async function getArrayOfProducts(
    _req: Request, res: Response<ApiResponse<Product[]>>): Promise<void> {
    try {
        // Get response from database
        const allProducts = await getAllProductsService();

        res.status(200).json({ 
            message: `retunerar ${allProducts.length} produkter`, data: allProducts });

    } catch (error){
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
    }
};

// DELETE PRODUCT
export async function deleteProduct(
    req: AuthenticatedRequest, res: Response<ApiResponse<null>>): Promise<void> {
    try {
        // destruct value id from product object
        const { _id } = req.body;

        // Call service function
        await deleteProductService(_id);

        res.status(200).json({ message: 'Produkten togs bort!' });

    } catch (error) {
        const err = error as any;

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
    }
};

// UPDATE PRODUCT
export async function updateProduct(
    req: AuthenticatedRequest, res: Response<ApiResponse<Product>>): Promise<void> {
    try {
        const { product: { _id: productID, ...productData } } = req.body;
        const result = await updateProductService(productData, productID);

        console.log('RESULT:', result);

        res.status(200).json({ message: 'Produkten har uppdaterats!', data: result })

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

// PRODUCT COMPARISON
export async function compareProducts(
    req: Request, res: Response<ApiResponse<ComparedProducts>>): Promise<void> {
    try {
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
        const { productRating: { _id: productID, rating: productRating } } = req.body;

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
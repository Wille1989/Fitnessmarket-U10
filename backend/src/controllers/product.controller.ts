import { Request, Response } from 'express';
import { ObjectId } from 'mongodb';
import type { ApiResponse } from '../types/ApiResponse';
import type { Product, ComparedProducts } from '../types/product/Products';
import { ValidationError, AppError, NotFoundError } from '../classes/ErrorHandling';
import { AuthenticatedRequest } from '../types/user/UserAuth';
import { validateUserId } from '../validators/user/user.validate';
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
        validateUserId(req.user!.userID);
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
export async function getProductById(req: Request, res: Response<ApiResponse<Product>>): Promise<void> {

    try {
        // Validate string of ID from frontend
        if(!ObjectId.isValid(req.params.id)){
            throw new ValidationError('Kunde inte validera ID');
        };

        // Convert ID from string to ObjectId
        const productID = new ObjectId(String(req.params.id));

        // Send product object to service
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
    req: Request, res: Response<ApiResponse<Product[]>>): Promise<void> {
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
        // Validate user is admin or sales account
        validateUserId(req.user!.userID);

        // destruct value id from product object
        const { _id } = req.body.product;
        
        // check if string is valid
        if(!ObjectId.isValid(_id)) {
            throw new ValidationError('Ogiltligt ID');
        };

        // convert string to objectID
        const productID = new ObjectId(String(_id));

        // Call service function
        await deleteProductService(productID);

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
        // Validate user token
        validateUserId(req.user!.userID);

        // Grab the entire request of product object
        const formBody = req.body.product;

        // check id to ensure it is valid
        if(!ObjectId.isValid(formBody._id)) {
            throw new ValidationError('Valideringen av ID misslyckades');
        };

        // store converted id from string to ObjectID
        const productID = new ObjectId(String(formBody._id));

        // response from database
        const result = await updateProductService(formBody, productID);

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
export async function compareProducts(req: Request, res: Response<ApiResponse<ComparedProducts>>): Promise<void> {
    try {
        // destruct products object
        const { products } = req.body;

        if(!products || products.length === 0) {
            throw new NotFoundError('Välj två produkter att jämföra mellan');
        };

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
export async function rateProduct(req: Request, res: Response<ApiResponse<Product>>): Promise<void> {
    try {
        // Destruct id and rating from object products
        const { _id, rating } = req.body.product;

        // check id string validation
        if(!ObjectId.isValid(_id)) {
            throw new ValidationError('Ogiltligt ID');
        };

        // convert id string to objectID
        const productID = new ObjectId(String(_id));

        // response from database operation
        const response = await rateProductService(productID, rating);

        // response status + response data
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
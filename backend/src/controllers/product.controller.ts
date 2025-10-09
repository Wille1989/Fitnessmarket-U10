import { Request, Response } from 'express';
import { ObjectId } from 'mongodb';
import type { ApiResponse } from '../types/ApiResponse';
import type { CreateProduct, Product, ComparedProducts } from '../types/product/Products';
import { 
    createProductService, 
    deleteProductService, 
    getProductByIdService, 
    getAllProductsService, 
    updateProductService,
    compareProductsService,
    rateProductService } 
    from '../services/product/product.service';
import { ValidationError, AppError, NotFoundError } from '../classes/ErrorHandling';

// CREATE A PRODUCT
export async function createProduct(req: Request, res: Response<ApiResponse<CreateProduct>>): Promise<void> {

    try {

        const frontendData: CreateProduct = req.body;

        const newProduct = await createProductService(frontendData);

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


// GET PRODUCT OR ARRAY OF PRODUCTS
export async function getProduct(req: Request, res: Response<ApiResponse<Product | Product[]>>): Promise<void> {

    try {

        const { id } = req.params;

        if( id ) {
            const productID = new ObjectId(id);
            const product: Product = await getProductByIdService(productID);
    
            if(!product){
                res.status(400).json({ message: 'Kunde inte hitta en produkt' });
                return;
            };

            res.status(200).json({ message: 'Produkten hittades', data: product });

        } else {
            const allProducts = await getAllProductsService();

            res.status(200).json({ message: `Antal produkter funna: ${allProducts.length}`, data: allProducts });

        };
       
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

// DELETE PRODUCT
export async function deleteProduct(req: Request, res: Response<ApiResponse<null>>): Promise<void> {

    try {
        const { id } = req.params;
        const productID = new ObjectId(id);

        if(!ObjectId.isValid(id)) {
            throw new ValidationError('Ogiltligt ID');
        };

        const deleteProduct = await deleteProductService(productID);

        if(deleteProduct.deletedCount === 0) {
            res.status(400).json({ message: 'Inga produkter togs bort!' });
        };

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

export async function updateProduct(req: Request, res: Response<ApiResponse<Product>>): Promise<void> {
    try {
        const { id } = req.params;
        const productID = new ObjectId(id);
        const changesToProduct = req.body;

        if(!ObjectId.isValid(id)) {
            throw new ValidationError('Ogiltligt ID');
        };

        if(Object.values(changesToProduct).some(v => v === null || v === undefined || v === '')) {
            throw new ValidationError('Fälten måste ha giltiga värden');
        };

        await updateProductService(changesToProduct, productID);
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

export async function compareProducts(req: Request, res: Response<ApiResponse<ComparedProducts>>): Promise<void> {
    try {
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

export async function rateProduct(req: Request, res: Response<ApiResponse<Product>>): Promise<void> {
    try {
        const { _id, rating } = req.body as { _id: string, rating: number };
        const productID = new ObjectId(_id);

        if(!ObjectId.isValid(_id)) {
            throw new ValidationError('Ogiltligt ID');
        };

        const response = await rateProductService(productID, rating);

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
}
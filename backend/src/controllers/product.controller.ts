import { Request, Response } from 'express';
import { ObjectId } from 'mongodb';
import type { ApiResponse } from '../types/ApiResponse';
import type { CreateProduct, Product } from '../types/product/Products';
import { 
    createProductService, 
    deleteProductService, 
    getProductByIdService, 
    getAllProductsService } 
    from '../services/product/product.service';

// CREATE A PRODUCT
export async function createProduct(req: Request, res: Response<ApiResponse<CreateProduct>>): Promise<void> {

    try {

        const frontendData: CreateProduct = req.body;

        const newProduct = await createProductService(frontendData);

        res.status(201).json({ message: 'Produkten har lagts till!', data: newProduct });

    } catch (error) {
        const err = error as Error;
        res.status(400).json({ message: err.message });
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
        const err = error as Error;
        res.status(400).json({message: err.message});
    };

};

// DELETE PRODUCT
export async function deleteProduct(req: Request, res: Response<ApiResponse<null>>): Promise<void> {

    try {
        const { id } = req.params;
        const productID = new ObjectId(id);
        const deleteProduct = await deleteProductService(productID);

        if(deleteProduct.deletedCount === 0) {
            res.status(400).json({ message: 'Inga produkter togs bort!' });
        };

        res.status(200).json({ message: 'Produkten togs bort!' });

    } catch (error) {
        const err = error as Error;
        res.status(400).json({ message: err.message });
        return;
    }

};

export async function updateProduct(req: Request, res: Response<ApiResponse<Product>>): Promise<void> {

    const { id } = req.params;
    const productID = new ObjectId(id);
    const changesToProduct = req.body;

    


}
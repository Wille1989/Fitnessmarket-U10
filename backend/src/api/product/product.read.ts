import { Request, Response } from 'express';
import { getDb } from '../../lib/mongodb';
import { ProductFactory } from '../../factories/product.factory';
import type { ApiResponse } from '../../types/ApiResponse';
import type { Product } from '../../types/product/Products';


async function getAllProducts(_req: Request, res: Response<ApiResponse<Product[] | Product>>): Promise<void> {

    const db = await getDb();
    const productCollection = db.collection<Product>('products');

    try {

        const requestAllProducts = await productCollection.find({}).toArray();

        const products = requestAllProducts.map(product => ProductFactory.read(product));

        res.status(200).json({ 
            message: `Antal produkter hittade: ${products.length}`,
            data: products
         });
        
    } catch (error) {
        res.status(500).json({
            message: 'Något gick fel när servern anropades!',
            error: error
        });
    };
   
}

export default getAllProducts;
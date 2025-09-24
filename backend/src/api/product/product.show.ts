import { getDb } from "../../lib/mongodb";
import { Request, Response } from "express";
import { ProductFactory } from "../../factories/product.factory";
import { ApiResponse } from "../../types/ApiResponse";
import { Product } from "../../types/product/Products";
import { ObjectId } from "mongodb";

async function getProduct(req: Request, res: Response<ApiResponse<Product>>): Promise<void> {

    const db = await getDb();
    const productCollection = db.collection<Product>('products');
    
    try {

        const getProduct = await productCollection.findOne({ _id: new ObjectId(req.params.id) });

        if(!getProduct) {
            res.status(400).json({
                message: 'Kan inte knyta produktens ID till en produkt i databasen'
            });
            console.error(req.params.id);
            return;
        };

        const showProduct = ProductFactory.read(getProduct)

        res.status(200).json({ 
            message: 'Produkten hittad',
            data: showProduct
        });
        
    } catch (error) {
        res.status(500).json({ 
            message: 'Något gick fel när servern anropades!',
            error: error
         });
    };
}

export default getProduct;
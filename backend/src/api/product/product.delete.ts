import { Request, Response } from 'express';
import { getDb } from '../../lib/mongodb';
import { ApiResponse } from '../../types/ApiResponse';
import { Product } from '../../types/product/Products';
import { ObjectId } from 'mongodb';

async function deleteProduct(req: Request, res: Response<ApiResponse<Product>>): Promise<void> {

    const db = await getDb();
    const productCollection = db.collection<Product>('products');

    try {

        const deleteProduct = await productCollection.deleteOne({ _id: new ObjectId(req.params.id) });

        if(deleteProduct.deletedCount === 0) {
            res.status(400).json({ message: 'Produkten kunde inte tas bort' });
            console.error(deleteProduct);
            return;
        };

        res.status(200).json({ message: 'produkten har tagits bort' });
        
    } catch (error) {
        res.status(500).json({ 
            message: 'Något gick fel när servern anropades!',
            error: error
         });
    };
}

export default deleteProduct;

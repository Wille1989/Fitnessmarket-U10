import { Request, Response } from 'express';
import { ApiResponse } from '../../types/ApiResponse';
import { UpdateProduct } from '../../types/product/Products';
import { getDb } from '../../lib/mongodb';
import { ProductFactory } from '../../factories/product.factory';
import { ObjectId } from 'mongodb';

async function updateProduct(req: Request, res: Response<ApiResponse<UpdateProduct>>): Promise<void> {

    const db = await getDb();
    const productCollection = db.collection<UpdateProduct>('products');
    const productID = new ObjectId(req.params.id);

    try {

        const changesToProduct = ProductFactory.update(req.body);

        const updateProduct = productCollection.findOneAndUpdate(
            { productID },
            { $set: changesToProduct },
            { returnDocument: 'after' }
        );

        if(!updateProduct) {
            res.status(400).json({
                message: 'Produkten kunde inte uppdateras'
            });
            console.error(updateProduct);
            return;
        }

        res.status(200).json({
            message: 'Produkten har uppdaterats!',
            data: { ...changesToProduct }
        });
        
    } catch (error) {
        res.status(500).json({
            message: 'Något gick fel när servern anropades!',
            error: error
        });
    };

}

export default updateProduct;
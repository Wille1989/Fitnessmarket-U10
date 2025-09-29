import { Request, Response } from 'express';
import { getDb } from '../../../lib/mongodb';
import { ApiResponse } from '../../../types/ApiResponse';
import { Category } from '../../../types/product/Category';
import { ObjectId } from 'mongodb';
import { CategoryFactory } from '../../../factories/category.factory';

async function UpdateCategory(req: Request, res: Response<ApiResponse<Category>>): Promise<void> {

    const categoryID = new ObjectId(req.params.id);
    const db = await getDb();
    const categoryCollection = db.collection<Category>('categories');
    const storedRequestBody = CategoryFactory.update(req.body);

    try {

        const updatedCategory = await categoryCollection.findOneAndUpdate(
            { categoryID },
            { $set: storedRequestBody },
            { returnDocument: 'after' }
        );

        res.status(200).json({
            message: 'Uppdateringen lyckades',
            data: updatedCategory
        });
        
    } catch (error) {
        res.status(500).json({ 
            message: 'Något gick fel när servern anropades!',
            error: error
         });
    };
}

export default UpdateCategory;
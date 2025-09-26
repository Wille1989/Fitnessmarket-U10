import { Request, Response } from 'express';
import { getDb } from '../../../lib/mongodb';
import { ApiResponse } from '../../../types/ApiResponse';
import { Category } from '../../../types/product/Category';
import { ObjectId } from 'mongodb';

async function deleteCategory(req: Request, res: Response<ApiResponse<Category>>): Promise<void> {

    const db = await getDb();
    const categoryCollection = db.collection<Category>('categories');

    try {

        const deletedCategory = await categoryCollection.deleteOne({ _id: new ObjectId(req.params.id) });

        if(deletedCategory.deletedCount === 0) {
            res.status(400).json({ message: 'Kategorin har inte tagits bort.' });
            return;
        };

        res.status(200).json({ message: 'Kategorin har tagits bort' });

    } catch (error) {
        res.status(500).json({
            message: 'Något gick fel när servern anropades!',
            error: error
        });
    };

}

export default deleteCategory;
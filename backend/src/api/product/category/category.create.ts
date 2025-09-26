import { Request, Response } from 'express';
import { getDb } from '../../../lib/mongodb';
import { Category } from '../../../types/product/Category';
import { CategoryFactory } from '../../../factories/category.factory';
import type { ApiResponse } from '../../../types/ApiResponse';

async function createCategory(req: Request, res: Response<ApiResponse<Category>>): Promise<void> {

    const db = await getDb();
    const categoryCollection = db.collection<Category>('categories');

    try {

        const newCategory = CategoryFactory.create({

            title: req.body.title,
            description: req.body.description,

        });

        const response = await categoryCollection.insertOne(newCategory)

        if(!response) {
            res.status(400).json({
                message: 'Kan inte hitta kategorin'
            });
            console.error(newCategory);
            return;
        };

        if(!response) {
            res.status(400).json({ 
                message: 'Kategorin lästes inte in'
             });
             console.error(response);
             return;
        };

        res.status(200).json({
            message: 'Kategori hittad, skickar vidare till fabriken',
            data: { ...newCategory, _id: response.insertedId }
        });
        
    } catch (error) {
        res.status(500).json({
            message: 'Något gick fel när servern anropades!',
            error: error
        });
    };
};

export default createCategory;
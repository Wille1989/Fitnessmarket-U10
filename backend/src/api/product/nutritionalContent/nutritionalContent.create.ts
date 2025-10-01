import { Request, Response } from 'express';
import { getDb } from '../../../lib/mongodb';
import { NutritionalContentFactory } from '../../../factories/nutritionalContent.factory';
import { ApiResponse } from '../../../types/ApiResponse';
import { NutritionalContent } from '../../../types/product/NutritionalContent';
import { ObjectId } from 'mongodb';

async function createNutrionalContent(req: Request, res: Response<ApiResponse<NutritionalContent>>): Promise<void> {

    const db = await getDb();
    const nutritionalContentCollection = db.collection<NutritionalContent>('nutritionalContents');

    try {

        const newNutritionalContent = NutritionalContentFactory.create(req.body);

        const response = await nutritionalContentCollection.insertOne(newNutritionalContent);

        res.status(201).json({ 
            message: 'Nytt näringsinnehåll tillagt',
            data: { ...newNutritionalContent, _id: response.insertedId }
         });
        
    } catch (error) {
        res.status(500).json({ 
            message: 'Något gick fel när servern anropades!',
            error: error
         });
    };

}

export default createNutrionalContent;
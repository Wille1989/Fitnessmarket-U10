import { CreateNutritionalContent, NutritionalContent } from '../types/product/NutritionalContent';
import { getDb } from '../lib/mongodb';
import { NutritionalContentFactory } from '../factories/nutritionalContent.factory';

export async function createNutrionalContentService(frontendData: CreateNutritionalContent): Promise<NutritionalContent> {

    const db = await getDb();
    const nutritionalContentCollection = db.collection<NutritionalContent>('nutritionalContents');

    if(
        frontendData.energy < 0 || 
        frontendData.fat < 0 || 
        frontendData.protein < 0 || 
        frontendData.salt < 0 || 
        frontendData.saturatedFat < 0
    ) {
        throw new Error('Näringsvärdena måste vara noll eller högre');
    };

    const newNutritionalContent = NutritionalContentFactory.create(frontendData);

    const response = await nutritionalContentCollection.insertOne(newNutritionalContent);

    return { ...newNutritionalContent, _id: response.insertedId };

};
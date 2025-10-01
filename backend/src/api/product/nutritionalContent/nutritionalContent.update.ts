import { Request, Response } from 'express';
import { ApiResponse } from '../../../types/ApiResponse';
import { NutritionalContent } from '../../../types/product/NutritionalContent';
import { ObjectId } from 'mongodb';
import { getDb } from '../../../lib/mongodb';
import { NutritionalContentFactory } from '../../../factories/nutritionalContent.factory';

async function updateNutritionalContent(req: Request, res: Response<ApiResponse<NutritionalContent>>): Promise<void> {

    const NutritionalContentID = new ObjectId(req.params.id);
    const db = await getDb();
    const nutritionalContentCollection = db.collection<NutritionalContent>('nutritionalContents');

    try {

        const inputData = NutritionalContentFactory.update(req.body);

        const response = nutritionalContentCollection.findOneAndUpdate(
            { NutritionalContentID },
            { $set: inputData },
            { returnDocument: 'after' }
        );

        if(!response) {
            res.status(400).json({
                message: 'Datan uppdaterades inte'
            });
            console.error(response);
            return;
        };

        res.status(200).json({ message: 'Dokumentet uppdaterades som planerat!' });
        
    } catch (error) {
        res.status(500).json({ 
            message: 'Något gick fel när servern anropades!',
            error: error
         });
         return;
    }

}

export default updateNutritionalContent;
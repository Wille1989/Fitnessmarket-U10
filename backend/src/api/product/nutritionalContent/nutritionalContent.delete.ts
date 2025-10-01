import { Request, Response } from 'express';
import { ApiResponse } from '../../../types/ApiResponse';
import { NutritionalContent } from '../../../types/product/NutritionalContent';
import { ObjectId } from 'mongodb';
import { getDb } from '../../../lib/mongodb';

async function deleteNutritionalContent(req: Request, res: Response<ApiResponse<NutritionalContent>>): Promise<void> {

    const ID = new ObjectId(req.params.id);
    const db = await getDb();
    const nutritionalContentCollection = db.collection<NutritionalContent>('nutritionalContents');

    try {

        const deleteData = await nutritionalContentCollection.deleteOne({ ID });

        if(deleteData.deletedCount === 0) {
            res.status(400).json({
                message: 'Inget dokument togs bort'
            });
            console.error(deleteData);
            return;
        };

        res.status(200).json({ message: 'Dokumentet togs bort!' });
        
    } catch (error) {
        res.status(500).json({ 
            message: 'Något gick fel när servern anropades!',
            error: error
         });
         return;
    };
};

export default deleteNutritionalContent;
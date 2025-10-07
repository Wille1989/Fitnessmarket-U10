import getDb from '../../lib/mongodb';
import { NutritionalContentFactory } from '../../factories/nutritionalContent.factory';
import type { 
    CreateNutritionalContent, 
    NutritionalContent 
} from '../../types/product/NutritionalContent';
import { validateNutritionalContent } from '../../validators/product/nutritionalContent.validate';
import { ObjectId } from 'mongodb';
import { NotFoundError } from '../../classes/ErrorHandling';


export async function createNutrionalContentService(
    data: CreateNutritionalContent): Promise<NutritionalContent> {

    const validatedData = await validateNutritionalContent(data);
    const db = await getDb();
    const nutritionalContentCollection = db.collection<NutritionalContent>('nutritionalContents');

    const newNutritionalContent = NutritionalContentFactory.create(validatedData);

    const result = await nutritionalContentCollection.insertOne(newNutritionalContent);

    return { ...newNutritionalContent, _id: result.insertedId };

};

export async function deleteNutritionalContentService( id: ObjectId ) {

    const db = await getDb();
    const response = await db.collection('nutritionalContents').deleteOne({ _id: id });

    if(response.deletedCount === 0) {
        throw new NotFoundError('Inga dokument togs bort');
    };

    return response;
};

export async function updateNutritionalContentService(
    id: ObjectId, data: NutritionalContent): Promise<NutritionalContent> {

    const validatedData = await validateNutritionalContent(data);
    const db = await getDb();

    const result = await db.collection<NutritionalContent>
    ('nutritionalContents').findOneAndUpdate({ _id: id }, { $set: validatedData }, { returnDocument: 'after' });

    if(!result) {
        throw new NotFoundError('Inget dokument retunerades / uppdaterades');
    };

    return result;

};

export async function getNutritionalContentByIdService( 
    id: ObjectId ): Promise<NutritionalContent> {

    const db = await getDb();
    const response = await db.collection<NutritionalContent>('nutritionalContents').findOne({ _id: id });

    if(!response) {
        throw new NotFoundError('Kunde inte hämta näringsinnehåll för produkten');
    };

    return response;
};

export async function getNutritionalContentsService(): 
    Promise<NutritionalContent[]> {

    const db = await getDb();
    const response = await db.collection<NutritionalContent>
    ('nutritionalContents').find({}).toArray();

    if(response.length === 0) {
        throw new NotFoundError('Svaret är tomt');
    };

    return response;
};
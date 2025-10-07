import getDb from "../../lib/mongodb";
import { CategoryFactory } from "../../factories/category.factory";
import type { 
    CreateCategory, 
    Category 
} from "../../types/product/Category";
import { ObjectId } from "mongodb";
import { NotFoundError } from "../../classes/ErrorHandling";
import { validateCategory } from "../../validators/product/category.validate";

export async function createCategoryService(frontendData: CreateCategory): Promise<Category> {

    const db = await getDb();
    const categoryCollection = db.collection<Category>('categories');

    // Validate the object category
    validateCategory(frontendData);

    const newCategory = CategoryFactory.create(frontendData);

    if(!frontendData) {
        throw new NotFoundError('Kan inte hitta ny kategoridata');
    };

    const result = await categoryCollection.insertOne(newCategory);

    return { ...newCategory, _id: result.insertedId }
};

export async function deleteCategoryService(id: ObjectId) {

    const db = await getDb();
    const response = await db.collection('categories').deleteOne({ _id: id });;

    if(response.deletedCount === 0) {
        throw new NotFoundError('Dokumentet kunde inte tas bort');
    };

    return response;
};

export async function updateCategoryService(id: ObjectId, data: Category): Promise<Category> {

    const db = await getDb();
    const categoryCollection = db.collection<Category>('categories');

    const validatedData = await validateCategory(data);

    const result = await categoryCollection.findOneAndUpdate(
        { _id: id },
        { $set: validatedData },
        { returnDocument: 'after' }
    );

    if(!result) {
        throw new NotFoundError('Förfrågan att uppdatera dokumentet misslyckades');
    };
    
    return result;
};

export async function getCategoryByIdService( id: ObjectId ): Promise<Category> {

    const db = await getDb();
    const categoryCollection = db.collection<Category>('categories');

    const response = await categoryCollection.findOne({ _id: id });

    if(!response) {
        throw new NotFoundError('Kunde inte hitta kategorin');
    };

    return response;
};

export async function getAllCategoriesService(): Promise<Category[]> {

    const db = await getDb();
    const categoryCollection = db.collection<Category>('categories');

    const response = await categoryCollection.find({}).toArray();

    if(response.length === 0) {
        throw new NotFoundError('Kunde inte hitta några kategorier');
    };

    return response;

};
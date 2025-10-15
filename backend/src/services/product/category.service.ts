import getDb from "../../lib/mongodb";
import { convertStringToObjectId } from '../../utils/convertData';
import { NotFoundError, ValidationError } from "../../classes/ErrorHandling";
import { validateCategory } from "../../validators/product/category.validate";
import { CategoryFactory } from "../../factories/category.factory";
import type { Category } from "../../types/product/Category";

// CREATE A CATEGORY
export async function createCategoryService(
    categoryData: Category): Promise<Category> {
    
    const db = await getDb();
    const categoryCollection = db.collection<Category>('categories');

    // Validate category inputs
    const { title: validTitle, description: validDescription } = 
    await validateCategory(categoryData);

    // Check if the titel already exists in database
    const existingCategory = await categoryCollection.findOne({ title: validTitle });
    if(existingCategory){
        throw new ValidationError('titeln existerar redan')};

    // validated inputs for factory
    const frontendData = { title: validTitle, description: validDescription };

    // create the new category entity
    const newCategory = CategoryFactory.create(frontendData);

    // insert into database
    const result = await categoryCollection.insertOne(newCategory);

    // return the result and insert the created objectID
    return { _id: result.insertedId, ...newCategory  }
};

// DELETE A CATEGORY
export async function deleteCategoryService(
    id: string) {

    const categoryID = convertStringToObjectId(id);

    const db = await getDb();
    const response = await db.collection('categories').deleteOne({ _id: categoryID });;

    if(response.deletedCount === 0) {
        throw new NotFoundError('Dokumentet kunde inte tas bort');
    };

    return response;
};

// UPDATE A CATEGORY
export async function updateCategoryService(
    categoryID: string, categoryData: Category): Promise<Category> {

    const validatedCategoryID = convertStringToObjectId(categoryID);
    const validatedData = await validateCategory(categoryData);

    const db = await getDb();
    const categoryCollection = db.collection<Category>('categories');

    const result = await categoryCollection.findOneAndUpdate(
        { _id: validatedCategoryID },
        { $set: validatedData },
        { returnDocument: 'after' }
    );

    if(!result) {
        throw new NotFoundError('Förfrågan att uppdatera dokumentet misslyckades');
    };
    
    return result;
};

// GET A CATEGORY BY ITS ID
export async function getCategoryByIdService(
    id: string): Promise<Category> {

    const categoryID = convertStringToObjectId(id);

    const db = await getDb();
    const categoryCollection = db.collection<Category>('categories');

    const response = await categoryCollection.findOne(categoryID);

    if(!response) {
        throw new NotFoundError('Kunde inte hitta kategorin');
    };

    return response;
};

// GET ALL CATEGORIES IN DATABASE
export async function getAllCategoriesService(): Promise<Category[]> {

    const db = await getDb();
    const categoryCollection = db.collection<Category>('categories');

    const response = await categoryCollection.find({}).toArray();

    if(response.length === 0) {
        throw new NotFoundError('Kunde inte hitta några kategorier');
    };

    return response;

};
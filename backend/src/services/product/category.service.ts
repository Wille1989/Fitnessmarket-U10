import getDb from "../../lib/mongodb";
import { CategoryFactory } from "../../factories/category.factory";
import type { 
    CreateCategory, 
    Category 
} from "../../types/product/Category";

export async function createCategoryService(frontendData: CreateCategory): Promise<Category> {

    const db = await getDb();
    const categoryCollection = db.collection<Category>('categories');
    const newCategory = CategoryFactory.create(frontendData);

    if(!frontendData) {
        throw new Error('Kan inte hitta ny kategoridata');
    };

    const response = await categoryCollection.insertOne(newCategory);

    return { ...newCategory, _id: response.insertedId }
};
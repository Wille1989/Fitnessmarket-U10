import { ProductFactory } from "../factories/product.factory";
import { createNutrionalContentService } from "./nutritionalContent.service";
import { createCategoryService } from "./category.service";
import getDb from "../lib/mongodb";
import type { CreateProduct, Product } from "../types/product/Products";

export async function createProductService(frontendData: CreateProduct): Promise<Product> {

    const db = await getDb();
    const productCollection = db.collection<Product>('products');

    const categoryID = await createCategoryService(frontendData.category);

    if(!categoryID._id) {
        throw new Error('Kategori saknar ID');
    };

    const nutritionalContentID = await createNutrionalContentService(frontendData.nutritionalContent);

    if(!nutritionalContentID._id) {
        throw new Error('Näringsinnehåll saknar ID')
    };

    
    // INSERT FRONTEND VALIDATION HERE

    const newProduct = ProductFactory.create(
        {
            ...frontendData,
            category: categoryID._id,
            nutritionalContent: nutritionalContentID._id
        }
    );

    const response = await productCollection.insertOne(newProduct);

    return { ...newProduct, _id: response.insertedId }
};
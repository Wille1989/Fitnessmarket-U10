import getDb from "../../lib/mongodb";
import { ProductFactory } from "../../factories/product.factory";
import { validateProduct } from "../../validators/product/product.validate";
import type { CreateProduct, Product } from "../../types/product/Products";
import { validateCategory } from "../../validators/product/category.validate";


export async function createProductService(frontendData: CreateProduct): Promise<Product> {

    const db = await getDb();
    const productCollection = db.collection<Product>('products');

    validateCategory(frontendData)

    // Validate the product
    validateProduct(frontendData);

    // Create object
    const product = ProductFactory.create(
        {
            ...frontendData,
            createdAt: new Date()
        });

    // send to database
    const newProduct = await productCollection.insertOne(product); 

    // inlucde the object id
    return {...product, _id: newProduct.insertedId};

};
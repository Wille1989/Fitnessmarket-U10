import getDb from "../../lib/mongodb";
import { ObjectId } from "mongodb";
import type { CreateProduct, 
    Product 
} from "../../types/product/Products";
import { ProductFactory } from "../../factories/product.factory";
import { validateProduct } from "../../validators/product/product.validate";


// CREATE PRODUCT
export async function createProductService(frontendData: CreateProduct): Promise<Product> {

    const db = await getDb();
    const productCollection = db.collection<Product>('products');

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
    return { ...product, _id: newProduct.insertedId };

};

// SPECIFIC PRODUCT ON ID
export async function getProductByIdService( id: ObjectId): Promise<Product> {

    const db = await getDb();
    const productCollection = db.collection<Product>('products');

    const getProductById = await productCollection.findOne({ _id: id });

    if(!getProductById) {
        throw new Error('Kan inte hitta produkten');
    };

    return getProductById;
};

// ALL PRODUCTS
export async function getAllProductsService(): Promise<Product[]> {

    const db = await getDb();
    const productCollection = db.collection<Product>('products');

    const allProducts = productCollection.find({}).toArray();

    if(!allProducts) {
        throw new Error('Kunde inte hitta array of products');
    };

    return allProducts;
};

// DELETE A PRODUCT
export async function deleteProductService( id: ObjectId) {

    const db = await getDb();
    const productCollection = db.collection<Product>('products');
    const response = await productCollection.deleteOne({ _id: id });

    return response;
}

// UPDATE PRODUCT
export async function updateProductService(frontendData: Product, id: ObjectId): Promise<Product> {

    const db = await getDb();
    const productCollection = db.collection<Product>('products');

    // Validate the product changes
    const validatedProduct = await validateProduct(frontendData);

    const response = await productCollection.findOneAndUpdate(
        { _id: id }, // filter
        { $set: validatedProduct }, // update
        { returnDocument: 'after' } // options
    );

    if(!response) {
        throw new Error('Kunde inte uppdatera produkten')
    };

    return response;
};
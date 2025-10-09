import getDb from "../../lib/mongodb";
import { ObjectId } from "mongodb";
import { ProductFactory } from "../../factories/product.factory";
import { validateProduct } from "../../validators/product/product.validate";
import type { 
    CreateProduct, 
    Product 
} from "../../types/product/Products";
import { NotFoundError } from "../../classes/ErrorHandling";
import { NutritionalContent } from "../../types/product/NutritionalContent";
import { ProductRating } from "../../types/product/ProductRating";


// CREATE PRODUCT
export async function createProductService(
    fromBody: CreateProduct): Promise<Product> {

    const db = await getDb();
    const productCollection = db.collection<Product>('products');

    // Validate the product
    validateProduct(fromBody);
    const createdAt = new Date();
    const rating: ProductRating = {
        average: 0,
        sum: 0,
        totalRatings: 0
    };

    // Create object
    const product = ProductFactory.create(
        { fromBody, rating: rating, createdAt: createdAt });

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

    if(response.deletedCount === 0){
        throw new NotFoundError('Produkten togs inte bort');
    };

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


// COMPARE PRODUCTS
export async function compareProductsService( ids: string[] ) {

    const db = await getDb();
    const productCollection = db.collection<Product>('products');

    const products = await productCollection.find(
        { _id: { $in: ids.map(id => new ObjectId(id)) } }).toArray();

    if(products.length !== 2) {
        throw new NotFoundError('En eller båda produkterna kunde inte hittas');
    };

    const [a,b] = products;

    const nutritionalComparison = (
        Object.keys(a.nutritionalContent) as Array <keyof NutritionalContent>).map(nutrient  => {
        const valueA = a.nutritionalContent[nutrient] as number;
        const valueB = b.nutritionalContent[nutrient] as number;

        const difference = valueA - valueB;

        return {
            field: nutrient ,
            productA: valueA,
            productB: valueB,
            comparedData: difference
        }
    });

    return {
        comparedProducts: [a.title, b.title],
        comparison: nutritionalComparison
    };
};

// PRODUCT RATING
export async function rateProductService(id: ObjectId, ratingValue: number): Promise<Product>{

    const db = await getDb();
    const product = await db.collection<Product>('products').findOne({ _id: id });

    if(!product) {
        throw new NotFoundError('Kunde inte hämta produkten');
    };

    const newSum = product.rating.sum + ratingValue;
    const newTotal = product.rating.totalRatings +1;

    const newAverage = newSum / newTotal;

    const updateProductRating = await db.collection<Product>('products').
        findOneAndUpdate(
            { _id: id }, 
            { $set: { 'rating.sum': newSum, 'rating.totalRatings': newTotal, 'rating.average': newAverage } }, 
            { returnDocument:'after' }
        );

    if(!updateProductRating) {
        throw new NotFoundError('Produkten kunde inte uppdateras');
    };

    return updateProductRating;
};
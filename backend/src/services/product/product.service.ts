import getDb from "../../lib/mongodb";
import { ObjectId } from "mongodb";
import { convertStringToObjectId } from '../../utils/convertData';
import { validateProduct } from "../../validators/product/product.validate";
import { ProductFactory } from "../../factories/product.factory";
import { ProductRatingFactory } from "../../factories/productRating.factory";
import { NotFoundError, ValidationError } from "../../classes/ErrorHandling";
import type { CreateProduct, Product } from "../../types/product/Products";
import type { NutritionalContent } from "../../types/product/NutritionalContent";
import type { ProductRating } from "../../types/product/ProductRating";

// CREATE PRODUCT
export async function createProductService(
    product: CreateProduct): Promise<Product> {

    const db = await getDb();
    const validatedProduct = await validateProduct(product);
    
    const rating: ProductRating = {
        average: 0,
        sum: 0,
        totalRatings: 0
    };
    
    const createProduct = ProductFactory.create(validatedProduct, rating);
    const newProduct = await db.collection<Product>('products').insertOne(createProduct); 

    return { ...createProduct, _id: newProduct.insertedId };

};

// SPECIFIC PRODUCT ON ID
export async function getProductByIdService(
    id: string): Promise<Product> {

    const db = await getDb();

    const productID = convertStringToObjectId(id);
    const getProductById = await db.collection<Product>('products').findOne({ _id: productID });

    if(!getProductById) {
        throw new Error('Kan inte hitta produkten');
    };

    return getProductById;
};

// ALL PRODUCTS
export async function getAllProductsService(): Promise<Product[]> {

    const db = await getDb();
    const products = db.collection<Product>('products').find({}).toArray();

    if(!products) {
        throw new Error('Kunde inte hitta array of products');
    };

    return products;
};

// DELETE A PRODUCT
export async function deleteProductService(id: string) {

    const db = await getDb();

    const productID = convertStringToObjectId(id);
    const response = await db.collection<Product>('products').deleteOne({ _id: productID });

    if(response.deletedCount === 0){
        throw new NotFoundError('Produkten togs inte bort');
    };

    return response;
};

// UPDATE PRODUCT
export async function updateProductService(
    productData: Product, id: string): Promise<Product> {

    const db = await getDb();

    const productID = convertStringToObjectId(id);
    const validatedProduct = await validateProduct(productData);

    const response = await db.collection<Product>('products').findOneAndUpdate(
        { _id: productID }, 
        { $set: validatedProduct }, 
        { returnDocument: 'after' } 
    );

    if(!response) {
        throw new Error(`Kunde inte uppdatera produkten`)
    };

    return response;
};

// COMPARE PRODUCTS
export async function compareProductsService(productIDs: string[] ) {

    if(!productIDs || productIDs.length === 0) {
        throw new NotFoundError('Välj två produkter att jämföra mellan');
    };

    if(!productIDs.every(id => ObjectId.isValid(id))){
        throw new ValidationError('Minst ett ID bedöms vara ogiltligt');
    }

    const db = await getDb();
    const productCollection = db.collection<Product>('products');

    const products = await productCollection.find(
        { _id: { $in: productIDs.map(id => new ObjectId(id)) } })
        .toArray();

    if(products.length !== 2) {
        throw new NotFoundError(`Kunde inte jämföra, hittade ${products.length}`);
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
export async function rateProductService(
    id: string, ratingValue: string): Promise<Product>{

    const productID = convertStringToObjectId(id);

    const RatingValueAsNumeric = Number(ratingValue);
    if(isNaN(RatingValueAsNumeric)){
        throw new ValidationError('Betygsformatet är ogiltligt');
    };

    const db = await getDb();
    const product = await db.collection<Product>('products').findOne({ _id: productID });

    if(!product) {
        throw new NotFoundError('Kunde inte hämta produkten');
    };

    const updatedProduct = await db.collection<Product>('products').
        findOneAndUpdate(
            { _id: productID }, 
            { $set: { rating: ProductRatingFactory.update(product.rating, RatingValueAsNumeric) } }, 
            { returnDocument:'after' },
        );

    if(!updatedProduct) {
        throw new NotFoundError('Produkten kunde inte uppdateras');
    };

    return updatedProduct;
};
import getDb from "../../lib/mongodb";
import { ObjectId } from "mongodb";
import { ProductFactory } from "../../factories/product.factory";
import { validateProduct } from "../../validators/product/product.validate";
import type { 
    CreateProduct, 
    Product 
} from "../../types/product/Products";
import { NotFoundError, ValidationError } from "../../classes/ErrorHandling";
import { NutritionalContent } from "../../types/product/NutritionalContent";
import { ProductRating } from "../../types/product/ProductRating";
import { convertStringToObjectId } from '../../utils/convertData';
import { ProductRatingFactory } from "../../factories/productRating.factory";

// CREATE PRODUCT (CONFIRMED WORKING WITH INSOMNIA)
export async function createProductService(
    fromBody: CreateProduct): Promise<Product> {

    const db = await getDb();
    const productCollection = db.collection<Product>('products');

    // Validate the product
    const validatedProduct = await validateProduct(fromBody);
    const rating: ProductRating = {
        average: 0,
        sum: 0,
        totalRatings: 0
    };
    
    // Create object
    const product = ProductFactory.create(validatedProduct, rating);

    // send to database
    const newProduct = await productCollection.insertOne(product); 

    // inlucde the object id
    return { ...product, _id: newProduct.insertedId };

};

// SPECIFIC PRODUCT ON ID (CONFIRMED WORKING WITH INSOMNIA)
export async function getProductByIdService(
    id: string): Promise<Product> {

    const validatedProductID = convertStringToObjectId(id);

    const db = await getDb();
    const productCollection = db.collection<Product>('products');

    const getProductById = await productCollection.findOne({ _id: validatedProductID });

    if(!getProductById) {
        throw new Error('Kan inte hitta produkten');
    };

    return getProductById;
};

// ALL PRODUCTS (CONFIRMED WORKING WITH INSOMNIA)
export async function getAllProductsService(): Promise<Product[]> {

    const db = await getDb();
    const productCollection = db.collection<Product>('products');

    const allProducts = productCollection.find({}).toArray();

    if(!allProducts) {
        throw new Error('Kunde inte hitta array of products');
    };

    return allProducts;
};

// DELETE A PRODUCT (CONFIRMED WORKING WITH INSOMNIA)
export async function deleteProductService(id: string) {

    const validatedProductID = convertStringToObjectId(id)

    const db = await getDb();
    const productCollection = db.collection<Product>('products');
    const response = await productCollection.deleteOne({ _id: validatedProductID });

    if(response.deletedCount === 0){
        throw new NotFoundError('Produkten togs inte bort');
    };

    return response;
};

// UPDATE PRODUCT (CONFIRMED WORKING WITH INSOMNIA)
export async function updateProductService(
    productData: Product, id: string): Promise<Product> {

    const productID = convertStringToObjectId(id);

    const db = await getDb();
    const productCollection = db.collection<Product>('products');

    // Validate the product changes
    const validatedProduct = await validateProduct(productData);

    console.log('👉 Innehåll i validatedProduct:', validatedProduct);
    console.log('👉 Uppdaterar produkt med ID:', productID);

    const response = await productCollection.findOneAndUpdate(
        { _id: productID }, 
        { $set: validatedProduct }, 
        { returnDocument: 'after' } 
    );

    if(!response) {
        throw new Error(`Kunde inte uppdatera produkten`)
    };

    return response;
};

// COMPARE PRODUCTS (CONFIRMED WORKING WITH INSOMNIA)
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

// PRODUCT RATING (CONFIRMED WORKING WITH INSOMNIA)
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
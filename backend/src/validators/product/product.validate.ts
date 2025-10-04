import type { CreateProduct, Product } from "../../types/product/Products";
import { validateCategory } from "./category.validate";
import { validateNutritionalContent } from "./nutritionalContent.validate";

export async function validateProduct(productData: CreateProduct): Promise<Product> {

    // Validate the object category
    validateCategory(productData.category);

    // Validate the object of nutritional content
    validateNutritionalContent(productData.nutritionalContent);

    if(productData.customerGroup.length > 20) {
        throw new Error('fältet konsumentgrupp innehåller för många tecken');
    };

    if(productData.originCountry.length > 25) {
        throw new Error('fältet ursprungsland innehåller för många tecken');
    };

    // Ensure no special values are allowed
    const inputRegex = /^[a-zA-Z0-9\s]+$/;
    if(!inputRegex.test(
        productData.originCountry && 
        productData.customerGroup && 
        productData.title)) {
        throw new Error('fälten innehåller otillåtna tecken');
    };

    if(productData.price <= 0) {
        throw new Error('Priset måste vara ett positivt tal');
    };

    if(productData.weight <= 0) {
        throw new Error('vikten måste vara ett positivt tal');
    };

    if(productData.pricePerKilo != Math.round(productData.price / productData.weight * 1000)){
        throw new Error('Pris per kilo stämmer inte, granska din indata');
    };

    return productData;

};
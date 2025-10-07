import type { CreateProduct, Product } from "../../types/product/Products";
import { validateNutritionalContent } from "./nutritionalContent.validate";
import { ValidationError } from "../../classes/ErrorHandling";

export async function validateProduct(productData: CreateProduct): Promise<Product> {

    // Validate the object of nutritional content
    validateNutritionalContent(productData.nutritionalContent);

    if(productData.customerGroup.length > 20) {
        throw new ValidationError('fältet konsumentgrupp innehåller för många tecken');
    };

    if(productData.originCountry.length > 25) {
        throw new ValidationError('fältet ursprungsland innehåller för många tecken');
    };

    // Ensure no special values are allowed
    const inputRegex = /^[a-zA-Z0-9\s]+$/;
    if(!inputRegex.test(
        productData.originCountry && 
        productData.customerGroup && 
        productData.title)) {
        throw new ValidationError('fälten innehåller otillåtna tecken');
    };

    if(productData.price <= 0) {
        throw new ValidationError('Priset måste vara ett positivt tal');
    };

    if(productData.weight <= 0) {
        throw new ValidationError('vikten måste vara ett positivt tal');
    };

    if(productData.pricePerKilo != Math.round(productData.price / productData.weight * 1000)){
        throw new ValidationError('Pris per kilo stämmer inte, granska din indata');
    };

    return productData;

};
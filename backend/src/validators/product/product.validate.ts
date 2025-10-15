import type { CreateProduct } from "../../types/product/Products";
import { validateNutritionalContent } from "./nutritionalContent.validate";
import { ValidationError } from "../../classes/ErrorHandling";

export async function validateProduct(productData: CreateProduct): Promise<CreateProduct> {

    // Validate the object of nutritional content
    validateNutritionalContent(productData.nutritionalContent);

    if(productData.originCountry.length > 25) {
        throw new ValidationError('fältet ursprungsland innehåller för många tecken');
    };

    // Ensure no special values are allowed
    const inputRegex = /^[a-öA-Ö0-9\s]+$/;
    if(!inputRegex.test(
        productData.originCountry &&
        productData.title)) {
        throw new ValidationError('fälten innehåller otillåtna tecken');
    };

    if(productData.price <= 0) {
        throw new ValidationError('Priset måste vara ett positivt tal');
    };

    if(productData.weight <= 0) {
        throw new ValidationError('vikten måste vara ett positivt tal');
    };
   
    return productData;

};
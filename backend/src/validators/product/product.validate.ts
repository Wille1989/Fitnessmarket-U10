import type { CreateProduct, Product } from "../../types/product/Products";

export async function validateProduct(frontendData: CreateProduct): Promise<Product> {

    if(frontendData.customerGroup.length > 20) {
        throw new Error('fältet konsumentgrupp innehåller för många tecken');
    };

    if(frontendData.originCountry.length > 25) {
        throw new Error('fältet ursprungsland innehåller för många tecken');
    };

    // Ensure no special values are allowed
    const inputRegex = /^[a-zA-Z0-9\s]+$/;
    if(!inputRegex.test(
        frontendData.originCountry && 
        frontendData.customerGroup && 
        frontendData.title)) {
        throw new Error('fälten innehåller otillåtna tecken');
    };

    if(frontendData.price <= 0) {
        throw new Error('Priset måste vara ett positivt tal');
    };

    if(frontendData.weight <= 0) {
        throw new Error('vikten måste vara ett positivt tal');
    };

    if(frontendData.pricePerKilo != Math.round(frontendData.price / frontendData.weight * 1000)){
        throw new Error('Pris per kilo stämmer inte, granska din indata');
    };

    return frontendData;

};
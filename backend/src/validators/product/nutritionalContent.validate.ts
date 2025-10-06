import { CreateNutritionalContent, NutritionalContent } from "../../types/product/NutritionalContent";
import { ValidationError } from "../../classes/errorhandling";

export async function validateNutritionalContent(productData: CreateNutritionalContent): Promise<NutritionalContent> {

    if(!Object.values(productData).some(value => !value))
        {
            throw new Error('alla fält måste vara ifyllda');
        };

    const inputValues = [ 
        String(productData.salt), 
        String(productData.protein), 
        String(productData.saturatedfat), 
        String(productData.fat), 
        String(productData.energy)
    ];

    const onlyDigits = /^[0-9]+$/;

    for(const value of inputValues) {
        if(!onlyDigits.test(value)) {
            throw new ValidationError('inputfält innehåller otillåtna tecken');
        }

        if(inputValues.length > 5){
            throw new ValidationError('Max antal tecken per input är 5');
        };
    };

    if(productData.energy <= 0) {
        throw new ValidationError(`${productData.energy} kan endast innehålla positiva värden`);
    };

    if(productData.fat <= 0) {
        throw new ValidationError(`${productData.fat} kan endast innehålla positiva värden`);
    };

    if(productData.saturatedfat <= 0) {
        throw new ValidationError(`${productData.saturatedfat} kan endast innehålla positiva värden`);
    };

    if(productData.protein <= 0) {
        throw new ValidationError(`${productData.protein} kan endast innehålla positiva värden`);
    };

    if(productData.salt < 0) {
        throw new ValidationError(`${productData.salt} kan endast innehålla positiva värden`);
    };


    return productData;
}
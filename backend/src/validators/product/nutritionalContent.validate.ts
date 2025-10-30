import { NutritionalContent } from "../../types/product/NutritionalContent";
import { NotFoundError, ValidationError } from "../../classes/ErrorHandling";

export async function validateNutritionalContent(productData: NutritionalContent): Promise<NutritionalContent> {

    if(Object.values(productData).some(value => !value))
        {
            throw new NotFoundError('Fälten för näringsinnehåll måste vara ifyllda');
        };

    const inputValues = [ 
        String(productData.salt), 
        String(productData.protein), 
        String(productData.saturatedfat), 
        String(productData.fat), 
        String(productData.energy)
    ];

    const onlyDigits = /^[0-9]+(\.[0-9]+)?$/;

    for(const value of inputValues) {
        if(!onlyDigits.test(value)) {
            throw new ValidationError('Fälten tillåter endast siffror');
        }

        if(inputValues.length > 5){
            throw new ValidationError('Max antal tecken per input är ');
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
};

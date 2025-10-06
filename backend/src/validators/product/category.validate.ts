import { Category, CreateCategory } from "../../types/product/Category";
import { ValidationError } from "../../classes/errorhandling";


export async function validateCategory(frontendData: CreateCategory): Promise<Category> {

    if(frontendData.title.length >= 30) {
        throw new ValidationError('Titeln är för lång, max 30 tecken');
    };

    if(frontendData.description.length >= 255) {
        throw new ValidationError('beskrivningen får max innehålla 255 tecken');
    };

    const inputRegex = /^[a-zA-Z0-9\s]+$/;
    if(!inputRegex.test(frontendData.title || frontendData.description)){
        throw new ValidationError('inputfält innehåller otillåtna tecken');
    };

    return frontendData;
};
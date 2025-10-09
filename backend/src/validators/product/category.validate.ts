import { Category } from "../../types/product/Category";
import { ValidationError } from "../../classes/ErrorHandling";

export async function validateCategory(title: string, description: string): Promise<Category> {

    const trimmedTitle = title.trim();
    const trimmedDescription = description.trim();

    if(trimmedTitle.length >= 30) {
        throw new ValidationError('Titeln är för lång, max 30 tecken');
    };

    if(trimmedDescription.length >= 255) {
        throw new ValidationError('beskrivningen får max innehålla 255 tecken');
    };

    const inputRegex = /^[a-öA-Ö0-9\s]+$/;
    if(!inputRegex.test(trimmedTitle || trimmedDescription)){
        throw new ValidationError('inputfält innehåller otillåtna tecken');
    };

    return { title: trimmedTitle, description: trimmedDescription };
};
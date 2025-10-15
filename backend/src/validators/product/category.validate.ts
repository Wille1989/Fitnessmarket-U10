import { Category } from "../../types/product/Category";
import { ValidationError } from "../../classes/ErrorHandling";

export async function validateCategory(categoryData: Category): Promise<Category> {

    const trimmedTitle = categoryData.title.trim();
    const trimmedDescription = categoryData.description.trim();

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

    const safeTitle = trimmedTitle;
    const safeDescription = trimmedDescription;

    return { title: safeTitle, description: safeDescription };
};
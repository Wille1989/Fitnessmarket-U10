import { Category, CreateCategory } from "../../types/product/Category";


export async function validateCategory(frontendData: CreateCategory): Promise<Category> {

    if(frontendData.title.length >= 30) {
        throw new Error('Titeln är för lång, max 30 tecken');
    };

    if(frontendData.description.length >= 255) {
        throw new Error('beskrivningen får max innehålla 255 tecken');
    };

    const inputRegex = /^[a-zA-Z0-9\s]+$/;
    if(!inputRegex.test(frontendData.title || frontendData.description)){
        throw new Error('inputfält innehåller otillåtna tecken');
    };

    return frontendData;
}
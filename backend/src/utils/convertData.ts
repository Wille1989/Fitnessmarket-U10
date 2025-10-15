import { ObjectId } from "mongodb";
import { ValidationError } from "../classes/ErrorHandling";

export function convertStringToObjectId(data: string): ObjectId { 
    
    if(!data || !ObjectId.isValid(data)){
        throw new ValidationError('Valideringen misslyckades');
    };

    return new ObjectId(data);
};

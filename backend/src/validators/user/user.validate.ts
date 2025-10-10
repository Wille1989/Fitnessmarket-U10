import { CreateUser } from "../../types/user/User";
import { NotFoundError, ValidationError } from "../../classes/ErrorHandling"
import { ObjectId } from "mongodb";

export function validateUser(data: CreateUser): CreateUser {

    if(!data.email) {
        throw new NotFoundError('Ingen email är angiven');
    };

    if(!data.password) {
        throw new NotFoundError('Inget lösenord angivet');
    };

    function sanitizedInput(value: string): string {
        return value.replace(/<[^>]*>?/gm,'').trim();
    };

    const cleanEmail = sanitizedInput(data.email).toLowerCase();
    const cleanPassword = sanitizedInput(data.password);

    if(!cleanEmail){
        throw new ValidationError('Email innhöll otillåtna tecken');
    };

    if(!cleanPassword) {
        throw new ValidationError('lösenordet innehöll otillåtna tecken');
    };

    // Check for valid email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!emailRegex.test(cleanEmail)) {
        throw new ValidationError('Epostadressen måste vara skriven i ett giltigt format');
    };

    if(cleanPassword.length < 8) {
        throw new ValidationError('Lösenordet är för kort');
    };

    return {
        ...data,
        email: cleanEmail,
        password: cleanPassword
    };
};

export function validateUserId(data: string): ObjectId {

    if(!data || !ObjectId.isValid(data)){
        console.log('ERROR THROWN: VALIDATE USER ID');
        throw new ValidationError('Valideringen misslyckades');
    };

    return new ObjectId(data);
};
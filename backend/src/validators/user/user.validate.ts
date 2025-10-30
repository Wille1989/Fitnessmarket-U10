import { CreateUser, UpdateUser } from "../../types/user/User";
import { NotFoundError, ValidationError } from "../../classes/ErrorHandling"

export async function validateUser(data: CreateUser): Promise<CreateUser> {

    if(!data.email) {
        throw new NotFoundError('Ingen email är angiven');
    };

    if(!data.password) {
        throw new NotFoundError('Inget lösenord angivet');
    };

    function sanitizeEmail(value: string): string {
        return value.replace(/<[^>]*>?/gm, '').trim().toLowerCase();
    };

    function sanitizePassword(value: string): string {
        return value.trim();
    };

    const cleanEmail = sanitizeEmail(data.email);
    const cleanPassword = sanitizePassword(data.password);

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

export function validateUserUpdate(data: UpdateUser): UpdateUser {
    
        function sanitizedInput(value: string): string {
        return value.replace(/<[^>]*>?/gm,'').trim();
    };

    const updated: Partial<UpdateUser> = {};

    if(data.email !== undefined){
        const safeEmail = sanitizedInput(data.email).toLowerCase();

        if(!safeEmail) {
            throw new ValidationError('Email innehöll otillåtna tecken');
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!emailRegex.test(safeEmail)) {
            throw new ValidationError('Epostadressen måste vara skriven i ett giltigt format');     
        };

        updated.email = safeEmail;

    };

    if(data.password !== undefined){
        const safePassword = sanitizedInput(data.password);

        if(!safePassword) {
            throw new ValidationError('lösenordet innehöll otillåtna tecken');
        };
    
        if(safePassword.length < 8) {
            throw new ValidationError('Lösenordet är för kort');
        };

        updated.password = safePassword;
  
    }

    if(data.name !== undefined){
        const safeName = sanitizedInput(data.name);

        const inputRegex = /^[a-öA-Ö0-9\s]+$/;
        if(!inputRegex.test(safeName)){
            throw new ValidationError('namnet innehåller otillåtna tecken');
        };

        if(!safeName) {
            throw new ValidationError('Värdet för namnet kan ej hittas');
        };

        if(safeName.length > 20){
            throw new ValidationError('Namnet får max innehålla 20 tecken');
        };

        updated.name = safeName;
    }

    return {
        ...data,
        email: updated.email,
        password: updated.password,
        name: updated.name
    };
};
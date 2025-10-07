import { CreateUser } from "../../types/user/User";
import { ValidationError } from "../../classes/ErrorHandling"

export function validateUser(data: CreateUser): CreateUser {

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
    }
};

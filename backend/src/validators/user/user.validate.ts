import { CreateUser } from "../../types/user/User";

export function validateUser(data: CreateUser): CreateUser {

    // Check to see that all input fields have values
    if(Object.values(data).some(value => !value)) {
            throw new Error('Alla fält måste vara ifyllda!');
        };

    // Check for value in email input
    if(!data.email) {
        throw new Error('emailfältet är tomt');
    };

    // Check for value in password input
    if(!data.password) {
        throw new Error('lösenordsfältet är tomt');
    };

    // Check for valid email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!emailRegex.test(data.email)) {
        throw new Error('Epostadressen måste vara skriven i ett giltigt format');
    };

    if(data.password.length < 8) {
        throw new Error('Lösenordet är för kort');
    };

    // trim and lowercase to check in next step
    const lowerCaseTrimmedEmail = data.email.trim().toLowerCase();

    return {
        ...data,
        email: lowerCaseTrimmedEmail,

    }

};

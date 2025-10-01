import { CreateUser } from "../../types/user/User";

export function validateUser(data: CreateUser): void {

    // Check for password+email
    if(!data.email || !data.password) {
        throw new Error('Obligastoriska fält är tomma');
    };

    // Check for valid email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!emailRegex.test(data.email)) {
        throw new Error('Epostadressen måste vara skriven i ett giltigt format');
    };

    if(data.password.length < 8) {
        throw new Error('Lösenordet är för kort');
    };

};

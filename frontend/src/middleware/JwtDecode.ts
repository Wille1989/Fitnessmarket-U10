import { jwtDecode } from "jwt-decode";
import type { AuthTokenPayload } from "../types/User/UserAuth";

export function getDecodedToken(): AuthTokenPayload | null {

    const token = localStorage.getItem('token');
    console.log("Token i localStorage:", token);

    if(!token) { return null; }

    try {
        const decoded = jwtDecode<AuthTokenPayload>(token);
        return decoded;
    } catch (error) {
        console.error('Ogiltig token:', error);
        return null
    }
}
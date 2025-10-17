import type { LoginData } from "../types/User/UserAuth";
import type { User } from "../types/User/User";
import { authApi } from "../api/authApi";
import { useMessage } from "../context/MessageProvider";
import { useState } from "react";

export function useAuth() {

    const { setSuccessMessage, setErrorMessage} = useMessage();
    const [user, setUser] = useState<User| null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    // LOGIN
    async function login(data: LoginData) {
        try {
            setLoading(true);

            const result = await authApi.login(data);

            localStorage.setItem('token', result.data.token);
            
            setSuccessMessage('Du har loggats in!');
            setTimeout(() => setUser(result.data.user), 1500);
            return true;
            
        } catch (error) {
            setErrorMessage('Fel användarnamn eller lösenord');
            setTimeout(() => setErrorMessage(null), 3000);
            return false;

        } finally {
            setLoading(false);
        }
    }

    // LOGOUT
    async function logout(): Promise<boolean | void> {
        
        try {
            setLoading(true);

            const hadToken = localStorage.getItem('token');
            if(hadToken) {
                await authApi.logout();  
                localStorage.removeItem('token'); 
            }                

            setSuccessMessage('Du loggas ut');
            setTimeout(() => setUser(null), 800);
            return true;

        } catch (error) {
            setErrorMessage('Användaren kunde inte loggas ut');
            setTimeout(() => setErrorMessage(null), 1500);
            return false;
            
        } finally {
            setLoading(false);
        } 
    }
    return { login, logout, loading, user, setUser }

}
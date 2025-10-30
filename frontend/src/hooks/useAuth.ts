import type { LoginData } from "../types/User/UserAuth";
import type { User } from "../types/User/User";
import { authApi } from "../api/authApi";
import { useMessage } from "../context/MessageProvider";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getDecodedToken } from "../middleware/JwtDecode";

export function useAuth() {

    const {setErrorMessage,setSuccessMessage} = useMessage();
    const [user, setUser] = useState<User| null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const navigate = useNavigate();

    // LOGIN
    async function login(data: LoginData): Promise<User | null> {
        try {
            setLoading(true);

            const result = await authApi.login(data);
            localStorage.setItem('token', result.data.token);

            if(result) {
                const decoded = getDecodedToken();     
                setUser(result.data.user);

                if(!decoded) {
                    throw new Error('Kunde inte avläsa token');
                }

                if(decoded.role === 'customer'){
                    setSuccessMessage('Du loggas in!');
                    setTimeout(() => setSuccessMessage(null), 1500);
                    navigate('/')
                    navigate(0);

                } else if (decoded.role === 'admin'){
                    setSuccessMessage('Du loggas in!');
                    setTimeout(() => setSuccessMessage(null), 1500);
                    navigate('/')
                    navigate(0);

                } else if(decoded.role === 'sales'){
                    setSuccessMessage('Du loggas in!');
                    setTimeout(() => setSuccessMessage(null), 1500);
                    navigate('/')
                    navigate(0);
                }
            }

            return result.data.user;

        } catch (error: any) {
            console.error(error);
            const message: string = error.response?.data?.message || error.message || 'Oväntat fel';
            setErrorMessage(message);
            setTimeout(() => setErrorMessage(null), 2000);
            return null;

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

            setSuccessMessage('Du loggades ut');
            setTimeout(() => setSuccessMessage(null), 800);
            
            setUser(null);
            return true;

        } catch (error: any) {
            console.error(error);
            const message: string = error?.message || 'Oväntat fel';
            setErrorMessage(message);
            setTimeout(() => setErrorMessage(null), 1500);
            
        } finally {
            setLoading(false);
        } 
    }
    return { login, logout, loading, user }

}
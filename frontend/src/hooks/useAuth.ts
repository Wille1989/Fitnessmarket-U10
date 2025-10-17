import type { LoginData } from "../types/User/UserAuth";
import type { User } from "../types/User/User";
import { authApi } from "../api/authApi";
import { useAsyncState } from "./custom hooks/useAsyncState";

export function useAuth() {
    const { 
        data: user, setData: setUser, 
        loading, setLoading,
        errorMessage, setErrorMessage, 
        successMessage, setSuccessMessage,
        resetState } 
        = useAsyncState<User>();

        // LOGIN
        async function login(data: LoginData) {
            try {
                setLoading(true);

                const result = await authApi.login(data);

                localStorage.setItem('token', result.data.token);
                setUser(result.data.user);

                setSuccessMessage('Du har loggats in!');
                setTimeout(() => resetState(), 1500);
                return true;
                
            } catch (error) {
                setErrorMessage('Fel användarnamn eller lösenord');
                setTimeout(() => resetState(), 3000);
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
                console.log(hadToken);
                if(hadToken) {
                    localStorage.removeItem('token'); 
                    await authApi.logout();          
                }
                    console.log('FÖRE SETUSER NULL:',setUser);
                    setUser(null);
                    console.log('EFTER SETUSER NULL',setUser);

                    setSuccessMessage('Du loggas ut');
                    console.log(setSuccessMessage);
                    
                    resetState();
                    return true;

            } catch (error) {
                setErrorMessage('Användaren kunde inte loggas ut');
                setTimeout(() => resetState(), 3000);
                return false;

            } finally {
                setLoading(false);
            } 
    }
    return { user, loading, login, logout, successMessage, errorMessage }

}
import type { LoginData } from "../types/User/UserAuth";
import type { User } from "../types/User/User";
import { authApi } from "../api/authApi";
import { useAsyncState } from "./custom hooks/useAsyncState";

export function useAuth() {
    const { 
        data: user, setData: setUser, 
        loading, setLoading,
        errorMessage, setErrorMessage, 
        successMessage, setSuccessMessage } 
        = useAsyncState<User>();

        async function login(data: LoginData) {
            try {
                setLoading(true);

                const result = await authApi.login(data);
                localStorage.setItem('token', result.token);

                setUser(result.user);
                setSuccessMessage('Du har loggats in!');

            } catch (error) {
                setErrorMessage('Fel användarnamn eller lösenord');

            } finally {
                setLoading(false);
            }
        }

        async function logout() {
            
            try {
                setLoading(true);

                await authApi.logout();
                localStorage.removeItem('token');

                setUser(null);
                setSuccessMessage('Du har loggats ut');

            } catch (error) {
                setErrorMessage('Användaren kunde inte loggas ut');

            } finally {
                setLoading(false);
            }    
    }
    return { user, loading, login, logout, successMessage, errorMessage }

}
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

                await new Promise((resolve) => setTimeout(resolve, 1500));

                setUser(result.user);
                setSuccessMessage('Du har loggats in!');
                return true;

            } catch (error) {
                setErrorMessage('Fel användarnamn eller lösenord');
                return false;

            } finally {
                setLoading(false);
            }
        }

        async function logout() {
            
            try {
                setLoading(true);

                await authApi.logout();
                localStorage.removeItem('token');

                await new Promise((resolve) => setTimeout(resolve, 1500));

                setUser(null);
                setSuccessMessage('Du har loggats ut');
                return true;

            } catch (error) {
                setErrorMessage('Användaren kunde inte loggas ut');
                return false;

            } finally {
                setLoading(false);
            } 
    }
    return { user, loading, login, logout, successMessage, errorMessage }

}
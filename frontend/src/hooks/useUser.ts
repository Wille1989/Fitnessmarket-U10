import { userApi } from "../api/userApi";
import { useAsyncState } from "./custom hooks/useAsyncState";
import type { User, CreateUser } from "../types/User/User";

export function useUser() {
    const 
    {
        data: user, setData: setUser, 
        loading, setLoading,
        errorMessage, setErrorMessage, 
        successMessage, setSuccessMessage } 
        = useAsyncState<User>();

    async function register(user: CreateUser) {
        try {
            setLoading(true);
            const response = await userApi.register(user);

            setUser(response);
            setSuccessMessage('Ditt konto har skapats!');
            return true;
            
        } catch (error) {
            setErrorMessage('Det gick inte att skapa ditt konto, vänligen försök igen');
            return false;

        } finally {
            setLoading(false);
        }

    }

    return { user, loading, errorMessage, successMessage, register };
        
}
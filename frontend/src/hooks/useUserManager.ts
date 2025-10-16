import { userApi } from "../api/userApi";
import { useAsyncState } from "./custom hooks/useAsyncState";
import type { User, CreateUser } from "../types/User/User";

export function useUserManager() {
    const 
    {
        data: user, setData: setUser, 
        loading, setLoading,
        errorMessage, setErrorMessage, 
        successMessage, setSuccessMessage,
        resetState } 
        = useAsyncState<User>();
    
    // REGISTER
    async function register(user: CreateUser) {
        try {
            setLoading(true);

            if(!user.email.includes('@')) {
                setErrorMessage('Ogiltig e-post');
            }

            if(user.password.length < 8){
                setErrorMessage('Lösenordet är för kort');
            }

            const response = await userApi.register(user);
            
            if(!response || !response.email) {
                throw new Error('Svaret från servern ogillades');
            }

            setUser(response);

            setSuccessMessage('Ditt konto har skapats!');
            setTimeout(() => resetState(), 1500);
            return true;
            
        } catch (error) {
            setErrorMessage('Det gick inte att skapa ditt konto, vänligen försök igen');
            setTimeout(() => resetState(), 3000);
            return false;

        } finally {
            setLoading(false);
        }

    }

    // DELETE OWN ACCOUNT
    async function deleteOwnAccount() {
        try {

            setLoading(true);

            await userApi.deleteOwnAccount();
            const hadToken = localStorage.getItem('token');
            localStorage.removeItem('token');

            if(hadToken) {

                setSuccessMessage('Du loggas ut och ditt konto tas bort');
                await new Promise((resolve) => setTimeout(resolve, 1500));

                resetState();
                return true;
            }

        } catch (error) {
            setErrorMessage('Kunde inte ta bort kontot');
            setTimeout(() => resetState(),3000);
            return false;
        } finally {
            setLoading(false);
        }
    }

    return { user, loading, errorMessage, successMessage, register, deleteOwnAccount };
        
}
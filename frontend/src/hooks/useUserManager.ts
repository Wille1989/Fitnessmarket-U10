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
        resetState } = useAsyncState<User>();
    
    // REGISTER NEW ACCOUNT
    async function register(user: CreateUser) {
        try {
            setLoading(true);

            if(!user.email.includes('@')) {
                setErrorMessage('Ogiltig e-post');
            }

            if(user.password.length < 8){
                setErrorMessage('Lösenordet är för kort');
            }

            const newUser = await userApi.register(user);
            
            if(!newUser || !newUser.email) {
                throw new Error('Svaret från servern ogillades');
            }

            setUser(newUser);

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

    // SHOW OWN ACCOUNT
    async function showMyAccount() {

        try {
            setLoading(true);

            const userData = await userApi.showMyAccount();

            if(userData) {
                setUser(userData);

                setSuccessMessage('Ditt ID hämtas');
                await new Promise((resolve) => setTimeout(resolve, 1500));

                resetState();
                return true;
            }

        } catch (error) {

            setErrorMessage('Det gick inte att hämta användaren');
            setTimeout(resetState, 1500);
            return false;

        } finally {
            setLoading(false);

        }
    }

    // UPDATE OWN ACCOUNT
    async function updateMyAccount(data: User) {
        try {
            setLoading(true);
            
            const userData = await userApi.updateMyAccount(data);

            if(userData) {
                setUser(userData);

                setSuccessMessage('Dina uppgifter har uppdaterats');
                await new Promise((resolve) => setTimeout(resolve, 1500));

                resetState();
                return true;

            }
        } catch (error) {
            setErrorMessage('Det gick inte att uppdatera användaren');
            setTimeout(resetState, 1500);
            return false;
        } finally {
            setLoading(false);
        }

    }



    return { 
        user, 
        loading, 
        errorMessage, 
        successMessage, 
        register, 
        deleteOwnAccount, 
        showMyAccount,
        updateMyAccount };
}
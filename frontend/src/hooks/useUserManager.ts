import { userApi } from "../api/userApi";
import { useMessage } from "../context/MessageProvider";
import type { User, CreateUser } from "../types/User/User";
import { useState } from "react";

export function useUserManager() {
    const { setErrorMessage, setSuccessMessage, } = useMessage();
    const [loading, setLoading] = useState<boolean>(false);
    const [theUser, setTheUser] = useState<User |null>(null);
 
    // REGISTER NEW ACCOUNT
    async function register(theUser: CreateUser) {
        try {
            setLoading(true);

            if(!theUser.email.includes('@')) {
                setErrorMessage('Ogiltig e-post');
            }

            if(theUser.password.length < 8){
                setErrorMessage('Lösenordet är för kort');
            }

            const newUser = await userApi.register(theUser);
            
            if(!newUser || !newUser.email) {
                throw new Error('Svaret från servern ogillades');
            }

            setTheUser(newUser);

            setSuccessMessage('Ditt konto har skapats!');
            setTimeout(() => setTheUser(null), 1500);
            return true;
            
        } catch (error) {
            setErrorMessage('Det gick inte att skapa ditt konto, vänligen försök igen');
            setTimeout(() => setErrorMessage(null), 3000);
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

                setTheUser(null);
                return true;
            }

        } catch (error) {
            setErrorMessage('Kunde inte ta bort kontot');
            setTimeout(() => setErrorMessage(null),3000);
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
            setTheUser(userData);

            setSuccessMessage('Ditt ID hämtas');
            await new Promise((resolve) => setTimeout(resolve, 1500));

            setTheUser(null);
            return true;
            
        } catch (error) {
            setErrorMessage('Det gick inte att hämta användaren');
            setTimeout(() => setErrorMessage(null), 1500);
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
            setTheUser(userData);

            setSuccessMessage('Dina uppgifter har uppdaterats');
            await new Promise((resolve) => setTimeout(resolve, 1500));

            setTheUser(null);
            return true;
            
        } catch (error) {
            setErrorMessage('Det gick inte att uppdatera användaren');
            setTimeout(() => setErrorMessage(null), 1500);
            return false;

        } finally {
            setLoading(false);
        }

    }

    return { 
        theUser, 
        loading, 
        register, 
        deleteOwnAccount, 
        showMyAccount,
        updateMyAccount };
}
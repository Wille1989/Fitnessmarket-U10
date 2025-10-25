import { userApi } from "../api/userApi";
import { useMessage } from "../context/MessageProvider";
import type { User, CreateUser } from "../types/User/User";
import { useCallback, useState} from "react";

export function useUserManager() {
    const { setErrorMessage, setSuccessMessage } = useMessage();
    const [loading, setLoading] = useState<boolean>(false);
    const [userAccount, setUserAccount] = useState<User |null>(null);

    // REGISTER NEW ACCOUNT
    async function register(user: CreateUser) {
        try {
            setLoading(true);

            if(!user.email.includes('@')) {
                throw new Error('Ogiltig e-post');
            }

            if(user.password.length < 8){
                throw new Error('Lösenordet är för kort');
            }

            const newUser = await userApi.register(user);

            return newUser;
            
        } catch (error: any) {
            console.error('Register error:', error);

            const message: string = error?.message || 'ett oväntat fel uppstod';
 
            setErrorMessage(message);

            setTimeout(() => {
                setUserAccount(null),
                setErrorMessage(null)
            }, 1500);

            return null;

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

                setUserAccount(null);
                return true;
            }

        } catch (error: any) {
            console.error('DELETE ACCOUNT:', error);

            const message: string = error?.message || 'Oväntat fel';

            setErrorMessage(message);
            
            return false;
            
        } finally {
            setLoading(false);
        }
    }

    // SHOW OWN ACCOUNT
    const showMyAccount = useCallback(async () => {

        try {
            setLoading(true);

            const myUser = await userApi.showMyAccount();

            setUserAccount(myUser);
        } catch (error: any) {
            console.error('SHOW MY ACCOUNT', error);

            const message: string = error?.message || 'Oväntat fel';

            setErrorMessage(message);

        } finally {
            setLoading(false);
        }
    }, []) 

    return { 
        userAccount, 
        loading, 
        register, 
        deleteOwnAccount, 
        showMyAccount,
        };
}
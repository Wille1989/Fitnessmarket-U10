import { useAsyncState } from "./custom hooks/useAsyncState";
import type { User } from "../types/User/User";
import { userApi } from "../api/userApi";

export function useAdminMangagement() {
    const { 
            data: theUser, setData: setTheUser, 
            loading, setLoading,
            errorMessage, setErrorMessage, 
            successMessage, setSuccessMessage,
            resetState } 
            = useAsyncState<User>();

    async function deleteUserAccount(theUser: User) {
        try {
            setLoading(true);
            
            const hadToken = localStorage.getItem('token');
            if(hadToken) {
                localStorage.removeItem('token');
            }
            await userApi.deleteUserAccount(theUser);

            setTheUser(null);
            setSuccessMessage('Användaren har tagits bort');
            await new Promise((resolve) => setTimeout(resolve,1500));

            resetState();
            return true;
            
        } catch (error) {
            setErrorMessage('Det gick inte att radera användaren');
            setTimeout(() => resetState(), 1500);

            return false;

        } finally {
            setLoading(false);
        }
    }

    return { deleteUserAccount, theUser, errorMessage, loading, successMessage }
}
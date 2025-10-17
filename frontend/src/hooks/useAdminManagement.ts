import { useAsyncState } from "./custom hooks/useAsyncState";
import type { User } from "../types/User/User";
import { adminApi } from "../api/adminApi";
import { useState } from "react";

export function useAdminMangagement() {
    const { 
            data: userAccount , setData: setUserAccount, loading, setLoading,
            errorMessage, setErrorMessage, successMessage, setSuccessMessage,
            resetState } = useAsyncState<User>();

            const [arrayError, setArrayError] = useState<string | null>(null);
            const [userList, setUserList] = useState<User[] | null>(null);

    // DELETE A USER ACCOUNT
    async function deleteUserAccount(userAccount: User) {
        try {
            setLoading(true);
            
            const hadToken = localStorage.getItem('token');
            if(hadToken) {
                localStorage.removeItem('token');
            }
            await adminApi.deleteUserAccount(userAccount);

            setUserAccount(null);
            setSuccessMessage('Användaren har tagits bort');
            await new Promise((resolve) => setTimeout(resolve,800));

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

    // UPDATE A USER ACCOUNT (NOT OWN)
    async function updateUserAccount(userAccount: User) {
        try {
            setLoading(true);

            const userData = await adminApi.updateUserAccount(userAccount);
            setUserAccount(userData);

            setSuccessMessage('Användaren har uppdaterats!');
            await new Promise((resolve) => setTimeout(resolve, 800));

            resetState();
            return true;
            
        } catch (error) {
            setErrorMessage('Användarens uppgifter kunde inte ändras');
            setTimeout(resetState, 1500);
            return false;
        } finally { 
            setLoading(false);
        }
    }

    // GET ALL USERS FROM DATABASE
    async function getUsersList() {
        try {
            setLoading(true);

            const userList = await adminApi.getUsersList();

            if(!Array.isArray(userList) || userList.length === 0){
                setArrayError('Listan med användare kunde inte hämtas');
                return;
            }
            
            setUserList(userList);

            setSuccessMessage(`${userList.length} användare retuneras`);
            await new Promise((resolve) => setTimeout(resolve, 800));

            resetState();
            return true;

        } catch (error) {
            setErrorMessage('Det gick inte att hämta listan');
            setTimeout(resetState, 1500);
            return false;

        } finally {
            setLoading(false);

        }
    }

    return { 
        userAccount, 
        errorMessage, 
        loading, 
        successMessage,
        arrayError,
        userList,
        deleteUserAccount,
        updateUserAccount,
        getUsersList
            }
}
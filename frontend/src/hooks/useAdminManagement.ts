import type { User } from "../types/User/User";
import { adminApi } from "../api/adminApi";
import { useState } from "react";
import { useMessage } from "../context/MessageProvider";

export function useAdminMangagement() {
    const { setSuccessMessage, setErrorMessage, 
            setArrayErrorMessage, setArraySuccessMessage } = useMessage();
    const [userAccount, setUserAccount] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
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

            setSuccessMessage('Användaren har tagits bort');
            setTimeout(() => setUserAccount(null), 1500);
            return true;
            
        } catch (error) {
            setErrorMessage('Det gick inte att radera användaren');
            setTimeout(() => setErrorMessage(null), 3000);
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

            setArraySuccessMessage('Användaren har uppdaterats!');
            setTimeout(() => setUserAccount(null), 1000);
            return true;
            
        } catch (error) {
            setErrorMessage('Användarens uppgifter kunde inte ändras');
            setTimeout(() => setErrorMessage(null), 1500);
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
                setArrayErrorMessage('Listan med användare kunde inte hämtas');
                return;
            }
            
            setUserList(userList);

            setTimeout(() => {
                setSuccessMessage(`${userList.length} användare retuneras`);
                setUserList(null);
            }, 1000);

            return true;

        } catch (error) {
            setErrorMessage('Det gick inte att hämta listan');
            setTimeout(() => setErrorMessage(null), 3000);
            return false;

        } finally {
            setLoading(false);

        }
    }

    return { 
        userAccount,  
        loading,
        userList,
        deleteUserAccount,
        updateUserAccount,
        getUsersList
        }
}
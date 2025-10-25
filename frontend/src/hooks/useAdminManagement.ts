import type { UpdateUser, User, CreateUser } from "../types/User/User";
import { adminApi } from "../api/adminApi";
import { useState } from "react";
import { useMessage } from "../context/MessageProvider";
import { useCallback } from "react";

export function useAdminMangement() {
    const { setSuccessMessage, setErrorMessage, 
            setArrayErrorMessage } = useMessage();
    const [userAccount, setUserAccount] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [userList, setUserList] = useState<User[] | null>(null);

    // DELETE A USER ACCOUNT
    async function deleteUserAccount(id: string) {
        try {
            setLoading(true);
            console.log(id, typeof id);
            
            await adminApi.deleteUserAccount(id);

            setTimeout(() => setUserAccount(null), 1500);

            return true;
            
        } catch (error) {

            return false;

        } finally {
            setLoading(false);
        }
    }

    // UPDATE A USER ACCOUNT (NOT OWN)
    async function updateUserAccount(userAccount: UpdateUser) {
        try {
            setLoading(true);

            const userData = await adminApi.updateUserAccount(userAccount);

            setUserAccount(userData);

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
            setSuccessMessage(`${userList.length} användare retuneras`);
            setTimeout(() => setSuccessMessage(null), 800);
            return true;

        } catch (error) {
            setErrorMessage('Det gick inte att hämta listan');
            setTimeout(() => setErrorMessage(null), 3000);
            return false;

        } finally {
            setLoading(false);

        }
    }

    const showUserAccount = useCallback(async (id: string): Promise<User> => {

        try {
            setLoading(true);

            const userAccount = await adminApi.showUserAccount(id)

            setUserAccount(userAccount);

            setSuccessMessage('Användaren hämtad!');
            setTimeout(() => {
                setSuccessMessage(null);
            }, 1500);
            
            return userAccount;
            
        } catch (error) {
            setErrorMessage('Kunde inte hämta användare');
            setTimeout(() => setErrorMessage(null), 1500);
            throw error;
        } finally {
            setLoading(false);
        }
    },[]);

    async function createUserAccount(userAccount: CreateUser): Promise<User | null> {

        try {
            setLoading(true);

            const response = await adminApi.createUserAccount(userAccount)

            if(!response) {
                console.error(response, typeof response);
                throw new Error('Svaret ogillades');
            }

            setUserAccount(response);

            return response;

        } catch (error: any) { // Kolla upp om det går att arbeta sig runt för att slippa en ANY type
            console.error('REGISTER ERROR:', error);

            const message: string = error?.message || 'ett oväntat fel uppstod';

            setErrorMessage(message);

            return null;
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
        showUserAccount,
        getUsersList,
        createUserAccount
        }
}
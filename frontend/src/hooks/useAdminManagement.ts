import type { UpdateUser, User, CreateUser } from "../types/User/User";
import { adminApi } from "../api/adminApi";
import { useState } from "react";
import { useMessage } from "../context/MessageProvider";
import { useCallback } from "react";
import type { Order } from "../types/Order/Order";

export function useAdminMangement() {
    const { setSuccessMessage, setErrorMessage, 
            setArrayErrorMessage } = useMessage();
    const [userAccount, setUserAccount] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [userList, setUserList] = useState<User[] | null>(null);
    const [customerOrder, setCustomerOrder] = useState<Order[]>([])

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

    async function createUserAccount(userAccount: CreateUser, confirmPassword: string): Promise<User | null> {

        try {
            setLoading(true);

            if(!userAccount.email.includes('@')){
                throw new Error('Email är skriven i ett felaktigt format')
            }

            if(userAccount.password.length < 8) {
                throw new Error('Lösenordet är för kort');
            }

            if(userAccount.password !== confirmPassword) {
                throw new Error('Lösenorden matachar inte')
            }

            setSuccessMessage('Användaren har skapats!');
            setTimeout(() => setSuccessMessage(null), 1500);

            const response = await adminApi.createUserAccount(userAccount)
            setUserAccount(response);

            return response;

        } catch (error: any) {
            console.error(error);
            const message: string = error.response?.data?.message || 
            error.message || 'Oväntat fel';

            setErrorMessage(message);
            setTimeout(() => setErrorMessage(null), 2000);
            return null;
        } finally {
            setLoading(false);
        }

    }

    const indexCustomerOrder = useCallback(async(id: string): Promise<Order[] | null> => {

        try {
            setLoading(true);

            const result = await adminApi.index(id);

            if(!result) {
                throw new Error('Inga ordrar hittades');
            }

            setCustomerOrder(result);
            return result;

        } catch (error: any) {
            console.error(error);
            const message: string = error?.message || 'Oväntat fel'
            setErrorMessage(message);
            return null;
        } finally {
            setLoading(false);
        }

    }, [setErrorMessage, setLoading])

    return { 
        userAccount,  
        loading,
        userList,
        customerOrder,
        deleteUserAccount,
        updateUserAccount,
        showUserAccount,
        getUsersList,
        createUserAccount,
        indexCustomerOrder
        }
}
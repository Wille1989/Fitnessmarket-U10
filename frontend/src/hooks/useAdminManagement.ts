import type { UpdateUser, User, CreateUser } from "../types/User/User";
import { adminApi } from "../api/adminApi";
import { useState } from "react";
import { useMessage } from "../context/MessageProvider";
import { useCallback } from "react";
import type { Order } from "../types/Order/Order";

export function useAdminManagement() {
    const { setSuccessMessage, setErrorMessage } = useMessage();
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
            
        } catch (error: any) {
            console.error(error);
            const message: string = error.response?.data?.message || error.message || 'Oväntat fel';
            setErrorMessage(message);
            setTimeout(() => setErrorMessage(null), 2000);
            return null;

        } finally {
            setLoading(false);
        }
    }

    // UPDATE A USER ACCOUNT (NOT OWN)
    async function updateUserAccount(userAccount: UpdateUser) {
        try {
            setLoading(true);

            if(!userAccount.name){
                throw new Error('Kunden måste ha ett namn');
            }

            if(!userAccount.email) {
                throw new Error('Email adress måste finnas');
            }

            if(!userAccount.email.includes('@')) {
                throw new Error('Email adress måste vara giltig');
            }

            const userData = await adminApi.updateUserAccount(userAccount);

            setUserAccount(userData);
            return true;
            
        } catch (error: any) {
            console.error(error);
            const message: string = error.response?.data?.message || error.message || 'Oväntat fel';
            setErrorMessage(message);
            setTimeout(() => setErrorMessage(null), 2000);
            return null;
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
                throw new Error('Listan med användare kunde inte hämtas');
            }

            setUserList(userList);
            return true;

        } catch (error: any) {
            console.error(error);
            const message: string = error.response?.data?.message || error.message || 'Oväntat fel';
            setErrorMessage(message);
            setTimeout(() => setErrorMessage(null), 2000);
            return null;
        } finally {
            setLoading(false);

        }
    }

    const showUserAccount = useCallback(async (id: string): Promise<User | null> => {

        try {
            setLoading(true);

            const userAccount = await adminApi.showUserAccount(id)

            setUserAccount(userAccount);

            return userAccount;
            
        } catch (error: any) {
            console.error(error);
            const message: string = error.response?.data?.message || error.message || 'Oväntat fel';
            setErrorMessage(message);
            setTimeout(() => setErrorMessage(null), 2000);
            return null;
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
            const message: string = error.response?.data?.message || error.message || 'Oväntat fel';
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

            if(!Object.keys(id)) {
                throw new Error('ID är inte korrekt');
            }

            const result = await adminApi.index(id);

            if(!result) {
                throw new Error('Inga ordrar hittades');
            }

            setCustomerOrder(result);
            return result;

        } catch (error: any) {
            console.error(error);

            if(error.response && error.response.status === 404) {
                setErrorMessage('Inga ordrar hittades för denna kund');
            }
            const message: string = error.response?.data?.message || error.message || 'Oväntat fel';
            setErrorMessage(message);
            setTimeout(() => setErrorMessage(null), 2000);
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
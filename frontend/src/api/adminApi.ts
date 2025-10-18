import { api } from "./axios";
import type { User } from "../types/User/User";

export const adminApi = {
    deleteUserAccount: async (data: User): Promise<void> => {
        const result = await api.delete('/user/delete', { data });

        return result.data;
    },


    updateUserAccount: async(data: User): Promise<User> => {
        const result = await api.patch('/update/userAccount', data);

        return result.data;
    },

    getUsersList: async(): Promise<User[]> => {
        const result = await api.get('/user/all')

        console.log('FRONTEND HANTERING:', result.data);

        return result.data;
    },
}


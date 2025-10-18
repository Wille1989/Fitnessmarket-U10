import { api } from "./axios";
import type { User } from "../types/User/User";

export const adminApi = {
    deleteUserAccount: async (data: User): Promise<void> => {
        const result = await api.delete('/user/delete', { data });
        return result.data.data;
    },

    updateUserAccount: async(data: User): Promise<User> => {
        const result = await api.patch('/update/userAccount', data);
        return result.data.data;
    },

    getUsersList: async(): Promise<User[]> => {
        const result = await api.get('/user/all')
        return result.data.data;
    },

    showUserAccount: async(id: string): Promise<User> => {
        const result = await api.get(`/admin/show/${id}`)

        return result.data.data;
    }

}

import { api } from "./axios";
import type { CreateUser, UpdateUser, User } from "../types/User/User";

export const adminApi = {
    deleteUserAccount: async (id: string): Promise<void> => {
        const result = await api.delete(`/user/delete/${id}`);
        console.log(result.data.data);
        return result.data.data;
    },

    updateUserAccount: async(data: UpdateUser): Promise<User> => {
        const result = await api.patch('/user/admin/updateUserAccount', data);
        return result.data.data;
    },

    getUsersList: async(): Promise<User[]> => {
        const result = await api.get('/user/admin/all')
        return result.data.data;
    },

    showUserAccount: async(id: string): Promise<User> => {
        const result = await api.get(`/user/admin/show/${id}`)

        return result.data.data;
    },

    createUserAccount: async(data: CreateUser): Promise<User> => {

        const result = await api.post('/user/admin/register', data);
        console.log(result.data.data);
        return result.data.data;
    }

}

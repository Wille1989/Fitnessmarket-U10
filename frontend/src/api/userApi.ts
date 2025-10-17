import { api } from "./axios";
import type { User, CreateUser } from "../types/User/User";

export const userApi = {

    register: async (data: CreateUser): Promise<User> => {
        const result = await api.post<User>(`/auth/register`, data);

        return result.data;
    },

    deleteOwnAccount: async (): Promise<void> => {
        const result = await api.delete('/user/delete');

        return result.data;
    },

    showMyAccount: async(): Promise<User> => {
        const result = await api.get('/user/show')

        return result.data;
    },

     updateMyAccount: async(data: User): Promise<User> => {
        const result = await api.patch('/user/update/myAccount', data);

        return result.data;
    },

}
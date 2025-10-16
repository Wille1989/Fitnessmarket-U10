import { api } from "./axios";
import type { User, CreateUser } from "../types/User/User";

export const userApi = {

    register: async (data: CreateUser): Promise<User> => {
        const result = await api.post<User>(`/auth/register`, data);

        return result.data;
    },  

}
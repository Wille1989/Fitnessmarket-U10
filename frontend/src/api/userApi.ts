import { api } from "./axios";
import type { User, CreateUser } from "../types/User/User";

export const userApi = {

    registerProfile: async (data: CreateUser): Promise<User> => {
        const result = await api.post<User>(`/user/$id`, data);

        return result.data;
    },

    

}
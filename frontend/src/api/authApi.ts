import type { LoginResponse, LoginData } from "../types/User/UserAuth";
import { api } from "./axios";

export const authApi = {

    login: async (data: LoginData): Promise<LoginResponse> => {
        const response = await api.post<LoginResponse>('/auth/login', data);
        return response.data;
    },

    logout: async (): Promise<{ message: string }> => {
        const response = await api.get<{ message: string }>('/auth/logout');
        return response.data;
    }
    
}
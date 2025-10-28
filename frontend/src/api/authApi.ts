import type { LoginResponse, LoginData } from "../types/User/UserAuth";
import { api } from "./axios";

export const authApi = {

    login: async (data: LoginData): Promise<LoginResponse> => {
        const response = await api.post<LoginResponse>('/auth/login', data);
        const token = response.data.data.token;
        localStorage.setItem('token', token);
        
        return response.data;
    },

    logout: async (): Promise<{ value: boolean }> => {
        const response = await api.get<{ value: boolean }>('/auth/logout');

        return response.data;
    }
    
}
import axios from 'axios';

export const api = axios.create({
    baseURL: 'https://fitnessmarket-u10.onrender.com',
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 8000,
});

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');

        if(token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config;
    },

    (error) => Promise.reject(error)

);

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if(error.response?.status === 401) {
            localStorage.removeItem('token')
            window.location.href = '/auth-error'
        }
        return Promise.reject(error);
    }
)
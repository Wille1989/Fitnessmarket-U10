import axios from 'axios';

export const api = axios.create({
    baseURL: 'https://fitnessmarket-u10.onrender.com',
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 1000,
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
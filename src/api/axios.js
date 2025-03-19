import axios from 'axios';
import { refreshAccessToken } from '@/utils/authToken'; // Импортируем функцию для обновления токена

const api = axios.create({
    baseURL: 'https://refcool-app.ru/api', // Базовый URL для вашего бэкенда
});

// Интерцептор для обновления токена перед отправкой запроса
api.interceptors.request.use(
    async (config) => {
        let token = localStorage.getItem('token');

        // Проверяем, истёк ли токен
        if (isTokenExpired(token)) {
            token = await refreshAccessToken(); // Если истёк, обновляем токен
        }

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    },
);

// Проверка, истёк ли токен
const isTokenExpired = (token) => {
    if (!token) return true;
    const payload = JSON.parse(atob(token.split('.')[1]));
    return Date.now() >= payload.exp * 1000;
};

export default api;

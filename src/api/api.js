import axios from 'axios';
import { refreshAccessToken, isTokenExpired } from '@/utils/authToken';

let apiInstance = null;
let dispatch;
let logoutAction;

export const injectStore = (_dispatch, _logout) => {
    dispatch = _dispatch;
    logoutAction = _logout;
};

const createApiInstance = () => {
    const api = axios.create({
        baseURL: 'https://refcool-app.ru/api',
    });

    api.interceptors.request.use(
        async (config) => {
            console.log(
                'api: Interceptor: Request interceptor triggered. Method:',
                config.method,
                'URL:',
                config.url,
            );
            let token = localStorage.getItem('token');
            console.log('api: Interceptor: Token from localStorage:', token);
            if (isTokenExpired(token)) {
                console.log(
                    'api: Interceptor: Token expired. Attempting to refresh...',
                );
                token = await refreshAccessToken();
                if (!token) {
                    console.log(
                        'api: Interceptor: Failed to refresh token. Logging out.',
                    );
                    dispatch(logoutAction()); // Используем logoutAction
                    return config; // Возвращаем config, чтобы прервать запрос
                }
            }
            if (token) {
                console.log(
                    'api: Interceptor: Attaching token to request:',
                    token,
                );
                config.headers['Authorization'] = `Bearer ${token}`;
            }
            return config;
        },
        (error) => {
            console.error(
                'api: Interceptor: Request interceptor error:',
                error,
            );
            return Promise.reject(error);
        },
    );

    api.interceptors.response.use(
        (response) => {
            console.log(
                'api: Interceptor: Response interceptor triggered. Status:',
                response.status,
            );
            return response;
        },
        (error) => {
            console.error(
                'api: Interceptor: Response interceptor error:',
                error,
            );
            if (error.response && error.response.status === 403) {
                console.error('api: Interceptor: 403 FORBIDDEN. Logging out.');
                dispatch(logoutAction()); // Используем logoutAction
            }
            return Promise.reject(error);
        },
    );
    return api;
};

const getApi = () => {
    if (!apiInstance) {
        apiInstance = createApiInstance();
    }
    return apiInstance;
};

export default getApi;

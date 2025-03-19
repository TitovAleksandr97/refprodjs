import getApi from '@/api/api';
import { login, logout } from '@/store/slices/authSlice';
import { isTokenExpired } from '@/utils/authToken';

export const initializeAuth = async (dispatch) => {
    const storedToken = localStorage.getItem('token');
    const api = getApi();
    console.log(
        'authService: initializeAuth: Token from localStorage:',
        storedToken,
    );
    if (storedToken) {
        console.log(
            'authService: initializeAuth: Token found, checking if expired...',
        );
        api.get('/user/me') // Используем api
            .then((response) => {
                console.log('response', response);
                //Проверяем, что role есть
                if (response.data && response.data.role) {
                    dispatch(
                        login({
                            token: storedToken,
                            role: response.data.role,
                        }),
                    );
                } else {
                    dispatch(logout()); // Если role нет, то разлогиниваем
                }
            })
            .catch((error) => {
                dispatch(logout()); // Если запрос не удался, разлогиниваем
                console.error('Ошибка при получении роли:', error);
            });
    } else {
        console.log(
            'authService: initializeAuth: No token found in localStorage.',
        );
    }
};

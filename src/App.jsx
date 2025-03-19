import AppRoutes from '@/routes/AppRoutes';
import './assets/styles/index.scss';
import { initializeAuth } from '@/services/authService';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import getApi, { injectStore } from '@/api/api';
import { logout, login } from '@/store/slices/authSlice';

const App = () => {
    const dispatch = useDispatch();
    const { token } = useSelector((state) => state.auth);
    injectStore(dispatch, logout); // Вызываем injectStore здесь, передавая logout
    const api = getApi(); // Получаем экземпляр axios

    useEffect(() => {
        initializeAuth(dispatch).then(() => {
            // Передаем dispatch
            const storedToken = localStorage.getItem('token');
            if (storedToken) {
                // Проверка срока действия токена
                if (isTokenExpired(storedToken)) {
                    console.log('App: Token expired, logging out...');
                    dispatch(logout());
                    return;
                }
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
            }
        });
    }, [dispatch]);

    useEffect(() => {
        console.log('Текущий токен:', token);
        console.log(
            'Аутентифицирован ли пользователь?',
            useSelector((state) => state.auth.isAuthenticated),
        );
        console.log(
            'Позиция пользователя:',
            useSelector((state) => state.auth.role),
        );
    }, [token]);

    return (
        <div className={'app'}>
            <AppRoutes />
        </div>
    );
};
export default App;

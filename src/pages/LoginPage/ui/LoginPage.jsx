import { useState } from 'react';
import classes from './LoginPage.module.scss';

import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '@/store/slices/authSlice';
import api from '@/api/axios'; // Импортируем настроенный Axios
const LoginPage = () => {
    const [loginData, setLoginData] = useState({ login: '', password: '' });
    const dispatch = useDispatch();
    const navigate = useNavigate(); // Инициализация useNavigate

    const handleLogin = async (e) => {
        e.preventDefault();
        console.log('Attempting login with:', loginData); // Логируем данные для логина

        try {
            // Отправляем запрос на сервер
            const response = await api.post('/auth/login', loginData);
            console.log('Response from server:', response.data); // Логируем весь ответ

            const { accessToken, refreshToken } = response.data;

            console.log('Received accessToken:', accessToken); // Логируем токены
            console.log('Received refreshToken:', refreshToken);

            // Проверяем, есть ли токен
            if (!accessToken || !refreshToken) {
                console.error('Токен не получен!');
                return;
            }

            // Сохраняем токены в localStorage
            localStorage.setItem('token', accessToken); // Сохраняем только строку accessToken
            localStorage.setItem('refreshToken', refreshToken); // Сохраняем refreshToken

            // Сохраняем информацию о пользователе в Redux
            dispatch(login({ token: accessToken }));

            // Перенаправляем пользователя на главную страницу после успешного входа
            console.log('Login successful, redirecting to home page');
            navigate('/'); // Добавляем этот редирект
        } catch (error) {
            console.error('Ошибка входа:', error); // Логируем ошибку
        }
    };

    return (
        <div className={classes.loginPage}>
            <form onSubmit={handleLogin}>
                <input
                    type="text"
                    value={loginData.login}
                    onChange={(e) =>
                        setLoginData({ ...loginData, login: e.target.value })
                    }
                    placeholder="Введите логин"
                />
                <input
                    type="password"
                    value={loginData.password}
                    onChange={(e) =>
                        setLoginData({ ...loginData, password: e.target.value })
                    }
                    placeholder="Введите пароль"
                />
                <button type="submit">Войти</button>
            </form>
        </div>
    );
};

export default LoginPage;

import getApi from '@/api/api';
import { login, logout } from '@/store/slices/authSlice';
import { isTokenExpired } from '@/utils/authToken.js';

export const initializeAuth = async (dispatch) => {
    const storedToken = localStorage.getItem('token');
    console.log(
        'authService: initializeAuth: Token from localStorage:',
        storedToken,
    );
    if (storedToken) {
        console.log('authService: initializeAuth: Token found, logging in...');
        dispatch(login({ token: storedToken, role: '' }));
    } else {
        console.log(
            'authService: initializeAuth: No token found in localStorage.',
        );
    }
};

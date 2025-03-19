import axios from 'axios';

export const refreshAccessToken = async () => {
    const refreshToken = localStorage.getItem('refreshToken');
    console.log(
        'authToken: refreshAccessToken: Refresh token from localStorage:',
        refreshToken,
    );

    if (!refreshToken) {
        console.log('authToken: refreshAccessToken: No refresh token found.');
        return null;
    }
    try {
        console.log(
            'authToken: refreshAccessToken: Attempting to refresh access token...',
        );
        const response = await axios.post(
            'https://refcool-app.ru/api/auth/refresh-token',
            {
                token: refreshToken,
            },
        );
        const newAccessToken = response.data.accessToken;
        console.log(
            'authToken: refreshAccessToken: New access token received:',
            newAccessToken,
        );
        localStorage.setItem('token', newAccessToken);
        return newAccessToken;
    } catch (err) {
        console.error(
            'authToken: refreshAccessToken: Error refreshing access token:',
            err,
        );
        return null;
    }
};
export const isTokenExpired = (token) => {
    console.log(
        'authToken: isTokenExpired: Checking if token is expired:',
        token,
    );
    if (!token) {
        console.log(
            'authToken: isTokenExpired: No token provided, considered expired.',
        );
        return true;
    }
    try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        const isExpired = Date.now() >= payload.exp * 1000;
        console.log(
            'authToken: isTokenExpired: Token expiration time:',
            new Date(payload.exp * 1000),
            'Current time:',
            new Date(Date.now()),
        );
        console.log('authToken: isTokenExpired: Token is expired:', isExpired);
        return isExpired;
    } catch (error) {
        console.error(
            'authToken: isTokenExpired: Error checking token:',
            error,
        );
        return true;
    }
};

import { createSlice } from '@reduxjs/toolkit';
const initialState = {
    isAuthenticated: false,
    token: null,
    role: null,
};
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action) => {
            console.log(
                'authSlice: login: Login reducer triggered with payload:',
                action.payload,
            );
            state.isAuthenticated = true;
            state.token = action.payload.token;
            state.role = action.payload.role;
        },
        logout: (state) => {
            console.log('authSlice: logout: Logout reducer triggered');
            state.isAuthenticated = false;
            state.token = null;
            state.role = null;
            localStorage.removeItem('token');
            localStorage.removeItem('role'); // Удаляем role
        },
    },
});
export const { login, logout } = authSlice.actions;
export default authSlice.reducer;

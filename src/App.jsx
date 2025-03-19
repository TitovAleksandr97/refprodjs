import AppRoutes from '@/routes/AppRoutes';
import './assets/styles/index.scss';
import { initializeAuth } from '@/services/authService';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import getApi, { injectStore } from '@/api/api';
import { logout, login } from '@/store/slices/authSlice';

const App = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        initializeAuth(dispatch);
    }, [dispatch]);

    return (
        <div className={'app'}>
            <AppRoutes />
        </div>
    );
};
export default App;

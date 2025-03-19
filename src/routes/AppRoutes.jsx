import { Suspense, useEffect, useState, useTransition } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { Outlet } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { LoginPage } from '@/pages/LoginPage/index.js';
import ProtectedRoute from '@/components/auth/ProtectedRoute.jsx';
import { Layout } from '@/components/layout/Layout/index.js';
import { MainPage } from '@/pages/MainPage/index.js';
import axios from 'axios';
import { login } from '@/store/slices/authSlice.js';
import { OrdersPage } from '@/pages/OrdersPage/index.js';
import { SelectionPage } from '@/pages/SelectionPage/index.js';
import { LoadingSpinner } from '@/components/common/LoadingSpinner/index.js';
import { ProductionPage } from '@/pages/ProductionPage/index.js';
import { ServicePage } from '@/pages/ServicePage/index.js';
import { SelectionPagePrezFreonAir } from '@/pages/SelectionPagePrezFreonAir/index.js';
import { SelectionPagePrezWater } from '@/pages/SelectionPagePrezWater/index.js';
import OrderChatPage from '@/pages/OrderChatPage/ui/OrderChatPage.jsx';
import { OrderDetailsPage } from '@/pages/OrderDetailsPage/index.js';

const AppRoutes = () => {
    const dispatch = useDispatch();
    const { token, role, isAuthenticated } = useSelector((state) => state.auth);
    const [loading, setLoading] = useState(true); // Состояние загрузки
    const [isPending, startTransition] = useTransition(); // Хук для управления переходами

    useEffect(() => {
        const token = localStorage.getItem('token');
        console.log('Текущий токен:', token); // Лог текущего токена

        if (token && !role) {
            // Обернём получение данных в startTransition, чтобы избежать замены UI
            startTransition(() => {
                const fetchUserData = async () => {
                    try {
                        console.log(
                            'Отправка запроса на сервер для получения данных пользователя',
                        ); // Лог перед запросом

                        const response = await axios.get(
                            'https://refcool-app.ru/api/auth/me',
                            {
                                headers: {
                                    Authorization: `Bearer ${token}`,
                                },
                            },
                        );

                        console.log(
                            'Ответ от сервера с данными пользователя:',
                            response.data,
                        ); // Лог полученного ответа

                        // Сохраняем данные пользователя в Redux
                        dispatch(
                            login({
                                token,
                                role: response.data.role,
                            }),
                        );
                    } catch (err) {
                        console.error(
                            'Ошибка при запросе данных пользователя',
                            err,
                        ); // Лог ошибки
                    } finally {
                        setLoading(false); // Завершаем загрузку
                        console.log('Загрузка завершена'); // Лог завершения загрузки
                    }
                };
                fetchUserData();
            });
        } else {
            setLoading(false); // Если токена нет или данные уже загружены
            console.log('Токен отсутствует или данные уже загружены'); // Лог если нет токена
        }
    }, [dispatch, role]);

    if (loading || isPending) {
        console.log('Загрузка или переход...'); // Лог перед отображением загрузки
        return <LoadingSpinner />; // Отображаем индикатор загрузки
    }

    return (
        <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route
                path="/"
                element={
                    <ProtectedRoute>
                        <Layout>
                            <Outlet />
                        </Layout>
                    </ProtectedRoute>
                }
            >
                <Route path="/" element={<MainPage />} />
                <Route
                    path="/orders"
                    element={
                        <ProtectedRoute requiredRoles={['REF_DP_GODS']}>
                            <Suspense fallback={<LoadingSpinner />}>
                                <OrdersPage />{' '}
                                {/* Оборачиваем асинхронный компонент в Suspense */}
                            </Suspense>
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/selection"
                    element={
                        <ProtectedRoute
                            requiredRoles={['REF_DP_GODS', 'INGENER']}
                        >
                            <Suspense fallback={<LoadingSpinner />}>
                                <SelectionPage />{' '}
                                {/* Оборачиваем асинхронный компонент в Suspense */}
                            </Suspense>
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/selection/PrezWater"
                    element={
                        <ProtectedRoute
                            requiredRoles={['REF_DP_GODS', 'INGENER']}
                        >
                            <Suspense fallback={<LoadingSpinner />}>
                                <SelectionPagePrezWater />{' '}
                                {/* Оборачиваем асинхронный компонент в Suspense */}
                            </Suspense>
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/selection/PrezFreonAir"
                    element={
                        <ProtectedRoute
                            requiredRoles={['REF_DP_GODS', 'INGENER']}
                        >
                            <Suspense fallback={<LoadingSpinner />}>
                                <SelectionPagePrezFreonAir />{' '}
                                {/* Оборачиваем асинхронный компонент в Suspense */}
                            </Suspense>
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/production"
                    element={
                        <ProtectedRoute requiredRoles={['REF_DP_GODS']}>
                            <Suspense fallback={<LoadingSpinner />}>
                                <ProductionPage />{' '}
                                {/* Оборачиваем асинхронный компонент в Suspense */}
                            </Suspense>
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/orders/042/chat"
                    element={
                        <ProtectedRoute requiredRoles={['REF_DP_GODS']}>
                            <Suspense fallback={<LoadingSpinner />}>
                                <OrderChatPage />{' '}
                                {/* Оборачиваем асинхронный компонент в Suspense */}
                            </Suspense>
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/orders"
                    element={
                        <ProtectedRoute requiredRoles={['REF_DP_GODS']}>
                            <Suspense fallback={<LoadingSpinner />}>
                                <OrdersPage />{' '}
                                {/* Оборачиваем асинхронный компонент в Suspense */}
                            </Suspense>
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/orders/:orderNum"
                    element={
                        <ProtectedRoute requiredRoles={['REF_DP_GODS']}>
                            <Suspense fallback={<LoadingSpinner />}>
                                <OrderDetailsPage />{' '}
                                {/* Оборачиваем асинхронный компонент в Suspense */}
                            </Suspense>
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/orders/042/chat"
                    element={
                        <ProtectedRoute requiredRoles={['REF_DP_GODS']}>
                            <Suspense fallback={<LoadingSpinner />}>
                                <OrderChatPage />{' '}
                                {/* Оборачиваем асинхронный компонент в Suspense */}
                            </Suspense>
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/service"
                    element={
                        <ProtectedRoute requiredRoles={['REF_DP_GODS']}>
                            <Suspense fallback={<LoadingSpinner />}>
                                <ServicePage />{' '}
                                {/* Оборачиваем асинхронный компонент в Suspense */}
                            </Suspense>
                        </ProtectedRoute>
                    }
                />
                <Route path="*" element={<Navigate to="/" />} />
            </Route>
        </Routes>
    );
};
export default AppRoutes;

import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, requiredRoles = [] }) => {
    const { isAuthenticated, role } = useSelector((state) => state.auth);

    console.log('Аутентифицирован ли пользователь?', isAuthenticated); // Лог аутентификации
    console.log('Позиция пользователя:', role); // Лог позиции

    if (!isAuthenticated) {
        console.log(
            'Пользователь не аутентифицирован, перенаправление на /login',
        ); // Лог перенаправления
        return <Navigate to="/login" />;
    }

    // Если у пользователя недостаточно прав (по роли), перенаправляем на главную страницу
    if (requiredRoles.length > 0 && !requiredRoles.includes(role)) {
        console.log('Недостаточно прав, перенаправление на главную'); // Лог перенаправления по роли
        return <Navigate to="/" />;
    }
    return children;
};

export default ProtectedRoute;

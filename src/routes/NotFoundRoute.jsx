import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const NotFoundRoute = () => {
    const { isAuthenticated } = useSelector((state) => state.auth);

    return isAuthenticated ? <Navigate to="/" /> : <Navigate to="/login" />;
};

export default NotFoundRoute;

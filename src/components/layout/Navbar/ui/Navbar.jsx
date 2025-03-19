import classes from './Navbar.module.scss';
import IconLogo from '/src/assets/icons/logo.svg';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '@/store/slices/authSlice.js';

export const Navbar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        dispatch(logout());
        navigate('/login');
    };
    return (
        <nav className={classes.navbar}>
            <div className={classes.navbar__logo}>
                <IconLogo className={classes.navbar_logo} />
            </div>
            <ul className={classes.navbar__links}>
                <li>
                    <a href="" onClick={handleLogout}>
                        Выйти
                    </a>
                </li>
            </ul>
        </nav>
    );
};

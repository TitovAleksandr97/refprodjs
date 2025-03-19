import classes from './Sidebar.module.scss';
import { useSelector } from 'react-redux';
import OrdersIcon from '@/assets/icons/sidebar_orders.svg';
import SelectedIcon from '@/assets/icons/sidebar_selected.svg';
import ProductionIcon from '@/assets/icons/sidebar_production.svg';
import ServiceIcon from '@/assets/icons/sidebar_service.svg';
import { Link } from 'react-router-dom';
export const Sidebar = () => {
    // Извлекаем роль пользователя из Redux
    const { role } = useSelector((state) => state.auth);

    return (
        <div className={classes.sidebar}>
            <ul>
                {/* Линк "Подбор" доступен для SUPER_ADMIN и MANAGER */}
                {(role === 'REF_DP_GODS' || role === 'INGENER') && (
                    <Link to="/selection">
                        <li>
                            <span className={classes.icon}>
                                <SelectedIcon className={classes.icon_fill} />
                            </span>
                            <span className={classes.text}>Подбор</span>
                        </li>
                    </Link>
                )}

                {/* Линк "Заказы" доступен для SUPER_ADMIN и MANAGER */}
                {(role === 'REF_DP_GODS' || role === 'MANAGER') && (
                    <Link to="/orders">
                        <li>
                            <span className={classes.icon}>
                                <OrdersIcon className={classes.icon_fill} />
                            </span>
                            <span className={classes.text}>Заказы</span>
                        </li>
                    </Link>
                )}

                {/* Линк "Производство" доступен только для SUPER_ADMIN */}
                {role === 'REF_DP_GODS' && (
                    <Link to="/production">
                        <li>
                            <span className={classes.icon}>
                                <ProductionIcon className={classes.icon_fill} />
                            </span>
                            <span className={classes.text}>Производство</span>
                        </li>
                    </Link>
                )}
                {role === 'REF_DP_GODS' && (
                    <Link to="/service">
                        <li>
                            <span className={classes.icon}>
                                <ServiceIcon className={classes.icon_fill} />
                            </span>
                            <span className={classes.text}>Сервис</span>
                        </li>
                    </Link>
                )}
            </ul>
        </div>
    );
};

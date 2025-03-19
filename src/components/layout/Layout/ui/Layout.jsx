import { Sidebar } from '@/components/layout/Sidebar/index.js';
import { Navbar } from '@/components/layout/Navbar/index.js';
import classes from './Layout.module.scss';
export const Layout = ({ children }) => {
    return (
        <div className={classes.content}>
            <Navbar />
            <Sidebar />
            <div>{children}</div>
        </div>
    );
};

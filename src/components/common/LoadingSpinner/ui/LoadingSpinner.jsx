import classes from './LoadingSpinner.module.scss';
import SnowflakeIcon from '@/assets/icons/snowflake.svg';

export const LoadingSpinner = () => {
    return (
        <div className={classes.loadingContainer}>
            <SnowflakeIcon className={classes.snowflakeIcon} />
        </div>
    );
};

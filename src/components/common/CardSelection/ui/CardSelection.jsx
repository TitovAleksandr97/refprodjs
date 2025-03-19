import classes from './CardSelection.module.scss';
import { Link } from 'react-router-dom';
export const CardSelection = (props) => {
    return (
        <Link to={`/selection/${props.link}`}>
            <div className={classes.card}>
                <h3 className={classes.title}>{props.name}</h3>
                <p className={classes.description}>{props.equipmentType}</p>
                <p className={classes.link_full}>Подобрать оборудование</p>
                <p className={classes.linked}>→</p>
            </div>
        </Link>
    );
};

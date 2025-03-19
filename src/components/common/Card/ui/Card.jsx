import classes from './Card.module.scss';
import { Link } from 'react-router-dom';
export const Card = (props) => {
    let tag;
    // switch (props.eqipment) {
    //     case 'AMD': tag = 'AMD';
    //     case 'HTS': tag = 'HTS';
    //     case 'Dantex': tag = 'Dantex';
    // }

    return (
        <Link to={`/orders/${props.num_e}`}>
            <div className={classes.card}>
                {/*if ({props.eqipment} == 'AMD') => {*/}
                <span className={classes.tag}>{props.eqipment}</span>
                <span className={classes.tag_company}>{props.company}</span>
                <h3 className={classes.title}>
                    УП {props.num_e} {props.country} {props.name}
                </h3>
                <p className={classes.description}>
                    Серийный ном ь ер: {props.num_s}
                </p>
                <p className={classes.link_full}>Смотреть заказ</p>
                <p className={classes.linked}>→</p>
            </div>
        </Link>
    );
};

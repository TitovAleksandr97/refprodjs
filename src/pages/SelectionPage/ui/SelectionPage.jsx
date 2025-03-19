import { cardData } from '@/pages/SelectionPage/data/dataCards.js';
import classes from './SelectionPage.module.scss';
import { CardSelection } from '@/components/common/CardSelection/index.js';

const SelectionPage = () => {
    return (
        <div>
            <div className={classes.container}>
                {cardData.map((card, index) => (
                    <CardSelection
                        key={index}
                        name={card.name}
                        equipmentType={card.equipmentType}
                        link={card.link}
                    />
                ))}
            </div>
        </div>
    );
};

export default SelectionPage;

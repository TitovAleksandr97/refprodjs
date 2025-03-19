import React, { useState } from 'react';
import styles from './CalendarService.module.scss';

export const CalendarService = () => {
    // Данные для календаря
    const calendarData = [
        {
            day: '1 сентября',
            event: '248 заказ',
            name: 'Виталий Кубасов',
            cause: ' - Акт рекламации',
        },
        {
            day: '2 сентября',
            event: '248 заказ',
            name: 'Виталий Кубасов',
            cause: ' - Акт рекламации',
        },
        {
            day: '3 сентября',
            event: '248 заказ',
            name: 'Виталий Кубасов',
            cause: ' - Акт рекламации',
        },
        {
            day: '4 сентября',
            event: '248 заказ',
            name: 'Виталий Кубасов',
            cause: ' - Акт рекламации',
        },
        {
            day: '5 сентября',
            event: '248 заказ',
            name: 'Виталий Кубасов',
            cause: ' - Акт рекламации',
        },
        {
            day: '6 сентября',
            event: '248 заказ',
            name: 'Виталий Кубасов',
            cause: ' - Акт рекламации',
        },
        {
            day: '7 сентября',
            event: '248 заказ',
            name: 'Виталий Кубасов',
            cause: ' - Акт рекламации',
        },

        // Добавьте больше дней и событий
    ];

    const [hoveredDay, setHoveredDay] = useState(null);

    const handleMouseEnter = (day) => {
        setHoveredDay(day);
    };

    const handleMouseLeave = () => {
        setHoveredDay(null);
    };

    return (
        <div className={styles.calendar}>
            {calendarData.map(({ day, event, name, cause }, index) => (
                <div
                    key={index}
                    className={styles.calendarDay}
                    onMouseEnter={() => handleMouseEnter(day)}
                    onMouseLeave={handleMouseLeave}
                >
                    <div className={styles.dayNumber}>{day}</div>
                    {hoveredDay === day && (
                        <div className={styles.eventInfo}>
                            {event} {name} {cause}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

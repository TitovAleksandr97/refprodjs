import React from 'react';
import { Link, useParams } from 'react-router-dom';
import classes from './OrderDetailsPage.module.scss';
import { Dropdown } from '@/components/common/Dropdown/index.js';

// Пример данных заказов, которые можно загрузить через API в реальном приложении
const cardData = [
    {
        eqipment: 'Прец',
        company: 'Dantex',
        country: 'Россия',
        num_e: '018',
        num_s: '01171124',
        name: 'Название1',
    },
    {
        eqipment: 'Прец',
        company: 'Dantex',
        country: 'Россия',
        num_e: '019',
        num_s: '01171125',
        name: 'Название2',
    },
    {
        eqipment: 'Другое',
        company: 'Dantex',
        country: 'Россия',
        num_e: '020',
        num_s: '01171126',
        name: 'Название3',
    },
    {
        eqipment: 'Чиллер',
        company: 'AMD',
        country: 'Россия',
        num_e: '024',
        num_s: '01171126',
        name: 'Остаповский',
        stage: ['4шт на этапе покраски', '2шт на этапе сборки'],
    },
    // Добавьте больше карточек по необходимости
];
const items = [
    {
        src: {
            link: 'automation',
            name: 'Автоматизация - документация',
            items: [
                'Схема электрическая',
                'Схема электрическая - новая',
                'Документация на увлажнитель',
                'Документация на modbus',
            ],
        },
    },
    {
        src: {
            link: 'tech',
            name: 'Техотдел - документация',
            items: ['Схема гидравлическая', 'Лист подбора оборудования'],
        },
    },
    {
        src: {
            link: 'OP',
            name: 'Отдел ПО',
            items: [
                'Документация на контроллер',
                'Диспетчеризация',
                'Документация на дисплей',
            ],
        },
    },
    {
        src: {
            link: 'Service',
            name: 'Сервис',
            items: ['Акт рекламации 12.06', 'Акт рекламации 16.09'],
        },
    },
];
{
    items.map((item) => console.log(item.src, 111));
}
const OrderDetailsPage = () => {
    const { orderNum } = useParams(); // Получаем номер заказа из параметров URL

    // Находим заказ по номеру
    const order = cardData.find((card) => card.num_e === orderNum);

    // Если заказ не найден, отображаем сообщение
    if (!order) {
        return <div>Заказ с номером {orderNum} не найден.</div>;
    }

    return (
        <div className={classes.orderDetails}>
            <h2>УП {order.num_e}</h2>
            <p>
                <strong>Название:</strong> {order.name}
            </p>
            <p>
                <strong>Компания:</strong> {order.company}
            </p>
            <p>
                <strong>Страна:</strong> {order.country}
            </p>
            <p>
                <strong>Оборудование:</strong> {order.eqipment}
            </p>
            <p>
                <strong>Серийный номер:</strong> {order.num_s}
            </p>
            <p>
                <strong>Этап:</strong>
                <ol>
                    <li>• {order.stage[0]}</li>
                    <li>• {order.stage[1]}</li>
                </ol>
            </p>
            {items.map((item) => (
                <div>
                    <Dropdown item={item.src} />
                </div>
            ))}
            <div className={classes.buttonChat}>
                <Link to={`/orders/042/chat`}>
                    <button>Чат с заказчиком</button>
                </Link>
                <Link to={`/orders/042/chat`}>
                    <button>Чат с сервисом</button>
                </Link>
            </div>
        </div>
    );
};

export default OrderDetailsPage;

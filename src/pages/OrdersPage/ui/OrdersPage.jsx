import { Card } from '@/components/common/Card/index.js';
import classes from './OrderPage.module.scss';
import { useState } from 'react';
import { LoadingSpinner } from '@/components/common/LoadingSpinner/index.js';
import { Link } from 'react-router-dom';

const cardData = [
    {
        eqipment: 'Чиллер',
        company: 'AMD',
        country: 'Остаповский Пр.',
        num_e: '024',
        num_s: '01171124',
        name: 'Ростелеком',
    },
    {
        eqipment: 'Прец',
        company: 'Dantex',
        country: '',
        num_e: '056',
        num_s: '01171125',
        name: '',
    },
    {
        eqipment: 'Чиллер',
        company: 'HTS',
        country: 'Нижний Новгород',
        num_e: '274',
        num_s: '01171126',
        name: '',
    },
    {
        eqipment: 'Чиллер',
        company: 'Рефкул',
        country: '',
        num_e: '103',
        num_s: '01171124',
        name: 'МГУ',
    },
    {
        eqipment: 'Чиллер',
        company: 'Рефкул',
        country: 'Москва',
        num_e: '100',
        num_s: '01171125',
        name: 'Сбербанк',
    },
    {
        eqipment: 'Прец',
        company: 'HTS',
        country: 'Москва',
        num_e: '108',
        num_s: '01171126',
        name: 'Альфа-Банк 1 Этаж',
    },
    {
        eqipment: 'Прец',
        company: 'HTS',
        country: 'Москва',
        num_e: '090',
        num_s: '01171124',
        name: 'Альфа-Банк 3 Этаж',
    },
    {
        eqipment: 'Прец',
        company: 'HTS',
        country: 'Питер',
        num_e: '248',
        num_s: '01171125',
        name: 'Миран',
    },
    {
        eqipment: 'Прец',
        company: 'HTS',
        country: '',
        num_e: '258',
        num_s: '01171126',
        name: 'Миран',
    },
    {
        eqipment: 'Прец',
        company: 'HTS',
        country: '',
        num_e: '090',
        num_s: '01171124',
        name: 'Альфа-Банк 5 Этаж',
    },
    {
        eqipment: 'Прец',
        company: 'Dantex',
        country: '',
        num_e: '019',
        num_s: '01171125',
        name: '',
    },
    {
        eqipment: 'Прец',
        company: 'HTS',
        country: '',
        num_e: '020',
        num_s: '01171126',
        name: '',
    },
    {
        eqipment: 'Прец',
        company: 'HTS',
        country: '',
        num_e: '098',
        num_s: '01171124',
        name: '',
    },
    {
        eqipment: 'Прец',
        company: 'HTS',
        country: '',
        num_e: '091',
        num_s: '01171125',
        name: '',
    },
    {
        eqipment: 'Прец',
        company: 'Dantex',
        country: '',
        num_e: '080',
        num_s: '01171126',
        name: '',
    },
];

const PAGE_SIZE = 10;
const OrdersPage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [includeEqipment, setIncludeEqipment] = useState(false);
    const [filterBy, setFilterBy] = useState('num_e');
    const [sortOrder, setSortOrder] = useState('asc');
    const [showAll, setShowAll] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);

    const filteredCards = cardData
        .filter((card) => {
            const searchParts = searchTerm
                .split(' ')
                .map((part) => part.trim())
                .filter((part) => part.length > 0);

            const matchesSearch = searchParts.every(
                (part) =>
                    card.num_e.includes(part) ||
                    card.eqipment.toLowerCase().includes(part.toLowerCase()) ||
                    card.company.toLowerCase().includes(part.toLowerCase()) ||
                    card.country.toLowerCase().includes(part.toLowerCase()) ||
                    card.num_s.toLowerCase().includes(part.toLowerCase()) ||
                    card.name.toLowerCase().includes(part.toLowerCase()),
            );

            const matchesEqipment = includeEqipment
                ? card.eqipment === 'Прец'
                : true;

            return matchesSearch && matchesEqipment;
        })
        .sort((a, b) => {
            if (sortOrder === 'asc') {
                return a[filterBy].localeCompare(b[filterBy]);
            } else {
                return b[filterBy].localeCompare(a[filterBy]);
            }
        });

    const paginatedCards = showAll
        ? filteredCards
        : filteredCards.slice(0, currentPage * PAGE_SIZE);

    const handleShowMore = () => {
        setCurrentPage(currentPage + 1);
    };

    const handleShowAll = () => {
        setShowAll(true);
    };

    return (
        <div>
            <input
                type="text"
                placeholder="Введите информацию о заказе..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={classes.searchInput}
            />

            <div className={classes.filters}>
                <select
                    value={filterBy}
                    onChange={(e) => setFilterBy(e.target.value)}
                    className={classes.select}
                >
                    <option value="num_e">Номер заказа</option>
                    <option value="name">Название</option>
                    <option value="company">Компания</option>
                    <option value="country">Страна</option>
                    <option value="num_s">Серийный номер</option>
                    <option value="eqipment">Оборудование</option>
                </select>

                <select
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value)}
                    className={classes.select}
                >
                    <option value="asc">Возрастание</option>
                    <option value="desc">Убывание</option>
                </select>
            </div>

            <div className={classes.container}>
                {paginatedCards.map((card, index) => (
                    <Link to={`/orders/${card.num_e}`} key={index}>
                        <Card
                            key={index}
                            eqipment={card.eqipment}
                            company={card.company}
                            country={card.country}
                            num_e={card.num_e}
                            num_s={card.num_s}
                            name={card.name}
                        />
                    </Link>
                ))}
            </div>

            {!showAll && filteredCards.length > currentPage * PAGE_SIZE && (
                <button
                    onClick={handleShowMore}
                    className={classes.loadMoreButton}
                >
                    Показать еще 10
                </button>
            )}

            {!showAll && filteredCards.length > PAGE_SIZE && (
                <button
                    onClick={handleShowAll}
                    className={classes.loadMoreButton}
                >
                    Показать все заказы
                </button>
            )}
        </div>
    );
};
export default OrdersPage;

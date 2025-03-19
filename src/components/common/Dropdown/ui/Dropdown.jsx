import React, { useEffect, useRef, useState } from 'react';
import styles from './Dropdown.module.scss';

export const Dropdown = (props) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null); // Ref для получения высоты списка
    const [menuHeight, setMenuHeight] = useState(0); // Стейт для хранения высоты меню
    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };
    console.log(props.item.items);
    useEffect(() => {
        // Вычисляем высоту меню, если оно открыто
        if (isOpen && dropdownRef.current) {
            setMenuHeight(dropdownRef.current.scrollHeight);
        } else {
            setMenuHeight(0); // Если закрыто, высота 0
        }
    }, [isOpen]);

    return (
        <div className={styles.dropdown}>
            <button
                className={`${styles.dropdownButton} ${isOpen ? styles.open : ''}`}
                onClick={toggleDropdown}
            >
                {props.item.name}
            </button>

            {/* Применяем динамическую высоту */}
            <div
                className={styles.dropdownMenu}
                ref={dropdownRef}
                style={{ height: `${menuHeight}px` }}
            >
                {' '}
                {props.item.items.map((item, index) => (
                    <div key={index} className={styles.dropdownItem}>
                        {item}
                    </div>
                ))}
            </div>
        </div>
    );
};

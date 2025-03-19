import { useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

const OrderChatPage = () => {
    const { orderId } = useParams(); // Получаем номер заказа из URL
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');

    // Пример получения сообщений с сервера (имитация)
    useEffect(() => {
        // Здесь вы можете сделать запрос на сервер для получения сообщений по номеру заказа
        const fetchMessages = async () => {
            // Пример данных
            const mockMessages = [
                {
                    id: 1,
                    user: 'Клиент',
                    text: 'Когда будет выезд по акту рекламации?',
                },
                {
                    id: 2,
                    user: 'Сервис',
                    text: 'Планируем выезд на следующей неделе',
                },
            ];
            setMessages(mockMessages);
        };

        fetchMessages();
    }, [orderId]);

    // Обработчик отправки сообщения
    const handleSendMessage = () => {
        if (newMessage.trim()) {
            // Добавляем новое сообщение в массив
            const newMsg = {
                id: messages.length + 1,
                user: 'Отдел ПО',
                text: newMessage,
            };
            setMessages([...messages, newMsg]);
            setNewMessage(''); // Очищаем поле ввода
        }
    };

    return (
        <div>
            <h1>Чат заказа №{orderId}</h1>

            <div
                style={{
                    maxHeight: '400px',
                    overflowY: 'scroll',
                    border: '1px solid #ccc',
                    padding: '10px',
                }}
            >
                {messages.map((msg) => (
                    <div key={msg.id} style={{ margin: '10px 0' }}>
                        <strong>{msg.user}: </strong>
                        {msg.text}
                    </div>
                ))}
            </div>

            <div style={{ marginTop: '20px' }}>
                <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Введите сообщение"
                    style={{ width: '80%', padding: '10px' }}
                />
                <button
                    onClick={handleSendMessage}
                    style={{ padding: '10px', marginLeft: '10px' }}
                >
                    Отправить
                </button>
            </div>
        </div>
    );
};

export default OrderChatPage;

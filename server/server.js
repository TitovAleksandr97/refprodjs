const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth'); // Импорт маршрутов
const Calc = require('./routes/calculate');
const path = require('node:path'); // Импорт маршрутов
require('dotenv').config(); // В начале файла server.js
// Настройка CORS
const corsOptions = {
    origin: ['https://refcool-app.ru'], // Разрешаем только с фронтенда
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Разрешаем необходимые методы
    allowedHeaders: ['Content-Type', 'Authorization'], // Указываем разрешённые заголовки
    credentials: true, // Разрешаем использование cookies и авторизационных данных
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(cors());

// Разрешение предзапросов
app.options('*', cors(corsOptions)); // Обработка preflight-запросов

// Обработка JSON данных
app.use(express.json());
// Пример маршрута
app.use('/api/auth', authRoutes);
app.use('/api', Calc);
app.post('/auth/login', (req, res) => {
    const { login, password } = req.body;
    console.log('Отправка запроса на сервер6');

    // Добавьте здесь проверку данных
    if (login && password) {
        res.status(200).json({
            message: 'Login successful',
            token: 'jwt_token_example',
        });
    } else {
        res.status(400).json({ error: 'Invalid login or password' });
    }
});

// Запуск сервера
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

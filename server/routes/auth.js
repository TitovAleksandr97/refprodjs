const express = require('express');
const router = express.Router();
const pool = require('../db'); // Подключение к базе данных
const bcrypt = require('bcryptjs');
const { generateToken } = require('../middleware/auth');
const jwt = require('jsonwebtoken');

router.post('/login', async (req, res) => {
    const { login, password } = req.body;

    try {
        // Выполняем запрос к базе данных
        const user = await pool.query(
            'SELECT * FROM users WHERE login = $1 AND password = crypt($2, password)',
            [login, password],
        );

        if (user.rows.length === 0) {
            return res
                .status(400)
                .json({ error: 'Неправильный логин или пароль' });
        }

        // Генерация access токена и refresh токена
        const accessToken = generateToken(user.rows[0]); // Генерация токена как строки
        const refreshToken = jwt.sign(
            { id: user.rows[0].id },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: '30d' },
        );

        // Отправляем токены на клиент
        return res.json({ accessToken, refreshToken });
    } catch (err) {
        console.error('Ошибка при проверке логина:', err.message); // Логируем ошибку
        return res.status(500).send('Ошибка сервера');
    }
});

router.get('/me', (req, res) => {
    const token = req.headers['authorization'];
    console.log('Отправка запроса на сервер2');

    if (!token) {
        return res.status(401).json({ error: 'Нет токена' });
    }

    jwt.verify(token.split(' ')[1], process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({ error: 'Недействительный токен' });
        }

        // Логируем расшифрованный токен, чтобы убедиться, что 'position' и 'company' присутствуют
        console.log(decoded);

        // Возвращаем данные пользователя, включая 'position' и 'company'
        res.json({
            role: decoded.role, // Должность пользователя
        });
    });
});

router.post('/refresh-token', (req, res) => {
    const refreshToken = req.body.token;
    console.log('Отправка запроса на сервер3');

    if (!refreshToken) {
        return res.status(401).json({ error: 'Refresh токен отсутствует' });
    }

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err) {
            return res
                .status(403)
                .json({ error: 'Недействительный Refresh токен' });
        }

        // Генерация нового Access токена
        const newAccessToken = jwt.sign(
            {
                id: user.id,
                login: user.login,
                role: user.role,
            },
            process.env.JWT_SECRET,
            { expiresIn: '1h' },
        );

        res.json({ accessToken: newAccessToken });
    });
});

module.exports = router;

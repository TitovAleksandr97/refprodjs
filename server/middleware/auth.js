// server/middleware/auth.js
const jwt = require('jsonwebtoken');
function generateToken(user) {
    return jwt.sign(
        {
            id: user.id,
            login: user.login,
            role: user.role,
        },
        process.env.JWT_SECRET,
        { expiresIn: '1h' },
    );
}

// Мидлвара для проверки токена
function authenticateToken(req, res, next) {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(401).send('Токен отсутствует');
    }

    // Проверка токена
    jwt.verify(token.split(' ')[1], process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).send('Недействительный токен');
        }
        req.user = user;
        next();
    });
}

module.exports = { generateToken, authenticateToken };

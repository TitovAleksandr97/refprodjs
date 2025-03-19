const express = require('express');
const router = express.Router();
const { calcTypeA } = require('./calcTypeA'); // импорт функции для работы с Excel
const { calcTypeB } = require('./test008'); // импорт функции для работы с Excel
const path = require('path');
const { prezA } = require('../calculations/prezA');

router.post('/calculate', async (req, res) => {
    try {
        const data = req.body;
        console.log('Полученные данные:', data);

        // Производим расчёт, передавая данные в функцию calcTypeA
        const result = await calcTypeA(data); // Логируем результат работы функции
        console.log('Результат расчета:', result);

        // Возвращаем успешный ответ
        return res.status(200).json({
            message: 'Данные успешно обработаны и расчёт выполнен!',
            result,
        });
    } catch (error) {
        console.error('Ошибка при выполнении расчёта:', error); // Логируем ошибку
        return res.status(500).json({
            error: `Произошла ошибка при обработке данных: ${error.message}`,
        });
    }
});

//PrezA
router.post('/prezA', async (req, res) => {
    try {
        const data = req.body;
        console.log('Полученные данные:', data);

        // Производим расчёт, передавая данные в функцию calcTypeA
        const result = await prezA(data); // Логируем результат работы функции
        console.log('Результат расчета:', result);

        // Возвращаем успешный ответ
        return res.status(200).json({
            message: 'Данные успешно обработаны и расчёт выполнен!',
            result,
        });
    } catch (error) {
        console.error('Ошибка при выполнении расчёта:', error); // Логируем ошибку
        return res.status(500).json({
            error: `Произошла ошибка при обработке данных: ${error.message}`,
        });
    }
});

router.get('/excels/typeA/:filename', (req, res) => {
    const { filename } = req.params;
    const filePath = path.resolve(__dirname, 'excels/typeA', filename);

    // Проверка существования файла и отправка его клиенту
    res.download(filePath, filename, (err) => {
        if (err) {
            console.error('Ошибка при скачивании файла:', err);
            res.status(500).send('Ошибка при скачивании файла.');
        }
    });
});

module.exports = router;

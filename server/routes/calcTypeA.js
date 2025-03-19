const fs = require('fs');
const path = require('path');
const XLSX = require('xlsx');
const XLSX_CALC = require('xlsx-calc');
const ExcelJS = require('exceljs');
const crypto = require('crypto');

// Импортируем пользовательские функции
XLSX_CALC.import_functions({
    ROUNDUP: (value, digits) =>
        Math.ceil(value * Math.pow(10, digits)) / Math.pow(10, digits),
    LOG10: (value) => Math.log10(value),
});

function generateRandomHash() {
    return crypto.randomBytes(8).toString('hex'); // Генерируем случайный хэш длиной 16 символов
}

async function calcTypeA(npar) {
    console.log('Начало выполнения функции calcTypeA');
    console.log('Полученный массив npar:', npar);

    console.log('Массив npar содержит 14 элементов.');

    console.log('Сгенерированный хэш:', npar.at(-1));

    const workbook = new ExcelJS.Workbook();
    const filePath = path.resolve(__dirname, 'chiller.xlsx');
    console.log('Путь к исходному файлу:', filePath);

    // Загружаем исходный Excel-файл
    try {
        await workbook.xlsx.readFile(filePath);
        console.log('Файл успешно загружен.');
    } catch (error) {
        console.error('Ошибка при загрузке файла:', error);
        return null;
    }
    const cellMappings = [
        { row: 3, col: 'B', index: 0 },
        { row: 4, col: 'B', index: 1 },
        { row: 5, col: 'B', index: 2 },
        { row: 6, col: 'B', index: 3 },
        { row: 7, col: 'B', index: 4 },
        { row: 8, col: 'B', index: 5 },
        { row: 9, col: 'B', index: 6 },
        { row: 11, col: 'B', index: 7 },
        { row: 12, col: 'B', index: 8 },
        { row: 14, col: 'B', index: 9 },
        { row: 15, col: 'B', index: 10 },
        { row: 3, col: 'D', index: 11 },
        { row: 17, col: 'B', index: 12 },
        { row: 4, col: 'D', index: 13 },
    ];
    workbook.eachSheet((worksheet, sheetId) => {
        console.log('Обработка листа:', worksheet.name);

        cellMappings.forEach(({ row, col, index }) => {
            worksheet.getCell(col + row).value = npar[index];
        });
    });

    // Сохранение изменений через ExcelJS
    const newFilePath = path.resolve(
        __dirname,
        `excels/temp_${npar.at(-1)}.xlsx`,
    );
    try {
        await workbook.xlsx.writeFile(newFilePath);
        console.log('Изменения сохранены в новый файл:', newFilePath);
    } catch (error) {
        console.error('Ошибка при сохранении файла:', error);
        return null;
    }

    // Повторное открытие с помощью xlsx для расчета с использованием xlsx-calc
    let xlsxWorkbook;
    try {
        xlsxWorkbook = XLSX.readFile(newFilePath);
        console.log('Файл успешно открыт для расчета.');
    } catch (error) {
        console.error('Ошибка при открытии файла для расчета:', error);
        return null;
    }

    const worksheet = xlsxWorkbook.Sheets['Прец-Вода'];
    if (!worksheet) {
        console.error('Ошибка: Лист "Прец-Вода" не найден.');
        return null;
    }

    // Запуск расчета
    try {
        XLSX_CALC(xlsxWorkbook, {
            continue_after_error: true,
            log_error: true,
        });
        console.log('Расчет успешно выполнен.');
    } catch (error) {
        console.error('Ошибка при расчете:', error);
        return null;
    }

    // Получаем значение ячеек B20, B19 и B21 после выполнения расчета
    const valueB20 = worksheet['B20'] ? worksheet['B20'].v : null;
    const valueB19 = worksheet['B19'] ? worksheet['B19'].v : null;
    const valueB21 = worksheet['B21'] ? worksheet['B21'].v : null;

    console.log(`Значение ячейки B20: ${valueB20}`);
    console.log(`Значение ячейки B19: ${valueB19}`);
    console.log(`Значение ячейки B21: ${valueB21}`);

    // Логика проверки значений и выбор возвращаемого результата
    let result;
    if (valueB20 !== 0) {
        result = valueB20;
    } else if (valueB19 !== '.') {
        result = valueB19;
    } else {
        result = valueB21;
    }

    result = result !== null ? result.toString() : '';
    console.log(`Возвращаемое значение: ${result}`);

    // Сохранение итогового файла
    const finalFilePath = path.resolve(
        __dirname,
        `excels/${npar.at(-1)}_final.xlsx`,
    );
    try {
        XLSX.writeFile(xlsxWorkbook, finalFilePath);
        console.log('Файл успешно создан:', finalFilePath);
    } catch (error) {
        console.error('Ошибка при сохранении итогового файла:', error);
        return null;
    }
    const sourcePath = path.resolve(__dirname, 'Water.xlsx');
    const destPath = path.resolve(
        __dirname,
        `excels/typeA/B${npar.at(-1)}sss.xlsx`,
    );
    fs.copyFileSync(sourcePath, destPath);
    const workbook1 = new ExcelJS.Workbook();
    await workbook1.xlsx.readFile(destPath);
    const worksheet1 = workbook1.getWorksheet('Вода');
    const data = [
        ...npar.slice(0, 7),
        '',
        ...npar.slice(7, 9),
        '',
        ...npar.slice(9, 11),
        '',
        npar[12],
        '',
    ];

    for (let i = 20; i <= 57; i++) {
        data.push(worksheet[`C${i}`].v);
    }
    for (let i = 0; i < data.length; i++) {
        worksheet1.getCell(`D${10 + i}`).value = data[i];
    }
    await workbook1.xlsx.writeFile(destPath);
    console.log(
        'Файл успешно сохранен с сохранением стилей:',
        destPath,
        result,
    );
    fs.unlinkSync(newFilePath);
    fs.unlinkSync(finalFilePath);

    console.log(`Временный файл ${newFilePath} успешно удален.`);

    return { result };
}

module.exports = { calcTypeA };

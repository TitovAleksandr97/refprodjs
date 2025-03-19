const XLSX = require('xlsx');
const fs = require('fs');

// Открываем исходный Excel файл
const workbook = XLSX.readFile('Программа_подбора_ПК.xlsx');
const freonSheet = workbook.Sheets['Фреон'];
const tableSheet = workbook.Sheets['Таблица'];

// Диапазоны значений
const d10_values = Array.from({ length: 2 }, (_, i) => i + 1);
const d11_values = Array.from({ length: 2 }, (_, i) => i + 1);
const d12_values = Array.from({ length: 2 }, (_, i) => i + 1);
const d13_values = Array.from({ length: 2 }, (_, i) => i + 1);

// Создаем пустую таблицу для результатов
const resultSheet = [];

// Функция для копирования данных и добавления результатов
function addResultToSheet(d10, d11, d12, d13) {
    // Обновляем значения в ячейках на странице "Фреон"
    freonSheet['D10'].v = d10;
    freonSheet['D11'].v = d11;
    freonSheet['D12'].v = d12;
    freonSheet['D13'].v = d13;
    console.log(22);
    // Получаем результаты с таблицы после обновления значений
    const tableData = XLSX.utils.sheet_to_json(tableSheet, { header: 1 });

    // Добавляем заголовки с параметрами D10-D13
    resultSheet.push([`D10=${d10}`, `D11=${d11}`, `D12=${d12}`, `D13=${d13}`]);

    // Добавляем данные таблицы
    tableData.forEach((row) => resultSheet.push(row));

    // Добавляем пустую строку между результатами
    resultSheet.push([]);
}

// Проходим по всем комбинациям значений
for (let d10 of d10_values) {
    for (let d11 of d11_values) {
        for (let d12 of d12_values) {
            for (let d13 of d13_values) {
                addResultToSheet(d10, d11, d12, d13);
            }
        }
    }
}

// Создаем новый лист для всех результатов
const newSheet = XLSX.utils.aoa_to_sheet(resultSheet);
XLSX.utils.book_append_sheet(workbook, newSheet, 'Результаты');

// Сохраняем результирующий Excel файл
XLSX.writeFile(workbook, 'Программа_подбора_ПК_результаты.xlsx');

console.log('Файл с результатами сохранен!');

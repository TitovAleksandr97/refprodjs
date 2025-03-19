const XLSX = require('xlsx');
const XLSX_CALC = require('xlsx-calc');
const path = require('path');
const fs = require('fs');
const ExcelJS = require('exceljs');

XLSX_CALC.import_functions({
    ROUNDUP: (value, digits) =>
        Math.ceil(value * Math.pow(10, digits)) / Math.pow(10, digits),
    LOG10: (value) => Math.log10(value),
});

const prezA = (arg) => {
    //сама функция инициализируется после констант
    console.log(arg);
    let parr9;
    if (arg.diapasonType === ' -40..+52 (Наружный НТК)') {
        parr9 = 'ME';
    } else if (arg.diapasonType === ' -60..+40 (Внутренний НТК)') {
        parr9 = 'MN';
    } else {
        parr9 = 'MV';
    }
    let limiteCycle;
    if (arg.typeComp && arg.typeComp === 'Спиральный') {
        limiteCycle = 18;
    } else {
        limiteCycle = 25;
    }
    let tempCond;
    if (arg.tempCond) {
        tempCond = arg.tempCond;
    } else {
        tempCond = '';
    }
    let airDistribution;
    if (arg.airDistribution1) {
        airDistribution = arg.airDistribution1;
    } else if (arg.airDistribution2) {
        airDistribution = arg.airDistribution2;
    } else {
        airDistribution = arg.airDistribution3;
    }
    let countCond;

    if (arg.countCond === 'Неважно') {
        countCond = 1;
    } else if (arg.countCond === '1') {
        countCond = 1;
    } else {
        countCond = 2;
    }
    let humid, heater, ntk, netto, sound;
    if (Array.isArray(arg.options)) {
        humid = arg.options.includes('Увлажнитель') ? 1 : 0;
        heater = arg.options.includes('Нагреватель') ? 1 : 0;
        ntk = arg.options.includes('Низкотемпературный комплект') ? 1 : 0;
        sound = arg.options.includes('Шумоизоляция внешних корпусных панелей')
            ? 1
            : 0;
    } else {
        humid = 0;
        heater = 0;
        ntk = 0;
        sound = 0;
    }
    if (arg.coolingCapacityCheckbox) {
        netto = 1;
    } else {
        netto = 0;
    }

    const optionsArray = [
        Array.isArray(arg.options) &&
        arg.options.includes('Низкотемпературный комплект')
            ? 'Низкотемпературный комплект: Ресивер с обогревом и термостатом, запорная арматура, регулятор давления конденсации, обратный клапан, дифф. клапан, предохранительный клапан. В общем закрытом корпусе из оцинкованной листовой стали с порошковым покрытием.'
            : '',
        Array.isArray(arg.options) &&
        arg.options.includes('Комплект длинных трасс (Встроенный)')
            ? 'Комплект длинных трасс (Встроенный): Отделитель масла, обратный клапан на нагнетании, масляный фильтр с запорными вентилями, трубопровод возврата масла в компрессор. (Комплект необходим при длине трассы более 30 метров и перепаде высот более 10 метров, а также при наличии инверторного компрессора)'
            : '',
        Array.isArray(arg.options) &&
        arg.options.includes('Дифференциальное реле перепада на фильтре')
            ? 'Дифференциальное реле перепада на фильтре'
            : '',
        Array.isArray(arg.options) &&
        arg.options.includes('Дифференциальное реле перепада на вентиляторе')
            ? 'Дифференциальное реле перепада на вентиляторе'
            : '',
        Array.isArray(arg.options) && arg.options.includes('Датчик протечки')
            ? 'Датчик протечки'
            : '',
        Array.isArray(arg.options) &&
        arg.options.includes(
            'Внутренний датчик влажности (Если не выбран увлажнитель)',
        )
            ? 'Внутренний датчик влажности (Если не выбран увлажнитель)'
            : '',
        Array.isArray(arg.options) &&
        arg.options.includes('Выносной датчик влажности (10 м)')
            ? 'Выносной датчик влажности (10 м)'
            : '',
        Array.isArray(arg.options) &&
        arg.options.includes('Выносной датчик температуры (10 м)')
            ? 'Выносной датчик температуры (10 м)'
            : '',
        Array.isArray(arg.options) &&
        arg.options.includes('Дренажная помпа с бачком для сбора конденсата')
            ? 'Дренажная помпа с бачком для сбора конденсата'
            : '',
        Array.isArray(arg.options) &&
        arg.options.includes('Упаковка кондиционера в деревянную обрешетку ')
            ? 'Упаковка кондиционера в деревянную обрешетку '
            : '',
        Array.isArray(arg.options) &&
        arg.options.includes(
            'Упаковка конденсатора и/или НТК в деревянную обрешетку (зависит от выбора опций)',
        )
            ? 'Упаковка конденсатора и/или НТК в деревянную обрешетку (зависит от выбора опций)'
            : '',
        Array.isArray(arg.options) &&
        arg.options.includes('Шумоизоляция внешних корпусных панелей')
            ? 'Шумоизоляция внешних корпусных панелей'
            : '',
        Array.isArray(arg.options) &&
        arg.options.includes(
            'Сухой аварийный контакт на отключение кондиционера',
        )
            ? 'Сухой аварийный контакт на отключение кондиционера'
            : '',
        Array.isArray(arg.options) && arg.options.includes('SNMP')
            ? 'SNMP'
            : '',
        Array.isArray(arg.options) &&
        arg.options.includes(
            'Выносной стандартный дисплей (1 дисплей управляет всеми)',
        )
            ? 'Выносной стандартный дисплей (1 дисплей управляет всеми)'
            : '',
        Array.isArray(arg.options) &&
        arg.options.includes(
            'Выносной большой дисплей (1 дисплей управляет всеми)',
        )
            ? 'Выносной большой дисплей (1 дисплей управляет всеми)'
            : '',
        Array.isArray(arg.options) &&
        arg.options.includes('Устройство плавного пуска компрессоров')
            ? 'Устройство плавного пуска компрессоров'
            : '',
        Array.isArray(arg.options) &&
        arg.options.includes(
            'Отдельный ввод питания на опции (Увлажнитель / нагреватель)',
        )
            ? 'Отдельный ввод питания на опции (Увлажнитель / нагреватель)'
            : '',
        Array.isArray(arg.options) &&
        arg.options.includes('ИБП контроллера (Быстрый старт)')
            ? 'ИБП контроллера (Быстрый старт)'
            : '',
        Array.isArray(arg.options) &&
        arg.options.includes('Устройство автоматического ввода резерва')
            ? 'Устройство автоматического ввода резерва'
            : '',
        arg.options2 && arg.options2 === 'Верхняя воздушная заслонка'
            ? 'Верхняя воздушная заслонка'
            : '',
        arg.options2 &&
        arg.options2 ===
            'Верхний пленум с воздушной заслонкой для раздачи вверх'
            ? 'Верхний пленум с воздушной заслонкой для раздачи вверх'
            : '',
        arg.options2 &&
        arg.options2 ===
            'Верхний пленум без заслонки, с решеткой для раздачи Вперед/Стороны/Назад'
            ? 'Верхний пленум без заслонки, с решеткой для раздачи Вперед/Стороны/Назад'
            : '',
        arg.options2 &&
        arg.options2 ===
            'Верхний пленум с заслонкой, с решеткой для раздачи Вперед/Стороны/Назад'
            ? 'Верхний пленум с заслонкой, с решеткой для раздачи Вперед/Стороны/Назад'
            : '',
        arg.options3 &&
        arg.options3 ===
            'Регулируемая рама-основание для раздачи под фальшпол (290-600 мм)'
            ? 'Регулируемая рама-основание для раздачи под фальшпол (290-600 мм)'
            : '',
        arg.options3 &&
        arg.options3 ===
            'Регулируемая рама-основание для раздачи под фальшпол (590-890 мм)'
            ? 'Регулируемая рама-основание для раздачи под фальшпол (590-890 мм)'
            : '',

        arg.options3 &&
        arg.options3 ===
            'Регулируемая рама-основание для раздачи под фальшпол (870-1210 мм)'
            ? 'Регулируемая рама-основание для раздачи под фальшпол (870-1210 мм)'
            : '',
        arg.options3 &&
        arg.options3 ===
            'Нижняя регулируемая опорная рама с боковыми панелями для установки над фальшполом с раздачей Вниз/Вперед/ Встороны/Назад'
            ? 'Нижняя регулируемая опорная рама с боковыми панелями для установки над фальшполом с раздачей Вниз/Вперед/ Встороны/Назад'
            : '',
        arg.options4 &&
        arg.options4 ===
            'Нижняя подставка кондиционера с раздачей вытеснением или забором спереди (250 мм)'
            ? 'Нижняя подставка кондиционера с раздачей вытеснением или забором спереди (250 мм)'
            : '',
        arg.options3 &&
        arg.options3 ===
            'Нижняя регулируемая опорная рама с боковыми панелями для установки над фальшполом с раздачей Вниз/Вперед/ Встороны/Назад'
            ? 'Высота ( Указать значение не менее 600 и не более 1210 мм):'
            : '',
    ];

    console.log('Сгенерированный хэш:', arg.hash);
    //что делает - в конечный файл запихивает данные из массива AS8
    //нужен будет после того как разберёмся с 1 таблицей
    async function excelOp(AS8) {
        // создание нового экземплеря ExcelJS.Workbook
        const workbook = new ExcelJS.Workbook();
        await workbook.xlsx.readFile(path.resolve(__dirname, 'Firde.xlsx'));
        workbook.eachSheet((worksheet, sheetId) => {
            worksheet.getCell('D10').value = AS8[0];
            worksheet.getCell('D11').value = AS8[1];
            worksheet.getCell('D12').value = AS8[2];
            worksheet.getCell('D13').value = AS8[3];
            worksheet.getCell('D14').value = AS8[4];
            worksheet.getCell('D15').value = AS8[5];
            worksheet.getCell('D16').value = AS8[6];
            worksheet.getCell('D17').value = AS8[7];
            worksheet.getCell('D18').value = AS8[8];
            worksheet.getCell('D19').value = AS8[9];
            worksheet.getCell('D20').value = AS8[10];
            worksheet.getCell('D21').value = AS8[11];
            worksheet.getCell('D22').value = AS8[12];
            worksheet.getCell('D23').value = AS8[13];
            worksheet.getCell('D24').value = AS8[14];
            worksheet.getCell('D25').value = AS8[15];
            worksheet.getCell('D26').value = AS8[16];
            worksheet.getCell('D27').value = AS8[17];
            worksheet.getCell('D28').value = AS8[18];
            worksheet.getCell('D29').value = AS8[19];
            worksheet.getCell('D30').value = AS8[20];
            worksheet.getCell('D31').value = AS8[21];
            worksheet.getCell('D32').value = AS8[22];
            worksheet.getCell('D33').value = AS8[23];
            worksheet.getCell('D34').value = AS8[24];
            worksheet.getCell('D35').value = AS8[25];
            worksheet.getCell('D36').value = AS8[26];
            worksheet.getCell('D37').value = AS8[27];
            worksheet.getCell('D38').value = AS8[28];
            worksheet.getCell('D39').value = AS8[29];
            worksheet.getCell('D40').value = AS8[30];
            worksheet.getCell('D41').value = AS8[31];
            worksheet.getCell('D42').value = AS8[32];
            worksheet.getCell('D43').value = AS8[33];
            worksheet.getCell('D44').value = AS8[34];
            worksheet.getCell('D45').value = AS8[35];
            worksheet.getCell('D46').value = AS8[36];
            worksheet.getCell('D47').value = AS8[37];
            worksheet.getCell('D48').value = AS8[38];
            worksheet.getCell('D49').value = AS8[39];
            worksheet.getCell('D50').value = AS8[40];
            worksheet.getCell('D51').value = AS8[41];
            worksheet.getCell('D52').value = AS8[42];
            worksheet.getCell('D53').value = AS8[43];
            worksheet.getCell('D54').value = AS8[44];
            worksheet.getCell('D55').value = AS8[45];
            worksheet.getCell('D56').value = AS8[46];
            worksheet.getCell('D57').value = AS8[47];
            worksheet.getCell('D58').value = AS8[48];
            worksheet.getCell('D59').value = AS8[49];
            worksheet.getCell('D75').value = AS8[50];
            worksheet.getCell('D76').value = AS8[51];
            worksheet.getCell('D77').value = AS8[52];
            worksheet.getCell('D78').value = AS8[53];
            worksheet.getCell('D79').value = AS8[54];
            worksheet.getCell('D80').value = AS8[55];
            worksheet.getCell('D81').value = AS8[56];
            worksheet.getCell('D82').value = AS8[57];
            worksheet.getCell('D83').value = AS8[58];
            worksheet.getCell('D84').value = AS8[59];
            worksheet.getCell('D85').value = AS8[60];
            worksheet.getCell('D86').value = AS8[61];
            worksheet.getCell('D87').value = AS8[62];
            worksheet.getCell('D88').value = AS8[63];
            worksheet.getCell('D89').value = AS8[64];
            worksheet.getCell('D90').value = AS8[65];
            worksheet.getCell('D91').value = AS8[66];
            worksheet.getCell('D92').value = AS8[67];
            worksheet.getCell('D93').value = AS8[68];
            worksheet.getCell('D94').value = AS8[69];
            worksheet.getCell('D95').value = AS8[70];
            worksheet.getCell('D96').value = AS8[71];
            worksheet.getCell('D97').value = AS8[72];
            worksheet.getCell('D98').value = AS8[73];
            worksheet.getCell('D99').value = AS8[74];
            worksheet.getCell('D100').value = AS8[75];
            worksheet.getCell('D101').value = AS8[76];
            worksheet.getCell('D102').value = AS8[77];
            worksheet.getCell('D103').value = AS8[78];
            worksheet.getCell('D104').value = AS8[79];
            worksheet.getCell('D105').value = AS8[80];
            worksheet.getCell('D106').value = AS8[81];
            worksheet.getCell('D107').value = AS8[82];
            worksheet.getCell('D108').value = AS8[83];
            worksheet.getCell('D109').value = AS8[84];
            worksheet.getCell('D110').value = AS8[85];
            worksheet.getCell('D111').value = AS8[86];
            worksheet.getCell('D112').value = AS8[87];
            worksheet.getCell('D113').value = AS8[88];
            worksheet.getCell('D114').value = AS8[89];
            worksheet.getCell('D115').value = AS8[90];
            worksheet.getCell('D116').value = AS8[91];
            worksheet.getCell('D117').value = AS8[92];
            worksheet.getCell('D118').value = AS8[93];
            worksheet.getCell('D119').value = AS8[94];
            worksheet.getCell('D120').value = AS8[95];
            worksheet.getCell('D121').value = AS8[96];
            worksheet.getCell('D122').value = AS8[97];
            worksheet.getCell('D123').value = AS8[98];
            worksheet.getCell('D124').value = AS8[99];
            worksheet.getCell('D125').value = AS8[100];
            worksheet.getCell('D126').value = AS8[101];
            worksheet.getCell('D127').value = AS8[102];
            worksheet.getCell('D128').value = AS8[103];
            worksheet.getCell('D129').value = AS8[104];
            worksheet.getCell('D130').value = AS8[105];
            worksheet.getCell('D131').value = AS8[106];
            worksheet.getCell('D132').value = AS8[107];
            worksheet.getCell('D133').value = AS8[108];
            worksheet.getCell('D134').value = AS8[109];
            worksheet.getCell('D135').value = AS8[110];
            worksheet.getCell('D136').value = AS8[111];
            worksheet.getCell('D137').value = AS8[112];
            worksheet.getCell('D138').value = AS8[113];
            worksheet.getCell('D139').value = AS8[114];
            worksheet.getCell('D140').value = AS8[115];
            worksheet.getCell('D141').value = AS8[116];
            worksheet.getCell('D142').value = AS8[117];
            worksheet.getCell('D143').value = AS8[118];
            worksheet.getCell('D144').value = AS8[119];
            worksheet.getCell('D145').value = AS8[120];
            worksheet.getCell('D146').value = AS8[121];
            worksheet.getCell('D147').value = AS8[122];
            worksheet.getCell('D148').value = AS8[123];
            worksheet.getCell('D149').value = AS8[124];
            worksheet.getCell('D150').value = AS8[125];
            worksheet.getCell('D151').value = AS8[126];
            worksheet.getCell('D152').value = AS8[127];
            worksheet.getCell('D153').value = AS8[128];
            worksheet.getCell('D154').value = AS8[129];
            worksheet.getCell('D155').value = AS8[130];
            worksheet.getCell('D156').value = AS8[131];
            worksheet.getCell('D157').value = AS8[132];
            worksheet.getCell('D158').value = AS8[133];
            worksheet.getCell('D159').value = AS8[134];
            worksheet.getCell('D160').value = AS8[135];
            worksheet.getCell('D161').value = AS8[136];
            worksheet.getCell('D162').value = AS8[137];
            worksheet.getCell('D189').value = AS8[138];
            worksheet.getCell('D190').value = AS8[139];
            worksheet.getCell('D191').value = AS8[140];
            worksheet.getCell('D192').value = AS8[141];
            worksheet.getCell('D193').value = AS8[142];
            worksheet.getCell('D194').value = AS8[143];
            worksheet.getCell('B209').value = optionsArray[0];
            worksheet.getCell('B210').value = optionsArray[1];
            worksheet.getCell('B211').value = optionsArray[2];
            worksheet.getCell('B212').value = optionsArray[3];
            worksheet.getCell('B213').value = optionsArray[4];
            worksheet.getCell('B214').value = optionsArray[5];
            worksheet.getCell('B215').value = optionsArray[6];
            worksheet.getCell('B216').value = optionsArray[7];
            worksheet.getCell('B217').value = optionsArray[8];
            worksheet.getCell('B218').value = optionsArray[9];
            worksheet.getCell('B219').value = optionsArray[10];
            worksheet.getCell('B220').value = optionsArray[11];
            worksheet.getCell('B221').value = optionsArray[12];
            worksheet.getCell('B222').value = optionsArray[13];
            worksheet.getCell('B223').value = optionsArray[14];
            worksheet.getCell('B224').value = optionsArray[15];
            worksheet.getCell('B225').value = optionsArray[16];
            worksheet.getCell('B226').value = optionsArray[17];
            worksheet.getCell('B227').value = optionsArray[18];
            worksheet.getCell('B228').value = optionsArray[19];
            worksheet.getCell('B229').value = optionsArray[20];
            worksheet.getCell('B230').value = optionsArray[21];
            worksheet.getCell('B231').value = optionsArray[22];
            worksheet.getCell('B232').value = optionsArray[23];
            worksheet.getCell('B233').value = optionsArray[24];
            worksheet.getCell('B234').value = optionsArray[25];
            worksheet.getCell('B235').value = optionsArray[26];
            worksheet.getCell('B236').value = optionsArray[27];
            worksheet.getCell('D236').value = optionsArray[29];
            worksheet.getCell('B239').value = optionsArray[28];
            worksheet.getCell('D238').value = optionsArray[30];
        });
        //запись в финальный файл
        workbook.xlsx.writeFile(
            path.resolve(
                __dirname,
                `../routes/excels/typeA/B${arg.hash}sss.xlsx`,
            ),
        );
    }

    // копирование файла из a в б
    fs.copyFileSync(
        // a
        path.resolve(__dirname, 'Original02-б.xlsx'),
        // б
        path.resolve(__dirname, `../routes/excels/typeA/Copy01.xlsx`),
    );

    // открываем нашу копию
    const workbook = XLSX.readFile(
        path.resolve(__dirname, `../routes/excels/typeA/Copy01.xlsx`),
    );
    // открываем лист нашей копии
    const worksheet = workbook.Sheets['Прец-Вода'];

    // добавляем в него данные из массива
    XLSX.utils.sheet_add_aoa(
        worksheet,
        [
            [arg.roomTemp],
            [arg.roomHumidity],
            [arg.inletCoolantTemp],
            [arg.outletCoolantTemp],
            [arg.altitude],
            [arg.coolantType],
            [arg.diapasonType],
            [arg.orientCond],
        ],
        {
            origin: 'B3',
        },
    );
    XLSX.utils.sheet_add_aoa(
        worksheet,
        [
            [arg.conditionerType],
            [airDistribution],
            [''],
            [arg.typeComp],
            [arg.orientNtk],
            [arg.airPressure],
            [arg.coolingCapacity],
            [''],
            [countCond],
            [1000],
            [arg.power],
            [''],
            [''],
            [arg.distance],
            [arg.distance2],
        ],
        {
            origin: 'B13',
        },
    );
    XLSX.utils.sheet_add_aoa(worksheet, [[netto]], {
        origin: 'D3',
    });
    XLSX.utils.sheet_add_aoa(worksheet, [[ntk], [humid], [heater], [sound]], {
        origin: 'D7',
    });

    for (let i = 0; i < limiteCycle; i += 1) {
        XLSX.utils.sheet_add_aoa(
            worksheet,
            [
                [worksheet.JP6.v],
                [worksheet.JP7.v],
                [worksheet.JP8.v],
                [worksheet.JP9.v],
                [worksheet.JP10.v],
                [worksheet.JP11.v],
                [worksheet.JP12.v],
                [worksheet.JP13.v],
                [worksheet.JP14.v],
                [worksheet.JP15.v],
                [worksheet.JP16.v],
                [worksheet.JP17.v],
                [worksheet.JP18.v],
                [worksheet.JP19.v],
                [worksheet.JP20.v],
                [worksheet.JP21.v],
                [worksheet.JP22.v],
                [worksheet.JP23.v],
                [worksheet.JP24.v],
                [worksheet.JP25.v],
                [worksheet.JP26.v],
                [worksheet.JP27.v],
                [worksheet.JP28.v],
                [worksheet.JP29.v],
                [worksheet.JP30.v],
                [worksheet.JP31.v],
                [worksheet.JP32.v],
                [worksheet.JP33.v],
                [worksheet.JP34.v],
                [worksheet.JP35.v],
                [worksheet.JP36.v],
                [worksheet.JP37.v],
                [worksheet.JP38.v],
                [worksheet.JP39.v],
                [worksheet.JP40.v],
                [worksheet.JP41.v],
                [worksheet.JP42.v],
                [worksheet.JP43.v],
                [worksheet.JP44.v],
                [worksheet.JP45.v],
                [worksheet.JP46.v],
                [worksheet.JP47.v],
                [worksheet.JP48.v],
                [worksheet.JP49.v],
                [worksheet.JP50.v],
                [worksheet.JP51.v],
                [worksheet.JP52.v],
                [worksheet.JP53.v],
                [worksheet.JP54.v],
                [worksheet.JP55.v],
                [worksheet.JP56.v],
                [worksheet.JP57.v],
                [worksheet.JP58.v],
                [worksheet.JP59.v],
                [worksheet.JP60.v],
                [worksheet.JP61.v],
                [worksheet.JP62.v],
                [worksheet.JP63.v],
                [worksheet.JP64.v],
                [worksheet.JP65.v],
                [worksheet.JP66.v],
                [worksheet.JP67.v],
                [worksheet.JP68.v],
                [worksheet.JP69.v],
                [worksheet.JP70.v],
                [worksheet.JP71.v],
                [worksheet.JP72.v],
                [worksheet.JP73.v],
                [worksheet.JP74.v],
                [worksheet.JP75.v],
                [worksheet.JP76.v],
                [worksheet.JP77.v],
                [worksheet.JP78.v],
                [worksheet.JP79.v],
                [worksheet.JP80.v],
                [worksheet.JP81.v],
            ],
            { origin: 'KZ6' },
        );

        XLSX.utils.sheet_add_aoa(
            worksheet,
            [
                [worksheet.IF6.v],
                [worksheet.IF7.v],
                [worksheet.IF8.v],
                [worksheet.IF9.v],
                [worksheet.IF10.v],
                [worksheet.IF11.v],
                [worksheet.IF12.v],
                [worksheet.IF13.v],
                [worksheet.IF14.v],
                [worksheet.IF15.v],
                [worksheet.IF16.v],
                [worksheet.IF17.v],
                [worksheet.IF18.v],
                [worksheet.IF19.v],
                [worksheet.IF20.v],
                [worksheet.IF21.v],
                [worksheet.IF22.v],
                [worksheet.IF23.v],
                [worksheet.IF24.v],
                [worksheet.IF25.v],
                [worksheet.IF26.v],
                [worksheet.IF27.v],
                [worksheet.IF28.v],
                [worksheet.IF29.v],
                [worksheet.IF30.v],
                [worksheet.IF31.v],
                [worksheet.IF32.v],
                [worksheet.IF33.v],
                [worksheet.IF34.v],
                [worksheet.IF35.v],
                [worksheet.IF36.v],
                [worksheet.IF37.v],
                [worksheet.IF38.v],
                [worksheet.IF39.v],
                [worksheet.IF40.v],
                [worksheet.IF41.v],
                [worksheet.IF42.v],
                [worksheet.IF43.v],
                [worksheet.IF44.v],
                [worksheet.IF45.v],
                [worksheet.IF46.v],
                [worksheet.IF47.v],
                [worksheet.IF48.v],
                [worksheet.IF49.v],
                [worksheet.IF50.v],
                [worksheet.IF51.v],
                [worksheet.IF52.v],
                [worksheet.IF53.v],
                [worksheet.IF54.v],
                [worksheet.IF55.v],
                [worksheet.IF56.v],
                [worksheet.IF57.v],
                [worksheet.IF58.v],
                [worksheet.IF59.v],
                [worksheet.IF60.v],
                [worksheet.IF61.v],
                [worksheet.IF62.v],
                [worksheet.IF63.v],
                [worksheet.IF64.v],
                [worksheet.IF65.v],
                [worksheet.IF66.v],
                [worksheet.IF67.v],
                [worksheet.IF68.v],
                [worksheet.IF69.v],
                [worksheet.IF70.v],
                [worksheet.IF71.v],
                [worksheet.IF72.v],
                [worksheet.IF73.v],
                [worksheet.IF74.v],
                [worksheet.IF75.v],
                [worksheet.IF76.v],
                [worksheet.IF77.v],
                [worksheet.IF78.v],
                [worksheet.IF79.v],
                [worksheet.IF80.v],
                [worksheet.IF81.v],
            ],
            { origin: 'IG6' },
        );

        XLSX.utils.sheet_add_aoa(
            worksheet,
            [
                [worksheet[`${parr9}6`].v],
                [worksheet[`${parr9}7`].v],
                [worksheet[`${parr9}8`].v],
                [worksheet[`${parr9}9`].v],
                [worksheet[`${parr9}10`].v],
                [worksheet[`${parr9}11`].v],
                [worksheet[`${parr9}12`].v],
                [worksheet[`${parr9}13`].v],
                [worksheet[`${parr9}14`].v],
                [worksheet[`${parr9}15`].v],
                [worksheet[`${parr9}16`].v],
                [worksheet[`${parr9}17`].v],
                [worksheet[`${parr9}18`].v],
                [worksheet[`${parr9}19`].v],
                [worksheet[`${parr9}20`].v],
                [worksheet[`${parr9}21`].v],
                [worksheet[`${parr9}22`].v],
                [worksheet[`${parr9}23`].v],
                [worksheet[`${parr9}24`].v],
                [worksheet[`${parr9}25`].v],
                [worksheet[`${parr9}26`].v],
                [worksheet[`${parr9}27`].v],
                [worksheet[`${parr9}28`].v],
                [worksheet[`${parr9}29`].v],
                [worksheet[`${parr9}30`].v],
                [worksheet[`${parr9}31`].v],
                [worksheet[`${parr9}32`].v],
                [worksheet[`${parr9}33`].v],
                [worksheet[`${parr9}34`].v],
                [worksheet[`${parr9}35`].v],
                [worksheet[`${parr9}36`].v],
                [worksheet[`${parr9}37`].v],
                [worksheet[`${parr9}38`].v],
                [worksheet[`${parr9}39`].v],
                [worksheet[`${parr9}40`].v],
                [worksheet[`${parr9}41`].v],
                [worksheet[`${parr9}42`].v],
                [worksheet[`${parr9}43`].v],
                [worksheet[`${parr9}44`].v],
                [worksheet[`${parr9}45`].v],
                [worksheet[`${parr9}46`].v],
                [worksheet[`${parr9}47`].v],
                [worksheet[`${parr9}48`].v],
                [worksheet[`${parr9}49`].v],
                [worksheet[`${parr9}50`].v],
                [worksheet[`${parr9}51`].v],
                [worksheet[`${parr9}52`].v],
                [worksheet[`${parr9}53`].v],
                [worksheet[`${parr9}54`].v],
                [worksheet[`${parr9}55`].v],
                [worksheet[`${parr9}56`].v],
                [worksheet[`${parr9}57`].v],
                [worksheet[`${parr9}58`].v],
                [worksheet[`${parr9}59`].v],
                [worksheet[`${parr9}60`].v],
                [worksheet[`${parr9}61`].v],
                [worksheet[`${parr9}62`].v],
                [worksheet[`${parr9}63`].v],
                [worksheet[`${parr9}64`].v],
                [worksheet[`${parr9}65`].v],
                [worksheet[`${parr9}66`].v],
                [worksheet[`${parr9}67`].v],
                [worksheet[`${parr9}68`].v],
                [worksheet[`${parr9}69`].v],
                [worksheet[`${parr9}70`].v],
                [worksheet[`${parr9}71`].v],
                [worksheet[`${parr9}72`].v],
                [worksheet[`${parr9}73`].v],
                [worksheet[`${parr9}74`].v],
                [worksheet[`${parr9}75`].v],
                [worksheet[`${parr9}76`].v],
                [worksheet[`${parr9}77`].v],
                [worksheet[`${parr9}78`].v],
                [worksheet[`${parr9}79`].v],
                [worksheet[`${parr9}80`].v],
                [worksheet[`${parr9}81`].v],
            ],
            { origin: 'LA6' },
        );

        XLSX_CALC(workbook, { continue_after_error: true, log_error: true });
    }
    let AS8;
    AS8 = [
        arg.roomTemp,
        arg.roomHumidity,
        arg.inletCoolantTemp,
        arg.outletCoolantTemp,
        arg.altitude,
        arg.coolantType,
        arg.diapasonType,
        arg.orientCond,
        tempCond,
        '',
        arg.conditionerType,
        airDistribution,
        '',
        arg.typeComp,
        arg.orientNtk,
        arg.airPressure,
        arg.coolingCapacity,
        '',
        countCond,
        '',
        arg.power,
        worksheet.D27.v,
        worksheet.D28.v[0],
        worksheet.D29.v[0],
        worksheet.D30.v[0],
        worksheet.D30.v[0] - worksheet.D36.v[0],
        worksheet.D30.v[0] / worksheet.D29.v[0],
        worksheet.D33.v[0],
        worksheet.D34.v[0],
        worksheet.D35.v,
        worksheet.D36.v[0],
        worksheet.D37.v[0],
        worksheet.D33.v[0] + worksheet.D36.v[0],
        worksheet.D34.v[0] + worksheet.D37.v[0],
        worksheet.D40.v,
        worksheet.D41.v[0],
        worksheet.D42.v,
        worksheet.D43.v,
        worksheet.D44.v,
        worksheet.D45.v,
        worksheet.D46.v,
        worksheet.D47.v,
        worksheet.D48.v,
        worksheet.D49.v,
        worksheet.D50.v,
        '',
        '',
        worksheet.D53.v[0],
        worksheet.D54.v[0],
        worksheet.D55.v[0],
        worksheet.D71.v[0],
        worksheet.D72.v[0],
        worksheet.D73.v[0],
        worksheet.D74.v[0],
        worksheet.D75.v[0],
        worksheet.D76.v[0],
        worksheet.D77.v[0],
        worksheet.D78.v[0],
        worksheet.D79.v[0],
        worksheet.D80.v[0],
        worksheet.D81.v[0],
        worksheet.D82.v[0],
        worksheet.D83.v[0],
        '',
        'M5',
        '',
        worksheet.D87.v[0],
        worksheet.D88.v[0],
        worksheet.D89.v[0],
        worksheet.D90.v[0],
        worksheet.D91.v[0],
        worksheet.D92.v[0],
        worksheet.D93.v[0],
        worksheet.D94.v[0],
        '',
        '',
        worksheet.D97.v[0],
        worksheet.D98.v,
        worksheet.D99.v,
        worksheet.D100.v,
        worksheet.D101.v[0],
        '',
        '',
        worksheet.D104.v[0],
        worksheet.D105.v,
        worksheet.D106.v[0],
        worksheet.D107.v[0],
        worksheet.D108.v[0],
        worksheet.D109.v,
        worksheet.D110.v[0],
        '',
        '',
        '',
        worksheet.D114.v,
        worksheet.D115.v,
        worksheet.D116.v,
        worksheet.D117.v,
        worksheet.D118.v,
        worksheet.D119.v,
        worksheet.D120.v,
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        'Страница: 2/4',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        worksheet.D138.v,
        worksheet.D139.v,
        worksheet.D140.v,
        worksheet.D141.v,
        worksheet.D142.v,
        worksheet.D143.v,
        worksheet.D144.v,
        worksheet.D145.v,
        worksheet.D146.v,
        worksheet.D147.v,
        worksheet.D148.v,
        worksheet.D149.v,
        worksheet.D150.v,
        worksheet.D151.v,
        worksheet.D152.v,
        worksheet.D153.v,
        worksheet.D154.v,
        worksheet.D155.v,
        worksheet.D156.v,
        worksheet.D157.v,
        worksheet.D158.v,
        worksheet.D185.v,
        worksheet.D186.v,
        worksheet.D187.v,
        '',
        worksheet.D189.v,
        worksheet.D190.v,
        worksheet.D26.v,
    ];

    XLSX.writeFile(
        workbook,
        path.resolve(__dirname, `../routes/excels/typeA/Second01.xlsx`),
    );

    //вызов второй функции
    excelOp(AS8);
    let result;
    if (AS8[AS8.length - 1] === 0) {
        result = [
            AS8[21],
            ' Фреон ' + AS8[22] + ' ',
            ' Q = ' + AS8[23].toFixed(2) + ' кВт ',
            ' Qя = ' + AS8[24].toFixed(2) + ' кВт ',
            ' Qн = ' + AS8[25].toFixed(2) + ' кВт ',
            ' SHR = ' + AS8[26].toFixed(2) + ' ',
            ' Pк = ' + AS8[27].toFixed(2) + ' кВт ',
            ' Iк = ' + AS8[28].toFixed(2) + ' A ',
        ];
    } else {
        result = AS8[AS8.length - 1];
    }
    return { result };
};

module.exports = {
    prezA,
};

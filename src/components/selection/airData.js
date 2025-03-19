export const airFormFields = [
    {
        name: 'roomTemp',
        label: 'Температура воздуха в помещении (на входе в кондиционер) °C',
        rules: {
            required: true,
            message: 'Введите температуру воздуха в помещении',
            type: 'number',
            min: 0,
            max: 100,
        },
        defaultValue: 25,
    },
    {
        name: 'roomHumidity',
        label: 'Влажность в помещении (на входе в кондиционер) %',
        rules: {
            required: true,
            message: 'Введите влажность в помещении',
            type: 'number',
            min: 0,
            max: 100,
        },
        defaultValue: 35,
    },
    {
        name: 'inletCoolantTempA',
        label: 'Температура наружного воздуха °C',
        rules: {
            required: true,
            message: 'Введите температуру наружного воздуха',
            type: 'number',
            min: 0,
            max: 100,
        },
        showIf: (values) => values.coolantType !== 'Водяной',
        defaultValue: 40,
    },
    //Water
    {
        name: 'inletCoolantTempB',
        label: 'Температура теплоносителя на входе в конденсатор °C',
        rules: {
            required: true,
            message: 'Введите температуру наружного воздуха',
            type: 'number',
            min: 0,
            max: 100,
        },
        showIf: (values) => values.coolantType === 'Водяной',
        defaultValue: 40,
    },
    {
        name: 'outletCoolantTempA',
        label: 'Относительная влажность наружного воздуха  %',
        rules: {
            required: true,
            message: 'Введите относительную влажность наружного воздуха',
            type: 'number',
            min: 0,
            max: 100,
        },
        showIf: (values) => values.coolantType !== 'Водяной',
        defaultValue: 50,
    },
    //Water
    {
        name: 'outletCoolantTempB',
        label: 'Температура теплоносителя на выходе из конденсатора °C',
        rules: {
            required: true,
            message:
                'Введите температура теплоносителя на выходе из конденсатора',
            type: 'number',
            min: 0,
            max: 100,
        },
        showIf: (values) => values.coolantType === 'Водяной',
        defaultValue: 50,
    },
    {
        name: 'altitude',
        label: 'Высота над уровнем моря, метры',
        rules: {
            required: true,
            message: 'Введите высоту в метрах',
            type: 'number',
            min: 0,
            max: 3000,
        },
        defaultValue: 0,
    },
    {
        name: 'coolantType',
        label: 'Тип конденсатора',
        options: ['Воздушный', 'Водяной', 'Без конденсатора'],
        type: 'select',
        defaultValue: 'Воздушный',
    },
    {
        name: 'diapasonTypeA',
        label: 'Диапазон работы воздушного конденсатора',
        options: [' -40..+52 (Наружный НТК)', ' -60..+40 (Внутренний НТК)'],
        type: 'select',
        showIf: (values) => values.coolantType === 'Воздушный',
        defaultValue: ' -40..+52 (Наружный НТК)',
    },
    {
        name: 'diapasonTypeB',
        label: 'Теплоноситель водяного конденсатора',
        options: ['Пропиленгликоль', 'Этиленгликоль', 'Вода'],
        type: 'select',
        showIf: (values) => values.coolantType === 'Водяной',
        defaultValue: 'Пропиленгликоль',
    },
    {
        name: 'tempCond',
        label: 'Температура конденсации',
        rules: {
            required: true,
            message: 'Введите температуру конденсации',
            type: 'number',
            min: 0,
            max: 100,
        },
        showIf: (values) => values.coolantType === 'Без конденсатора',
        defaultValue: 38,
    },
    {
        name: 'orientCond',
        label: 'Ориентация конденсатора',
        options: ['Горизонтальный', 'Вертикальный'],
        type: 'select',
        showIf: (values) => values.coolantType === 'Воздушный',
        defaultValue: 'Горизонтальный',
    },
    {
        name: 'orientCond2',
        label: 'Содержание гликоля в растворе %',
        rules: {
            required: true,
            message: 'Введите температуру конденсации',
            type: 'number',
            min: 0,
            max: 100,
        },
        showIf: (values) =>
            values.coolantType === 'Водяной' && values.diapasonTypeB !== 'Вода',
        defaultValue: 40,
    },

    {
        name: 'conditionerType',
        label: 'Тип кондиционера',
        type: 'select',
        options: ['Шкафной', 'Межрядный', 'Шкафной с выносной вент группой'],
        defaultValue: 'Шкафной',
    },
    {
        name: 'airDistribution1',
        label: 'Раздача воздуха',
        type: 'select',
        options: () => {
            return [
                'Вниз, забор сверху',
                'Вверх, забор спереди',
                'Вверх, забор снизу',
                'Вперед, забор сверху',
            ];
        },
        showIf: (values) => values.conditionerType === 'Шкафной',
        defaultValue: 'Вниз, забор сверху',
    },
    {
        name: 'airDistribution2',
        label: 'Раздача воздуха',
        type: 'select',
        options: () => {
            return ['Вперед, забор сзади', 'Спереди по бокам, забор сзади'];
        },
        showIf: (values) => values.conditionerType === 'Межрядный',
        defaultValue: 'Вперед, забор сзади',
    },

    {
        name: 'airDistribution3',
        label: 'Раздача воздуха',
        type: 'select',
        options: () => {
            return ['Вниз, забор сверху'];
        },
        showIf: (values) =>
            values.conditionerType === 'Шкафной с выносной вент группой',
        defaultValue: 'Вниз, забор сверху',
    },

    // {
    //     name: 'airDistribution2',
    //     label: 'Раздача воздуха',
    //     type: 'select',
    //     options: (values) => {
    //         if (values.conditionerType === 'Шкафной') {
    //             return [
    //                 'Вниз, забор сверху',
    //                 'Вверх, забор спереди',
    //                 'Вверх, забор снизу',
    //                 'Вперед, забор сверху',
    //             ];
    //         } else if (values.conditionerType === 'Межрядный') {
    //             return ['Вперед, забор сзади', 'Спереди по бокам, забор сзади'];
    //         } else if (
    //             values.conditionerType === 'Шкафной с выносной вент группой'
    //         ) {
    //             return ['Вниз, забор сверху'];
    //         } else {
    //             return [
    //                 'Вниз, забор сверху',
    //                 'Вверх, забор спереди',
    //                 'Вверх, забор снизу',
    //                 'Вперед, забор сверху',
    //             ];
    //         }
    //     },
    //     showIf: (values) =>
    //         values.conditionerType !== 'Шкафной с выносной вент группой',
    //     defaultValue: 'Вниз, забор сверху',
    // },
    {
        name: 'typeComp',
        label: 'Тип компрессора',
        options: ['Спиральный', 'Спиральный инверторный'],
        type: 'select',
        defaultValue: 'Спиральный',
    },
    {
        name: 'orientNtk',
        label: 'Ориентация НТК',
        options: ['Горизонтальный', 'Вертикальный', 'Без НТК'],
        type: 'select',
        defaultValue: 'Горизонтальный',
    },

    {
        name: 'airPressure',
        label: 'Напор воздуха на выходе из кондиционера (не выше AESP) Па',
        rules: {
            required: true,
            message: 'Введите напор воздуха',
            type: 'number',
            min: 0,
            max: 5000,
        },
        defaultValue: 20,
    },
    {
        name: 'coolingCapacity',
        label: 'Требуемая полная холодопроизводительность кВт',
        rules: {
            required: true,
            message: 'Введите холодопроизводительность',
            type: 'number',
            min: 0,
            max: 1000,
        },
        defaultValue: 26,
    },
    {
        name: 'coolingCapacityCheckbox',
        type: 'checkbox',
        label: 'Нетто',
        defaultValue: 0,
    },
    {
        name: 'countCond',
        label: 'Количество контуров',
        options: ['Неважно', '1', '2'],
        type: 'select',
        defaultValue: 'Неважно',
    },
    {
        name: 'power',
        label: 'Питание',
        options: ['400/3/50', '220/1/50'],
        type: 'select',
        defaultValue: '400/3/50',
    },
    {
        name: 'distance',
        label: 'Расстояние между блоками (длина трассы)',
        rules: {
            required: true,
            message: 'Введите Расстояние между блоками (длина трассы)',
            type: 'number',
            min: 1,
            max: 100,
        },
        defaultValue: 30,
    },
    {
        name: 'distance2',
        label: 'Перепад высоты между блоками',
        rules: {
            required: true,
            message: 'Введите Перепад высоты между блоками',
            type: 'number',
            min: 1,
            max: 100,
        },
        defaultValue: 10,
    },
    {
        name: 'manufacturer',
        label: 'Производитель',
        options: ['Рефкул', 'HTS'],
        type: 'select',
        defaultValue: 'Рефкул',
    },
    {
        name: 'numberKP',
        label: 'Номер KП',
        rules: {
            message: 'Введите номер KП',
            type: 'number',
        },
        showIf: (values) => values.manufacturer === 'HTS',
        defaultValue: '',
    },
    {
        name: 'options',
        label: 'Опции',
        type: 'select',
        mode: 'multiple',
        options: [
            'Низкотемпературный комплект',
            'Увлажнитель',
            'Нагреватель',
            'Комплект длинных трасс (Встроенный)',
            'Дифференциальное реле перепада на фильтре',
            'Дифференциальное реле перепада на вентиляторе',
            'Датчик протечки',
            'Внутренний датчик влажности (Если не выбран увлажнитель)',
            'Выносной датчик влажности (10 м)',
            'Выносной датчик температуры (10 м)',
            'Дренажная помпа с бачком для сбора конденсата',
            'Упаковка кондиционера в деревянную обрешетку ',
            'Упаковка конденсатора и/или НТК в деревянную обрешетку (зависит от выбора опций)',
            'Шумоизоляция внешних корпусных панелей',
            'Сухой аварийный контакт на отключение кондиционера',
            'SNMP',
            'Выносной стандартный дисплей (1 дисплей управляет всеми)',
            'Выносной большой дисплей (1 дисплей управляет всеми)',
            'Устройство плавного пуска компрессоров',
            'Отдельный ввод питания на опции (Увлажнитель / нагреватель)',
            'ИБП контроллера (Быстрый старт)',
            'Устройство автоматического ввода резерва',
        ],
    },
    {
        name: 'options2',
        label: 'Пленум / заслонка',
        type: 'select',
        options: [
            '',
            'Верхняя воздушная заслонка',
            'Верхний пленум с воздушной заслонкой для раздачи вверх',
            'Верхний пленум без заслонки, с решеткой для раздачи Вперед/Стороны/Назад',
            'Верхний пленум с заслонкой, с решеткой для раздачи Вперед/Стороны/Назад',
        ],
        showIf: (values) => values.conditionerType !== 'Межрядный',
    },
    {
        name: 'options3',
        label: 'Рама',
        type: 'select',
        options: [
            '',
            'Регулируемая рама-основание для раздачи под фальшпол (290-600 мм)',
            'Регулируемая рама-основание для раздачи под фальшпол (590-890 мм)',
            'Регулируемая рама-основание для раздачи под фальшпол (870-1210 мм)',
            'Нижняя регулируемая опорная рама с боковыми панелями для установки над фальшполом с раздачей Вниз/Вперед/ Встороны/Назад',
        ],
        showIf: (values) => values.conditionerType !== 'Межрядный',
    },
    {
        name: 'options4',
        label: 'Нижняя подставка',
        type: 'select',
        options: [
            '',
            'Нижняя подставка кондиционера с раздачей вытеснением или забором спереди (250 мм)',
        ],
        showIf: (values) => values.conditionerType !== 'Межрядный',
    },

    // {
    //     name: 'airFlowAdjustment',
    //     label: 'Корректировка расхода воздуха через испаритель',
    //     rules: {
    //         required: true,
    //         message: 'Введите корректировку',
    //         type: 'number',
    //         min: 0,
    //         max: 50000,
    //     },
    //     defaultValue: 5660,
    // },
    // {
    //     name: 'airFlowAdjustmentCheckbox',
    //     type: 'checkbox',
    //     label: 'Есть/Нет',
    //     defaultValue: 0,
    // },
];

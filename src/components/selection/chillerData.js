export const chillerFormFields = [
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
        defaultValue: 34,
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
        defaultValue: 30,
    },
    {
        name: 'inletCoolantTemp',
        label: 'Температура хладоносителя на входе в кондиционер °C',
        rules: {
            required: true,
            message: 'Введите температуру хладоносителя на входе',
            type: 'number',
            min: 0,
            max: 100,
        },
        defaultValue: 12.5,
    },
    {
        name: 'outletCoolantTemp',
        label: 'Температура хладоносителя на выходе из кондиционера °C',
        rules: {
            required: true,
            message: 'Введите температуру хладоносителя на выходе',
            type: 'number',
            min: 0,
            max: 100,
        },
        defaultValue: 17,
    },
    {
        name: 'altitude',
        label: 'Высота над уровнем моря м',
        rules: {
            required: true,
            message: 'Введите высоту',
            type: 'number',
            min: 0,
            max: 3000,
        },
        defaultValue: 0,
    },
    {
        name: 'coolantType',
        label: 'Тип хладоносителя',
        options: ['Пропиленгликоль', 'Этиленгликоль', 'Вода'],
        type: 'select',
        defaultValue: 'Вода',
    },
    {
        name: 'glycolContent',
        label: 'Содержание гликоля в растворе %',
        rules: {
            required: true,
            message: 'Введите содержание гликоля',
            type: 'number',
            min: 0,
            max: 65,
        },
        showIf: (values) =>
            values.coolantType === 'Пропиленгликоль' ||
            values.coolantType === 'Этиленгликоль',
        defaultValue: 0,
    },
    {
        name: 'conditionerType',
        label: 'Тип кондиционера',
        options: ['Шкафной', 'Межрядный', 'Шкафной с выносной вент группой'],
        type: 'select',
        defaultValue: 'Шкафной',
    },
    {
        name: 'airDistribution',
        label: 'Раздача воздуха',
        options: (values) => {
            if (values.conditionerType === 'Шкафной') {
                return [
                    'Вниз, забор сверху',
                    'Вверх, забор спереди',
                    'Вверх, забор снизу',
                    'Вперед, забор сверху',
                ];
            } else if (values.conditionerType === 'Межрядный') {
                return ['Вперед, забор сзади', 'Спереди по бокам, забор сзади'];
            } else if (
                values.conditionerType === 'Шкафной с выносной вент группой'
            ) {
                return ['Вниз, забор сверху'];
            } else {
                return [
                    'Вниз, забор сверху',
                    'Вверх, забор спереди',
                    'Вверх, забор снизу',
                    'Вперед, забор сверху',
                ];
            }
        },
        showIf: (values) =>
            values.conditionerType !== 'Шкафной с выносной вент группой',
        type: 'select',
        defaultValue: 'Вниз, забор сверху',
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
        name: 'airFlowAdjustment',
        label: 'Корректировка расхода воздуха через испаритель',
        rules: {
            required: true,
            message: 'Введите корректировку',
            type: 'number',
            min: 0,
            max: 50000,
        },
        defaultValue: 5660,
    },
    {
        name: 'airFlowAdjustmentCheckbox',
        type: 'checkbox',
        label: 'Есть/Нет',
        defaultValue: 0,
    },
];

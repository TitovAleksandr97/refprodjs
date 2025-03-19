export const waterFormFields = [
    {
        name: 'roomTemp',
        label: 'Температура воздуха в помещении (на входе в кондиционер) C°',
        rules: {
            required: true,
            message: 'Введите температуру в помещении',
            type: 'number',
            min: 16,
            max: 45,
        },
    },
    {
        name: 'roomHumidity',
        label: 'Влажность в помещении (на входе в кондиционер) %',
        rules: {
            required: true,
            message: 'Введите влажность в помещении',
            type: 'number',
            min: 0,
            max: 70,
        },
    },
    {
        name: 'outdoorTemp',
        label: 'Температура наружного воздуха C°',
        rules: {
            required: true,
            message: 'Введите температуру наружного воздуха',
            type: 'number',
            min: -30,
            max: 52,
        },
    },
    {
        name: 'altitude',
        label: 'Высота над уровнем моря м',
        rules: {
            required: true,
            message: 'Введите высоту',
            type: 'number',
            min: 0,
            max: 4000,
        },
    },
];

import { Button, Checkbox, Form, InputNumber, Select, message } from 'antd';
import { useEffect } from 'react';
import { useState } from 'react';
import { chillerFormFields } from '@/components/selection/chillerData.js';
import axios from 'axios';
import classes from './SelectionPagePrezWater.module.scss'; // Import SCSS module

const SelectionPagePrezWater = () => {
    const [form] = Form.useForm();
    const [formValues, setFormValues] = useState({});
    const [result, setResult] = useState(null);
    const [age, setAge] = useState(false);
    const [hash, setHash] = useState('');

    function Greeting() {
        console.log(hash, '444');
        if (age) {
            return (
                <a
                    href={`https://refcool-app.ru/api/excels/typeA/B${hash}sss.xlsx`}
                >
                    <Button>Скачать</Button>
                </a>
            );
        } else return <></>;
    }
    // Прокрутка вниз при изменении результата
    useEffect(() => {
        if (result) {
            window.scrollTo({
                top: document.body.scrollHeight,
                behavior: 'smooth',
            });
        }
    }, [result]);
    const handleValuesChange = (changedValues, allValues) => {
        setFormValues(allValues);
    };

    const handleSubmit = async (values) => {
        setAge(false);

        // Генерация нового хэша при каждом нажатии на кнопку
        const chrs = 'abdehkmnpswxzABDEFGHKMNPQRSTWXZ123456789';
        let str = '';
        for (let i = 0; i < 10; i += 1) {
            let pos = Math.floor(Math.random() * chrs.length);
            str += chrs.substring(pos, pos + 1);
        }
        const processedValues = {
            ...values,
            coolingCapacityCheckbox: values.coolingCapacityCheckbox ? 1 : 0,
            airFlowAdjustmentCheckbox: values.airFlowAdjustmentCheckbox ? 1 : 0,
            airDistribution: values.airDistribution
                ? values.airDistribution
                : 'Вниз, забор сверху',
        };

        console.log('Сгенерированный хэш:', str);
        const formDataArray = [
            processedValues.roomTemp, // Температура воздуха в помещении
            processedValues.roomHumidity, // Влажность в помещении
            processedValues.inletCoolantTemp, // Температура хладоносителя на входе
            processedValues.outletCoolantTemp, // Температура хладоносителя на выходе
            processedValues.altitude, // Высота над уровнем моря
            processedValues.coolantType, // Тип хладоносителя
            processedValues.glycolContent ? processedValues.glycolContent : 0, // Содержание гликоля
            processedValues.conditionerType, // Тип кондиционера
            processedValues.airDistribution, // Раздача воздуха
            processedValues.airPressure, // Напор воздуха
            processedValues.coolingCapacity, // Холодопроизводительность
            processedValues.coolingCapacityCheckbox, // Чекбокс для нетто
            processedValues.airFlowAdjustment, // Корректировка расхода воздуха
            processedValues.airFlowAdjustmentCheckbox, // Чекбокс для корректировки
            str, // Сгенерированный хэш
        ];
        try {
            console.log(
                'Массив данных, отправляемый на бэкенд:',
                formDataArray,
                str,
            );

            const response = await axios.post(
                'https://refcool-app.ru/api/calculate',
                formDataArray,
            );
            message.success('Расчёт произведён!');

            // Устанавливаем результат и хэш после успешного запроса
            setResult(response.data.result);
            setHash(str); // Устанавливаем хэш в состоянии после успешного расчета
            setAge(true);

            console.log('Результат и хэш:', response.data.result, str);
        } catch (error) {
            message.error('Ошибка при отправке данных.');
            console.error('Ошибка отправки:', error);
        }
    };

    const renderFormFields = (fields) => {
        return fields.map((field) => {
            if (field.showIf && !field.showIf(formValues)) {
                return null;
            }
            // Рендер выпадающих списков
            if (field.type === 'select') {
                const options =
                    typeof field.options === 'function'
                        ? field.options(formValues)
                        : field.options;
                return (
                    <Form.Item
                        key={field.name}
                        name={field.name}
                        label={field.label}
                        rules={[field.rules]}
                        initialValue={field.defaultValue}
                    >
                        <Select style={{ width: '100%' }}>
                            {options.map((option) => (
                                <Option key={option} value={option}>
                                    {option}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>
                );
            }
            // Рендер чекбоксов
            if (field.type === 'checkbox') {
                return (
                    <Form.Item
                        key={field.name}
                        name={field.name}
                        valuePropName="checked"
                        initialValue={field.defaultValue}
                    >
                        <Checkbox>{field.label}</Checkbox>
                    </Form.Item>
                );
            }

            // Рендер числовых полей
            return (
                <Form.Item
                    key={field.name}
                    name={field.name}
                    label={field.label}
                    rules={[field.rules]}
                    initialValue={field.defaultValue}
                >
                    <InputNumber style={{ width: '100%' }} />
                </Form.Item>
            );
        });
    };
    return (
        <div className={classes.container}>
            {' '}
            {/* Add a container div */}
            <Form
                form={form}
                layout="vertical"
                requiredMark={false}
                onValuesChange={handleValuesChange}
                onFinish={handleSubmit}
            >
                {renderFormFields(chillerFormFields)}

                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Рассчитать
                    </Button>
                </Form.Item>

                {result && (
                    <div>
                        <h3>Результат расчёта:</h3>
                        <p>{result.result}</p>
                    </div>
                )}
                <br />
                {Greeting()}
                <br />
                <br />
            </Form>
        </div>
    );
};

export default SelectionPagePrezWater;

import {
    Button,
    Checkbox,
    Form,
    InputNumber,
    Select,
    message,
    Table,
    Input,
} from 'antd';
import { useEffect } from 'react';
import { Row, Col } from 'antd';
import { useState } from 'react';
import { airFormFields } from '@/components/selection/airData.js';
import axios from 'axios';
import classes from './SelectionPagePrezFreonAir.module.scss'; // Import SCSS module

const SelectionPagePrezFreonAir = () => {
    const [form] = Form.useForm();
    const [formValues, setFormValues] = useState({});
    const [result, setResult] = useState(null);
    const [results, setResults] = useState([]);
    const [age, setAge] = useState(false);
    const [hash, setHash] = useState('');
    const initialValues = airFormFields.reduce((acc, field) => {
        acc[field.name] = field.defaultValue;
        return acc;
    }, {});

    function showButton() {
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

    useEffect(() => {
        if (results) {
            window.scrollTo({
                top: document.body.scrollHeight,
                behavior: 'smooth',
            });
        }
    }, [results]);

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
        let value3, value4, value5, value6, value7;
        if (values.coolantType === 'Воздушный') {
            value3 = values.inletCoolantTempA;
        } else if (values.coolantType === 'Водяной') {
            value3 = values.inletCoolantTempB;
        }
        if (values.coolantType === 'Воздушный') {
            value4 = values.outletCoolantTempA;
        } else if (values.coolantType === 'Водяной') {
            value4 = values.outletCoolantTempB;
        }
        if (values.coolantType === 'Воздушный') {
            value4 = values.outletCoolantTempA;
        } else if (values.coolantType === 'Водяной') {
            value4 = values.outletCoolantTempB;
        }

        if (values.coolantType === 'Воздушный') {
            value5 = values.diapasonTypeA;
        } else if (values.coolantType === 'Водяной') {
            value5 = values.diapasonTypeB;
        }

        value6 = values.orientCond ? values.orientCond : values.orientCond2;
        value7 = values.tempCond ? values.tempCond : '';
        const formDataArray = {
            roomTemp: values.roomTemp,
            roomHumidity: values.roomHumidity,
            inletCoolantTemp: value3,
            outletCoolantTemp: value4,
            altitude: values.altitude,
            coolantType: values.coolantType,
            diapasonType: value5,
            tempCond: value7,
            orientCond: value6,
            conditionerType: values.conditionerType,
            airDistribution1: values.airDistribution1,
            airDistribution2: values.airDistribution2,
            airDistribution3: values.airDistribution3,
            typeComp: values.typeComp,
            orientNtk: values.orientNtk,
            airPressure: values.airPressure,
            coolingCapacity: values.coolingCapacity,
            coolingCapacityCheckbox: values.coolingCapacityCheckbox,
            countCond: values.countCond,
            power: values.power,
            distance: values.distance,
            distance2: values.distance2,
            manufacturer: values.manufacturer,
            numberKP: values.numberKP,
            options: values.options,
            options2: values.options2,
            options3: values.options3,
            options4: values.options4,
            hash: str,
        };

        try {
            console.log(
                'Массив данных, отправляемый на бэкенд:',
                formDataArray,
            );

            const response = await axios.post(
                'https://refcool-app.ru/api/prezA',
                formDataArray,
            );
            message.success('Расчёт произведён!');

            // Устанавливаем результат и хэш после успешного запроса
            setResults([...results, response.data.result]);
            setResult(response.data.result);
            setHash(str); // Устанавливаем хэш в состоянии после успешного расчета
            setAge(true);
            console.log('Результат и хэш:', response.data.result, str);
        } catch (error) {
            message.error('Ошибка при отправке данных.');
            console.error('Ошибка отправки:', error);
        }
    };
    const { Option } = Select;
    const renderFormFields = (fields) => {
        const currentValues = { ...initialValues, ...formValues };
        const firstColumnFields = fields.slice(0, Math.ceil(fields.length / 2));
        const secondColumnFields = fields.slice(
            Math.ceil(fields.length / 2),
            26,
        );
        const thirdColumnFields = fields.slice(26);

        return (
            <Row gutter={16}>
                <Col span={8}>
                    {firstColumnFields.map((field) => {
                        if (field.showIf && !field.showIf(currentValues)) {
                            return null;
                        }

                        if (field.type === 'select') {
                            const options =
                                typeof field.options === 'function'
                                    ? field.options(currentValues)
                                    : field.options;
                            return (
                                <Form.Item
                                    key={field.name}
                                    name={field.name}
                                    label={field.label}
                                    rules={field.rules ? [field.rules] : []}
                                    initialValue={
                                        typeof field.defaultValue === 'function'
                                            ? field.defaultValue(currentValues)
                                            : field.defaultValue
                                    }
                                >
                                    <Select style={{ width: '300px' }}>
                                        {Array.isArray(options) &&
                                            options.map((option) => (
                                                <Option
                                                    key={option}
                                                    value={option}
                                                >
                                                    {option}
                                                </Option>
                                            ))}
                                    </Select>
                                </Form.Item>
                            );
                        }
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

                        return (
                            <Form.Item
                                key={field.name}
                                name={field.name}
                                label={field.label}
                                rules={field.rules ? [field.rules] : []}
                                initialValue={
                                    typeof field.defaultValue === 'function'
                                        ? field.defaultValue(currentValues)
                                        : field.defaultValue
                                }
                            >
                                <InputNumber />
                            </Form.Item>
                        );
                    })}
                </Col>
                <Col span={6}>
                    {secondColumnFields.map((field) => {
                        if (field.showIf && !field.showIf(currentValues)) {
                            return null;
                        }

                        if (field.type === 'select') {
                            const options =
                                typeof field.options === 'function'
                                    ? field.options(currentValues)
                                    : field.options;
                            return (
                                <Form.Item
                                    key={field.name}
                                    name={field.name}
                                    label={field.label}
                                    rules={field.rules ? [field.rules] : []}
                                    initialValue={
                                        typeof field.defaultValue === 'function'
                                            ? field.defaultValue(currentValues)
                                            : field.defaultValue
                                    }
                                >
                                    <Select style={{ width: '300px' }}>
                                        {Array.isArray(options) &&
                                            options.map((option) => (
                                                <Option
                                                    key={option}
                                                    value={option}
                                                >
                                                    {option}
                                                </Option>
                                            ))}
                                    </Select>
                                </Form.Item>
                            );
                        }
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

                        return (
                            <Form.Item
                                key={field.name}
                                name={field.name}
                                label={field.label}
                                rules={field.rules ? [field.rules] : []}
                                initialValue={
                                    typeof field.defaultValue === 'function'
                                        ? field.defaultValue(currentValues)
                                        : field.defaultValue
                                }
                            >
                                <InputNumber />
                            </Form.Item>
                        );
                    })}
                </Col>
                <Col span={10}>
                    {thirdColumnFields.map((field) => {
                        if (field.showIf && !field.showIf(currentValues)) {
                            return null;
                        }

                        if (field.type === 'select') {
                            const options =
                                typeof field.options === 'function'
                                    ? field.options(currentValues)
                                    : field.options;
                            return (
                                <Form.Item
                                    key={field.name}
                                    name={field.name}
                                    label={field.label}
                                    rules={field.rules ? [field.rules] : []}
                                    initialValue={
                                        typeof field.defaultValue === 'function'
                                            ? field.defaultValue(currentValues)
                                            : field.defaultValue
                                    }
                                >
                                    <Select
                                        style={{ width: '550px' }}
                                        mode={field.mode || 'default'}
                                    >
                                        {Array.isArray(options) &&
                                            options.map((option) => (
                                                <Option
                                                    key={option}
                                                    value={option}
                                                >
                                                    {option}
                                                </Option>
                                            ))}
                                    </Select>
                                </Form.Item>
                            );
                        }
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

                        return (
                            <Form.Item
                                key={field.name}
                                name={field.name}
                                label={field.label}
                                rules={field.rules ? [field.rules] : []}
                                initialValue={
                                    typeof field.defaultValue === 'function'
                                        ? field.defaultValue(currentValues)
                                        : field.defaultValue
                                }
                            >
                                <InputNumber />
                            </Form.Item>
                        );
                    })}
                </Col>
            </Row>
        );
    };
    return (
        <div className={classes.container}>
            <Form
                form={form}
                layout="vertical"
                requiredMark={false}
                onValuesChange={handleValuesChange}
                onFinish={handleSubmit}
                initialValues={initialValues}
            >
                {renderFormFields(airFormFields)}

                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Рассчитать
                    </Button>
                    {results.length > 0 && ( // Кнопка отображается, если есть результаты
                        <Button
                            onClick={() => form.submit()}
                            style={{ marginLeft: '10px' }}
                        >
                            Добавить результат
                        </Button>
                    )}
                </Form.Item>

                <br />
                {showButton()}
                <br />
                <br />
            </Form>
            {results.map((result, index) => (
                <div key={index}>
                    <h3>Результат расчёта {index + 1}:</h3>
                    <p>{result.result}</p>
                </div>
            ))}
        </div>
    );
};

export default SelectionPagePrezFreonAir;

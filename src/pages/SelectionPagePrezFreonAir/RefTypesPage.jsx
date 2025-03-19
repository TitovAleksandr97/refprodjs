// import React, { useState } from 'react';
// import { Button, Form, Input, InputNumber, Row, Select, Space } from 'antd';
// // @ts-ignore
// import { calcA } from './test';
// import cls from './RefTypesPage.module.scss';
//
//
// const { Option } = Select;
// const tailLayout = {
//     wrapperCol: { offset: 8, span: 16 },
// };
//
// const SelectionPagePrezFreonAir = () => {
//     const [age, setAge] = useState(false);
//     const [ssdownload, setSsdownload] = useState('');
//     const [hash, setHash] = useState('');
//     const [eqip, setEqip] = useState('');
//     const [form] = Form.useForm();
//
//     const Greeting = () => {
//         if (age) {
//             return (
//                 <a href={`https://refcool-app.ru/api/excels/${hash}ss.xlsx`}>
//                     <Button>Скачать</Button>
//                 </a>
//             );
//         }
//         return <h1 className={cls.text}>{eqip}</h1>;
//     };
//
//     const onFinish = (values) => {
//         const chrs = 'abdehkmnpswxzABDEFGHKMNPQRSTWXZ123456789';
//         let str = '';
//         for (let i = 0; i < 10; i += 1) {
//             let pos = Math.floor(Math.random() * chrs.length);
//             str += chrs.substring(pos, pos + 1);
//         }
//
//         setEqip('Производится расчёт');
//         setHash(str);
//         setAge(false);
//
//         const fullPars = { ...values };
//         const npar1 = fullPars.tempin.toString();
//         const npar2 = fullPars.humin.toString();
//         const npar3 = fullPars.tempout.toString();
//         const npar4 = fullPars.ohum.toString();
//         const npar5 = fullPars.airtype.toString();
//         const npar6 = fullPars.orentation.toString();
//         const npar7 = fullPars.rangecond.toString();
//         const npar8 = fullPars.dumps.toString();
//         const npar9 = fullPars.fullq.toString();
//         let npar10 =
//             fullPars.countc.toString() === 'Неважно'
//                 ? '0'
//                 : fullPars.countc.toString() === '1'
//                     ? '1'
//                     : '2';
//         let npar11 = fullPars.massa.toString() === 'Да' ? '1' : '0';
//         const npar12 = fullPars.blocklength.toString();
//         const npar13 = fullPars.blockheigth.toString();
//         let npar14 = fullPars.companys.toString() === 'HTS' ? '1' : '0';
//         const npar15 = fullPars.numberkp.toString();
//         const npar16 = fullPars.heightt.toString();
//         const arOptions = fullPars.select_multiple.toString();
//
//         console.log(
//             npar1,
//             npar2,
//             npar3,
//             npar4,
//             npar5,
//             npar6,
//             npar7,
//             npar8,
//             npar9,
//             npar10,
//             npar11,
//             npar12,
//             npar13,
//             npar14,
//             npar15,
//             npar16,
//         );
//         const params = [
//             npar1,
//             npar2,
//             npar3,
//             npar4,
//             npar5,
//             npar6,
//             npar7,
//             npar8,
//             npar9,
//             npar10,
//             npar11,
//             npar12,
//             npar13,
//             npar14,
//             npar15,
//             npar16,
//             arOptions,
//             str,
//         ];
//         console.log(str);
//         calcA(params).then(() => setAge(true));
//     };
//
//     const onReset = () => {
//         form.resetFields();
//     };
//
//     return (
//         <div data-testid="RefTypesPage" className={cls.all}>
//             <Row className={cls.all} align="middle" justify="center">
//                 <Form
//                     className={cls.row}
//                     layout="vertical"
//                     form={form}
//                     onFinish={onFinish}
//                     name="validateOnly"
//                     initialValues={{
//                         tempin: 25,
//                         humin: 30,
//                         tempout: 37,
//                         ohum: 40,
//                         heightt: 0,
//                         rangecond: '  -40..+52 (Наружный НТК)',
//                         orentation: 'Горизонтальный',
//                         airtype: 'Вниз, забор сверху',
//                         dumps: 20,
//                         massa: 'Да',
//                         countc: 'Неважно',
//                         blocklength: 30,
//                         blockheigth: 5,
//                         companys: 'Рефкул',
//                     }}
//                 >
//                     <br />
//                     <div className={cls.text}>
//                         Температура воздуха в помещении (на входе в
//                         кондиционер) C°:
//                     </div>
//                     <Form.Item
//                         hasFeedback
//                         name="tempin"
//                         rules={[
//                             {
//                                 message: `Температура должна быть в диапазоне 16-45 C°`,
//                                 type: 'number',
//                                 min: 16,
//                                 max: 45,
//                             },
//                         ]}
//                     >
//                         <InputNumber />
//                     </Form.Item>
//                     <div className={cls.text}>
//                         Влажность в помещении (на входе в кондиционер) %:
//                     </div>
//                     <Form.Item
//                         hasFeedback
//                         name="humin"
//                         // label="Влажность в помещении (на входе в кондиционер) %:"
//                         rules={[
//                             {
//                                 message: `Влажность должна быть в диапазоне 0-70 %`,
//                                 type: 'number',
//                                 min: 0,
//                                 max: 70,
//                             },
//                         ]}
//                     >
//                         <InputNumber />
//                     </Form.Item>
//                     <div className={cls.text}>
//                         Температура наружного воздуха C°:
//                     </div>
//                     <Form.Item
//                         hasFeedback
//                         name="tempout"
//                         rules={[
//                             {
//                                 message: `Температура должна быть в диапазоне 25-52 C°`,
//                                 type: 'number',
//                                 min: 25,
//                                 max: 52,
//                             },
//                         ]}
//                     >
//                         <InputNumber />
//                     </Form.Item>
//                     <div className={cls.text}>
//                         Относительная влажность наружного воздуха %:
//                     </div>
//                     <Form.Item
//                         hasFeedback
//                         name="ohum"
//                         rules={[
//                             {
//                                 message: `Влажность должна быть в диапазоне 0-100 %`,
//                                 type: 'number',
//                                 min: 0,
//                                 max: 100,
//                             },
//                         ]}
//                     >
//                         <InputNumber />
//                     </Form.Item>
//                     <div className={cls.text}>Высота над уровнем моря м.:</div>
//                     <Form.Item
//                         hasFeedback
//                         name="heightt"
//                         rules={[
//                             {
//                                 message: `Высота должна быть в диапазоне 0-4000 м`,
//                                 type: 'number',
//                                 min: 0,
//                                 max: 4000,
//                             },
//                         ]}
//                     >
//                         <InputNumber />
//                     </Form.Item>
//                     <div className={cls.text}>
//                         Диапазон работы воздушного конденсатора:
//                     </div>
//                     <Form.Item name="rangecond" hasFeedback>
//                         <Select>
//                             <Select.Option value="  -60..+40 (Внутренний НТК)">
//                                 {' '}
//                                 -60..+40 (Внутренний НТК)
//                             </Select.Option>
//                             <Select.Option value="  -40..+52 (Наружный НТК)">
//                                 {' '}
//                                 -40..+52 (Наружный НТК)
//                             </Select.Option>
//                         </Select>
//                     </Form.Item>
//                     <div className={cls.text}>
//                         Ориентация конденсатора:
//                     </div>
//                     <Form.Item name="orentation" hasFeedback>
//                         <Select>
//                             <Select.Option value="Горизонтальный">
//                                 {' '}
//                                 Горизонтальный
//                             </Select.Option>
//                             <Select.Option value="Вертикальный">
//                                 {' '}
//                                 Вертикальный
//                             </Select.Option>
//                         </Select>
//                     </Form.Item>
//                     <div className={cls.text}>Раздача воздуха: </div>
//                     <Form.Item name="airtype" hasFeedback>
//                         <Select>
//                             <Select.Option value="Вниз, забор сверху">
//                                 {' '}
//                                 Вниз, забор сверху
//                             </Select.Option>
//                             <Select.Option value="Вверх, забор спереди">
//                                 {' '}
//                                 Вверх, забор спереди
//                             </Select.Option>
//                             <Select.Option value="Вверх, забор снизу">
//                                 {' '}
//                                 Вверх, забор снизу
//                             </Select.Option>
//                             <Select.Option value="Вперед, забор сверху">
//                                 {' '}
//                                 Вперед, забор сверху
//                             </Select.Option>
//                         </Select>
//                     </Form.Item>
//                     <div className={cls.text}>
//                         Напор воздуха на выходе из кондиционера (не выше AESP)
//                         Па:
//                     </div>
//                     <Form.Item hasFeedback name="dumps">
//                         <InputNumber />
//                     </Form.Item>
//                     <div className={cls.text}>
//                         Требуемая полная холодопроизводительность кВт:
//                     </div>
//                     <Form.Item hasFeedback name="fullq">
//                         <InputNumber />
//                     </Form.Item>
//                     <div className={cls.text}>Нетто </div>
//                     <Form.Item name="massa" hasFeedback>
//                         <Select>
//                             <Select.Option value="Да"> Да</Select.Option>
//                             <Select.Option value="Нет"> Нет</Select.Option>
//                         </Select>
//                     </Form.Item>
//                     <div className={cls.text}>
//                         Количество контуров (1 или 2 контура):
//                     </div>
//                     <Form.Item name="countc" hasFeedback>
//                         <Select>
//                             <Select.Option value="Неважно">
//                                 {' '}
//                                 Неважно
//                             </Select.Option>
//                             <Select.Option value="1"> 1</Select.Option>
//                             <Select.Option value="2"> 2</Select.Option>
//                         </Select>
//                     </Form.Item>
//                     <div className={cls.text}>
//                         Расстояние между блоками (длина трассы) м:
//                     </div>
//                     <Form.Item
//                         rules={[
//                             {
//                                 message: `Расстояние должно быть в диапазоне 0-50 м`,
//                                 type: 'number',
//                                 min: 0,
//                                 max: 50,
//                             },
//                         ]}
//                         hasFeedback
//                         name="blocklength"
//                     >
//                         <InputNumber />
//                     </Form.Item>
//                     <div className={cls.text}>
//                         Перепад высоты между блоками м:
//                     </div>
//                     <Form.Item
//                         rules={[
//                             {
//                                 message: `Перепад должен быть в диапазоне 0-20 м`,
//                                 type: 'number',
//                                 min: 0,
//                                 max: 20,
//                             },
//                         ]}
//                         hasFeedback
//                         name="blockheigth"
//                     >
//                         <InputNumber />
//                     </Form.Item>
//                     <Form.Item
//                         name="select_multiple"
//                         // rules={[{ required: true, message: 'Выберите опции!', type: 'array' }]}
//                     >
//                         <Select mode="multiple" placeholder="Выберите опции">
//                             <Option value="pr11">
//                                 Низкотемпературный комплект
//                             </Option>
//                             <Option value="pr12">Увлажнитель</Option>
//                             <Option value="pr13">Нагреватель</Option>
//                             <Option value="pr14">
//                                 Комплект длинных трасс (Встроенный)
//                             </Option>
//                             <Option value="pr15">
//                                 Дифференциальное реле перепада на фильтре
//                             </Option>
//                             <Option value="pr16">
//                                 Дифференциальное реле перепада на вентиляторе
//                             </Option>
//                             <Option value="pr17">Датчик протечки</Option>
//                             <Option value="pr18">
//                                 Внутренний датчик влажности (Если не выбран
//                                 увлажнитель)
//                             </Option>
//                             <Option value="pr19">
//                                 Выносной датчик влажности (10 м)
//                             </Option>
//                             <Option value="pr20">
//                                 Выносной датчик температуры (10 м)
//                             </Option>
//                             <Option value="pr21">
//                                 Дренажная помпа с бачком для сбора конденсата
//                             </Option>
//                             <Option value="pr22">
//                                 Упаковка кондиционера в деревянную обрешетку{' '}
//                             </Option>
//                             <Option value="pr23">
//                                 Упаковка конденсатора и/или НТК в деревянную
//                                 обрешетку (зависит от выбора опций)
//                             </Option>
//                             <Option value="pr24">
//                                 Сухой аварийный контакт на отключение
//                                 кондиционера
//                             </Option>
//                             <Option value="pr25">SNMP</Option>
//                             <Option value="pr26">
//                                 Выносной стандартный дисплей (1 дисплей
//                                 управляет всеми)
//                             </Option>
//                             <Option value="pr27">
//                                 Выносной большой дисплей (1 дисплей управляет
//                                 всеми)
//                             </Option>
//                             <Option value="pr28">
//                                 Устройство плавного пуска компрессоров
//                             </Option>
//                             <Option value="pr29">
//                                 Отдельный ввод питания на опции (Увлажнитель /
//                                 нагреватель)
//                             </Option>
//                             <Option value="pr30">
//                                 ИБП контроллера (Быстрый старт)
//                             </Option>
//                             <Option value="pr31">
//                                 Устройство автоматического ввода резерва
//                             </Option>
//                             <Option value="pr32">
//                                 Верхняя воздухная заслонка
//                             </Option>
//                             <Option value="pr33">
//                                 Верхний пленум с воздушной заслонкой для раздачи
//                                 вверх
//                             </Option>
//                             <Option value="pr34">
//                                 Верхний пленум без заслонки, с решеткой для
//                                 раздачи Вперед/Стороны/Назад
//                             </Option>
//                             <Option value="pr35">
//                                 Верхний пленум с заслонкой, с решеткой для
//                                 раздачи Вперед/Стороны/Назад
//                             </Option>
//                             <Option value="pr36">
//                                 Регулируемая рама-основание для раздачи под
//                                 фальшпол (290-600 мм)
//                             </Option>
//                             <Option value="pr37">
//                                 Регулируемая рама-основание для раздачи под
//                                 фальшпол (590-890 мм)
//                             </Option>
//                             <Option value="pr38">
//                                 Регулируемая рама-основание для раздачи под
//                                 фальшпол (870-1210 мм)
//                             </Option>
//                             <Option value="pr39">
//                                 Нижняя регулируемая опорная рама с боковыми
//                                 панелями для установки над фальшполом с раздачей
//                                 Вниз/Вперед/ Встороны/Назад
//                             </Option>
//                             <Option value="pr40">
//                                 Нижняя подставка кондиционера с раздачей
//                                 вытеснением или забором спереди (250 мм)
//                             </Option>
//                         </Select>
//                     </Form.Item>
//                     <div className={cls.text}>Компания:</div>
//                     <Form.Item name="companys" hasFeedback>
//                     <Form.Item name="companys" hasFeedback>
//                         <Select>
//                             <Select.Option value="HTS"> HTS</Select.Option>
//                             <Select.Option value="Рефкул">
//                                 {' '}
//                                 Рефкул
//                             </Select.Option>
//                         </Select>
//                     </Form.Item>
//                     <div className={cls.text} />
//                     'Номер КП:'
//                     <Form.Item name="numberkp" hasFeedback>
//                         <Input />
//                     </Form.Item>
//                     <Form.Item {...tailLayout}>
//                         <Space>
//                             <Button type="primary" htmlType="submit">
//                                 Рассчитать
//                             </Button>
//                         </Space>
//                         <Greeting
//                             className={cls.textp}
//                             age={age}
//                             ssdownload={ssdownload}
//                         />
//                     </Form.Item>
//                 </Form>
//             </Row>
//         </div>
//     );
// };
//
// export default RefTypesPage;

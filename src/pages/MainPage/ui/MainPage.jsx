import classes from './MainPage.module.scss'; // Импортируем стили SCSS

const MainPage = () => {
    return (
        <div className={classes.container}>
            <div className={classes.messageBox}>
                <p>
                    Добро пожаловать в веб-приложение Рефкул. На данный момент
                    расчёты могут иметь ошибки. Просьба проверять все расчёты у
                    инженеров. Переходя на любую страницу в приложении, Вы
                    соглашаетесь с правилами пользования.
                    <strong>правилами пользования</strong>.
                </p>
                <p>
                    Рекомендуется каждый день обновлять страницу для получения
                    нового контента (F5 или кнопка перезагрузить)
                </p>
            </div>
        </div>
    );
};

export default MainPage;

import { Button,BurgerIcon,ListIcon,ProfileIcon,Logo } from '@ya.praktikum/react-developer-burger-ui-components'

import style from '../../index.module.css';

function AppHeader() {
    return (
        <header className={style.header}>
            <div>
            <Button type="secondary" size="medium">
                <BurgerIcon type="primary" />Конструктор
            </Button>
            <Button type="secondary" size="medium">
                <ListIcon type="primary" />Лента заказов
            </Button>
            </div>
            <Logo />
            <Button type="secondary" size="medium">
                <ProfileIcon className={style.icon_style} type="primary" />Личный кабинет
            </Button>
        </header>
    );
}

export default AppHeader;

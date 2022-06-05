import style from "./app-header.module.css";
import {
  ProfileIcon,
  BurgerIcon,
  Logo,
  ListIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

const AppHeader = () => {
  return (
    <header className={style.header}>
      <nav className={`${style.menu} pt-4 pb-4`}>
        <div className={style.inner}>
          <a href="/" className={`${style.link_active} pr-5 pl-5 pt-4 pb-4`}>
            <BurgerIcon type="primary" />
            <p className="text text_type_main-default ml-2">Конструктор</p>
          </a>

          <a href="/" className={`${style.link} pr-5 pl-5 pt-4 pb-4 ml-2`}>
            <ListIcon type="secondary" />
            <p className="text text_type_main-default ml-2">Лента заказов</p>
          </a>

          <div className={style.logotype}>
            <Logo />
          </div>
          <a href="/" className={`${style.link_personal} pr-5 pl-5 pt-4 pb-4`}>
            <ProfileIcon type="secondary" />
            <p className="text text_type_main-default ml-2">Личный кабинет</p>
          </a>
        </div>
      </nav>
    </header>
  );
};

export default AppHeader;

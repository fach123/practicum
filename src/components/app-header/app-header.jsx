import style from "./app-header.module.css";
import {
  ProfileIcon,
  BurgerIcon,
  Logo,
  ListIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { NavLink } from "react-router-dom";

const AppHeader = () => {
  return (
    <header className={style.header}>
      <nav className={`${style.menu} pt-4 pb-4`}>
        <div className={style.inner}>
          <NavLink
            className={`${style.link} pr-5 pl-5 pt-4 pb-4`}
            to="/"
            exact
            activeClassName={style.link_active}
          >
            <BurgerIcon type="secondary" />
            <p className="text text_type_main-default ml-2">Конструктор</p>
          </NavLink>

          <NavLink
            href="/"
            className={`${style.link} pr-5 pl-5 pt-4 pb-4 ml-2`}
            to="/lenta"
            exact
            activeClassName={style.link_active}
          >
            <ListIcon type="secondary" />
            <p className="text text_type_main-default ml-2">Лента заказов</p>
          </NavLink>

          <div className={style.logotype}>
            <Logo />
          </div>
          <NavLink
            href="/"
            className={`${style.link_personal} pr-5 pl-5 pt-4 pb-4`}
            to="/profile"
            exact
            activeClassName={style.link_active}
          >
            <ProfileIcon type="secondary" />
            <p className="text text_type_main-default ml-2">Личный кабинет</p>
          </NavLink>
        </div>
      </nav>
    </header>
  );
};

export default AppHeader;

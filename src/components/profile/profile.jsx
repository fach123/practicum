import {useEffect, useState} from "react";
import style from "./profile.module.css";
import {
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import {
  Link,
  NavLink,
  Redirect,
  Route,
  Switch,
  useRouteMatch,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {getUser, goLogin, goLogout} from "../../services/actions/api";

const MenuElement = ({ title, to }) => {
  return (
    <li className={style.menu_element}>
      <NavLink to={to} activeClassName={style.link_active}>
        <p className="text text_type_main-medium text_color_inactive">
          {title}
        </p>
      </NavLink>
    </li>
  );
};
const ProfileForm = ({ handleBackProfileData, handleSubmit, handleInputChange, state, user, }) => {

  return (
    <form className={style.form} onSubmit={handleSubmit}>
      <div className={style.inputs}>
        <div className="mb-6">
          <Input
            type={"text"}
            placeholder={"Имя"}
            name={"name"}
            value={state.name}
            error={false}
            errorText={"Ошибка"}
            size={"default"}
            onChange={handleInputChange}
            icon={"EditIcon"}
          />
        </div>
        <div className="mb-6">
          <Input
            type={"email"}
            placeholder={"Логин"}
            name={"email"}
            value={state.email}
            error={false}
            errorText={"Ошибка"}
            size={"default"}
            onChange={handleInputChange}
            icon={"EditIcon"}
          />
        </div>
        <div className="mb-6">
          <Input
            type={"password"}
            placeholder={"Пароль"}
            name={"password"}
            value={state.password}
            error={false}
            errorText={"Ошибка"}
            size={"default"}
            onChange={handleInputChange}
            icon={"EditIcon"}
          />
        </div>
      </div>
      {state.email !== user.user.email ||
      state.name !== user.user.name ||
      state.password !== "" ? (
        <div className="mb-20">
          <Button type="primary" size="medium" onClick={handleBackProfileData}>
            Отмена
          </Button>
          <Button type="primary" size="medium">
            Сохранить
          </Button>
        </div>
      ) : null}
    </form>
  );
};
export const ProfileBlock = () => {
  const { user } = useSelector((store) => store.api);
  const { path, url } = useRouteMatch();
  const dispatch = useDispatch();
  const [state, setState] = useState({
    email: user.user.email,
    name: user.user.name,
    password: "",
  });
  useEffect(()=>{
    if(user.success){
    dispatch(getUser(user))
    }
  },[])
  const handleInputChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    setState({
      ...state,
      [name]: value,
    });
  };
  const handleBackProfileData = () => {
    setState({
      email: user.user.email,
      name: user.user.name,
      password: "",
    });
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("submit");
  };

  const handleLogout = () => {
    dispatch(goLogout({ token: user.refreshToken }));
  };

  return (
    <div className={style.inner}>
      <ul className={style.menu}>
        <MenuElement title={"Профиль"} to={`${url}`} />
        <MenuElement title={"История заказов"} to={`${url}/orders`} />
        <li className={style.menu_element} onClick={handleLogout}>
          <p className="text text_type_main-medium text_color_inactive">
            Выход
          </p>
        </li>
        <p className="text text_type_main-default text_color_inactive mt-20">
          В этом разделе вы можете изменить свои персональные данные
        </p>
      </ul>
      <Switch>
        <Route exact path={path}>
          <ProfileForm
            handleSubmit={handleSubmit}
            handleInputChange={handleInputChange}
            handleBackProfileData={handleBackProfileData}
            state={state}
            user={user}
          />
        </Route>
        <Route exact path={`${path}/orders`}>
          <div></div>
        </Route>
      </Switch>
    </div>
  );
};

import style from "./register.module.css";
import {
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, Redirect } from "react-router-dom";
import { useState } from "react";
import { goRegister } from "../../services/actions/api";
import { useDispatch, useSelector } from "react-redux";

export const RegisterBlock = () => {
  const { user } = useSelector((store) => store.api);
  const dispatch = useDispatch();
  const [state, setState] = useState({
    email: "",
    name: "",
    password: "",
  });

  const handleInputChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    setState({
      ...state,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(goRegister(state));
  };
  if (user.success) {
    return (
      <Redirect
        to={{
          pathname: "/",
        }}
      />
    );
  }
  return (
    <div className={style.inner}>
      <p className="text text_type_main-medium mb-6">Регистрация</p>
      <form className={style.form} onSubmit={handleSubmit}>
        <div className={style.inputs}>
          <div className="mb-6">
            <Input
              type={"email"}
              placeholder={"E-mail"}
              name={"email"}
              value={state.email}
              error={false}
              errorText={"Ошибка"}
              size={"default"}
              onChange={handleInputChange}
            />
          </div>
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
              icon={"ShowIcon"}
            />
          </div>
        </div>
        <div className="mb-20">
          <Button type="primary" size="medium">
            Зарегистрироваться
          </Button>
        </div>
      </form>
      <div>
        <p className="text text_type_main-default">
          Уже зарегистрированы?
          <Link className={style.link} to="/login">
            Войти
          </Link>
        </p>
      </div>
    </div>
  );
};

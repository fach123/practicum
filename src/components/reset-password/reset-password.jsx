import { useState } from "react";
import style from "./reset-password.module.css";
import {
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, Redirect } from "react-router-dom";
import { goResetPassword } from "../../services/actions/api";
import { useDispatch, useSelector } from "react-redux";

export const ResetBlock = () => {
  const { resetSuccess, forgotEmail, user } = useSelector((store) => store.api);
  const dispatch = useDispatch();
  const [state, setState] = useState({
    token: "",
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
    dispatch(goResetPassword(state));
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
  if (resetSuccess) {
    return (
      <Redirect
        to={{
          pathname: "/login",
        }}
      />
    );
  }
  if (forgotEmail === "") {
    return (
      <Redirect
        to={{
          pathname: "/forgot-password",
        }}
      />
    );
  }
  return (
    <div className={style.inner}>
      <p className="text text_type_main-medium mb-6">Восстановление пароля</p>
      <form className={style.form} onSubmit={handleSubmit}>
        <div className={style.inputs}>
          <div className="mb-6">
            <Input
              type={"password"}
              placeholder={"Введите новый пароль"}
              name={"password"}
              value={state.password}
              error={false}
              errorText={"Ошибка"}
              size={"default"}
              onChange={handleInputChange}
              icon={"ShowIcon"}
            />
          </div>
          <div className="mb-6">
            <Input
              type={"text"}
              placeholder={"Введите код из письма"}
              name={"token"}
              value={state.token}
              error={false}
              errorText={"Ошибка"}
              size={"default"}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="mb-20">
          <Button type="primary" size="medium">
            Сохранить
          </Button>
        </div>
      </form>
      <div>
        <p className="text text_type_main-default">
          Вспомнили пароль?
          <Link className={style.link} to="/login">
            Войти
          </Link>
        </p>
      </div>
    </div>
  );
};

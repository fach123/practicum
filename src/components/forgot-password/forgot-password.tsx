import { ChangeEvent, FormEvent, useState } from "react";
import style from "./forgot-password.module.css";
import {
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, Redirect } from "react-router-dom";
import { goForgotPassword } from "../../services/actions/api";
import { useDispatch, useSelector } from "react-redux";
import { useAppDispatch } from "../types";

export const ForgotBlock = (): JSX.Element => {
  const { forgotEmail, user } = useSelector((store: any) => store.api);
  const dispatch = useAppDispatch();
  const [state, setState] = useState("");

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const target = event.target;
    const value = target.value;

    setState(value);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    dispatch(goForgotPassword({ email: state }));
  };

  if (forgotEmail !== "") {
    return (
      <Redirect
        to={{
          pathname: "/reset-password",
        }}
      />
    );
  }
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
      <p className="text text_type_main-medium mb-6">Восстановление пароля</p>
      <form className={style.form} onSubmit={handleSubmit}>
        <div className={style.inputs}>
          <div className="mb-6">
            <Input
              type={"email"}
              placeholder={"Укажите e-mail"}
              name={"email"}
              value={state}
              error={false}
              errorText={"Ошибка"}
              size={"default"}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="mb-20">
          <Button type="primary" size="medium">
            Восстановить
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

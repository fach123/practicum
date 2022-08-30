import { ChangeEvent, FormEvent, useState } from "react";
import style from "./login.module.css";
import {
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, Redirect, useHistory } from "react-router-dom";

import { goLogin } from "../../services/actions/api";
import {useAppDispatch, useAppSelector} from "../types";

interface stateType {
  from: { pathname: string };
}

export const LoginBlock = (): JSX.Element => {
  const { user } = useAppSelector((store) => store.api);
  const history = useHistory<stateType>();
  const dispatch = useAppDispatch();
  const [stateForm, setStateForm] = useState({
    email: "",
    name: "",
    password: "",
  });

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    setStateForm({
      ...stateForm,
      [name]: value,
    });
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    dispatch(goLogin(stateForm));
  };
  if (user.success) {
    return <Redirect to={history.location.state?.from || "/"} />;
  }
  return (
    <div className={style.inner}>
      <p className="text text_type_main-medium mb-6">Вход</p>
      <form className={style.form} onSubmit={handleSubmit}>
        <div className={style.inputs}>
          <div className="mb-6">
            <Input
              type={"email"}
              placeholder={"E-mail"}
              name={"email"}
              value={stateForm.email}
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
              value={stateForm.password}
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
            Войти
          </Button>
        </div>
      </form>
      <div>
        <p className="text text_type_main-default">
          Вы — новый пользователь?
          <Link className={style.link} to="/register">
            Зарегистрироваться
          </Link>
        </p>
        <p className="text text_type_main-default">
          Забыли пароль?
          <Link className={style.link} to="/forgot-password">
            Восстановить пароль
          </Link>
        </p>
      </div>
    </div>
  );
};

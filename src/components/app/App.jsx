import React from "react";
import { Switch, Route, useLocation, useHistory } from "react-router-dom";
import {
  RegisterPage,
  HomePage,
  LoginPage,
  ForgotPasswordPage,
  ResetPasswordPage,
  NotFound404,
  IngredientDetailsPage,
  ProfilePage,
} from "../../pages";
import AppHeader from "../app-header/app-header";
import "../../index.css";
import { IngredientDetails } from "../ingredient-details/ingredient-details";
import Modal from "../modal/modal";
import { ProtectedRoute } from "../protected-route";

function App() {
  const history = useHistory();
  const location = useLocation();
  const background = location.state && location.state.background;
  const setOpenModal = (value) => {
    if (value === false) {
      history.goBack();
    }
  };
  return (
    <>
      <AppHeader />
      <Switch location={background || location}>
        <Route path="/" exact={true}>
          <HomePage />
        </Route>
        <Route path="/login" isAuth={true}>
          <LoginPage />
        </Route>
        <Route path="/register" exact={true}>
          <RegisterPage />
        </Route>
        <Route path="/forgot-password" exact={true}>
          <ForgotPasswordPage />
        </Route>
        <Route path="/reset-password" exact={true}>
          <ResetPasswordPage />
        </Route>
        <ProtectedRoute path="/profile">
          <ProfilePage />
        </ProtectedRoute>
        <Route path="/ingredients/:id">
          <IngredientDetailsPage />
        </Route>
        <Route>
          <NotFound404 />
        </Route>
      </Switch>
      {background && (
        <Route path="/ingredients/:id">
          <Modal title="Детали ингредиента" setOpenModal={setOpenModal}>
            <IngredientDetails />
          </Modal>
        </Route>
      )}
    </>
  );
}

export default App;

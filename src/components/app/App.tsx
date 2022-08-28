import React, { useEffect } from "react";
import { Switch, Route, useLocation, useHistory } from "react-router-dom";
import {
  FeedPage,
  FeedDetailsPage,
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
import { getIngredients } from "../../services/actions/api";
import { Location } from "history";
import { FeedDetails } from "../feed/feed-details";
import { useDispatch } from "react-redux";
import { useAppDispatch } from "../types";

interface stateType {
  background: Location;
}

function App(): JSX.Element {
  const history = useHistory();
  const location = useLocation<stateType>();
  const background = location.state && location.state.background;
  const dispatch = useAppDispatch();

  const setOpenModal = (value: boolean) => {
    if (!value) {
      history.goBack();
    }
  };
  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);
  return (
    <>
      <AppHeader />
      <Switch location={background || location}>
        <Route path="/" exact={true}>
          <HomePage />
        </Route>
        <Route path="/feed" exact={true}>
          <FeedPage />
        </Route>
        <Route path="/feed/:id">
          <FeedDetailsPage />
        </Route>
        <Route path="/login" /*isAuth={true}*/>
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
        <>
          <Route path="/ingredients/:id">
            <Modal title="Детали ингредиента" setOpenModal={setOpenModal}>
              <IngredientDetails />
            </Modal>
          </Route>
          <Route path="/feed/:id">
            <Modal title="Детали заказа" setOpenModal={setOpenModal}>
              <FeedDetails />
            </Modal>
          </Route>

          <ProtectedRoute path="/profile/orders/:id">
            <Modal title="Детали заказа" setOpenModal={setOpenModal}>
              <FeedDetails />
            </Modal>
          </ProtectedRoute>
        </>
      )}
    </>
  );
}

export default App;

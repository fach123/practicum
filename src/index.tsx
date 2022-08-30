import React from "react";
import ReactDOM from "react-dom/client";

import { BrowserRouter as Router } from "react-router-dom";
import { rootReducer } from "./services/reducers";
import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import { Provider } from "react-redux";

import "./index.css";
import App from "./components/app/App";
import reportWebVitals from "./reportWebVitals";
import { webSocketHandler } from "./services/middleware/socket-middleware";
import { allOrdersActions } from "./services/actions/socket-all";
import { profileOrdersActions } from "./services/actions/socket-profile";

const WS_ALL_ORDERS = "wss://norma.nomoreparties.space/orders/all";
const WS_PROFILE_ORDERS = "wss://norma.nomoreparties.space/orders";

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      webSocketHandler(WS_ALL_ORDERS, allOrdersActions),
      webSocketHandler(WS_PROFILE_ORDERS, profileOrdersActions)
    ),
  devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <Router>
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>
  </Router>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

import {
  ActionCreatorWithoutPayload,
  ActionCreatorWithPayload, Middleware, MiddlewareAPI,
} from "@reduxjs/toolkit";
import {AppDispatch, RootState} from "../../index";

export type TWsActions = {
  wsConnect: ActionCreatorWithPayload<string>;
  wsDisconnect: ActionCreatorWithoutPayload;
  wsConnecting: ActionCreatorWithoutPayload;
  wsOpen: ActionCreatorWithoutPayload;
  wsClose: ActionCreatorWithoutPayload;
  wsError: ActionCreatorWithPayload<string>;
  wsMessage: ActionCreatorWithPayload<any>;
};

export const webSocketHandler = (url: string, wsActions: TWsActions): Middleware => {
  let socket: WebSocket | null = null;
  let isConnected = false;
  let reconnectTimer = 0;

  const {
    wsConnect,
    wsDisconnect,
    wsConnecting,
    wsOpen,
    wsClose,
    wsError,
    wsMessage,
  } = wsActions;

  return (store: MiddlewareAPI<AppDispatch, RootState>) =>
    (next) =>
    (action) => {
      const { dispatch } = store;

      if (wsConnect.match(action)) {
        console.log("connect");
        if (!socket) {
          if (action.payload) {
            socket = new WebSocket(`${url}${action.payload}`);
          } else {
            socket = new WebSocket(url);
          }
        }
        isConnected = true;
        dispatch(wsConnecting());
      }

      if (socket) {
        socket.onopen = () => {
          dispatch(wsOpen());
        };

        socket.onerror = (err) => {
          console.log("error");
        };

        socket.onmessage = (event) => {
          const { data } = event;
          const parsedData = JSON.parse(data);
          dispatch(wsMessage(parsedData));
        };

        socket.onclose = (event) => {
          if (event.code !== 1000) {
            console.log("error");
            dispatch(wsError(event.code.toString()));
          }
          console.log("close");
          dispatch(wsClose());

          if (isConnected) {
            dispatch(wsConnecting());
            reconnectTimer = window.setTimeout(() => {
              dispatch(wsConnect(url));
            }, 3000);
          }
        };

        if (wsDisconnect.match(action)) {
          console.log("disconnect");
          clearTimeout(reconnectTimer);
          isConnected = false;
          reconnectTimer = 0;
          socket.close();
          dispatch(wsClose());
        }
      }

      return next(action);
    };
};

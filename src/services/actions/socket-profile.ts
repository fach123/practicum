import { createAction } from "@reduxjs/toolkit";

export const wsConnect = createAction<string, "PROFILE_ORDERS_CONNECT">(
  "PROFILE_ORDERS_CONNECT"
);
export const wsDisconnect = createAction("PROFILE_ORDERS_DISCONNECT");
export const wsConnecting = createAction("PROFILE_ORDERS_WS_CONNECTING");
export const wsOpen = createAction("PROFILE_ORDERS_WS_OPEN");
export const wsClose = createAction("PROFILE_ORDERS_WS_CLOSE");
export const wsError = createAction<string, "PROFILE_ORDERS_WS_ERROR">(
  "PROFILE_ORDERS_WS_ERROR"
);
export const wsMessage = createAction<any, "PROFILE_ORDERS_WS_MESSAGE">(
  "PROFILE_ORDERS_WS_MESSAGE"
);

export const profileOrdersActions = {
  wsConnect,
  wsDisconnect,
  wsConnecting,
  wsOpen,
  wsClose,
  wsError,
  wsMessage,
};

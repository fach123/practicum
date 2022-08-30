import { createReducer } from "@reduxjs/toolkit";
import {
  wsOpen,
  wsClose,
  wsMessage,
  wsError,
  wsConnecting,
} from "../actions/socket-profile";
import { TOrders } from "../../components/types";

enum WebsocketStatus {
  CONNECTING = "CONNECTING...",
  ONLINE = "ONLINE",
  OFFLINE = "OFFLINE",
}

export type TAllOrdersStore = {
  status: WebsocketStatus;
  connectionError: string;
  orders: Array<TOrders>;
  total: number;
  totalToday: number;
};

const initialState: TAllOrdersStore = {
  status: WebsocketStatus.OFFLINE,
  connectionError: "",
  orders: [],
  total: 0,
  totalToday: 0,
};

export const socketProfileReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(wsConnecting, (state) => {
      state.status = WebsocketStatus.CONNECTING;
    })
    .addCase(wsOpen, (state) => {
      state.status = WebsocketStatus.ONLINE;
      state.connectionError = "";
    })
    .addCase(wsClose, (state) => {
      state.status = WebsocketStatus.OFFLINE;
    })
    .addCase(wsError, (state, action) => {
      state.connectionError = action.payload;
    })
    .addCase(wsMessage, (state, action) => {
      state.orders = action.payload.orders;
      state.total = action.payload.total;
      state.totalToday = action.payload.totalToday;
    });
});

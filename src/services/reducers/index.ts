import { combineReducers } from "@reduxjs/toolkit";
import { apiReducer } from "./api";
import { constructReducer } from "./constructor";
import { socketReducer } from "./socket";
import { socketProfileReducer } from "./socket-profile";

export const rootReducer = combineReducers({
  api: apiReducer,
  burgerConstructor: constructReducer,
  socket: socketReducer,
  socketProfile: socketProfileReducer,
});

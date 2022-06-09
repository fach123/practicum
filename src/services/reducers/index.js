import { combineReducers } from "@reduxjs/toolkit";
import { apiReducer } from "./api";
import { constructReducer } from "./constructor";
import { modalReducer } from "./modal-details";

export const rootReducer = combineReducers({
  api: apiReducer,
  burgerConstructor: constructReducer,
  modal: modalReducer,
});

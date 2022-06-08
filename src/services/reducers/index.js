import { combineReducers } from "@reduxjs/toolkit";
import { apiReducer } from "./api";
import { constructReducer } from "./constructor";

export const rootReducer = combineReducers({
  api: apiReducer,
  burgerConstructor: constructReducer,
});

import {
  getIngredients,
  sendOrder,
  goRegister,
  goLogin,
  goLogout,
  goForgotPassword,
  goResetPassword,
  getUser,
  UPDATE_USER,
  goChangeUser,
} from "../actions/api";
import { createReducer } from "@reduxjs/toolkit";
import { IUser } from "../actions/api";
import { IItem } from "../../components/types";

let user;
let userStorage = localStorage.getItem("user");
if (userStorage) {
  user = JSON.parse(userStorage);
}
export interface IUser2 {
  accessToken?: string;
  refreshToken?: string;
  success?: boolean;
  user?: IUser;
}
interface IApi {
  user: IUser2;
  items: Array<IItem>;
  itemsRequest: boolean;
  itemsFailed: boolean;
  orderItems: IOrderItems;
  orderItemsRequest: boolean;
  orderItemsFailed: boolean;
  registerRequest: boolean;
  registerFailed: boolean;
  loginRequest: boolean;
  loginFailed: boolean;
  logoutRequest: boolean;
  logoutFailed: boolean;
  forgotRequest: boolean;
  forgotFailed: boolean;
  forgotEmail: string;
  resetRequest: boolean;
  resetSuccess: boolean;
  resetFailed: boolean;
  getUserRequest: boolean;
  getUserFailed: boolean;
  changeUserRequest: boolean;
  changeUserFailed: boolean;
}
interface IOrderItems {
  ingredients: Array<string>;
  order?: { number: number };
}

export const initialState: IApi = {
  user: user ? user : {},

  items: [],
  itemsRequest: false,
  itemsFailed: false,

  orderItems: { ingredients: [] },
  orderItemsRequest: false,
  orderItemsFailed: false,

  registerRequest: false,
  registerFailed: false,

  loginRequest: false,
  loginFailed: false,

  logoutRequest: false,
  logoutFailed: false,

  forgotRequest: false,
  forgotFailed: false,
  forgotEmail: "",

  resetRequest: false,
  resetSuccess: false,
  resetFailed: false,

  getUserRequest: false,
  getUserFailed: false,

  changeUserRequest: false,
  changeUserFailed: false,
};

export interface IUpdateUser {
  success: boolean;
  accessToken: string;
  refreshToken: string;
  user: IUser;
}

export const apiReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(getIngredients.pending, (state, action) => {
      state.itemsRequest = true;
    })
    .addCase(getIngredients.rejected, (state, action) => {
      state.itemsRequest = false;
      state.itemsFailed = true;
    })
    .addCase(getIngredients.fulfilled, (state, action) => {
      state.itemsRequest = false;
      state.itemsFailed = false;
      state.items = action.payload;
    })
    .addCase(sendOrder.pending, (state, action) => {
      state.orderItemsRequest = true;
      state.orderItems = { ingredients: [] };
    })
    .addCase(sendOrder.rejected, (state, action) => {
      state.orderItemsRequest = false;
      state.orderItemsFailed = true;
    })
    .addCase(sendOrder.fulfilled, (state, action) => {
      state.orderItemsRequest = false;
      state.orderItemsFailed = false;
      state.orderItems = action.payload;
    })
    .addCase(goRegister.pending, (state, action) => {
      state.registerRequest = true;
    })
    .addCase(goRegister.rejected, (state, action) => {
      state.registerRequest = false;
      state.registerFailed = true;
    })
    .addCase(goRegister.fulfilled, (state, action) => {
      state.registerRequest = false;
      state.registerFailed = false;
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));
      /*localStorage.setItem("accessToken", action.payload.accessToken);
                  localStorage.setItem("refreshToken", action.payload.refreshToken);*/
    })
    .addCase(goLogin.pending, (state, action) => {
      state.loginRequest = true;
    })
    .addCase(goLogin.rejected, (state, action) => {
      state.loginRequest = false;
      state.loginFailed = true;
    })
    .addCase(goLogin.fulfilled, (state, action) => {
      state.loginRequest = false;
      state.loginFailed = false;
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));
      /*localStorage.setItem("accessToken", action.payload.accessToken);
                  localStorage.setItem("refreshToken", action.payload.refreshToken);*/
    })
    .addCase(goLogout.pending, (state, action) => {
      state.logoutRequest = true;
    })
    .addCase(goLogout.rejected, (state, action) => {
      state.logoutRequest = false;
      state.logoutFailed = true;
    })
    .addCase(goLogout.fulfilled, (state, action) => {
      state.logoutRequest = false;
      state.logoutFailed = false;
      state.user = {};
      localStorage.removeItem("user");
    })
    .addCase(goForgotPassword.pending, (state, action) => {
      state.forgotRequest = true;
      state.resetSuccess = false;
      state.forgotEmail = "";
    })
    .addCase(goForgotPassword.rejected, (state, action) => {
      state.forgotRequest = false;
      state.forgotFailed = true;
    })
    .addCase(goForgotPassword.fulfilled, (state, action) => {
      state.forgotRequest = false;
      state.forgotFailed = false;
      state.forgotEmail = action.payload;
    })

    .addCase(goResetPassword.pending, (state, action) => {
      state.resetRequest = true;
      state.resetSuccess = false;
    })
    .addCase(goResetPassword.rejected, (state, action) => {
      state.resetRequest = false;
      state.resetFailed = true;
    })
    .addCase(goResetPassword.fulfilled, (state, action) => {
      state.resetRequest = false;
      state.resetFailed = false;
      state.resetSuccess = true;
    })
    .addCase(getUser.pending, (state, action) => {
      state.getUserRequest = true;
    })
    .addCase(getUser.rejected, (state, action) => {
      state.getUserRequest = false;
      state.getUserFailed = true;
    })
    .addCase(getUser.fulfilled, (state, action) => {
      console.log(action);
      state.getUserRequest = false;
      state.getUserFailed = false;
      state.user.user = action.payload.user;
      localStorage.setItem("user", JSON.stringify(state.user));
    })
    .addCase(UPDATE_USER, (state, action) => {
      state.user = action.payload;
    })
    .addCase(goChangeUser.pending, (state, action) => {
      state.changeUserRequest = true;
    })
    .addCase(goChangeUser.rejected, (state, action) => {
      state.changeUserRequest = false;
      state.changeUserFailed = true;
    })
    .addCase(goChangeUser.fulfilled, (state, action) => {
      console.log(action);
      state.changeUserRequest = false;
      state.changeUserFailed = false;
      state.user.user = action.payload.user;
      localStorage.setItem("user", JSON.stringify(state.user));
    });
});

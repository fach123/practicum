import { apiReducer, initialState } from "./api";
import * as actions from "../actions/api";


describe("apiReducer", () => {
  let user;
  let userStorage = localStorage.getItem("user");
  if (userStorage) {
    user = JSON.parse(userStorage);
  }

  it("returns the initial state", () => {
    expect(apiReducer(undefined, {})).toEqual(initialState);
  });

  it("dispatches getIngredients pending", () => {
    expect(
      apiReducer(initialState, {
        type: actions.getIngredients.pending,
      })
    ).toEqual({
      ...initialState,
      itemsRequest: true,
    });
  });
  it("dispatches getIngredients rejected", () => {
    expect(
      apiReducer(initialState, {
        type: actions.getIngredients.rejected,
      })
    ).toEqual({
      ...initialState,
      itemsRequest: false,
      itemsFailed: true,
    });
  });
  it("dispatches getIngredients fulfilled", () => {
    expect(
      apiReducer(initialState, {
        type: actions.getIngredients.fulfilled,
        payload: [
          { _id: "60d3b41abdacab0026a733c7" },
          { _id: "60d3b41abdacab0026a733c8" },
        ],
      })
    ).toEqual({
      ...initialState,
      itemsRequest: false,
      itemsFailed: false,
      items: [
        { _id: "60d3b41abdacab0026a733c7" },
        { _id: "60d3b41abdacab0026a733c8" },
      ],
    });
  });
  it("dispatches sendOrder pending", () => {
    expect(
      apiReducer(initialState, {
        type: actions.sendOrder.pending,
      })
    ).toEqual({
      ...initialState,
      orderItemsRequest: true,
      orderItems: { ingredients: [] },
    });
  });
  it("dispatches sendOrder rejected", () => {
    expect(
      apiReducer(initialState, {
        type: actions.sendOrder.rejected,
      })
    ).toEqual({
      ...initialState,
      orderItemsRequest: false,
      orderItemsFailed: true,
    });
  });
  it("dispatches sendOrder fulfilled", () => {
    expect(
      apiReducer(initialState, {
        type: actions.sendOrder.fulfilled,
        payload: { hui: true },
      })
    ).toEqual({
      ...initialState,
      orderItemsRequest: false,
      orderItemsFailed: false,
      orderItems: { hui: true },
    });
  });

  it("dispatches goRegister pending", () => {
    expect(
      apiReducer(initialState, {
        type: actions.goRegister.pending,
      })
    ).toEqual({
      ...initialState,
      registerRequest: true,
    });
  });
  it("dispatches goRegister rejected", () => {
    expect(
      apiReducer(initialState, {
        type: actions.goRegister.rejected,
      })
    ).toEqual({
      ...initialState,
      registerRequest: false,
      registerFailed: true,
    });
  });
  it("dispatches goRegister fulfilled", () => {
    expect(
      apiReducer(initialState, {
        type: actions.goRegister.fulfilled,
        payload: { user: true },
      })
    ).toEqual({
      ...initialState,
      registerRequest: false,
      registerFailed: false,
      user: { user: true },
    });
  });
  it("dispatches goLogin pending", () => {
    expect(
      apiReducer(initialState, {
        type: actions.goLogin.pending,
      })
    ).toEqual({
      ...initialState,
      loginRequest: true,
    });
  });
  it("dispatches goLogin rejected", () => {
    expect(
      apiReducer(initialState, {
        type: actions.goLogin.rejected,
      })
    ).toEqual({
      ...initialState,
      loginRequest: false,
      loginFailed: true,
    });
  });
  it("dispatches goLogin fulfilled", () => {
    expect(
      apiReducer(initialState, {
        type: actions.goLogin.fulfilled,
        payload: { user: true },
      })
    ).toEqual({
      ...initialState,
      loginRequest: false,
      loginFailed: false,
      user: { user: true },
    });
  });
  it("dispatches goLogout pending", () => {
    expect(
      apiReducer(initialState, {
        type: actions.goLogout.pending,
      })
    ).toEqual({
      ...initialState,
      logoutRequest: true,
    });
  });
  it("dispatches goLogout rejected", () => {
    expect(
      apiReducer(initialState, {
        type: actions.goLogout.rejected,
      })
    ).toEqual({
      ...initialState,
      logoutRequest: false,
      logoutFailed: true,
    });
  });
  it("dispatches goLogout fulfilled", () => {
    expect(
      apiReducer(initialState, {
        type: actions.goLogout.fulfilled,
      })
    ).toEqual({
      ...initialState,
      logoutRequest: false,
      logoutFailed: false,
      user: {},
    });
  });
  it("dispatches goForgotPassword pending", () => {
    expect(
      apiReducer(initialState, {
        type: actions.goForgotPassword.pending,
      })
    ).toEqual({
      ...initialState,
      forgotRequest: true,
      resetSuccess: false,
      forgotEmail: "",
    });
  });
  it("dispatches goForgotPassword rejected", () => {
    expect(
      apiReducer(initialState, {
        type: actions.goForgotPassword.rejected,
      })
    ).toEqual({
      ...initialState,
      forgotRequest: false,
      forgotFailed: true,
    });
  });
  it("dispatches goForgotPassword fulfilled", () => {
    expect(
      apiReducer(initialState, {
        type: actions.goForgotPassword.fulfilled,
        payload: "test@test.test",
      })
    ).toEqual({
      ...initialState,
      forgotRequest: false,
      forgotFailed: false,
      forgotEmail: "test@test.test",
    });
  });
  it("dispatches goResetPassword pending", () => {
    expect(
      apiReducer(initialState, {
        type: actions.goResetPassword.pending,
      })
    ).toEqual({
      ...initialState,
      resetSuccess: false,
      resetRequest: true,
    });
  });
  it("dispatches goResetPassword rejected", () => {
    expect(
      apiReducer(initialState, {
        type: actions.goResetPassword.rejected,
      })
    ).toEqual({
      ...initialState,
      resetRequest: false,
      resetFailed: true,
    });
  });
  it("dispatches goResetPassword fulfilled", () => {
    expect(
      apiReducer(initialState, {
        type: actions.goResetPassword.fulfilled,
      })
    ).toEqual({
      ...initialState,
      resetRequest: false,
      resetFailed: false,
      resetSuccess: true,
    });
  });
  it("dispatches getUser pending", () => {
    expect(
      apiReducer(initialState, {
        type: actions.getUser.pending,
      })
    ).toEqual({
      ...initialState,
      getUserRequest: true,
    });
  });
  it("dispatches getUser rejected", () => {
    expect(
      apiReducer(initialState, {
        type: actions.getUser.rejected,
      })
    ).toEqual({
      ...initialState,
      getUserRequest: false,
      getUserFailed: true,
    });
  });
  it("dispatches getUser fulfilled", () => {
    expect(
      apiReducer(initialState, {
        type: actions.getUser.fulfilled,
        payload: { user: { userTEST: true } },
      })
    ).toEqual({
      ...initialState,
      getUserRequest: false,
      getUserFailed: false,
      user: { user: { userTEST: true } },
    });
  });
  it("dispatches UPDATE_USER", () => {
    expect(
      apiReducer(initialState, {
        type: actions.UPDATE_USER,
        payload: { user: { userTEST: true } },
      })
    ).toEqual({
      ...initialState,
      user: { user: { userTEST: true } },
    });
  });
  it("dispatches goChangeUser pending", () => {
    expect(
      apiReducer(initialState, {
        type: actions.goChangeUser.pending,
      })
    ).toEqual({
      ...initialState,
      changeUserRequest: true,
    });
  });
  it("dispatches goChangeUser rejected", () => {
    expect(
      apiReducer(initialState, {
        type: actions.goChangeUser.rejected,
      })
    ).toEqual({
      ...initialState,
      changeUserRequest: false,
      changeUserFailed: true,
    });
  });
  it("dispatches goChangeUser fulfilled", () => {
    expect(
      apiReducer(initialState, {
        type: actions.goChangeUser.fulfilled,
        payload: { user: { userTEST: true } },
      })
    ).toEqual({
      ...initialState,
      changeUserRequest: false,
      changeUserFailed: false,
      user: { user: { userTEST: true } },
    });
  });
});

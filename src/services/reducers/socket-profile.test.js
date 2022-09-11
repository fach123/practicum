import { socketProfileReducer } from "./socket-profile";
import * as actions from "../actions/socket-profile";

describe("socket reducer", () => {
  const initialState = {
    status: "OFFLINE",
    connectionError: "",
    total: 0,
    totalToday: 0,
    orders: [],
  };
  it("returns the initial state", () => {
    expect(socketProfileReducer(undefined, {})).toEqual(initialState);
  });
  it("dispatches wsConnecting", () => {
    expect(socketProfileReducer(initialState, actions.wsConnecting)).toEqual({
      ...initialState,
      status: "CONNECTING...",
    });
  });

  it("dispatches wsOpen", () => {
    expect(socketProfileReducer(initialState, actions.wsOpen)).toEqual({
      ...initialState,
      status: "ONLINE",
    });
  });

  it("dispatches wsClose", () => {
    expect(socketProfileReducer(initialState, actions.wsClose)).toEqual({
      ...initialState,
      status: "OFFLINE",
    });
  });

  it("dispatches wsError", () => {
    expect(
      socketProfileReducer(initialState, actions.wsError("0x01052"))
    ).toEqual({
      ...initialState,
      connectionError: "0x01052",
    });
  });

  it("dispatches wsMessage", () => {
    const payload = {
      orders: [{ test: 1 }],
      total: 525252,
      totalToday: 74,
    };

    expect(
      socketProfileReducer(initialState, actions.wsMessage(payload))
    ).toEqual({
      ...initialState,
      orders: [{ test: 1 }],
      total: 525252,
      totalToday: 74,
    });
  });
});

import { socketReducer } from "./socket";
import * as actions from "../actions/socket-all";

describe("socket reducer", () => {
  const initialState = {
    status: "OFFLINE",
    connectionError: "",
    total: 0,
    totalToday: 0,
    orders: [],
  };
  it("returns the initial state", () => {
    expect(socketReducer(undefined, {})).toEqual(initialState);
  });
  it("dispatches wsConnecting", () => {
    expect(socketReducer(initialState, actions.wsConnecting)).toEqual({
      ...initialState,
      status: "CONNECTING...",
    });
  });

  it("dispatches wsOpen", () => {
    expect(socketReducer(initialState, actions.wsOpen)).toEqual({
      ...initialState,
      status: "ONLINE",
    });
  });

  it("dispatches wsClose", () => {
    expect(socketReducer(initialState, actions.wsClose)).toEqual({
      ...initialState,
      status: "OFFLINE",
    });
  });

  it("dispatches wsError", () => {
    expect(socketReducer(initialState, actions.wsError("0x01052"))).toEqual({
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

    expect(socketReducer(initialState, actions.wsMessage(payload))).toEqual({
      ...initialState,
      orders: [{ test: 1 }],
      total: 525252,
      totalToday: 74,
    });
  });
});

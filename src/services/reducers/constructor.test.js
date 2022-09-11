import { constructReducer } from "./constructor";
import * as actions from "../actions/constructor";

describe("constructor reducer", () => {
  const initialState = {
    ingredients: [],
    bun: null,
    draggedIngredient: null,
  };
  it("returns the initial state", () => {
    expect(constructReducer(undefined, {})).toEqual(initialState);
  });

  it("dispatches DROP_ITEM_BUN", () => {
    expect(
      constructReducer(initialState, {
        type: actions.DROP_ITEM_BUN,
        payload: { _id: "60d3b41abdacab0026a733c7" },
      })
    ).toEqual({
      ...initialState,
      bun: { _id: "60d3b41abdacab0026a733c7" },
    });
  });

  it("dispatches DROP_ITEM_INGREDIENT", () => {
    expect(
      constructReducer(initialState, {
        type: actions.DROP_ITEM_INGREDIENT,
        payload: { _id: "60d3b41abdacab0026a733c7" },
      })
    ).toMatchObject({
      ...initialState,
      ingredients: [
        {
          _id: "60d3b41abdacab0026a733c7",
          constructorId: expect.stringMatching(/\d/),
        },
      ],
    });
  });

  it("dispatches DELETE_ITEM", () => {
    const initialState = {
      ingredients: [{ _id: "60d3b41abdacab0026a733c7", constructorId: "test" }],
      bun: null,
      draggedIngredient: null,
    };
    expect(
      constructReducer(initialState, {
        type: actions.DELETE_ITEM,
        payload: { _id: "60d3b41abdacab0026a733c7", constructorId: "test" },
      })
    ).toEqual({
      ...initialState,
      ingredients: [],
    });
  });
});

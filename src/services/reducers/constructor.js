import { createReducer } from "@reduxjs/toolkit";
import {
  DELETE_ITEM,
  DROP_ITEM_BUN,
  DROP_ITEM_INGREDIENT,
  SET_DRAGGED,
  SORT_INGREDIENT,
} from "../actions/constructor";
import { v4 as uuidv4 } from "uuid";

const initialState = {
  ingredients: [],
  bun: null,
  draggedIngredient: null,
};

export const constructReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(DROP_ITEM_BUN, (state, action) => {
      state.bun = action.payload;
    })
    .addCase(DROP_ITEM_INGREDIENT, (state, action) => {
      const insertIndex = state.draggedIngredient
        ? state.draggedIngredient.index
        : state.ingredients.length - 1;

      const newIngredients = [...state.ingredients];
      newIngredients.splice(insertIndex, 0, {
        ...action.payload,
        constructorId: uuidv4(),
      });
      state.ingredients = newIngredients;
    })
    .addCase(SORT_INGREDIENT, (state, action) => {
      console.log(action.payload);
    })
    .addCase(SET_DRAGGED, (state, action) => {})
    .addCase(DELETE_ITEM, (state, action) => {
      state.ingredients = state.ingredients.filter(
        (item) => item.constructorId !== action.payload.constructorId
      );
    });
});

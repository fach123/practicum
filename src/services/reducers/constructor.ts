import { createReducer } from "@reduxjs/toolkit";
import {
  DELETE_ITEM,
  DROP_ITEM_BUN,
  DROP_ITEM_INGREDIENT,
  SET_DRAGGED,
  SORT_INGREDIENT,
} from "../actions/constructor";

import { v4 as uuidv4 } from "uuid";
import { IItem } from "../../components/types";

interface IConstructor {
  ingredients: Array<IItem>;
  bun: IItem | null;
  draggedIngredient: any;
}

const initialState: IConstructor = {
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
      const dragIndex = state.ingredients.findIndex((itemObject) => {
        return itemObject.constructorId === action.payload.from;
      });
      const hoverIndex = state.ingredients.findIndex((itemObject) => {
        return itemObject.constructorId === action.payload.to;
      });
      const dragCard = state.ingredients[dragIndex];
      state.ingredients.splice(dragIndex, 1);
      state.ingredients.splice(hoverIndex, 0, dragCard);
    })
    .addCase(SET_DRAGGED, (state, action) => {})
    .addCase(DELETE_ITEM, (state, action) => {
      state.ingredients = state.ingredients.filter(
        (item) => item.constructorId !== action.payload.constructorId
      );
    });
});

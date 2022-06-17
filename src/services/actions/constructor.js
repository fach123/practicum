import { createAction } from "@reduxjs/toolkit";

export const DROP_ITEM_BUN = createAction("constructor/drop_item_bun");
export const DROP_ITEM_INGREDIENT = createAction(
  "constructor/drop_item_ingredient"
);
export const SORT_INGREDIENT = createAction("constructor/sort_ingredient");
export const SET_DRAGGED = createAction("constructor/set_dragged");
export const DELETE_ITEM = createAction("constructor/delete_item");

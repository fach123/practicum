import { createAction } from "@reduxjs/toolkit";

export const DROP_ITEM_BUN: any = createAction("constructor/drop_item_bun");
export const DROP_ITEM_INGREDIENT: any = createAction(
  "constructor/drop_item_ingredient"
);
export const SORT_INGREDIENT: any = createAction("constructor/sort_ingredient");
export const SET_DRAGGED: any = createAction("constructor/set_dragged");
export const DELETE_ITEM: any = createAction("constructor/delete_item");

import { createAction } from "@reduxjs/toolkit";
import { IItem } from "../../components/types";
export const DROP_ITEM_BUN = createAction<IItem>("constructor/drop_item_bun");
export const DROP_ITEM_INGREDIENT = createAction<IItem>(
  "constructor/drop_item_ingredient"
);
interface ISORT_INGREDIENT {
  from?: string;
  to?: string;
}
export const SORT_INGREDIENT = createAction<ISORT_INGREDIENT>(
  "constructor/sort_ingredient"
);
export const SET_DRAGGED = createAction("constructor/set_dragged");
export const DELETE_ITEM = createAction<IItem>("constructor/delete_item");

export const constructorActions = {
  DROP_ITEM_BUN,
  DROP_ITEM_INGREDIENT,
  SORT_INGREDIENT,
  SET_DRAGGED,
  DELETE_ITEM,
};

import { AppDispatch, RootState, store } from "../index";
import {
  TypedUseSelectorHook,
  useDispatch,
  useDispatch as dispatchHook,
  useSelector,
  useSelector as selectorHook,
} from "react-redux";

export interface IRoot {
  items: IItem[];
}

export interface IItem {
  _id: string;
  name: string;
  type: string;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
  __v: number;
  constructorId?: string;
}

export type TOrders = {
  _id: string;
  createdAt: string;
  ingredients: Array<string>;
  name: string;
  number: number;
  status: "pending" | "done" | "created";
  updatedAt: string;
};

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

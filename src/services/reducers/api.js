import { getIngredients, sendOrder } from "../actions/api";
import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  itemsRequest: false,
  itemsFailed: false,

  orderItems: {},
  orderItemsRequest: false,
  orderItemsFailed: false,
};

export const apiReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(getIngredients.pending, (state, action) => {
      state.itemsRequest = true;
    })
    .addCase(getIngredients.rejected, (state, action) => {
      state.itemsRequest = false;
      state.itemsFailed = true;
    })
    .addCase(getIngredients.fulfilled, (state, action) => {
      state.itemsRequest = false;
      state.itemsFailed = false;
      state.items = action.payload;
    })
    .addCase(sendOrder.pending, (state, action) => {
      state.orderItemsRequest = true;
      state.orderItems = {};
    })
    .addCase(sendOrder.rejected, (state, action) => {
      state.orderItemsRequest = false;
      state.orderItemsFailed = false;
    })
    .addCase(sendOrder.fulfilled, (state, action) => {
      console.log(action);
      state.orderItemsRequest = false;
      state.orderItemsFailed = false;
      state.orderItems = action.payload;
    });
});

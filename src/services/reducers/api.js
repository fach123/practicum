//import { combineReducers } from 'redux';
import {
  LIST_PENDING,
  LIST_FAILED,
  LIST_SUCCESS,
  ORDER_PENDING,
  ORDER_FAILED,
  ORDER_SUCCESS,
} from "../actions/api";
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
    .addCase(LIST_PENDING, (state, action) => {
      state.itemsRequest = true;
    })
    .addCase(LIST_FAILED, (state, action) => {
      state.itemsRequest = false;
      state.itemsFailed = true;
    })
    .addCase(LIST_SUCCESS, (state, action) => {
      state.itemsRequest = false;
      state.itemsFailed = false;
      state.items = action.payload;
    })
    .addCase(ORDER_PENDING, (state, action) => {
      state.orderItemsRequest = true;
      state.orderItems = {};
    })
    .addCase(ORDER_FAILED, (state, action) => {
      state.orderItemsRequest = false;
      state.orderItemsFailed = false;
    })
    .addCase(ORDER_SUCCESS, (state, action) => {
      console.log(action);
      state.orderItemsRequest = false;
      state.orderItemsFailed = false;
      state.orderItems = action.payload;
    });
});

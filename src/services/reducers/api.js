//import { combineReducers } from 'redux';
import { LIST_PENDING, LIST_FAILED, LIST_SUCCESS } from "../actions/api";
import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  itemsRequest: false,
  itemsFailed: false,

  recommendedItems: [],
  recommendedItemsRequest: false,
  recommendedItemsFailed: false,

  promoCode: "",
  promoDiscount: null,
  promoRequest: false,
  promoFailed: false,

  currentTab: "items",
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
      console.log(action);
      state.itemsRequest = false;
      state.itemsFailed = false;
      state.items = action.payload;
    });
});

/*const {actions, reducer} = createSlice({
    name: "main",
    initialState,
    reducers: {},
    extraReducers: {
        [getIngredients.fulfilled]: (state, {meta, payload}) => {

            if (payload.ok) {
                payload.json().then((data) => {
                    state.itemsRequest = false;
                    state.itemsFailed = false;
                    state.items = data;
                })
            }else{
                state.itemsRequest = false;
                state.itemsFailed = true;
            }


        },
        [getIngredients.pending]: (state, {meta}) => {
            state.itemsRequest = true;
        },
        [getIngredients.rejected]: (state, {meta, payload, error}) => {
            state.itemsRequest = false;
            state.itemsFailed = true;
        },
    },
});*/

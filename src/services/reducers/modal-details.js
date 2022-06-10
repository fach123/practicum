import { createReducer } from "@reduxjs/toolkit";
import { DELETE_INFO, SET_INFO } from "../actions/modal-details";

const initialState = {
  details: null,
};

export const modalReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(SET_INFO, (state, action) => {
      state.details = action.payload;
    })
    .addCase(DELETE_INFO, (state, action) => {
      state.details = null;
    });
});

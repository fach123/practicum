import { createReducer } from "@reduxjs/toolkit";
import {SET_EMAIL} from "../actions/forgot-password";

const initialState = {
    email: '',
};

export const forgotPasswordReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(SET_EMAIL, (state, action) => {
            state.email = action.payload;
        })
});

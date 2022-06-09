import { createAction, createAsyncThunk } from "@reduxjs/toolkit";

export const LIST_PENDING = createAction("main/fetchList/pending");
export const LIST_FAILED = createAction("main/fetchList/rejected");
export const LIST_SUCCESS = createAction("main/fetchList/fulfilled");

export const ORDER_PENDING = createAction("main/fetchOrder/pending");
export const ORDER_FAILED = createAction("main/fetchOrder/rejected");
export const ORDER_SUCCESS = createAction("main/fetchOrder/fulfilled");

const apiUrl = "https://norma.nomoreparties.space/api/";
export const getIngredients = createAsyncThunk(
  "main/fetchList",
  async (_, { rejectWithValue }) => {
    try {
      return await fetch(apiUrl + "ingredients")
        .then((response) => {
          if (response.ok) {
            return response.json().then((data) => {
              if (data.success) {
                return data.data;
              } else {
                return rejectWithValue([], data);
              }
            });
          }
        })
        .catch((error) => {
          console.log(error);
          return rejectWithValue([], error);
        });
    } catch (err) {
      return rejectWithValue([], err);
    }
  }
);
export const sendOrder = createAsyncThunk(
  "main/fetchOrder",
  async (data, { rejectWithValue }) => {
    try {
      return await fetch(apiUrl + "orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((response) => {
          if (response.ok) {
            return response.json().then((data) => {
              if (data.success) {
                return data;
              } else {
                return rejectWithValue([], data);
              }
            });
          }
        })
        .catch((error) => {
          console.log(error);
          return rejectWithValue([], error);
        });
    } catch (err) {
      return rejectWithValue([], err);
    }
  }
);

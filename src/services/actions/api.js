import { createAsyncThunk } from "@reduxjs/toolkit";

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

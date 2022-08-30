import { createAction, createAsyncThunk, Dispatch } from "@reduxjs/toolkit";
import { IUpdateUser } from "../reducers/api";

export interface IUser {
  email: string;
  name: string;
}

const apiUrl: string = "https://norma.nomoreparties.space/api/";

export const UPDATE_USER = createAction<IUpdateUser>("api/update_user");

const updateUser = (
  user: { accessToken: string; refreshToken: string },
  dispatch: Dispatch
) => {
  let userStorage = localStorage.getItem("user");
  if (userStorage) {
    const userOriginal = JSON.parse(userStorage);
    if (userOriginal) {
      userOriginal.accessToken = user.accessToken;
      userOriginal.refreshToken = user.refreshToken;
      localStorage.setItem("user", JSON.stringify(userOriginal));

      dispatch(UPDATE_USER(userOriginal));
    }
  }
};
const checkReponse = (response: Response) => {
  //return Promise.reject({success:false,message:'jwt expired'})
  console.log(response);
  if (response.ok) {
    return response
      .json()
      .then((data) => {
        if (data.success) {
          return data;
        } else {
          Promise.reject(data);
        }
      })
      .catch((error) => {
        console.log(error);
        return Promise.reject(error);
      });
  } else {
    return response
      .json()
      .then((data) => {
        return Promise.reject(data);
      })
      .catch((error) => {
        console.log(error);
        return Promise.reject(error);
      });
  }
};
const refreshToken = (token: string) => {
  return fetch(`${apiUrl}auth/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      token: token,
    }),
  }).then((response) => {
    return checkReponse(response)
      .then((data) => {
        return data;
      })
      .catch((error) => {
        console.log(error);
        return Promise.reject(error);
      });
  });
};
export const getIngredients = createAsyncThunk(
  "main/fetchList",
  async (_, { rejectWithValue }) => {
    try {
      return await fetch(apiUrl + "ingredients")
        .then(async (response) => {
          try {
            const data = await checkReponse(response);
            return data.data;
          } catch (error) {
            console.log(error);
            return rejectWithValue(error);
          }
        })
        .catch((error) => {
          console.log(error);
          return rejectWithValue(error);
        });
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);
export const sendOrder = createAsyncThunk(
  "main/fetchOrder",
  async (data: { ingredients: Array<string>,accessToken:string }, { rejectWithValue }) => {
    try {
      return await fetch(apiUrl + "orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
            authorization: data.accessToken,
        },
        body: JSON.stringify(data),
      })
        .then(async (response) => {
          try {
            return await checkReponse(response);
          } catch (error) {
            console.log(error);
            return rejectWithValue(error);
          }
        })
        .catch((error) => {
          console.log(error);
          return rejectWithValue(error);
        });
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);
//auth
export const goRegister = createAsyncThunk(
  "main/fetchRegister",
  async (
    data: { email: string; name: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      return await fetch(apiUrl + "auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then(async (response) => {
          try {
            return await checkReponse(response);
          } catch (error) {
            console.log(error);
            return rejectWithValue(error);
          }
        })
        .catch((error) => {
          console.log(error);
          return rejectWithValue(error);
        });
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);
export const goLogin = createAsyncThunk(
  "main/fetchLogin",
  async (
    data: { email: string; name: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      return await fetch(apiUrl + "auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then(async (response) => {
          try {
            return await checkReponse(response);
          } catch (error) {
            console.log(error);
            return rejectWithValue(error);
          }
        })
        .catch((error) => {
          console.log(error);
          return rejectWithValue(error);
        });
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);
export const goLogout = createAsyncThunk(
  "main/fetchLogout",
  async (data: { token: string }, { rejectWithValue }) => {
    try {
      return await fetch(apiUrl + "auth/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then(async (response) => {
          try {
            return await checkReponse(response);
          } catch (error) {
            console.log(error);
            return rejectWithValue(error);
          }
        })
        .catch((error) => {
          console.log(error);
          return rejectWithValue(error);
        });
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);
export const goForgotPassword = createAsyncThunk(
  "main/fetchForgotPassword",
  async (email: { email: string }, { rejectWithValue }) => {
    try {
      return await fetch(apiUrl + "password-reset", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(email),
      })
        .then(async (response) => {
          try {
            await checkReponse(response);
            return email.email;
          } catch (error) {
            console.log(error);
            return rejectWithValue(error);
          }
        })
        .catch((error) => {
          console.log(error);
          return rejectWithValue(error);
        });
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);
export const goResetPassword = createAsyncThunk(
  "main/fetchResetPassword",
  async (data: { token: string; password: string }, { rejectWithValue }) => {
    try {
      return await fetch(apiUrl + "password-reset/reset", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then(async (response) => {
          try {
            return await checkReponse(response);
          } catch (error) {
            console.log(error);
            return rejectWithValue(error);
          }
        })
        .catch((error) => {
          console.log(error);
          return rejectWithValue(error);
        });
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);
//profile
export const getUser = createAsyncThunk(
  "main/fetchGetUser",
  async (
    data: { accessToken: string; refreshToken: string; user: IUser },
    { dispatch, rejectWithValue }
  ) => {
    try {
      return await fetch(apiUrl + "auth/user", {
        method: "GET",
        headers: {
          authorization: data.accessToken,
        },
      })
        .then((response) => {
          return checkReponse(response)
            .then((dataTokens) => {
              return dataTokens;
            })
            .catch(async (error) => {
              if (error.message === "jwt expired") {
                const refreshData = await refreshToken(data.refreshToken);
                if (!refreshData.success) {
                  return Promise.reject(refreshData);
                }
                updateUser(refreshData, dispatch);
                dispatch(getUser({ ...data, ...refreshData }));
                return Promise.reject("jwt Updating...");
              } else {
                return Promise.reject(error);
              }
            });
        })
        .catch((error) => {
          console.log(error);
          return rejectWithValue(error);
        });
    } catch (err) {
      console.log(err);
      return rejectWithValue(err);
    }
  }
);
export const goChangeUser = createAsyncThunk(
  "main/fetchChangeUser",
  async (
    data: { accessToken: string; refreshToken: string; user: IUser },
    { dispatch, rejectWithValue }
  ) => {
    try {
      return await fetch(apiUrl + "auth/user", {
        method: "PATCH",
        headers: {
          authorization: data.accessToken,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data.user),
      })
        .then((response) => {
          return checkReponse(response)
            .then((dataTokens) => {
              return dataTokens;
            })
            .catch(async (error) => {
              if (error.message === "jwt expired") {
                const refreshData = await refreshToken(data.refreshToken);
                if (!refreshData.success) {
                  return Promise.reject(refreshData);
                }
                updateUser(refreshData, dispatch);
                dispatch(goChangeUser({ ...data, ...refreshData }));
                return Promise.reject("jwt Updating...");
              } else {
                return Promise.reject(error);
              }
            });
        })
        .catch((error) => {
          console.log(error);
          return rejectWithValue(error);
        });
    } catch (err) {
      console.log(err);
      return rejectWithValue(err);
    }
  }
);

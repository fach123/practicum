import { createAction, createAsyncThunk } from "@reduxjs/toolkit";

const apiUrl = "https://norma.nomoreparties.space/api/";

export const UPDATE_USER = createAction("api/update_user");

const updateUser = (user, dispatch) => {
  const userOriginal = JSON.parse(localStorage.getItem("user"));
  if (userOriginal) {
    userOriginal.accessToken = user.accessToken;
    userOriginal.refreshToken = user.refreshToken;
    localStorage.setItem("user", JSON.stringify(userOriginal));
    dispatch(UPDATE_USER(userOriginal));
  }
};
const checkReponse = (response) => {
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
const refreshToken = (token) => {
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
        .then((response) => {
          return checkReponse(response)
            .then((data) => {
              return data.data;
            })
            .catch((error) => {
              console.log(error);
              return rejectWithValue([], error);
            });
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
          return checkReponse(response)
            .then((data) => {
              return data;
            })
            .catch((error) => {
              console.log(error);
              return rejectWithValue([], error);
            });
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
//auth
export const goRegister = createAsyncThunk(
  "main/fetchRegister",
  async (data, { rejectWithValue }) => {
    try {
      return await fetch(apiUrl + "auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((response) => {
          return checkReponse(response)
            .then((data) => {
              return data;
            })
            .catch((error) => {
              console.log(error);
              return rejectWithValue([], error);
            });
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
export const goLogin = createAsyncThunk(
  "main/fetchLogin",
  async (data, { rejectWithValue }) => {
    try {
      return await fetch(apiUrl + "auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((response) => {
          return checkReponse(response)
            .then((data) => {
              return data;
            })
            .catch((error) => {
              console.log(error);
              return rejectWithValue([], error);
            });
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
export const goLogout = createAsyncThunk(
  "main/fetchLogout",
  async (data, { rejectWithValue }) => {
    try {
      return await fetch(apiUrl + "auth/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((response) => {
          return checkReponse(response)
            .then((data) => {
              return data;
            })
            .catch((error) => {
              console.log(error);
              return rejectWithValue([], error);
            });
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
export const goForgotPassword = createAsyncThunk(
  "main/fetchForgotPassword",
  async (email, { rejectWithValue }) => {
    try {
      return await fetch(apiUrl + "password-reset", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(email),
      })
        .then((response) => {
          return checkReponse(response)
            .then((data) => {
              return email.email;
            })
            .catch((error) => {
              console.log(error);
              return rejectWithValue([], error);
            });
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
export const goResetPassword = createAsyncThunk(
  "main/fetchResetPassword",
  async (data, { rejectWithValue }) => {
    try {
      return await fetch(apiUrl + "password-reset/reset", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((response) => {
          return checkReponse(response)
            .then((data) => {
              return data;
            })
            .catch((error) => {
              console.log(error);
              return rejectWithValue([], error);
            });
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
//profile
export const getUser = createAsyncThunk(
  "main/fetchGetUser",
  async (data, { dispatch, rejectWithValue }) => {
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
          return rejectWithValue([], error);
        });
    } catch (err) {
      console.log(err);
      return rejectWithValue([], err);
    }
  }
);
export const goChangeUser = createAsyncThunk(
  "main/fetchChangeUser",
  async (data, { dispatch, rejectWithValue }) => {
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
          return rejectWithValue([], error);
        });
    } catch (err) {
      console.log(err);
      return rejectWithValue([], err);
    }
  }
);

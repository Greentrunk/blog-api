import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loggedIn: false,
  token: null,
  status: "idle",
  error: null,
};

export const login = createAsyncThunk("auth/login", async (creds) => {
  const response = await axios.post("https://atomic-blog.herokuapp.com/auth/login", creds);
  return response.data;
});

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    logout(state, action) {
      state.loggedIn = false;
      state.token = null;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(login.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.loggedIn = true;
        state.token = action.payload.token;
      })
      .addCase(login.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { logout } = loginSlice.actions;

export default loginSlice.reducer;

export const selectLoggedIn = (state) => state.login.loggedIn;

export const selectToken = (state) => state.login.token;

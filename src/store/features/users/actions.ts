import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import "../../axios";

export const signIn = createAsyncThunk(
  "user/signIn",
  async (payload: FormData, thunkAPI) => {
    try {
      const { data } = await axios.post("/users/login", payload, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      window.localStorage.setItem('__token', data.accessToken);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue("Something went wrong");
    }
  }
);

export const signUp = createAsyncThunk(
  "user/signUp",
  async (payload: FormData, thunkAPI) => {
    try {
      const { data } = await axios.post("/users/register", payload, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      window.localStorage.setItem('__token', data.accessToken);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue("Something went wrong");
    }
  }
);

export const logout = ()=>{
  window.localStorage.clear();
}

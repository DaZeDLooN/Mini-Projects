import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const url = "https://course-api.com/react-useReducer-cart-project";

export const signIn = createAsyncThunk(
  "user/signIn",
  async (name, thunkAPI) => {
    try {
      const { data } = await axios.get(url);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue("Something went wrong");
    }
  }
);

export const signUp = createAsyncThunk(
  "user/signUp",
  async (name, thunkAPI) => {
    try {
      const { data } = await axios.get(url);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue("Something went wrong");
    }
  }
);

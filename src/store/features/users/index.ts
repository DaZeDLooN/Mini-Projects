import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { signIn, signUp } from "./actions";

interface userState {
  error: any | null;
  isLoading: boolean;
  user: any | null;
  token: any | null;
}

const initialState: userState = {
  error: null,
  user: null,
  token: null,
  isLoading: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // signin
		builder.addCase(signIn.fulfilled, (state, action: PayloadAction<any>) => {
			state.user = action.payload.user;
      state.token = action.payload.accessToken;
			state.isLoading = false;
		});
		// signup
		builder.addCase(signUp.fulfilled, (state, action: PayloadAction<any>) => {
			state.user = action.payload.user;
      state.token = action.payload.accessToken;
			state.isLoading = false;
		});
		// -- updating loading states
		builder.addMatcher(isAnyOf(signIn.pending, signUp.pending), (state) => {
			state.error = null;
			state.isLoading = true;
		});
		// -- updating error states
		builder.addMatcher(
			isAnyOf(signIn.rejected, signUp.rejected),
			(state, action: PayloadAction<any>) => {
				if (action.payload && action.payload.errorMessage)
					state.error = action.payload.errorMessage;
				else if ((action as any)?.error?.message)
					state.error = (action as any)?.error?.message;
				else state.error = 'Some error occurred.';
				state.isLoading = false;
			}
		);
  },
});

export const {} = userSlice.actions;
export default userSlice.reducer;

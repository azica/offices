import type { RootState } from "..";
import type { PayloadAction } from "@reduxjs/toolkit";

import { createSlice } from "@reduxjs/toolkit";

const initialState: AuthSlice = {
  authData: null,
  successEmail: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthData: (state, { payload }: PayloadAction<AuthData | null>) => {
      state.authData = payload;
    },
    setSentEmail: (state, { payload }: PayloadAction<string>) => {
      state.successEmail = payload;
    },
  },
});

export const { setAuthData, setSentEmail } = authSlice.actions;

export const selectAuthData = (state: RootState) => state.auth;

export default authSlice.reducer;

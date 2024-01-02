import type { RootState } from "..";
import type { PayloadAction } from "@reduxjs/toolkit";

import { createSlice } from "@reduxjs/toolkit";

import { hasRole } from "@/helpers/utils";
import { SystemAdminId, AdminId } from "@/shared/constants";

const initialState: UserSlice = {
  user: null,
  isSystemAdmin: null,
  isOfficeAdmin: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, { payload }: PayloadAction<Model.User | null>) => {
      state.user = payload;
      state.isSystemAdmin = payload && payload.role ? hasRole(payload.role, SystemAdminId) : null;
      state.isOfficeAdmin = payload && payload.role ? hasRole(payload.role, AdminId) : null;
    },
    setUserAvatar: (state, { payload }: PayloadAction<string>) => {
      if (state.user && payload) state.user = { ...state.user, image: payload };
    },
  },
});

export const { setUser, setUserAvatar } = userSlice.actions;

export const selectUser = (state: RootState) => state.user;

export const selectUserAvatar = (state: RootState) => (state.user ? state.user.user?.image : null);

export const selectUserId = (state: RootState) => (state.user ? state.user.user?.id : null);

export const selectUserRole = (state: RootState) => (state.user ? state.user.user?.role : null);

export const isUserSystemAdmin = (state: RootState) => (state.user ? state.user.isSystemAdmin : null);

export const isUserOfficeAdmin = (state: RootState) => (state.user ? state.user.isOfficeAdmin : null);

export default userSlice.reducer;

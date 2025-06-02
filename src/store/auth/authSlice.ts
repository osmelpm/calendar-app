import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { AuthState, User } from "./types";
import { AuthStatus } from "./enums";

const initialState: AuthState = {
  status: AuthStatus.NoAuthenticated,
  user: null,
  errorMessage: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    onChecking: (state) => {
      state.status = AuthStatus.Checking;
      state.user = null;
      state.errorMessage = null;
    },
    onLogin: (state, { payload }: PayloadAction<User>) => {
      state.status = AuthStatus.Authenticated;
      state.user = payload;
      state.errorMessage = null;
    },
    onLogout: (
      state,
      { payload }: PayloadAction<{ message: string | null } | undefined>
    ) => {
      state.status = AuthStatus.NoAuthenticated;
      state.user = null;
      state.errorMessage = payload?.message ?? null;
    },
    clearErrorMessage: (state) => {
      state.errorMessage = null;
    },
  },
});

export const { onChecking, onLogin, onLogout, clearErrorMessage } =
  authSlice.actions;

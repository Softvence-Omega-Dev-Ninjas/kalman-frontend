// src/redux/features/auth/authSlice.ts
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface Admin {
  id?: number | string;
  email?: string;
  phone?: string;
  [key: string]: any;
}

interface AdminState {
  admin: Admin | null;
  token: string | null;
}

const initialState: AdminState = {
  admin: null,
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAdmin: (state, action: PayloadAction<{ admin: Admin; token: string }>) => {
      state.admin = action.payload.admin;
      state.token = action.payload.token;
    },

  },
});

export const { setAdmin } = authSlice.actions;
export default authSlice.reducer;

// orrect selectors
export const selectCurrentAdmin = (state: any) => state.auth.admin;
export const selectToken = (state: any) => state.auth.token;

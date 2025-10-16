// src/redux/features/auth/authSlice.ts
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit"; // ✅ type-only import

interface User {
  id?: number | string;
  name?: string;
  email?: string;
  phone?: string;
  [key: string]: any;
}

interface AuthState {
  user: User | null;
  token: string | null;
}

const getUserFromLocalStorage = () => {
  if (typeof window !== "undefined") {
    const user = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    return {
      user: user ? JSON.parse(user) : null,
      token: token || null,
    };
  }
  return { user: null, token: null };
};

const initialState: AuthState = getUserFromLocalStorage();

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (
      state,
      action: PayloadAction<{ user: User; token: string }>
    ) => {
      state.user = action.payload.user;
      state.token = action.payload.token;

      if (typeof window !== "undefined") {
        localStorage.setItem("user", JSON.stringify(action.payload.user));
        localStorage.setItem("token", action.payload.token);
      }
    },

    clearUser: (state) => {
      state.user = null;
      state.token = null;
      if (typeof window !== "undefined") {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
      }
    },

    getUserFromStorage: (state) => {
      const storedUser = localStorage.getItem("user");
      const storedToken = localStorage.getItem("token");
      state.user = storedUser ? JSON.parse(storedUser) : null;
      state.token = storedToken || null;
    },
  },
});

export const { setUser, clearUser, getUserFromStorage } = authSlice.actions;
export default authSlice.reducer;

export const selectCurrentUser = (state: any) => state.auth.user;
export const selectToken = (state: any) => state.auth.token;

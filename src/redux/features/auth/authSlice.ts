// src/redux/features/auth/authSlice.ts
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

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

    //  ADD THIS NEW REDUCER
    updateUser: (state, action: PayloadAction<Partial<User>>) => {
      if (state.user) {
        // Update the user state with new data
        state.user = { ...state.user, ...action.payload };
        
        //  ALSO UPDATE LOCALSTORAGE to persist changes
        if (typeof window !== "undefined") {
          localStorage.setItem("user", JSON.stringify(state.user));
        }
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

//  EXPORT THE NEW ACTION
export const { setUser, updateUser, clearUser, getUserFromStorage } = authSlice.actions;
export default authSlice.reducer;

export const selectCurrentUser = (state: any) => state.auth.user;
export const selectToken = (state: any) => state.auth.token;


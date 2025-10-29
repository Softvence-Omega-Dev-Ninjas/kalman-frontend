// src/redux/features/auth/authApi.ts
import { baseApi } from "@/redux/api/baseApi";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    
    // User Login
    login: builder.mutation({
      query: (data) => ({
        url: "/auth/login",
        method: "POST",
        body: data,
      }),
    }),

    // Admin Login
    adminLogin: builder.mutation({
      query: (data) => ({
        url: "/auth/admin-login",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  
  useLoginMutation,
  useAdminLoginMutation
} = authApi;

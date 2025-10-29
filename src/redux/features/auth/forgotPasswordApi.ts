// src/redux/features/auth/authApi.ts
import { baseApi } from "@/redux/api/baseApi";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Reset Password
    resetPassword: builder.mutation({
      query: (data) => ({
        url: "/auth/reset-password",
        method: "POST",
        body: data,
      }),
    }),
    // 
     forgetPassword: builder.mutation({
      query: (data) => ({
        url: "/auth/forget-passoword",
        method: "POST",
        body: data,
      }),
    }),

    // Update Password
    updatePassword: builder.mutation({
      query: (data) => ({
        url: "/auth/update-passowrd",
        method: "POST",
        body: data,
      }),
    }),

  }),
});

export const {
  useForgetPasswordMutation,
  useUpdatePasswordMutation,
  useResetPasswordMutation
} = authApi;

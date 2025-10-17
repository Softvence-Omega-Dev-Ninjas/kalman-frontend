// src/redux/features/auth/authApi.ts
import { baseApi } from "@/redux/api/baseApi";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // User Signup
    signup: builder.mutation({
      query: (data) => ({
        url: "/auth/singup",
        method: "POST",
        body: data,
      }),
    }),

    // Phone OTP
    phoneOtp: builder.mutation({
      query: (data) => ({
        url: "/auth/phone_otp",
        method: "POST",
        body: data,
      }),
    }),

    // Send OTP by Email
    sendOtpByEmail: builder.mutation({
      query: (data) => ({
        url: "/auth/send_otp_by_email",
        method: "POST",
        body: data,
      }),
    }),

    // Verify OTP
    verifyOtp: builder.mutation({
      query: (data) => ({
        url: "/auth/verify-otp",
        method: "POST",
        body: data,
      }),
    }),

  }),
});

export const {
  useSignupMutation,
  usePhoneOtpMutation,
  useSendOtpByEmailMutation,
  useVerifyOtpMutation
} = authApi;

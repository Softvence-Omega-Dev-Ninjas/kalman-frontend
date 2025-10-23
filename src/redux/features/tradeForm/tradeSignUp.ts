// src/redux/features/auth/authApi.ts
import { baseApi } from "@/redux/api/baseApi";

export const tradeSignUpApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    
    // User Login
    tradeSignUp: builder.mutation({
      query: (data) => ({
        url: "/tradesman",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useTradeSignUpMutation
} = tradeSignUpApi;

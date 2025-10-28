/* eslint-disable @typescript-eslint/no-explicit-any */
// src/redux/api/baseApi.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://10.10.10.54:7000", //  Change this to your API base URL
    prepareHeaders: (headers, { getState }) => {
      const state = getState() as any;
      const token =
        state.admin?.token || state.auth?.token || state.user?.token;

      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
        console.log(token);
      }
      return headers;
    },
  }),

  tagTypes: [
    "Auth",
    "Jobs",
    "Customer",
    "Categories",
    "Dasboard",
    "Blogs",
    "Contact",
    "Admin",
    "Chat",
    "Profile",
    "Tradesman",
    "Commision",
    "Reviews",
    "Invitations",
  ],

  endpoints: () => ({}),
});

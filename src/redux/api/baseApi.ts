
// src/redux/api/baseApi.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { RootState } from "../store";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://10.10.10.54:7000", //  Change this to your API base URL
    prepareHeaders: (headers, { getState }) => {
      const state = getState() as RootState;
      console.log("Current State:", state); // Debugging line to check the state structure
      const token =
        state.auth?.token || state.admin?.token ;

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
  ],

  endpoints: () => ({}),
});

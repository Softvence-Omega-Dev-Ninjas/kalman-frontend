// src/redux/api/baseApi.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    // baseUrl: "https://pravaruka.sk", //  Change this to your API base URL
    baseUrl: "http://10.10.10.54:7000", //  Change this to your API base URL
    prepareHeaders: (headers, { getState }) => {

     const state = getState() as any;
     console.log("Current state in prepareHeaders:", state);
     const token = state.auth?.token;
     console.log("Preparing headers with token:", token);

      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
        console.log("Authorization header set:", token);
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
  ],

  endpoints: () => ({}),
});

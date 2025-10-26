// src/redux/features/auth/authApi.ts

import { baseApi } from "@/redux/api/baseApi";


export const settingsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    updateSettings: builder.mutation({
      query: (data) => ({
        url: "/tradesman/update-tradesman",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Profile"],
    }),

    getAboutMe: builder.query({
      query: () => ({
        url: "/customer/get-me",
      }),
      providesTags: ["Profile"],
    })


  }),
});

export const {
    useUpdateSettingsMutation,
    useGetAboutMeQuery
} = settingsApi;

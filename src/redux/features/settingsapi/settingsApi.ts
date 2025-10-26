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


  }),
});

export const {
    useUpdateSettingsMutation,
} = settingsApi;

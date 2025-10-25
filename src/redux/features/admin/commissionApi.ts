import { baseApi } from "@/redux/api/baseApi";

export const commisionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // GET commission info
    getCommision: builder.query<any, void>({
      query: () => ({
        url: "/commision",
        method: "GET",
      }),
      providesTags: ["Commision"],
    }),

    // POST commission (create or update)
    setCommision: builder.mutation<any, any>({
      query: (data) => ({
        url: "/commision",
        method: "POST",
        body: data,
        headers: { "Content-Type": "application/json" },
      }),
      invalidatesTags: ["Commision"],
    }),
  }),
});

export const { useGetCommisionQuery, useSetCommisionMutation } = commisionApi;

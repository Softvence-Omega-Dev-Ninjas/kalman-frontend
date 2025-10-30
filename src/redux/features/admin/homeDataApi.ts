// GET /admin/home-page-stat


import { baseApi } from "@/redux/api/baseApi";

export const homeDataApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    homePageData: builder.query<any, void>({
      query: () => ({
        url: "/admin/home-page-stat",
        method: "GET",
      }),
      providesTags: ["Admin"],
    }),
  }),
});

export const { useHomePageDataQuery } = homeDataApi;

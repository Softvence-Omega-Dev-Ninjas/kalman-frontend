import { baseApi } from "@/redux/api/baseApi";

export const tradesmanApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    //get All Blogs
    getAllTradesmans: builder.query({
      query: ({
        search,
        category,
        subCategory,
        location,
        rating,
        page = 1,
        limit = 10,
      }) => {
        const params = new URLSearchParams();

        if (search) params.append("search", search);
        if (category) params.append("category", category);
        if (subCategory) params.append("subCategory", subCategory);
        if (location) params.append("location", location);
        if (rating) params.append("rating", rating);
        params.append("page", page.toString());
        params.append("limit", limit.toString());

        return {
          url: `/tradesman?${params.toString()}`,
          method: "GET",
        };
      },
      providesTags: ["Tradesman"],
    }),

    getSingleTradesman: builder.query({
      query: (id) => ({
        url: `/tradesman/${id}`,
        method: "GET",
      }),
      providesTags: (id) => [{ type: "Tradesman", id }],
    }),
  }),
});

export const { useGetAllTradesmansQuery, useGetSingleTradesmanQuery } =
  tradesmanApi;

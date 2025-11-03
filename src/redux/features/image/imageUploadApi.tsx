import { baseApi } from "@/redux/api/baseApi";

export const imageApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    //get All Blogs

    getSingleImg: builder.query({
      query: (id) => ({
        url: `/uploads/${id}`,
        method: "GET",
      }),
      providesTags: (id) => [{ type: "Blogs", id }],
    }),

    // Post a New Blog
    postImg: builder.mutation({
      query: (data) => ({
        url: "/uploads",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Profile", "Tradesman", "Image"],
    }),
  }),
});

export const { usePostImgMutation, useGetSingleImgQuery } = imageApi;

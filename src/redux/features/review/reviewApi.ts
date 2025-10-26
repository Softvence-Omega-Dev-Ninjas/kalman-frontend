import { baseApi } from "@/redux/api/baseApi";

export const reviewApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    //get All Reviews
    getAllReviews: builder.query({
      query: () => ({
        url: "/review",
        method: "GET",
      }),
      providesTags: ["Reviews"],
    }),

    getSingleReview: builder.query({
      query: (id) => ({
        url: `/review/${id}`,
        method: "GET",
      }),
      providesTags: (id) => [{ type: "Reviews", id }],
    }),

    // Post a New Review
    postReview: builder.mutation({
      query: (data) => ({
        url: "/review",
        method: "POST",
        body: data,
      }),

      invalidatesTags: ["Reviews", "Tradesman"],
    }),

    //update review
    updateReview: builder.mutation({
      query: ({ id, data }) => ({
        url: `/review/${id}`,
        method: "PATCH", // or PATCH depending on your backend
        body: data,
      }),
      invalidatesTags: ["Reviews"],
    }),

    //delete a review
    deleteReview: builder.mutation({
      query: (id) => ({
        url: `/review/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Reviews"],
    }),
  }),
});

export const {
  useGetAllReviewsQuery,
  usePostReviewMutation,
  useGetSingleReviewQuery,
  useDeleteReviewMutation,
  useUpdateReviewMutation,
} = reviewApi;

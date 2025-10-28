import { baseApi } from "@/redux/api/baseApi";
import type { UserJobsResponse } from "@/user-dashboard/UserJobs";

export const jobsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // getJobs query
    getJobs: builder.query({
      query: ({
        search,
        category,
        subCategory,
        location,
        minPrice,
        maxPrice,
        page = 1,
        limit = 10,
      }) => {
        const params = new URLSearchParams();

        if (search) params.append("search", search);
        if (category) params.append("category", category);
        if (subCategory) params.append("subCategory", subCategory);
        if (location) params.append("location", location);
        if (minPrice) params.append("minPrice", minPrice.toString());
        if (maxPrice) params.append("maxPrice", maxPrice.toString());
        params.append("page", page.toString());
        params.append("limit", limit.toString());

        return {
          url: `/jobs?${params.toString()}`,
          method: "GET",
        };
      },
      providesTags: ["Jobs"],
    }),

    // post a job mutation
    postAJob: builder.mutation({
      query: ({ data, images }) => {
        const formData = new FormData();
        formData.append("data", JSON.stringify(data));
        if (images && images.length > 0) {
          images.forEach((file: string | Blob) => {
            formData.append("images", file);
          });
        }

        return {
          url: "/jobs",
          method: "POST",
          body: formData,
        };
      },
      invalidatesTags: ["Jobs"],
    }),

    getJobById: builder.query<any, string>({
      query: (id) => ({
        url: `/jobs/${id}`,
        method: "GET",
      }),
      providesTags: (id) => [{ type: "Jobs", id }],
    }),

    deleteJob: builder.mutation<any, string>({
      query: (id) => ({
        url: `/jobs/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (id) => [{ type: "Jobs", id }],
    }),
   getUserJobs: builder.query<UserJobsResponse, void>({
      query: () => ({
        url: `/jobs/user-jobs`,
        method: "GET",
      }),
      providesTags: ["Jobs"],
    }),
  }),
});

export const { useGetJobsQuery, usePostAJobMutation, useGetJobByIdQuery , useGetUserJobsQuery} =
  jobsApi;

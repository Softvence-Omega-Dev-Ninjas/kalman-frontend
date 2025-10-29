import { baseApi } from "@/redux/api/baseApi";
import type { UserJobsResponse } from "@/user-dashboard/UserJobs";

export const jobsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // getJobs query
    getJobs: builder.query({
      query: (params) => {
        const queryParams = new URLSearchParams();

        if (params?.search) queryParams.append("search", params.search);
        if (params?.category?.length) {
          params.category.forEach((catId: string) =>
            queryParams.append("category", catId)
          );
        }
        if (params?.subCategory)
          queryParams.append("subCategory", params.subCategory);
        if (params?.location) queryParams.append("location", params.location);
        if (params?.minPrice) queryParams.append("minPrice", params.minPrice);
        if (params?.maxPrice) queryParams.append("maxPrice", params.maxPrice);
        if (params?.page) queryParams.append("page", params.page);
        if (params?.limit) queryParams.append("limit", params.limit);

        return {
          url: `/jobs?${queryParams.toString()}`,
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

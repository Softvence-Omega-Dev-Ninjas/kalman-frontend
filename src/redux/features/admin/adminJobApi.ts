import { baseApi } from "@/redux/api/baseApi";


export const adminJobsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    getAllAdminJobs: builder.query< any, { page?: number; limit?: number } >({
      query: ({ page, limit }) => ({
        url: "/admin/jobs",
        method: "GET",
        params: { page, limit },
      }),
      providesTags: ["Admin"],
    }),

    getAdminJobById: builder.query<any, string>({
      query: (id) => ({
        url: `/admin/jobs/${id}`,
        method: "GET",
      }),
      providesTags:[ "Admin"],
    }),

    deleteAdminJob: builder.mutation<void, string>({
      query: (id) => ({
        url: `/admin/jobs/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Admin"],
    }),
  }),
});

export const {
    useDeleteAdminJobMutation ,
    useGetAdminJobByIdQuery ,
    useGetAllAdminJobsQuery ,
} = adminJobsApi;

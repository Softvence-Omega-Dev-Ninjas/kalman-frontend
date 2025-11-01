import { baseApi } from "@/redux/api/baseApi";


export const adminJobsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

  getAllAdminJobs: builder.query<
      any,
      { page?: number; limit?: number; search?: string }
    >({
      query: ({ page = 1, limit = 10, search }) => {
        // Build query string
        const params = new URLSearchParams();
        params.append("page", page.toString());
        params.append("limit", limit.toString());
        if (search) params.append("search", search);

        return {
          url: `/admin/jobs?${params.toString()}`,
          method: "GET",
        };
      },
      providesTags: ["Admin"],
    }),

    getAdminJobById: builder.query<any, string>({
      query: (id) => ({
        url: `/admin/jobs${id}`,
        method: "GET",
      }),
      providesTags:[ "Admin"],
    }),

    deleteAdminJob: builder.mutation<void, string>({
      query: (id) => ({
        url: `/admin/jobs${id}`,
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

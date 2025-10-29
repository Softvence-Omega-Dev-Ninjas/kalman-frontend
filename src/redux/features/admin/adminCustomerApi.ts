import { baseApi } from "@/redux/api/baseApi";


export const adminCustomerApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

   getAllAdminCustomers: builder.query<
      any,
      { page?: number; limit?: number; search?: string }
    >({
      query: ({ page = 1, limit = 10, search }) => {
        // Using URLSearchParams to build query string (optional)
        const params = new URLSearchParams();
        if (search) params.append("search", search);
        params.append("page", page.toString());
        params.append("limit", limit.toString());

        return {
          url: `/admin?${params.toString()}`,
          method: "GET",
        };
      },
      providesTags: ["Admin"],
    }),


    getAdminCustomerById: builder.query<any, string>({
      query: (id) => ({
        url: `/admin/customer/${id}`,
        method: "GET",
      }),
      providesTags:[ "Admin"],
    }),

    deleteAdminCustomer: builder.mutation<void, string>({
      query: (id) => ({
        url: `/admin/customer/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Admin"],
    }),
  }),
});

export const {
  useGetAllAdminCustomersQuery,
  useGetAdminCustomerByIdQuery,
  useDeleteAdminCustomerMutation,
} = adminCustomerApi;

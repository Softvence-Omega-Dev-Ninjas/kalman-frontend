import { baseApi } from "@/redux/api/baseApi";


export const adminCustomerApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    getAllAdminCustomers: builder.query< any, { page?: number; limit?: number } >({
      query: ({ page, limit }) => ({
        url: "/admin",
        method: "GET",
        params: { page, limit },
      }),
        // transformResponse: (response: any) => response.data, 
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

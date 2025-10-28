import { baseApi } from "@/redux/api/baseApi";

export const customerApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    //  Get all customers
   getAllCustomers: builder.query<any, void>({
  query: () => ({
    url: "/customer",
    method: "GET",
  }),
  providesTags: ["Customer"],
}),

    //  Get authenticated customer profile
    getMyProfile: builder.query({
      query: () => ({
        url: "/customer/get-me",
        method: "GET",
      }),
      providesTags: ["Customer"],
    }),

    //  Update authenticated user (excluding email)
    updateProfile: builder.mutation({
      query: (data) => ({
        url: "/customer",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Customer"],
    }),
  }),
});

//  Export hooks
export const {
  useGetAllCustomersQuery,
  useGetMyProfileQuery,
  useUpdateProfileMutation,
} = customerApi;

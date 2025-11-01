import { baseApi } from "@/redux/api/baseApi";

export const tradesmanApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    tradeSignUp: builder.mutation({
      query: (data) => ({
        url: "/tradesman",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Profile", "Tradesman"],
    }),
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

    getTradesmanProfile: builder.query({
      query: () => ({
        url: "/tradesman/profile",
        method: "GET",
      }),
      providesTags: ["Tradesman"],
    }),

    getTradesmanOverview: builder.query({
      query: () => ({
        url: "/tradesman/overview",
        method: "GET",
      }),
      providesTags: ["Tradesman"],
    }),

    updateSettings: builder.mutation({
      query: (data) => ({
        url: "/tradesman/update-tradesman",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Profile", "Tradesman", "PaymentMethods"],
    }),

    addPaymentMethod: builder.mutation({
      query: (data) => ({
        url: "/tradesman/add-payment",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Profile", "Tradesman", "PaymentMethods"],
    }),

    removePaymentMethod: builder.mutation({
      query: (id) => ({
        url: `tradesman/remove-payment/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["Profile", "Tradesman", "PaymentMethods"],
    }),

    setDefaultPaymentMethod: builder.mutation({
      query: (id) => ({
        url: `tradesman/set-default-payment/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["Profile", "PaymentMethods", "Tradesman"],
    }),
  }),
});

export const {
  useGetAllTradesmansQuery,
  useGetSingleTradesmanQuery,
  useGetTradesmanProfileQuery,
  useTradeSignUpMutation,
  useUpdateSettingsMutation,
  useGetTradesmanOverviewQuery,
  useAddPaymentMethodMutation,
  useRemovePaymentMethodMutation,
  useSetDefaultPaymentMethodMutation,
} = tradesmanApi;

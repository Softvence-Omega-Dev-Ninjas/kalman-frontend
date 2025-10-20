// src/redux/features/admin/categoryApi.ts
import { baseApi } from "@/redux/api/baseApi";

export const categoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // GET categories
    getCategories: builder.query<
      any,
      { search?: string; page?: number; limit?: number }
    >({
      query: ({ search, page = 1, limit = 10 }) => {
        const params = new URLSearchParams();
        if (search) params.append("search", search);
        params.append("page", page.toString());
        params.append("limit", limit.toString()); 

        return {
          url: `/category?${params.toString()}`,
          method: "GET",
        };
      },
      providesTags: ["Categories"],
    }),

    // POST category
    createCategory: builder.mutation<any, FormData>({
      query: (formData) => ({
        url: "/category",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Categories"],
    }),
  }),
});

export const { useGetCategoriesQuery, useCreateCategoryMutation } = categoryApi;
//
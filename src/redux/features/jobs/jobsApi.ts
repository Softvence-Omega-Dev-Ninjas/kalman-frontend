import { baseApi } from "@/redux/api/baseApi";

export const jobsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
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
  }),
});

export const { useGetJobsQuery } = jobsApi;

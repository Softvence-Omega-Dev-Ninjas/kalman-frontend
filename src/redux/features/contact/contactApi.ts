import { baseApi } from "@/redux/api/baseApi";

export const contactApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    //get All Blogs
    getAllContacts: builder.query({
      query: () => ({
        url: "/news-letter",
        method: "GET",
      }),
      providesTags: ["Contact"],
    }),

    // Post a New Blog
    postContact: builder.mutation({
      query: (data) => ({
        url: "/news-letter",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Contact"],
    }),
  }),
});

export const { useGetAllContactsQuery, usePostContactMutation } = contactApi;

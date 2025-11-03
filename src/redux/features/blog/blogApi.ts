import { baseApi } from "@/redux/api/baseApi";

export const blogApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    //get All Blogs
    getAllBlogs: builder.query({
      query: () => ({
        url: "/blog",
        method: "GET",
      }),
      providesTags: ["Blogs"],
    }),

    getSingleBlog: builder.query({
      query: (id) => ({
        url: `/blog/${id}`,
        method: "GET",
      }),
      providesTags: ["Blogs"],
    }),

    // Post a New Blog
    postBlog: builder.mutation({
      query: (data) => ({
        url: "/blog",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Blogs"],
    }),

    //update blog
    updateBlog: builder.mutation({
      query: ({ id, data }) => ({
        url: `/blog/${id}`,
        method: "PATCH", // or PATCH depending on your backend
        body: data,
      }),
      invalidatesTags: ["Blogs"],
    }),

    //delete a blog
    deleteBlog: builder.mutation({
      query: (id) => ({
        url: `/blog/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Blogs"],
    }),
  }),
});

export const {
  useGetAllBlogsQuery,
  usePostBlogMutation,
  useGetSingleBlogQuery,
  useDeleteBlogMutation,
  useUpdateBlogMutation,
} = blogApi;

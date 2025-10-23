import { baseApi } from "@/redux/api/baseApi";

 export const blogApi=baseApi.injectEndpoints({
    endpoints:(builder)=>({
        //get All Blogs
        getAllBlogs:builder.query({
            query:()=>({
                url:"/blog",
                method:"GET",
            }),
            providesTags:["Blogs"],
        }),

        getSingleBlog:builder.query({
            query:(id)=>({
                url:`/blog/${id}`,
                method:"GET",
            }),
        }),

        // Post a New Blog 
        postBlog:builder.mutation({
            query:(data)=>({
                url:"/blog",
                method:"POST",
                body:data, 
            }),
            invalidatesTags:["Blogs"],
        })
    }),

 });

 export const {useGetAllBlogsQuery,usePostBlogMutation, useGetSingleBlogQuery}=blogApi;



 
// src/redux/features/auth/authApi.ts
import { baseApi } from "@/redux/api/baseApi";

export const messageApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    
    getChatList: builder.query({
      query: () => ({
        url: "/chat/partners",
        method: "GET",
      }),
      providesTags: ["Chat"],
    }),

    getChatHistory: builder.query({
      query: ({userA, userB}) => ({
        url: `/chat/history/${userA}/${userB}`,
        method: "GET",
      }),
      providesTags: ["Chat"],
    }),


  }),
});

export const {

  useGetChatListQuery,
    useGetChatHistoryQuery,
} = messageApi;

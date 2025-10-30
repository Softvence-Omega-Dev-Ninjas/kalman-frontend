import { baseApi } from "@/redux/api/baseApi";

export const invitationApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    //get All Invitations
    getAllInvitations: builder.query({
      query: () => ({
        url: "/invitation",
        method: "GET",
      }),
      providesTags: ["Invitations"],
    }),

    getSingleInvitation: builder.query({
      query: (id) => ({
        url: `/invitation/${id}`,
        method: "GET",
      }),
      providesTags: (id) => [{ type: "Invitations", id }],
    }),

    // Post a New Invitation
    postInvitation: builder.mutation({
      query: (data) => ({
        url: "/invitation",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Invitations", "Tradesman"],
    }),

    //update invitation
    updateInvitation: builder.mutation({
      query: ({ id, data }) => ({
        url: `/invitation/${id}`,
        method: "PATCH", // or PATCH depending on your backend
        body: data,
      }),
      invalidatesTags: ["Invitations"],
    }),

    //delete a invitation
    deleteInvitation: builder.mutation({
      query: (id) => ({
        url: `/invitation/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Invitations"],
    }),
  }),
});

export const {
  useGetAllInvitationsQuery,
  usePostInvitationMutation,
  useGetSingleInvitationQuery,
  useDeleteInvitationMutation,
  useUpdateInvitationMutation,
} = invitationApi;

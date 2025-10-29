// src/redux/features/proposal/proposalApi.ts
import { baseApi } from "@/redux/api/baseApi";

export const proposalApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Create Proposal
    createProposal: builder.mutation({
      query: (data) => ({
        url: "/proposal",
        method: "POST",
        body: data,
      }),
    }),

    // Get All Proposals
    getAllProposals: builder.query({
      query: () => ({
        url: "/proposal",
        method: "GET",
      }),
    }),

    // Get My Proposal by Job ID
    getMyProposalByJobId: builder.query({
      query: (jobId) => ({
        url: `/proposal/my-proposal/${jobId}`,
        method: "GET",
      }),
    }),

    // Get All Proposals by Job ID
    getProposalsByJobId: builder.query({
      query: (jobId) => ({
        url: `/proposal/jobs/${jobId}`,
        method: "GET",
      }),
    }),

    // Get Proposal by ID
    getProposalById: builder.query({
      query: (id) => ({
        url: `/proposal/${id}`,
        method: "GET",
      }),
    }),

    // Update Proposal by ID
    updateProposal: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/proposal/${id}`,
        method: "PATCH",
        body: data,
      }),
    }),

    // Delete Proposal by ID
    deleteProposal: builder.mutation({
      query: (id) => ({
        url: `/proposal/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useCreateProposalMutation,
  useGetAllProposalsQuery,
  useGetMyProposalByJobIdQuery,
  useGetProposalsByJobIdQuery,
  useGetProposalByIdQuery,
  useUpdateProposalMutation,
  useDeleteProposalMutation,
} = proposalApi;

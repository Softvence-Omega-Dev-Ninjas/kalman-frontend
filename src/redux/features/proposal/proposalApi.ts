import { baseApi } from "@/redux/api/baseApi";

export const proposalApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // 1️ Create a new proposal
    createProposal: builder.mutation({
      query: (data) => ({
        url: "/proposal",
        method: "POST",
        body: data,
      }),
    }),

    // 2️ Get all proposals
    getAllProposals: builder.query({
      query: () => ({
        url: "/proposal",
        method: "GET",
      }),
    }),

    // 3️ Get a single proposal by ID
    getProposalById: builder.query({
      query: (jobId) => ({
        url: `/proposal/jobs/${jobId}`,
        method: "GET",
      }),
    }),

    // 4️ Update a proposal
    updateProposal: builder.mutation({
      query: ({ id, data }) => ({
        url: `/proposal/${id}`,
        method: "PATCH",
        body: data,
      }),
    }),

    // 5️ Delete a proposal
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
  useGetProposalByIdQuery,
  useUpdateProposalMutation,
  useDeleteProposalMutation,
} = proposalApi;

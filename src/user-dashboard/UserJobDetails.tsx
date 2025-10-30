import React from "react";
import { Briefcase, Clock, MapPin, Star, ArrowLeft, Check } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useGetProposalsByJobIdQuery, useUpdateProposalMutation } from "@/redux/features/proposal/proposalApi";
import { useGetJobByIdQuery } from "@/redux/features/jobs/jobsApi";
import toast from "react-hot-toast";

const ProposalCard: React.FC<{ proposal: any; onStatusChange?: () => void }> = ({ proposal, onStatusChange }) => {
  const [updateProposal, { isLoading }] =   useUpdateProposalMutation();
console.log(proposal)
  const handleAccept = async () => {
    try {
      await updateProposal({ id: proposal.id,  status: "ACCEPTED"  }).unwrap();
      toast("Proposal accepted!");
      onStatusChange?.(); // parent refetch
    } catch (error) {
      console.error(error);
      toast("Failed to accept proposal");
    }
  };

  const handleDecline = async () => {
    try {
      await updateProposal({ id: proposal.id, status: "REJECTED"  }).unwrap();
      toast("Proposal rejected!");
      onStatusChange?.(); // parent refetch
    } catch (error) {
      console.error(error);
      toast("Failed to reject proposal");
    }
  };

  return (
    <div className="border rounded-lg p-6 shadow-sm flex flex-col md:flex-row gap-6">
      {/* Left side */}
      <div className="flex-1 space-y-4">
            <div className="flex justify-between">
                   <div className="flex sm:flex-row flex-col items-start sm:items-center gap-4">
          <div className="relative w-16 h-16 shrink-0">
            <img
              src={
                proposal.tradesMan?.images?.[0] ||
                proposal.tradesMan?.professionalQualifications ||
                "https://via.placeholder.com/120"
              }
              alt={proposal.tradesMan?.firstName || "N/A"}
              className="w-16 h-16 rounded-full object-cover"
            />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800">
              {proposal.tradesMan
                ? `${proposal.tradesMan.firstName} ${proposal.tradesMan.lastName}`
                : "N/A"}
            </h3>
            <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
              <Star size={16} className="text-yellow-400 fill-yellow-400" />
              <span>5.0 (20 reviews)</span>
              <span className="h-1 w-1 bg-gray-400 rounded-full mx-1"></span>
              <MapPin size={16} className="text-gray-500" />
              <span>{proposal.tradesMan?.city || "N/A"}</span>
            </div>
          </div>
        </div>


          <div className="flex flex-col items-center gap-3">
                <button
                  onClick={handleAccept}
                  disabled={isLoading || proposal.status === "ACCEPTED"}
                  className={`flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    proposal.status === "ACCEPTED" || isLoading
                      ? "bg-green-500 text-white cursor-not-allowed opacity-50"
                      : "bg-green-500 hover:bg-green-400 text-white cursor-pointer"
                  }`}
                >
                  Accept
                  {proposal.status === "ACCEPTED" && <Check size={16} />}
                </button>

                <button
                  onClick={handleDecline}
                  disabled={isLoading || proposal.status === "REJECTED"}
                  className={`flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    proposal.status === "REJECTED" || isLoading
                      ? "bg-red-500 text-white cursor-not-allowed opacity-50"
                      : "bg-red-500 hover:bg-red-400 text-white cursor-pointer"
                  }`}
                >
                  Decline
                  {proposal.status === "REJECTED" && <Check size={16} />}
                </button>
          </div>
            </div>

        {/* Job details */}
        <div className="mt-4">
          <p className="text-sm text-gray-800 font-semibold mb-1">
            For : <span>{proposal.jobs?.title || "N/A"}</span>
          </p>
          <p className="text-sm text-gray-500 line-clamp-3">
            {proposal.description || "N/A"}
          </p>
        </div>

        {/* Bottom info */}
        <div className="flex items-center justify-between  gap-4 text-sm text-gray-500 mt-4">
          <div className="flex items-center gap-2 font-semibold">
            <span className="text-xl text-primary font-bold">
              ${proposal.jobs?.price ? proposal.jobs.price.toFixed(2) : "N/A"}/hr
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Briefcase size={16} />
            <span>Job complete: {proposal?.jobs?.isComplete? "Yes" : "No"}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock size={16} />
            <span>{proposal.status || "N/A"}</span>
          </div>
        </div>
      </div>

      {/* Right side: Actions */}
    
    </div>
  );
};

const UserJobDetails: React.FC = () => {
  const { id } = useParams();

  // Fetch proposals
  const {
    data: proposalResponse,
    isLoading: proposalLoading,
    isError: proposalError,
    refetch: refetchProposals,
  } = useGetProposalsByJobIdQuery(id!);
console.log(proposalResponse)
  // Fetch job details
  const {
    data: jobResponse,
    isLoading: jobLoading,
    isError: jobError,
  } = useGetJobByIdQuery(id!);

  const proposalData = proposalResponse?.data || [];
  const jobData = jobResponse?.data;

  const navigate = useNavigate()
  const handleBack = () => {
    navigate("/user-dashboard/my-jobs")
  };

  if (proposalLoading || jobLoading)
    return <p className="text-center py-12 text-gray-600">Loading...</p>;

  if (proposalError || jobError)
    return (
      <p className="text-center py-12 text-red-500">
        Failed to load proposal or job data.
      </p>
    );

  return (
    <div className="min-h-screen p-4">
      <div className="bg-white border border-gray-200 rounded-lg p-6 mt-6 mb-28 max-w-5xl mx-auto">
        <button onClick={handleBack} className="mb-6 cursor-pointer">
          <span className="flex items-center">
            <ArrowLeft className="mr-2" size={16} />
            <span>Proposals</span>
          </span>
        </button>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left side: Proposals */}
          <div className="flex-1 bg-white rounded-lg shadow-sm border border-gray-100 p-6 order-2 lg:order-1">
            <h1 className="text-2xl font-semibold text-gray-800 mb-6">
              Proposals
            </h1>
            <div className="space-y-6">
              {Array.isArray(proposalData) && proposalData.length > 0 ? (
                proposalData.map((proposal: any) => (
                  <ProposalCard
                    key={proposal.id}
                    proposal={proposal}
                    onStatusChange={refetchProposals} // pass refetch
                  />
                ))
              ) : (
                <p className="text-gray-500 text-sm">No proposals found</p>
              )}
            </div>
          </div>

          {/* Right side: My Job */}
          <div className="w-full lg:w-80 order-1 lg:order-2">
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                My Job
              </h2>
              <div className="space-y-4">
                <div className="flex flex-col">
                  <span className="text-gray-800 font-medium text-lg">
                    {jobData?.title || "N/A"}
                  </span>
                  <span className="text-sm font-semibold text-green-600 bg-green-100 py-1 px-3 rounded-full w-fit mt-2">
                    {jobData?.customerStatus || "N/A"}
                  </span>
                </div>

                <div className="text-2xl font-bold text-primary">
                  ${jobData?.price?.toLocaleString() || "N/A"}/hr
                </div>

                {/* Job Info */}
                <div className="pt-4 border-t border-gray-100 space-y-3">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <MapPin size={16} />
                    <span>{jobData?.location || "N/A"}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Clock size={16} />
                    <span>
                      {jobData?.createdAt
                        ? new Date(jobData.createdAt).toLocaleDateString()
                        : "N/A"}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Briefcase size={16} />
                    <span>
                      {Array.isArray(proposalData)
                        ? proposalData.length
                        : 0}{" "}
                      proposals received
                    </span>
                  </div>
                </div>

                {/* Description */}
                <div className="pt-4 border-t border-gray-100">
                  <h3 className="text-sm font-semibold text-gray-800 mb-2">
                    Description
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {jobData?.description || "N/A"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserJobDetails;

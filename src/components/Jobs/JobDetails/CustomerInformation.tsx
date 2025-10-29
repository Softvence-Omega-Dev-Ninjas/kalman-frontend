
import { selectCurrentUser } from "@/redux/features/auth/authSlice";
import { useState } from "react";
import { MdOutlineVerifiedUser } from "react-icons/md";
import { useSelector } from "react-redux";
import ProposalModal from "./ProposalModal";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useGetMyProposalByJobIdQuery } from "@/redux/features/proposal/proposalApi"; //  Import RTK hook
import { ArrowRight } from "lucide-react";
import LocationMap from "./LocationMap";

const CustomerInformation = ({ customer }: { customer: any }) => {
  const [sendProposal, setSendProposal] = useState(false);
  const user = useSelector(selectCurrentUser);
  const navigate = useNavigate();
  const jobCusInfo = customer;
  console.log('jobCusInfo',jobCusInfo);

  //  Fetch proposal data with RTK Query
 const { data: proposalResponse, isLoading } = useGetMyProposalByJobIdQuery(jobCusInfo?.id,);


  const proposal = proposalResponse?.data || null;
  console.log("proposal", proposal);

  if (isLoading) return <p>Loading...</p>;
  // if (isError) return <p className="text-red-500">Failed to load proposal.</p>;

  const handleSendProposal = () => {
    if (!user?.id) {
      toast.error("Please log in to send a proposal.");
      navigate("/general-login");
    } else {
      setSendProposal(true);
    }
  };

  return (
    <div className="space-y-4">
      {/* Customer Info Card */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 border-b border-gray-100">
          <h2 className="text-lg font-medium text-gray-900">
            Customer Information
          </h2>
        </div>

        <div className="p-4">
          <div className="flex items-center gap-3 mb-4">
            <img
              src={
                jobCusInfo?.customer?.profile_image ||
                "https://randomuser.me/api/portraits/men/60.jpg"
              }
              alt=""
              className="w-12 h-12 rounded-full object-cover"
            />
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-medium text-gray-900">
                  {jobCusInfo.customer?.name || "Customer Name"}
                </h3>
              </div>
              <div className="flex items-center gap-1 text-green-500">
                <p className="text-sm ">
                  {jobCusInfo?.customer?.verification && "Verified"}
                </p>
                <MdOutlineVerifiedUser />
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Member since</span>
            <span className="font-medium text-gray-900">
              {jobCusInfo.customer?.createdAt
                ? new Date(jobCusInfo.customer.createdAt).getFullYear()
                : "1990"}
            </span>
          </div>
        </div>
      </div>

      {/* Conditional Rendering */}
     {proposal ? (
  <div className="w-full max-w-md mx-auto p-6 bg-white rounded-lg shadow-sm mb-6">
    {/* Header Section */}
    <div className="mb-6">
      <h1 className="text-2xl font-bold text-foreground mb-2">Shortlist fee</h1>
      <p className="text-3xl font-bold text-orange-500">
        {proposal.shortlist_fee || "$20.00 + VAT"}
      </p>
    </div>

    {/* Info Box */}
    <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
      <h2 className="text-lg font-semibold text-foreground mb-2">
        Interested in this lead?
      </h2>
      <p className="text-sm text-gray-600 mb-4">
        The shortlist fee will be charged automatically once the
        customer provides their contact details.
      </p>
      <button className="w-full cursor-pointer py-3 px-4 bg-white border border-gray-300 rounded-lg font-medium text-foreground hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
        Share a proposal
        <ArrowRight size={18} />
      </button>
    </div>

    {/* Status Section */}
    <div className="mb-6 flex items-center justify-between text-sm text-gray-600">
      <div className="flex items-center gap-2">
        <span className="font-semibold text-foreground">
          {proposal.shortlisted_count || "01"}
        </span>
        <span>Shortlisted</span>
      </div>
      <span className="text-gray-400">|</span>
      <div className="flex items-center gap-2">
        <span className="font-semibold text-foreground">
          {proposal.another_count || "01"}
        </span>
        <span>Shortlisted</span>
      </div>
    </div>

    {/* Message Section */}
    <div className="mb-6">
      <p className="text-base font-semibold text-foreground">
        {proposal.customer_message ||
          "The customer invited you to discuss their lead."}
      </p>
    </div>

    {/* CTA Button */}
    <button className="w-full py-3 px-4 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg transition-colors">
      Send a message
    </button>
  </div>
) : (
  <div className="w-full max-w-md mx-auto p-6 bg-white rounded-lg shadow-sm">
    <h1 className="text-2xl font-bold text-foreground mb-2">Shortlist fee</h1>
    <p className="text-3xl font-bold text-orange-500">
      {jobCusInfo?.shortlist_fee || "$20.00 + VAT"}
    </p>

    <div className="p-4 bg-gray-50 rounded-lg border border-gray-200 mt-4 mb-6">
      <h2 className="text-lg font-semibold text-foreground mb-2">
        No charge to express interest
      </h2>
      <p className="text-sm text-gray-600">
        You're only charged if the customer shortlists you
      </p>
    </div>

    <div className="mb-6 flex items-center justify-between text-sm text-gray-600">
      <div className="flex items-center gap-2">
        <span className="font-semibold text-foreground">
          {jobCusInfo.shortlisted_count || "01"}
        </span>
        <span>Shortlisted</span>
      </div>
      <span className="text-gray-400">|</span>
      <div className="flex items-center gap-2">
        <span className="font-semibold text-foreground">
          {jobCusInfo.another_count || "01"}
        </span>
        <span>Shortlisted</span>
      </div>
    </div>

    {/* Message Section */}
    <div className="mb-6">
      <p className="text-base font-semibold text-foreground">
        {jobCusInfo.customer_message ||
          "The customer invited you to discuss their lead."}
      </p>
    </div>
    <button
      onClick={handleSendProposal}
      className="w-full py-3 px-4 cursor-pointer bg-primary hover:bg-orange-600 text-white font-semibold rounded-lg transition-colors"
    >
      Express interest
    </button>
  </div>
)}

      <LocationMap jobCusInfo={jobCusInfo} />
      {/* Proposal Modal */}
      {sendProposal && (
        <ProposalModal
          jobId={jobCusInfo.id}
          tradesManId={user?.id}
          onClose={() => setSendProposal(false)}
        />
      )}
    </div>
  );
};

export default CustomerInformation;


import { selectCurrentUser } from "@/redux/features/auth/authSlice";
import { useState } from "react";
import { IoAlertCircleOutline } from "react-icons/io5";
import { MdOutlineVerifiedUser } from "react-icons/md";
import { useSelector } from "react-redux";
import ProposalModal from "./ProposalModal";
import ReportModal from "./ReportModal";
import LocationMap from "./LocationMap";

const CustomerInformation = ({ customer }: { customer: any }) => {
  const [reportModal, setReportModal] = useState(false);
  const [sendProposal, setSendProposal] = useState(false);

  const user = useSelector(selectCurrentUser);
  // console.log(user.id);

  const cusInfo = customer;
  // console.log(cusInfo)

 

  console.log("jobId", cusInfo);

  return (
    <div className="space-y-4">
      {/* Customer Information Card */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-medium text-gray-900">
              Customer Information
            </h2>
            <button
              onClick={() => setReportModal(true)}
              className="text-gray-500 hover:text-gray-700"
            >
              <IoAlertCircleOutline size={20} />
            </button>
          </div>
        </div>

        <div className="p-4">
          <div className="flex items-center gap-3 mb-4">
            <img
              src={
                cusInfo?.customer?.profile_image ||
                "https://randomuser.me/api/portraits/men/60.jpg"
              }
              alt=""
              className="w-12 h-12 rounded-full object-cover"
            />
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-medium text-gray-900">
                  {cusInfo.customer?.name || "Customer Name"}
                </h3>
                {/* {cusInfo.isVerified && (
                  <IoCheckmarkCircle className="text-blue-500" size={16} />
                )} */}
              </div>
              <div className="flex items-center gap-1 text-green-500">
                <p className="text-sm ">
                  {" "}
                  {cusInfo?.customer?.verification && "Verified"}
                </p>
                <MdOutlineVerifiedUser />
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Member since</span>
            <span className="font-medium text-gray-900">
              {cusInfo.customer?.createdAt
                ? new Date(cusInfo.customer.createdAt).getFullYear()
                : "1990"}
            </span>
          </div>
        </div>
      </div>

      {/* Shortlist Fee Card */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100">
        <div className="p-4">
          <h3 className="font-medium text-gray-900 mb-2">Shortlist fee</h3>
          <p className="text-2xl font-semibold text-orange-500 mb-3">
            {cusInfo?.shortlist_fee || "$20.00 + VAT"}
          </p>

          <div className="p-3 rounded-md bg-gray-100">
            <p className="text-sm font-medium text-gray-900 mb-1">
              No charge to express interest
            </p>
            <p className="text-xs text-gray-600 mb-4">
              You're only charged if the customer shortlists you
            </p>
          </div>

          <div className="flex items-center justify-center gap-8 mb-4 py-3">
            <div className="flex items-center gap-2 text-center">
              <p className="text-2xl font-bold text-gray-900">
                {cusInfo.shortlist_fee || "01"}
              </p>
              <p className="text-sm text-gray-600">Shortlisted</p>
            </div>
            <div className="flex items-center gap-2 text-center border-l border-gray-300 pl-8">
              <p className="text-2xl font-bold text-gray-900">
                {cusInfo.shortlistedCount || "01"}
              </p>
              <p className="text-sm text-gray-600">Shortlisted</p>
            </div>
          </div>

          <p className="text-sm text-gray-700 mb-4">
            {/* {actualCustomer.invitationMessage ||
              "The customer invited you to discuss their lead."} */}
          </p>

          <div className="flex gap-3">
            <button
              onClick={() => setSendProposal(true)}
              className="flex-1 bg-primary text-white py-3 px-4 rounded-lg font-medium hover:bg-orange-600 transition-colors"
            >
              Express interest
            </button>
            <button className="px-6 py-3 border border-primary text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors">
              Decline
            </button>
          </div>
        </div>
      </div>

      {/* Map Card */}
      <LocationMap cusInfo={cusInfo} />

      {/* Report Modal */}
      {reportModal && <ReportModal />}

      {/* Send Proposal Modal */}
      {sendProposal && (
        <ProposalModal
          jobId={cusInfo.id} // ← your job ID
          tradesManId={user.id} // ← current user ID
          onClose={() => setSendProposal(false)} // ← close modal
        />
      )}
    </div>
  );
};

export default CustomerInformation;

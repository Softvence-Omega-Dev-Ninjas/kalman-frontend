/* eslint-disable @typescript-eslint/no-explicit-any */
import { X } from "lucide-react";
import { useState } from "react";
import { CiLocationOn } from "react-icons/ci";
import { IoAlertCircleOutline } from "react-icons/io5";
import { MdOutlineVerifiedUser } from "react-icons/md";

const CustomerInformation = ({ customer }: { customer: any }) => {
  const [reportModal, setReportModal] = useState(false);
  const [sendProposal, setSendProposal] = useState(false);
  const [proposalText, setProposalText] = useState("");

  const cusInfo = customer;

  const handleSubmit = () => {
    if (!proposalText.trim()) {
      alert("Please write your proposal before submitting!");
      return;
    }

    console.log("Proposal submitted:", proposalText);
    // TODO: call API to send proposal
    setSendProposal(false);
    setProposalText("");
  };


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
      <div className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300">
        {/* Map Section */}
        <div className="relative h-56">
          <iframe
            title="Google Map"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            loading="lazy"
            allowFullScreen
            className="rounded-t-2xl"
            src={`https://www.google.com/maps?q=${encodeURIComponent(
              cusInfo?.location || "Dhaka, Bangladesh"
            )}&output=embed`}
          ></iframe>

          {/* Overlay Gradient for better text contrast */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none rounded-t-2xl"></div>
        </div>

        {/* Info Section */}
        <div className="p-5">
          <div className="flex items-center gap-2 mb-2">
            <CiLocationOn className="text-gray-500" size={18} />
            <span className="text-lg font-medium text-gray-700">
              Location: {cusInfo?.location || "Unknown"}
            </span>
          </div>
          <p className="text-sm text-gray-600">
            You can view this customer’s real-time location on Google Maps.
          </p>
        </div>
      </div>

      {/* Report Modal */}
      {reportModal && (
        <div className="fixed inset-0 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md">
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-4">Report</h2>
              <div className="mb-6">
                <label
                  htmlFor="report-reason"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Reason for report
                </label>
                <textarea
                  id="report-reason"
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                  placeholder="Write your report regarding this post..."
                />
              </div>
              <div className="flex gap-3 justify-end">
                <button
                  onClick={() => setReportModal(false)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors">
                  Report
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Send Proposal Modal */}
      {sendProposal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          {/* Modal Container */}
          <div className="relative w-full max-w-2xl rounded-lg bg-white p-8 shadow-lg">
            {/* Close Button */}
            <button
              onClick={() => setSendProposal(false)}
              className="absolute right-6 top-6 cursor-pointer text-red-500 hover:text-red-600 transition-colors"
              aria-label="Close modal"
            >
              <X size={28} strokeWidth={3} />
            </button>

            {/* Header */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Send Proposal</h2>
              <p className="text-gray-600 text-sm">
                Share additional information with the customer to increase your chances of getting hired.
              </p>
            </div>

            {/* Form Section */}
            <div className="mb-8">
              <label className="block text-gray-900 font-semibold mb-4">
                Write your proposal
              </label>
              <textarea
                placeholder="Write your proposal...."
                value={proposalText}
                onChange={(e) => setProposalText(e.target.value)}
                className="w-full h-32 px-4 py-3 bg-gray-100 text-gray-900 placeholder-gray-500 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none"
              />
            </div>

            {/* Footer Buttons */}
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setSendProposal(false)}
                className="px-6 py-2 cursor-pointer text-gray-900 font-medium hover:text-gray-700 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="px-6 py-2.5 cursor-pointer bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-lg transition-colors"
              >
                Submit proposal
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomerInformation;

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { CiLocationOn } from "react-icons/ci";
import { IoAlertCircleOutline, IoCheckmarkCircle } from "react-icons/io5";
import { LuSend } from "react-icons/lu";
import { MdOutlineVerifiedUser } from "react-icons/md";

const CustomerInformation = ({ customer }: { customer: any }) => {
  const [reportModal, setReportModal] = useState(false);
  const [sendProposal, setSendProposal] = useState(false);

  // Mock data to match the image
  const mockCustomer = {
    name: "John Smith",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
    location: "Banská Bystrica",
    memberSince: "2018",
    isVerified: true,
    shortlistFee: "$20.00 + VAT",
    shortlistedCount: "01",
    invitationMessage: "The customer invited you to discuss their lead.",
  };

  const actualCustomer = customer || mockCustomer;

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
              src={actualCustomer.image}
              alt=""
              className="w-12 h-12 rounded-full object-cover"
            />
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-medium text-gray-900">
                  {actualCustomer.name}
                </h3>
                {actualCustomer.isVerified && (
                  <IoCheckmarkCircle className="text-blue-500" size={16} />
                )}
              </div>
              <div className="flex items-center gap-1 text-green-500">
                <p className="text-sm ">Verified</p>
                <MdOutlineVerifiedUser />
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Member since</span>
            <span className="font-medium text-gray-900">
              {actualCustomer.memberSince || "2023"}
            </span>
          </div>
        </div>
      </div>

      {/* Shortlist Fee Card */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100">
        <div className="p-4">
          <h3 className="font-medium text-gray-900 mb-2">Shortlist fee</h3>
          <p className="text-2xl font-semibold text-orange-500 mb-3">
            {actualCustomer.shortlistFee || "$20.00 + VAT"}
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
                {actualCustomer.shortlistedCount || "01"}
              </p>
              <p className="text-sm text-gray-600">Shortlisted</p>
            </div>
            <div className="flex items-center gap-2 text-center border-l border-gray-300 pl-8">
              <p className="text-2xl font-bold text-gray-900">
                {actualCustomer.shortlistedCount || "01"}
              </p>
              <p className="text-sm text-gray-600">Shortlisted</p>
            </div>
          </div>

          <p className="text-sm text-gray-700 mb-4">
            {actualCustomer.invitationMessage ||
              "The customer invited you to discuss their lead."}
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
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
        <div className="h-48 bg-gradient-to-br from-green-100 to-blue-100 relative">
          {/* Mock map with some visual elements */}
          <div className="absolute inset-0 bg-gray-100">
            <div className="w-full h-full relative overflow-hidden">
              {/* Mock roads */}
              <div className="absolute top-1/3 left-0 w-full h-0.5 bg-gray-300 transform rotate-12"></div>
              <div className="absolute top-2/3 left-0 w-full h-0.5 bg-gray-300 transform -rotate-6"></div>
              <div className="absolute left-1/3 top-0 w-0.5 h-full bg-gray-300 transform rotate-12"></div>

              {/* Mock green areas */}
              <div className="absolute top-4 left-4 w-16 h-12 bg-green-200 rounded-lg opacity-60"></div>
              <div className="absolute bottom-4 right-8 w-20 h-16 bg-green-200 rounded-lg opacity-60"></div>

              {/* Location marker */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="w-6 h-6 bg-red-500 rounded-full border-2 border-white shadow-lg"></div>
              </div>
            </div>
          </div>
        </div>

        <div className="p-4">
          <div className="flex items-center gap-2">
            <CiLocationOn className="text-gray-500" size={18} />
            <span className="text-sm font-medium text-gray-700">
              Location: {actualCustomer.location}
            </span>
          </div>
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
        <div className="fixed inset-0 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md">
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-4">Express Interest</h2>
              <div className="mb-6">
                <label
                  htmlFor="proposal-message"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Write your message
                </label>
                <textarea
                  id="proposal-message"
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                  placeholder="Write your message..."
                />
              </div>
              <div className="flex gap-3 justify-end">
                <button
                  onClick={() => setSendProposal(false)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors flex items-center gap-2">
                  <span>Send</span>
                  <LuSend size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomerInformation;

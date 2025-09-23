/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState } from "react";
import { CiLocationOn } from "react-icons/ci";
import { IoAlertCircleOutline } from "react-icons/io5";
import { LuSend } from "react-icons/lu";

const CustomerInformation = ({ customer }: { customer: any }) => {
  const [reportModal, setReportModal] = useState(false);
  const [sendProposal, setSendProposal] = useState(false);
  return (
    <div>
      <div className="bg-white p-5 rounded-md shadow-md">
        <div className="flex items-center justify-between mb-5">
          <p className="font-semibold text-lg">Customer Information</p>
          <div
            onClick={() => setReportModal(true)}
            className="flex items-center gap-2 my-5"
          >
            <span>Report</span>
            <IoAlertCircleOutline />
          </div>
        </div>
        <div className="flex items-center gap-5">
          <img
            src={customer.image}
            alt=""
            width={60}
            height={60}
            className="rounded-full "
          />
          <div className="space-y-2">
            <h1 className="text-xl font-semibold">{customer.name}</h1>
            <div className="flex items-center gap-2">
              <CiLocationOn />
              <p>{customer.location}</p>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between mt-5">
          <h1 className="text-secondary">Member Since: </h1>
          <p className="font-semibold">2018</p>
        </div>
      </div>
      <button onClick={() => setSendProposal(true)} className="w-full mt-5 flex items-center justify-center gap-2 px-5 py-3 rounded-md bg-primary text-white">
        <span>Send Proposal</span>
        <LuSend />
      </button>
      {reportModal && (
        <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white p-10 rounded-md shadow-md min-w-lg space-y-10">
            <h1 className="text-2xl font-semibold">Report</h1>
            <div className="space-y-2">
              <label
                htmlFor="report-reason"
                className="block text-lg font-medium "
              >
                Reason for report
              </label>
              <textarea
                id="report-reason"
                rows={4}
                className="bg-[#F2F2F2] p-3 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary text-sm"
                placeholder="write your report regarding this post....."
              ></textarea>
            </div>
            <div className="space-x-4 flex items-center justify-end">
              <button onClick={() => setReportModal(false)} className="px-3 py-2 rounded-md border border-gray-200 font-semibold ">Cancel</button>
              <button className="px-3 py-2 rounded-md border border-gray-100 bg-red-500 text-white font-semibold ">Report</button>
            </div>
          </div>
        </div>
      )}
      {sendProposal && (
        <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white p-10 rounded-md shadow-md min-w-lg space-y-10">
            <h1 className="text-2xl font-semibold">Send Proposal</h1>
            <div className="space-y-2">
              <label
                htmlFor="proposal-message"
                className="block text-lg font-medium "
              >
                Write your proposal
              </label>
              <textarea
                id="proposal-message"
                rows={4}
                className="bg-[#F2F2F2] p-3 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary text-sm"
                placeholder="Write your proposal...."
              ></textarea>
            </div>
            <div className="space-x-4 flex items-center justify-end">
              <button onClick={() => setSendProposal(false)} className="px-3 py-2 rounded-md border border-gray-200 font-semibold ">Cancel</button>
              <button className="px-5 py-2 rounded-md border border-gray-100 bg-primary text-white font-semibold ">Send Proposal</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomerInformation;

import { X } from "lucide-react";

interface SendProposalModalProps {
  onClose: () => void;
  job?: any;
}

export function SendProposalModal({ onClose, job }: SendProposalModalProps) {
  const handleSubmit = () => {
    // Handle the proposal submission logic here
    console.log("Proposal submitted for job:", job);
    onClose(); // Close modal after submit
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      {/* Modal Container */}
      <div className="relative w-full max-w-2xl rounded-lg bg-white p-8 shadow-lg">
        {/* Close Button */}
        <button
          onClick={onClose}
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
          <label className="block text-gray-900 font-semibold mb-4">Write your proposal</label>
          <textarea
            placeholder="Write your proposal...."
            className="w-full h-32 px-4 py-3 bg-gray-100 text-gray-900 placeholder-gray-500 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none"
          />
        </div>

        {/* Footer Buttons */}
        <div className="flex justify-end gap-4">
          <button
            onClick={onClose}
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
  );
}

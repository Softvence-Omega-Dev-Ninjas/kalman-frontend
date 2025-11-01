/* eslint-disable @typescript-eslint/no-explicit-any */
import { X } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useCreateProposalMutation } from "@/redux/features/proposal/proposalApi";

interface ProposalModalProps {
  jobId: string;
  tradesManId: string;
  onClose: () => void;
}

const ProposalModal = ({ jobId, tradesManId, onClose }: ProposalModalProps) => {
  // I got

  const [proposalText, setProposalText] = useState("");
  const [createProposal, { isLoading }] = useCreateProposalMutation();


  const handleSubmit = async () => {
    if (!proposalText.trim()) {
      toast.error("Please write your proposal before submitting!");
      return;
    }

    try {
      const payload = {
        jobId,
        tradesManId,
        description: proposalText,
      };

      const response = await createProposal(payload).unwrap();
      if (response.data) {
        toast.success(response.data.message || response?.message);
      } else {
        toast.success("Proposal submitted successfully!");
      }

      onClose();
      setProposalText("");
    } catch (error: any) {
      console.error(" Proposal submit error:", error);

      const onboardingUrl = error?.data?.onboardingUrl;

      if (onboardingUrl) {
        toast.custom(
          (t) => (
            <div
              className={`max-w-md w-full bg-white shadow-lg rounded-lg border-l-4 border-red-500 p-4 flex justify-between items-start space-x-3 ${
                t.visible ? "animate-enter" : "animate-leave"
              }`}
            >
              <div
                onClick={() => {
                  window.open(onboardingUrl, "_blank");
                  toast.dismiss(t.id);
                }}
                className="flex-1 cursor-pointer"
              >
                <p className="font-semibold text-gray-900">
                  Complete onboarding
                </p>
                <p className="text-sm text-blue-600 underline">
                  Click here to open link
                </p>
              </div>

              <button
                onClick={() => toast.dismiss(t.id)}
                className="cursor-pointer text-gray-400 hover:text-gray-600"
              >
                <X size={18} />
              </button>
            </div>
          ),
          { duration: Infinity }
        );
      } else {
        toast.error(
        error?.data?.message ||
          "Failed to submit proposal."
      );
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="relative w-full max-w-2xl rounded-lg bg-white p-8 shadow-lg transition-all duration-300 m-4 lg:m-0">
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
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Send Proposal
          </h2>
          <p className="text-gray-600 text-sm">
            Share additional information with the customer to increase your
            chances of getting hired.
          </p>
        </div>

        {/* Textarea */}
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

        {/* Footer */}
        <div className="flex justify-end gap-4">
          <button
            onClick={onClose}
            className="px-6 py-2 cursor-pointer text-gray-900 font-medium hover:text-gray-700 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={isLoading}
            className="px-6 py-2.5 bg-orange-500 cursor-pointer hover:bg-orange-600 text-white font-medium rounded-lg transition-colors disabled:opacity-50"
          >
            {isLoading ? "Submitting..." : "Submit proposal"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProposalModal;

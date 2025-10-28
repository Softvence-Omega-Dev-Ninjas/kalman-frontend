import { usePostInvitationMutation } from "@/redux/features/invitation/invitationApi";
import React, { useState } from "react";
import { useParams } from "react-router-dom";

type BookingModalProps = {
  open: boolean;
  onClose: () => void;
};

const BookingModal: React.FC<BookingModalProps> = ({ open, onClose }) => {
  const { id: tradesManId } = useParams<{ id: string }>();
  const [postInvitation, { isLoading }] = usePostInvitationMutation();
  const [location, setLocation] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  if (!open) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!tradesManId) return;

    const invitationData = {
      location,
      message,
      tradesManId,
    };

    try {
      await postInvitation(invitationData).unwrap();
      // Optionally clear form or close modal
      setLocation("");
      setMessage("");
      onClose();
    } catch (error) {
      console.error("Failed to post invitation:", error);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6">
        <div className="flex items-start justify-between">
          <h3 className="text-lg font-semibold">Book this Tradesperson</h3>
          <button onClick={onClose} className="text-2xl leading-none">
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              Enter your Location
            </label>
            <input
              name="location"
              placeholder="Select Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 rounded-md px-4 py-3 text-sm focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Special Requirements (Optional)
            </label>
            <textarea
              name="notes"
              placeholder="Any specific requirements or additional information..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 rounded-md px-4 py-3 text-sm min-h-[100px] resize-none focus:outline-none"
            />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isLoading}
              className="bg-primary text-white px-6 py-2 rounded-md disabled:opacity-50"
            >
              {isLoading ? "Inviting..." : "Invite"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default BookingModal;

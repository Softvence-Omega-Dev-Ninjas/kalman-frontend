import { usePostInvitationMutation } from "@/redux/features/invitation/invitationApi";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";

type BookingModalProps = {
  open: boolean;
  onClose: () => void;
};

const BookingModal: React.FC<BookingModalProps> = ({ open, onClose }) => {
  const { id: tradesManId } = useParams<{ id: string }>();
  const [postInvitation, { isLoading }] = usePostInvitationMutation();
  const [location, setLocation] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [duration, setDuration] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  if (!open) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!tradesManId) return;
    const isoDate = new Date(date).toISOString();
    const invitationData = {
      title,
      date: isoDate,
      time_slot: duration,
      location,
      message,
      tradesManId,
    };

    try {
      await postInvitation(invitationData).unwrap();
      toast.success("Invitation sent successfully");
      setLocation("");
      setMessage("");
      onClose();

      // Optionally clear form or close modal
    } catch (error) {
      console.error("Failed to post invitation:", error);
      toast.error("Failed to send invitation");
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
              Enter your Title
            </label>
            <input
              name="title"
              placeholder="Enter Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 rounded-md px-4 py-3 text-sm focus:outline-none"
            />
          </div>
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
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Start Date
              </label>
              <input
                name="date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 rounded-md px-4 py-3 text-sm focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">
                Estimated Duration
              </label>
              <input
                name="duration"
                placeholder="Enter Duration"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 rounded-md px-4 py-3 text-sm focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Special Requirements
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

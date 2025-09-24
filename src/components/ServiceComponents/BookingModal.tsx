import React from 'react';

type BookingModalProps = {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: { location: string; date: string; duration: string; notes: string }) => void;
};

export default function BookingModal({ open, onClose, onSubmit }: BookingModalProps) {
  if (!open) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const f = e.target as HTMLFormElement;
    const location = (f.elements.namedItem('location') as HTMLInputElement).value;
    const date = (f.elements.namedItem('date') as HTMLInputElement).value;
    const duration = (f.elements.namedItem('duration') as HTMLSelectElement).value;
    const notes = (f.elements.namedItem('notes') as HTMLTextAreaElement).value;
    onSubmit({ location, date, duration, notes });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6">
        <div className="flex items-start justify-between">
          <h3 className="text-lg font-semibold">Book this Tradesperson</h3>
          <button onClick={onClose} className="text-2xl leading-none">✕</button>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Select your Location</label>
            <input name="location" placeholder="Select Location" className="w-full bg-gray-50 border border-gray-200 rounded-md px-4 py-3 text-sm focus:outline-none" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Start Date</label>
              <input name="date" type="date" className="w-full bg-gray-50 border border-gray-200 rounded-md px-4 py-3 text-sm focus:outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Estimated Duration</label>
              <select name="duration" className="w-full bg-gray-50 border border-gray-200 rounded-md px-4 py-3 text-sm focus:outline-none">
                <option>2 Hour</option>
                <option>4 Hour</option>
                <option>Full Day</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Special Requirements (Optional)</label>
            <textarea name="notes" placeholder="Any specific requirements or additional information..." className="w-full bg-gray-50 border border-gray-200 rounded-md px-4 py-3 text-sm min-h-[100px] resize-none focus:outline-none" />
          </div>

          <div className="flex justify-end">
            <button type="submit" className="bg-primary text-white px-6 py-2 rounded-md">Add to Shortlist</button>
          </div>
        </form>
      </div>
    </div>
  );
}

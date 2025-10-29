

const ReportModal = () => {
  return (
    <div>
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
                // onClick={() => setReportModal(false)}
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
    </div>
  );
};

export default ReportModal;

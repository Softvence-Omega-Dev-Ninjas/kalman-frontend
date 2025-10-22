import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaCheck } from "react-icons/fa";
import { usePostAJobMutation } from "@/redux/features/jobs/jobsApi";
import toast from "react-hot-toast";

const PhaseThree = ({ phase, setPhase, jobData }: any) => {
  const [contactMethod, setContactMethod] = useState(jobData.contactMethod);
  const [images, setImages] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [postAJob, { isLoading }] = usePostAJobMutation();
  const navigate = useNavigate();

  //  Handle file upload preview
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selected = Array.from(e.target.files);
      setImages((prev) => [...prev, ...selected]);
      const urls = selected.map((file) => URL.createObjectURL(file));
      setPreviewUrls((prev) => [...prev, ...urls]);
    }
  };

  //  Submit job
  const submitJob = async () => {
    try {
      const formData = new FormData();
      formData.append("title", jobData.title);
      formData.append("description", jobData.description);
      formData.append("categoryId", jobData.categoryId);
      formData.append("timeline", jobData.timeline);
      formData.append("date", jobData.date);
      formData.append("time", jobData.time);
      formData.append("contact_method", contactMethod);
      formData.append("location", jobData.location || "");
      images.forEach((file) => formData.append("images", file));

      await postAJob(formData).unwrap();
      toast.success("Job posted successfully!");
      navigate("/jobs");
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to post job!");
      console.error(error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-md p-10">
      <h2 className="text-xl font-semibold mb-4">Upload Images (Optional)</h2>

      <div className="border border-dashed border-gray-300 rounded-lg p-6 text-center mb-6">
        <input type="file" multiple onChange={handleFileChange} className="hidden" id="fileInput" />
        <label htmlFor="fileInput" className="cursor-pointer text-sm text-[#FF7346] font-semibold">
          Click to upload or drag & drop
        </label>
        <p className="text-xs text-gray-500 mt-1">Supported: JPG, PNG, up to 5MB each</p>

        {/* Preview uploaded images */}
        {previewUrls.length > 0 && (
          <div className="grid grid-cols-3 gap-3 mt-4">
            {previewUrls.map((url, idx) => (
              <img key={idx} src={url} alt="preview" className="rounded-md w-full h-24 object-cover" />
            ))}
          </div>
        )}
      </div>

      {/* Contact Method */}
      <h2 className="text-xl font-semibold mb-3">Preferred Contact Method</h2>
      <div className="flex gap-3 mb-8">
        {["phone", "email"].map((method) => (
          <button
            key={method}
            onClick={() => setContactMethod(method as "phone" | "email")}
            className={`px-4 py-2 border rounded-md text-sm font-medium flex items-center gap-2 ${
              contactMethod === method
                ? "border-[#FF7346] bg-[#FFF2EE] text-[#FF7346]"
                : "border-gray-300 text-gray-600"
            }`}
          >
            {contactMethod === method && <FaCheck className="text-[#FF7346]" />}
            {method === "phone" ? "Phone" : "Email"}
          </button>
        ))}
      </div>

      {/* Job Summary */}
      <h2 className="text-xl font-semibold mb-3">Job Summary</h2>
      <div className="border border-gray-200 rounded-md p-4 text-sm space-y-2">
        <div>
          <strong>Title:</strong> {jobData.title || "—"}
        </div>
        <div>
          <strong>Description:</strong> {jobData.description || "—"}
        </div>
        <div>
          <strong>Category:</strong> {jobData.categoryId || "—"}
        </div>
        <div>
          <strong>Timeline:</strong> {jobData.timeline || "—"}
        </div>
        <div>
          <strong>Preferred Date:</strong> {jobData.date || "—"}
        </div>
        <div>
          <strong>Preferred Time:</strong> {jobData.time || "—"}
        </div>
        <div>
          <strong>Contact Method:</strong> {contactMethod || "—"}
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between items-center mt-8">
        <button
          onClick={() => setPhase(phase - 1)}
          className="px-5 py-2 border border-gray-300 rounded-md flex items-center gap-2 text-sm text-gray-600"
        >
          <FaArrowLeft /> Back
        </button>

        <button
          onClick={submitJob}
          disabled={isLoading}
          className={`px-6 py-2 rounded-md text-white text-sm font-semibold flex items-center gap-2 ${
            isLoading ? "bg-gray-400" : "bg-[#FF7346] hover:bg-[#ff5f2c]"
          }`}
        >
          {isLoading ? "Posting..." : "Post Job"}
        </button>
      </div>
    </div>
  );
};

export default PhaseThree;

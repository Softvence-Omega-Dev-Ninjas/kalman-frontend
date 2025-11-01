import { useState, useRef, useEffect } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { usePostAJobMutation } from "@/redux/features/jobs/jobsApi";
import toast from "react-hot-toast";
import phase3Img from "../../../assets/sample_images/phase3logo.png";
import callOnlyIcon from "../../../assets/sample_images/phoneOnly.png";
import emailOnlyIcon from "../../../assets/sample_images/viaEmail.png";
import {
  MdOutlineFileUpload,
  MdOutlineKeyboardDoubleArrowRight,
} from "react-icons/md";
import { IoDocumentTextOutline, IoLocationOutline } from "react-icons/io5";
import { useGetCategoriesHQuery } from "@/redux/features/admin/categoryApi";
import type { TCategory } from "@/admin-dashboard/category/data/categoryData";
import { useNavigate } from "react-router-dom";

const PhaseThree = ({ phase, setPhase, jobData }: any) => {

    useEffect(() => {
      window.scrollTo({ top: 0, behavior: "smooth" }); 
    }, []);

  const [contactMethod, setContactMethod] = useState(jobData.contact_method || "");
  const [images, setImages] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [postAJob] = usePostAJobMutation();
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Handle file upload + preview (fixed first-click issue)
const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  if (e.target.files && e.target.files.length > 0) {
    const selected = Array.from(e.target.files).slice(0, 5);
    setImages((prev) => [...prev, ...selected]);
    const urls = selected.map((file) => URL.createObjectURL(file));
    setPreviewUrls((prev) => [...prev, ...urls]);
  }
  e.target.value = ""; //important
};


console.log(jobData)
  // Category
  const { data } = useGetCategoriesHQuery();
  const categories: TCategory[] = data?.data?.result || [];
  const category = categories.find((cat) => cat?.id === jobData.categoryId);

  // Open file picker
const handleChooseClick = (e?: React.MouseEvent) => {
  e?.stopPropagation(); // prevent bubbling (double trigger fix)
  if (fileInputRef.current) {
    fileInputRef.current.click();
  }
};

  // Drag and drop handlers
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    const droppedFiles = Array.from(e.dataTransfer.files).slice(0, 5);
    if (droppedFiles.length > 0) {
      setImages((prev) => [...prev, ...droppedFiles]);
      const urls = droppedFiles.map((file) => URL.createObjectURL(file));
      setPreviewUrls((prev) => [...prev, ...urls]);
    }
  };
console.log(jobData)
  // Submit Job (fixed console + contact method + image data)
  const submitJob = async () => {
    try {
      const requiredFields = [
  { value: jobData.title, name: "Title" },
  { value: jobData.description, name: "Description" },
  { value: jobData.categoryId, name: "Category" },
  { value: jobData.timeline, name: "Timeline" },
  { value: contactMethod, name: "Contact method" },
  { value: jobData.location, name: "Location" },
  { value: jobData.price, name: "Price" },
  { value: jobData.subCategories?.length, name: "Subcategories" },
  { value: jobData.skills_needed?.length, name: "Skills Needed" },
    { value: jobData.budge_type, name: "Budget Type" },
  { value: images?.length, name: "Images" },
];

const missingField = requiredFields.find(field => !field.value);

if (missingField) {
  toast(`${missingField.name} is missing!`);
  console.log(`Missing field: ${missingField.name}`);
  return;
}


      console.log("Images ready to upload:", images);

      const data = {
        title: jobData.title,
        description: jobData.description,
        categoryId: jobData.categoryId,
        timeline: jobData.timeline,
        date: jobData.date || "",
        time: jobData.time || "",
        contact_method: contactMethod,
        location: jobData.location ,
        subCategories: jobData.subCategories ,
        skills_needed: jobData.skills_needed || [],
        budget_type : jobData.budge_type ,
        price: jobData.price || null,
      };

      await postAJob({ data, images }).unwrap();
      toast.success("Job posted successfully!");
      navigate("/jobs");
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to post job!");
      console.error(error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-md p-10">
      <div className="flex flex-col items-center mb-6">
        <div className="w-16 h-16 rounded-full bg-[#0B1B26] flex items-center justify-center mb-4">
          <img src={phase3Img} alt="photos" />
        </div>
        <h1 className="text-lg font-semibold">Photos & Final Details</h1>
        <p className="text-sm text-secondary">
          Add photos to help tradespeople understand the job better
        </p>
      </div>

      <div className="space-y-6">
        {/* Drop area */}
        <div
          className="border-2 border-dashed border-gray-200 rounded-md p-8 text-center bg-gray-50 cursor-pointer"
          onClick={handleChooseClick}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <div className="p-2 bg-gray-200 rounded-full inline-block mb-4">
            <MdOutlineFileUpload className="text-4xl text-gray-500" />
          </div>
          <div className="mb-2">Drop photos here or click to browse</div>
          <div className="text-xs text-secondary mb-4">
            Up to 5 photos, max 10MB each • JPG, PNG, WEBP
          </div>
          <button
            type="button"
            onClick={handleChooseClick}
            className="px-4 py-2 border border-gray-200 rounded-md bg-white cursor-pointer"
          >
            Choose Image
          </button>
          <input
            type="file"
            ref={fileInputRef}
            multiple
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />

        </div>

        {/* Image previews */}
       {previewUrls.length > 0 && (
  <div className="grid grid-cols-3 gap-3 mt-4">
    {previewUrls.map((url, index) => (
      <div
        key={index}
        className="relative w-full h-24 border border-gray-200 rounded-md overflow-hidden group"
      >
        <img
          src={url}
          alt={`Preview ${index + 1}`}
          className="object-cover w-full h-full"
        />

        {/* Delete button (visible on hover) */}
        <button
          type="button"
          onClick={() => {
            setImages((prev) => prev.filter((_, i) => i !== index));
            setPreviewUrls((prev) => prev.filter((_, i) => i !== index));
          }}
          className="absolute top-1 right-1 bg-black/60 text-white text-xs rounded-full py-1 px-2 cursor-pointer opacity-0 group-hover:opacity-100 transition"
          title="Remove image"
        >
          ✕
        </button>
      </div>
    ))}
  </div>
)}


        {/* Contact preference */}
        <div>
          <h2 className="text-sm font-medium mb-3">
            How would you like to be contacted?
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => setContactMethod("phone")}
              className={`p-4 rounded-lg border ${
                contactMethod === "phone"
                  ? "border-[#FF7346]"
                  : "border-gray-200"
              } flex items-center gap-3`}
            >
              <div className="w-8 h-8 rounded-md bg-gray-50 flex items-center justify-center">
                <img src={callOnlyIcon} alt="" />
              </div>
              <div className="text-left">
                <div className="font-semibold">Phone only</div>
                <div className="text-xs text-secondary">
                  Tradespeople will call you directly
                </div>
              </div>
            </button>

            <button
              onClick={() => setContactMethod("email")}
              className={`p-4 rounded-lg border ${
                contactMethod === "email"
                  ? "border-[#FF7346]"
                  : "border-gray-200"
              } flex items-center gap-3`}
            >
              <div className="w-8 h-8 rounded-md bg-gray-50 flex items-center justify-center">
                <img src={emailOnlyIcon} alt="" />
              </div>
              <div className="text-left">
                <div className="font-semibold">Email only</div>
                <div className="text-xs text-secondary">
                  Receive quotes and messages via email
                </div>
              </div>
            </button>
          </div>
        </div>

        {/* Job Summary box (unchanged) */}
        <div className="border border-gray-200 rounded-md p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="font-semibold flex items-center gap-2">
              <IoDocumentTextOutline />
              <span>Job Summary</span>
            </div>
            {/* <button className="text-lg text-secondary">
              <FaRegEdit />
            </button> */}
          </div>

          <div className="text-sm text-black mb-3">
            <div className="mb-2 pb-2 border-b border-gray-200">
              <strong>Job Title :</strong> {jobData.title}
            </div>
            <div className="mb-2">
              <strong>Service Category</strong>
            </div>
            <div className="flex items-center gap-2 flex-wrap mb-2">
              <span className="text-sm">{category?.name || "N/A"}</span>
            
                <>
                  <MdOutlineKeyboardDoubleArrowRight className="text-lg text-primary" />
                  <span className="text-sm">
                     {jobData.subCategories.join(", ") || "N/A "}
                  </span>
                </>
              
            </div>

            <div>
              <strong>Budget: {jobData?.price || "N/A"}</strong>
            </div>
            <div className="text-sm px-2 py-1 bg-gray-100 rounded-md max-w-max my-2">
                {jobData?.budge_type || "N/A"}
            </div>
            <div className="text-xs">Maximum : ${jobData.price || 200}</div>

            <div className="mt-3 mb-2">
              <strong>Timeline</strong>
            </div>
            <div className="flex gap-2 flex-wrap">
              <span className="px-2 py-1 bg-gray-100 rounded-md text-sm">
                {jobData?.timeline}
              </span>
            </div>

            <div className="mt-3">
              <strong>Location</strong>
            </div>
            <div className="text-sm mt-1 flex items-center gap-2 px-2 py-1 border border-gray-200 rounded-md max-w-max">
              <IoLocationOutline />
              <span>{jobData.location}</span>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => setPhase(phase - 1)}
            className="px-4 py-2 rounded-md border border-gray-200 flex items-center gap-2 cursor-pointer"
          >
            <FaArrowLeft /> <span>Previous</span>
          </button>
          <button
            onClick={submitJob}
            className="px-6 py-2 rounded-md bg-[#FF7346] text-white flex items-center gap-2 cursor-pointer"
          >
            <span>Post Job</span> <FaArrowRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PhaseThree;

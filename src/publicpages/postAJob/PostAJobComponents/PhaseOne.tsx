import { IoLocationOutline } from "react-icons/io5";
import { useEffect, useState } from "react";
import tellUsImg from "../../../assets/sample_images/tellusabouturproject.png";
import { FaArrowRight } from "react-icons/fa";

import type { JobData } from "../PostAJob";
import {
  useGetCategoriesHQuery,
  useGetSingleCategoryQuery,
} from "@/redux/features/admin/categoryApi";
import { MdAttachMoney } from "react-icons/md";

interface PhaseOneProps {
  phase: number;
  setPhase: (phase: number) => void;
  jobData: JobData;
  setJobData: React.Dispatch<React.SetStateAction<JobData>>;
}

interface TCategory {
  id: string;
  name: string;
  image: string;
  subCategories?: string[];
}

const PhaseOne = ({ phase, setPhase, jobData, setJobData }: PhaseOneProps) => {
  const [budgetType, setBudgetType] = useState(jobData.budge_type || "");
  const [title, setTitle] = useState(jobData.title);
  const [description, setDescription] = useState(jobData.description);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    jobData.categoryId
  );
  const [selectedSubCategory, setSelectedSubCategory] = useState<string[]>(
    jobData.subCategories || []
  );
  const [location, setLocation] = useState(jobData.location || "");
  const [price, setPrice] = useState(jobData.price || "");
  const maxChars = 500;

  // All categories
  const { data , refetch } = useGetCategoriesHQuery();
  const categories: TCategory[] = data?.data?.result || [];

  useEffect(()=>{
    refetch()
  }, [])
  // Single category for subCategory display
  const { data: singleCategoryData, isFetching: isSubLoading } =
    useGetSingleCategoryQuery(selectedCategory!, { skip: !selectedCategory });

  const subCategories: string[] = singleCategoryData?.data?.subCategories || [];

  // Toggle subcategory selection
  const handleSubCategoryClick = (sub: string) => {
    setSelectedSubCategory((prev) =>
      prev.includes(sub)
        ? prev.filter((item) => item !== sub) 
        : [...prev, sub] 
    );
  };

  const handleNext = () => {
    setJobData({
      ...jobData,
      title,
      price,
      description,
      categoryId: selectedCategory,
      subCategories: selectedSubCategory, // now array
      location,
budge_type: budgetType,
    });
    setPhase(phase + 1);
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-md p-10">
      {/* Header */}
      <div className="flex flex-col items-center mb-8">
        <div className="w-16 h-16 rounded-full bg-[#0B1B26] flex items-center justify-center mb-4">
          <img src={tellUsImg} alt="" />
        </div>
        <h1 className="text-lg font-semibold">Tell us about your project</h1>
        <p className="text-sm text-secondary">
          Provide details about what you need done
        </p>
      </div>

      {/* Form */}
      <div className="space-y-6">
        {/* Title */}
        <div>
          <label className="block text-sm font-medium mb-2">Job Title</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Fix leaky kitchen tap"
            className="w-full bg-gray-50 border border-gray-200 rounded-md px-4 py-3 text-sm focus:outline-none"
          />
        </div>

        {/* Category */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <label className="text-sm font-medium">Category</label>
            <button className="text-sm text-[#FF7346]">See all</button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {categories.slice(0, 6).map((s) => (
              <button
                key={s.id}
                onClick={() => {
                  setSelectedCategory(s.id);
                  setSelectedSubCategory([]); // reset subcategory when category changes
                }}
                className={`flex flex-col items-start gap-3 p-4 rounded-lg border ${
                  selectedCategory === s.id
                    ? "border-[#FF7346]"
                    : "border-gray-200"
                } bg-white text-left transition`}
              >
                <div className="w-10 h-10 rounded-md bg-gray-50 flex items-center justify-center mb-1">
                  <img src={s?.image} alt={s?.name} className="w-6 h-6" />
                </div>
                <div className="font-semibold text-sm">{s?.name}</div>
                <div className="text-xs text-secondary whitespace-normal break-words w-full">
                  <p>{s?.subCategories?.slice(0, 2).join(", ")} And more</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Sub Category (only if category selected) */}
        {selectedCategory && (
          <div>
            <label className="block text-sm font-medium mb-2">
              Sub Category
            </label>
            {isSubLoading ? (
              <p className="text-sm text-gray-400">Loading...</p>
            ) : subCategories.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {subCategories.map((sub) => (
                  <button
                    key={sub}
                    onClick={() => handleSubCategoryClick(sub)}
                    className={`p-3 rounded-lg border text-sm transition ${
                      selectedSubCategory.includes(sub)
                        ? "border-[#FF7346] bg-orange-50"
                        : "border-gray-200 bg-white"
                    }`}
                  >
                    {sub}
                  </button>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-400">
                No sub-categories available
              </p>
            )}
          </div>
        )}

        {/* Description */}
        <div>
          <label className="block text-sm font-medium mb-2">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value.slice(0, maxChars))}
            className="w-full bg-gray-50 border border-gray-200 rounded-md px-4 py-3 text-sm min-h-[120px] resize-none focus:outline-none"
          />
          <div className="text-xs text-right text-secondary mt-2">
            minimum 50/{maxChars} characters
          </div>
        </div>

        {/* Price */}
<div className="grid grid-cols-2 gap-3">

  <div>
     <label className="block text-sm font-medium mb-2">Budget Type</label>
     <select
  value={budgetType}
  onChange={(e) => setBudgetType(e.target.value)}
  className="border border-gray-300 rounded-lg px-2 py-3 w-full"
>
  <option value="">Select type</option>
  <option value="FIXED">Fixed</option>
  <option value="HOURLY">Hourly</option>
</select>
  </div>
  
   
<div>
  <label className="block text-sm font-medium mb-2">Budget Price</label>
  <div className="flex items-center gap-3 px-3 py-3 border border-gray-200 rounded-md bg-gray-50">
    
    <MdAttachMoney className="inline text-lg" />
    <input
      type="number"
      value={price}
      onChange={(e) => setPrice(Number(e.target.value))}
      placeholder="Budget amount"
      className="w-full bg-gray-50 text-sm focus:outline-none"
    />
</div>

  </div>
</div>


        {/* Location */}
        <div>
          <label className="block text-sm font-medium mb-2">Location</label>
          <div className="flex items-center gap-3 px-3 py-3 border border-gray-200 rounded-md bg-gray-50">
            <IoLocationOutline className="inline text-lg" />
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Enter your location"
              className="w-full bg-gray-50 text-sm focus:outline-none"
            />
          </div>
        </div>

        {/* Continue Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            onClick={handleNext}
            className="bg-[#FF7346] text-white px-6 py-2 rounded-md flex items-center gap-2 font-semibold cursor-pointer"
          >
            <span>Continue </span>
            <FaArrowRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PhaseOne;

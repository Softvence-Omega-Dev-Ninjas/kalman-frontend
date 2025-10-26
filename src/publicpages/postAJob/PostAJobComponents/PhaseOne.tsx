import { IoLocationOutline } from "react-icons/io5";
import { useState } from "react";
import tellUsImg from "../../../assets/sample_images/tellusabouturproject.png";
import { FaArrowRight } from "react-icons/fa";

import type { JobData } from "../PostAJob";
import { useGetCategoriesHQuery } from "@/redux/features/admin/categoryApi";

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
  const [title, setTitle] = useState(jobData.title);
  const [description, setDescription] = useState(jobData.description);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    jobData.categoryId
  );
  const [location, setLocation] = useState(jobData.location || ""); // new location state
  const [price , setPrice ] = useState(jobData.price || "")
  const maxChars = 500;

  const { data } = useGetCategoriesHQuery();
  const categories: TCategory[] = data?.data?.result || [];
  console.log(categories);

  const handleNext = () => {
    setJobData({
      ...jobData,
      title,
      price, 
      description,
      categoryId: selectedCategory,
      location, // include location
    });
    setPhase(phase + 1);
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-md p-10">
      <div className="flex flex-col items-center mb-8">
        <div className="w-16 h-16 rounded-full bg-[#0B1B26] flex items-center justify-center mb-4">
          <img src={tellUsImg} alt="" />
        </div>
        <h1 className="text-lg font-semibold">Tell us about your project</h1>
        <p className="text-sm text-secondary">Provide details about what you need done</p>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2">Job Title</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Fix leaky kitchen tap"
            className="w-full bg-gray-50 border border-gray-200 rounded-md px-4 py-3 text-sm focus:outline-none"
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-3">
            <label className="text-sm font-medium">Category</label>
            <button className="text-sm text-[#FF7346]">See all</button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {categories.slice(0, 6).map((s) => (
              <button
                key={s.id}
                onClick={() => setSelectedCategory(s.id)}
                className={`flex flex-col items-start gap-3 p-4 cursor-pointer rounded-lg border ${
                  selectedCategory === s.id ? "border-[#FF7346]" : "border-gray-200"
                } bg-white text-left`}
              >
                <div className="w-10 h-10 rounded-md bg-gray-50 flex items-center justify-center mb-1">
                  <img src={s?.image} alt={s?.name} className="w-6 h-6" />
                </div>
                <div className="font-semibold text-sm">{s?.name}</div>
                <div className="text-xs text-secondary">
                  {s?.subCategories?.join(", ")}
                </div>
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Description</label>
          <textarea
            value={description}
            // placeholder="Describe what needs to be done, including any specific requirements, materials needed. or preferences you have„."
            onChange={(e) => setDescription(e.target.value.slice(0, maxChars))}
            className="w-full bg-gray-50 border border-gray-200 rounded-md px-4 py-3 text-sm min-h-[120px] resize-none focus:outline-none"
          />
          <div className="text-xs text-right text-secondary mt-2">
            minimum 50/{maxChars} characters
          </div>
        </div>

           <div>
          <label className="block text-sm font-medium mb-2">Budget Price</label>
          <div className="flex items-center gap-3 px-3 py-3 border border-gray-200 rounded-md bg-gray-50">
            <IoLocationOutline className="inline text-lg" />
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              placeholder="Budget in USD"
              className="w-full bg-gray-50 text-sm focus:outline-none"
            />
          </div>
        </div>

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

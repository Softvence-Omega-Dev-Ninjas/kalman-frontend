import { useState } from "react";
import { Search } from "lucide-react";

const ProfessionalInfoForm = () => {

    const [inputValue, setInputValue] = useState("");
  const [tags, setTags] = useState<string[]>(["Home Repairs", "Cleaning"]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputValue.trim() !== "") {
      e.preventDefault();
      if (!tags.includes(inputValue.trim())) {
        setTags([...tags, inputValue.trim()]);
      }
      setInputValue("");
    }
  };

  const removeTag = (tag: string) => {
    setTags(tags.filter((t) => t !== tag));
  };
  return (
    <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-sm p-6 md:p-8">
      {/* Title */}
      <h2 className="text-xl font-semibold text-gray-800 mb-6">
        Professional Information
      </h2>

      {/* Business Name */}
      <div className="mb-5">
        <label className="block text-lg font-semibold text-gray-700 mb-2">
          Business Name
        </label>
        <input
          type="text"
          placeholder="Your business name"
          className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-orange-500 focus:outline-none bg-[#F8F9FA]"
        />
      </div>

      {/* Years of Experience & Business Type */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
        <div>
          <label className="block text-lg font-semibold text-gray-700 mb-2">
            Years of Experience
          </label>
          <input
            type="text"
            placeholder="Your business name"
            className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-orange-500 focus:outline-none bg-[#F8F9FA]"
          />
        </div>
        <div>
          <label className="block text-lg font-semibold text-gray-700 mb-2">
            Business Type
          </label>
          <select className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-orange-500 focus:outline-none bg-[#F8F9FA]">
            <option>Select business type</option>
          </select>
        </div>
      </div>

      {/* Hourly Rate */}
      <div className="mb-5">
        <label className="block text-lg font-semibold text-gray-700 mb-2">
          Hourly rate
        </label>
        <input
          type="text"
          defaultValue="$20.00"
          className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-orange-500 focus:outline-none bg-[#F8F9FA]"
        />
      </div>

      {/* Services */}
      <h3 className="text-2xl font-bold text-gray-800 mb-4 mt-10">Services</h3>
       <div className="mb-5">
      <label className="block text-lg font-semibold text-gray-700 mb-2 mt-10">
        You are professional at
      </label>

      <div className="relative">
        <Search className="absolute left-4 top-[40%] -translate-y-1/2 text-gray-400 w-4 h-4" />

        <input
          type="text"
          placeholder="Search your profession"
          className="w-full border border-gray-200 rounded-lg pl-10 pr-4 py-3 mb-3 focus:ring-2 focus:ring-orange-500 focus:outline-none bg-[#F8F9FA]"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </div>

      <div className="flex flex-wrap gap-2">
        {tags.map((tag, idx) => (
          <span
            key={idx}
            className="flex items-center gap-2 border border-gray-200 px-3 py-2 rounded-lg text-lg font-semibold"
          >
            {tag}
            <button
              type="button"
              onClick={() => removeTag(tag)}
              className="ml-1 text-gray-500 hover:text-red-500"
            >
              ✕
            </button>
          </span>
        ))}
      </div>
    </div>

      {/* Professional Description */}
      <div className="mb-8">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Professional Description
        </label>
        <textarea
          placeholder="Describe your experience, approach to work, and what makes you stand out..."
          rows={4}
          className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-orange-500 focus:outline-none bg-[#F8F9FA]"
        />
      </div>

      {/* Buttons */}
      <div className="flex justify-between">
        <button className="px-5 py-3 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50">
          ← Previous
        </button>
        <button className="px-6 py-3 rounded-lg bg-orange-500 text-white hover:bg-orange-600">
          Continue →
        </button>
      </div>
    </div>
  );
};

export default ProfessionalInfoForm;

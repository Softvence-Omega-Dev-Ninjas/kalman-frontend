import { CiLocationOn } from "react-icons/ci";
import {
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowUp,
} from "react-icons/md";
import PriceRangeSlider from "./PriceRangeSlider";
import { useState } from "react";
// Assuming this is the correct path and type for your Redux Query
import { useGetCategoriesHQuery } from "@/redux/features/admin/categoryApi";


interface Job {
  location: string;
}

interface Category {
  id: string;
  name: string;
  subCategories: string[];
  jobs: Job[];
}

interface CategoriesApiResponse {
  data: {
    result: Category[];
  };
}
// --------------------------

const SideFilterBar = () => {
  // Use the defined type for the query data
  const { data: allCategories } = useGetCategoriesHQuery(undefined) as {
    data: CategoriesApiResponse;
  };

  const categories: Category[] = allCategories?.data?.result || [];

  const jobs = allCategories?.data?.result?.[0]?.jobs?.[0]?.location || [];
  console.log("jobs", jobs);

  const [isOpen, setIsOpen] = useState(true);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedSubCategory, setSelectedSubCategory] = useState<string>("");
  const [selectedLocation, setSelectedLocation] = useState<string>("");

  // Handle individual category checkbox change
  const handleCategoryChange = (categoryName: string) => {
    setSelectedSubCategory(""); // Reset subcategory when category selection changes
    setSelectedCategories((prev) =>
      prev.includes(categoryName)
        ? prev.filter((c) => c !== categoryName)
        : [...prev, categoryName]
    );
  };

  //  Handler for "All Categories" checkbox
  const handleSelectAllCategories = () => {
    if (selectedCategories.length === categories.length) {
      // If all are selected, deselect all
      setSelectedCategories([]);
    } else {
      // Otherwise, select all categories
      const allCategoryNames = categories.map((cat: Category) => cat.name);
      setSelectedCategories(allCategoryNames);
    }
  };

  // Combine all subcategories from selected categories
  const selectedSubCategories: string[] = categories
    .filter((cat: Category) => selectedCategories.includes(cat.name))
    .flatMap((cat: Category) => cat.subCategories || []);

  // Collect all unique locations
  const allLocations: string[] = categories
    .flatMap((cat: Category) => cat.jobs || [])
    .map((job: Job) => job.location)
    .filter((loc) => loc && loc.trim() !== "");

  // 🧹 Remove duplicates
  const uniqueLocations: string[] = [...new Set(allLocations)];

  return (
    <div className="space-y-6">
      {/* Keyword Search */}
      <div className="p-5 bg-white rounded-md shadow-md border border-gray-200">
        <h1 className="text-start text-xl font-semibold mb-6">Keyword</h1>
        <input
          type="text"
          placeholder="Search Here"
          className="w-full text-md border border-gray-300 rounded-md px-3 py-2 mt-2 focus:outline-none"
        />
      </div>

      {/* --- Categories --- */}
      <div className="p-5 bg-white rounded-md shadow-md border border-gray-200 hover:shadow-lg transition-all duration-300">
        <div
          className="flex items-center justify-between cursor-pointer select-none mb-3"
          onClick={() => setIsOpen(!isOpen)}
        >
          <h1 className="text-lg md:text-xl font-semibold text-gray-800 flex items-center gap-2">
            Categories
          </h1>
          {isOpen ? (
            <MdOutlineKeyboardArrowUp className="text-2xl text-gray-600 transition-transform duration-300" />
          ) : (
            <MdOutlineKeyboardArrowDown className="text-2xl text-gray-600 transition-transform duration-300" />
          )}
        </div>

        <div
          className={`overflow-hidden transition-all duration-500 ${
            isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="space-y-3 mt-2 flex flex-col justify-start items-start">
            {/* 🆕 "All Categories" Checkbox */}
            <label
              key="all-categories"
              className={`flex items-center gap-3  text-gray-800 bg-gray-100 rounded-md px-2 py-1 w-full cursor-pointer transition-all duration-200 ${
                selectedCategories.length === categories.length &&
                categories.length > 0
                  ? ""
                  : ""
              }`}
            >
              <input
                type="checkbox"
                checked={
                  categories.length > 0 &&
                  selectedCategories.length === categories.length
                }
                onChange={handleSelectAllCategories}
                className="w-4 h-4 accent-blue-500 cursor-pointer"
              />
              <span className="text-sm md:text-base">All Categories</span>
            </label>
            {/* ------------------------------------- */}

            {categories.length > 0 ? (
              categories.map((category: Category) => (
                <label
                  key={category.id}
                  className="flex items-center gap-3 text-gray-700 hover:bg-gray-50 rounded-md px-2 py-1 w-full cursor-pointer transition-all duration-200"
                >
                  <input
                    type="checkbox"
                    value={category.name}
                    checked={selectedCategories.includes(category.name)}
                    onChange={() => handleCategoryChange(category.name)}
                    className="w-4 h-4 accent-blue-500 cursor-pointer"
                  />
                  <span className="text-sm md:text-base">{category.name}</span>
                </label>
              ))
            ) : (
              <p className="text-gray-500 text-sm">No categories found</p>
            )}
          </div>
        </div>
      </div>

      {/* Subcategories */}
      <div className="p-5 bg-white rounded-md shadow-md border border-gray-200">
        <h1 className="text-start text-xl font-semibold mb-6">
          Sub Categories
        </h1>
        <div className="relative">
          <select
            className="w-full text-md border border-gray-300 rounded-md px-3 py-2 pr-10 focus:outline-none appearance-none"
            value={selectedSubCategory}
            onChange={(e) => setSelectedSubCategory(e.target.value)}
            disabled={selectedSubCategories.length === 0}
          >
            <option value="">
              {selectedSubCategories.length > 0
                ? "Select Sub Category"
                : "Select Category First"}
            </option>
            {selectedSubCategories.map((sub: string, index: number) => (
              <option key={index} value={sub}>
                {sub}
              </option>
            ))}
          </select>
          <MdOutlineKeyboardArrowDown className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none" />
        </div>
      </div>

      {/* Location */}
      <div className="p-5 bg-white rounded-md shadow-md border border-gray-200">
        <h1 className="text-start text-xl font-semibold mb-6">Location</h1>
        <div className="relative">
          <select
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
            className="w-full text-md border border-gray-300 rounded-md px-3 py-2 pr-10 focus:outline-none appearance-none"
          >
            <option value="">
              {uniqueLocations.length > 0
                ? "Select Location"
                : "No locations available"}
            </option>
            {uniqueLocations.map((loc: string, index: number) => (
              <option key={index} value={loc}>
                {loc}
              </option>
            ))}
          </select>

          <CiLocationOn className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none text-gray-500" />
        </div>
      </div>

      {/* Price Range */}
      <div className="p-5 bg-white rounded-md shadow-md border border-gray-200">
        <div className="flex items-start justify-between mb-4">
          <h1 className="text-start text-xl font-semibold">Price Range</h1>
          <div className="text-sm text-gray-600 bg-gray-100 px-4 py-2 rounded-md">
            Price : $<span className="price-current">55.00</span>
          </div>
        </div>

        {/* Histogram */}
        <div className="w-full mb-4">
          <div className="flex items-end gap-1 h-12">
            {Array.from({ length: 40 }).map((_, i) => {
              const height = 6 + Math.round(18 * Math.abs(Math.sin(i / 3)));
              const activeColor = i >= 10 && i <= 30 ? "#FF7346" : "#FFD9CF";
              return (
                <div
                  key={i}
                  className="rounded-sm"
                  style={{ width: 6, height, background: activeColor }}
                />
              );
            })}
          </div>
        </div>

        <PriceRangeSlider
          min={0}
          max={1000}
          step={1}
          initialLow={50}
          initialHigh={500}
        />
      </div>

      {/* Filter Button */}
      <button className="w-full px-5 py-4 mt-4 text-white bg-primary rounded-md text-lg">
        Filter Search
      </button>
    </div>
  );
};

export default SideFilterBar;
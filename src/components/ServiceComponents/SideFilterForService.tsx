import { CiLocationOn } from "react-icons/ci";
import {
  MdOutlineKeyboardArrowDown,
  MdOutlineStar,
  MdOutlineStarBorder,
} from "react-icons/md";
import { reviewFilter } from "../../assets/DummyData/DummyData";
import { useState } from "react";
import { useGetCategoriesHQuery } from "@/redux/features/admin/categoryApi";

export interface ServiceFilters {
  search: string;
  category: string;
  subCategory: string;
  location: string;
  rating: string;
}

interface SideFilterForServiceProps {
  onFilterChange?: (filters: ServiceFilters) => void;
}

interface Category {
  name: string;
  id: string;
  subCategories: string[];
}

const SideFilterForService: React.FC<SideFilterForServiceProps> = ({
  onFilterChange,
}) => {
  const { data } = useGetCategoriesHQuery();

  const [search, setSearch] = useState<string>("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [subCategory, setSubCategory] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [selectedRatings, setSelectedRatings] = useState<number[]>([]);

  const categories: Category[] = data?.data?.result || [];

  // --- Combine subcategories based on selected categories ---
  const allCategoryNames = categories.map((cat) => cat.id);

  const filteredSubCategories: string[] =
    selectedCategories.length === 0 ||
    selectedCategories.length === allCategoryNames.length
      ? categories.flatMap((cat) => cat.subCategories)
      : categories
          .filter((cat) => selectedCategories.includes(cat.id))
          .flatMap((cat) => cat.subCategories);

  // --- Handlers ---
  const handleCategoryToggle = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
    setSubCategory(""); // reset subcategory when category changes
  };

  const handleRatingToggle = (rating: number) => {
    setSelectedRatings((prev) =>
      prev.includes(rating)
        ? prev.filter((r) => r !== rating)
        : [...prev, rating]
    );
  };

  const handleApplyFilter = () => {
    onFilterChange?.({
      search: search.trim(),
      category: selectedCategories.join(","),
      subCategory,
      location,
      rating: selectedRatings.join(","),
    });
  };

  return (
    <div className="space-y-6">
      {/* Keyword Search */}
      <div className="p-5 bg-white rounded-md shadow-md border border-gray-200">
        <h1 className="text-start text-xl font-semibold mb-6">Keyword</h1>
        <input
          type="text"
          placeholder="Search Here"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full text-md border border-gray-300 rounded-md px-3 py-2 mt-2 focus:outline-none"
        />
      </div>

      {/* Categories */}
      <div className="p-5 bg-white rounded-md shadow-md border border-gray-200">
        <h1 className="text-xl font-semibold mb-4">Categories</h1>
        <div className="space-y-3 flex flex-col">
          {categories.map((cat, index) => (
            <label
              key={index}
              className="flex items-center gap-3 text-gray-700 hover:bg-gray-50 rounded-md px-2 py-1 w-full cursor-pointer transition-all duration-200"
            >
              <input
                type="checkbox"
                checked={selectedCategories.includes(cat.id)}
                onChange={() => handleCategoryToggle(cat.id)}
                className="w-4 h-4 cursor-pointer accent-blue-500"
              />
              <span className="text-sm">{cat.name}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Subcategories */}
      <div className="p-5 bg-white rounded-md shadow-md border border-gray-200">
        <h1 className="text-xl font-semibold mb-4">Sub Categories</h1>
        <select
          value={subCategory}
          onChange={(e) => setSubCategory(e.target.value)}
          className="w-full text-md border border-gray-300 rounded-md px-3 py-2 pr-10 focus:outline-none appearance-none"
          disabled={selectedCategories.length === 0}
        >
          {selectedCategories.length === 0 ? (
            <option value="">Select first Category</option>
          ) : (
            <>
              <option value="">Select Sub Categories</option>
              {filteredSubCategories.map((sub, index) => (
                <option key={index} value={sub}>
                  {sub}
                </option>
              ))}
            </>
          )}
        </select>
        <MdOutlineKeyboardArrowDown className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none" />
      </div>

      {/* Location */}
      <div className="p-5 bg-white rounded-md shadow-md border border-gray-200">
        <h1 className="text-xl font-semibold mb-4">Location</h1>
        <div className="relative">
          <select
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full text-md border border-gray-300 rounded-md px-3 py-2 pr-10 focus:outline-none appearance-none"
          >
            <option value="">Select Location</option>
            <option value="location1">Location 1</option>
          </select>
          <CiLocationOn className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none text-gray-500" />
        </div>
      </div>

      {/* Ratings */}
      <div className="p-5 bg-white rounded-md shadow-md border border-gray-200">
        <h1 className="text-xl font-semibold mb-4">By Rating</h1>
        <div className="space-y-3 flex flex-col">
          {reviewFilter.map((review, index) => (
            <label
              key={index}
              className="flex items-center gap-2 cursor-pointer w-full"
            >
              <input
                type="checkbox"
                checked={selectedRatings.includes(review.filled_stars)}
                onChange={() => handleRatingToggle(review.filled_stars)}
                className="w-4 h-4 accent-blue-500"
              />
              <div className="flex items-center gap-1">
                {[...Array(review.filled_stars)].map((_, i) => (
                  <MdOutlineStar
                    key={`filled-${i}`}
                    className="text-yellow-400 text-lg"
                  />
                ))}
                {[...Array(review.empty_stars)].map((_, i) => (
                  <MdOutlineStarBorder
                    key={`empty-${i}`}
                    className="text-gray-300 text-lg"
                  />
                ))}
              </div>
              <span className="text-sm text-gray-500 ml-auto">
                ({review.count.toString().padStart(2, "0")})
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Filter Button */}
      <button
        onClick={handleApplyFilter}
        className="w-full px-5 py-4 mt-4 text-white bg-primary rounded-md text-lg"
      >
        Filter Search
      </button>
    </div>
  );
};

export default SideFilterForService;

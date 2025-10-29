// components/Jobs/SideFilterBar.tsx
import React, { useState, useCallback, useMemo } from "react";
import { CiLocationOn } from "react-icons/ci";
import {
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowUp,
} from "react-icons/md";
import PriceRangeSlider from "./PriceRangeSlider";
import { useGetCategoriesHQuery } from "@/redux/features/admin/categoryApi";
import type { FilterState, Category } from "@/types/job";

interface SideFilterBarProps {
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
}

const SideFilterBar: React.FC<SideFilterBarProps> = ({
  filters,
  setFilters,
}) => {
  const { data: allCategories } = useGetCategoriesHQuery(undefined);
  const categories: Category[] = allCategories?.data?.result || [];

  const [isOpen, setIsOpen] = useState(true);

  const handleCategoryChange = useCallback(
    (id: string) => {
      setFilters((prev) => {
        const exists = prev.category.includes(id);
        return {
          ...prev,
          category: exists
            ? prev.category.filter((c) => c !== id)
            : [...prev.category, id],
          subCategory: "",
          page: 1,
        };
      });
    },
    [setFilters]
  );

  const handleSubCategoryChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) =>
      setFilters((p) => ({ ...p, subCategory: e.target.value, page: 1 })),
    [setFilters]
  );

  const handleLocationChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) =>
      setFilters((p) => ({ ...p, location: e.target.value, page: 1 })),
    [setFilters]
  );

  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) =>
      setFilters((p) => ({ ...p, search: e.target.value, page: 1 })),
    [setFilters]
  );

  const handlePriceChange = useCallback(
    (low: number, high: number) =>
      setFilters((p) => ({ ...p, minPrice: low, maxPrice: high, page: 1 })),
    [setFilters]
  );

  const selectedSubCategories = useMemo(
    () =>
      categories
        .filter((c) => filters.category.includes(c.id))
        .flatMap((c) => c.subCategories || []),
    [categories, filters.category]
  );

  const uniqueLocations = useMemo(() => {
    const allLocs = categories
      .flatMap((c) => c.jobs || [])
      .map((j) => j.location);
    return [...new Set(allLocs.filter(Boolean))];
  }, [categories]);

  // Add "All Categories" option
  const allCategoriesOption = {
    id: "all",
    name: "All Categories",
    subCategories: [],
    jobs: [],
  };
  const categoriesWithAll = [allCategoriesOption, ...categories];

  return (
    <div className="space-y-6">
      {/* Search */}
      <div className="p-5 bg-white rounded-md shadow-md border border-gray-200">
        <h1 className="text-xl font-semibold mb-3">Keyword</h1>
        <input
          type="text"
          placeholder="Search Here"
          value={filters.search}
          onChange={handleSearchChange}
          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
        />
      </div>

      {/* Categories */}
      <div className="p-5 bg-white rounded-md shadow-md border border-gray-200">
        <div
          className="flex items-center justify-between cursor-pointer mb-3"
          onClick={() => setIsOpen(!isOpen)}
        >
          <h1 className="text-lg font-semibold text-gray-800">Categories</h1>
          {isOpen ? (
            <MdOutlineKeyboardArrowUp className="text-2xl text-gray-600" />
          ) : (
            <MdOutlineKeyboardArrowDown className="text-2xl text-gray-600" />
          )}
        </div>

        <div
          className={`overflow-hidden transition-all duration-500 ${
            isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="space-y-2 mt-2">
            {categoriesWithAll.map((cat) => (
              <label
                key={cat.id}
                className="flex items-center gap-3 text-gray-700 hover:bg-gray-50 rounded-md px-2 py-1 cursor-pointer transition"
              >
                <input
                  type="checkbox"
                  checked={
                    cat.id === "all"
                      ? filters.category.length === 0
                      : filters.category.includes(cat.id)
                  }
                  onChange={() => {
                    if (cat.id === "all") {
                      // Clear all categories when "All Categories" is selected
                      setFilters((prev) => ({
                        ...prev,
                        category: [],
                        subCategory: "",
                        page: 1,
                      }));
                    } else {
                      handleCategoryChange(cat.id);
                    }
                  }}
                  className="w-4 h-4 accent-orange-500 cursor-pointer"
                />
                <span>{cat.name}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Sub Categories */}
      <div className="p-5 bg-white rounded-md shadow-md border border-gray-200">
        <h1 className="text-xl font-semibold mb-3">Sub Categories</h1>
        <div className="relative">
          <select
            value={filters.subCategory}
            onChange={handleSubCategoryChange}
            disabled={selectedSubCategories.length === 0}
            className="w-full border border-gray-300 rounded-md px-3 py-2 pr-10 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 appearance-none disabled:bg-gray-100 disabled:cursor-not-allowed"
          >
            <option value="">
              {selectedSubCategories.length > 0
                ? "Select Sub Category"
                : "Select Category First"}
            </option>
            {selectedSubCategories.map((sub, i) => (
              <option key={i} value={sub}>
                {sub}
              </option>
            ))}
          </select>
          <MdOutlineKeyboardArrowDown className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none" />
        </div>
      </div>

      {/* Location */}
      <div className="p-5 bg-white rounded-md shadow-md border border-gray-200">
        <h1 className="text-xl font-semibold mb-3">Location</h1>
        <div className="relative">
          <select
            value={filters.location}
            onChange={handleLocationChange}
            className="w-full border border-gray-300 rounded-md px-3 py-2 pr-10 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 appearance-none"
          >
            <option value="">All Locations</option>
            {uniqueLocations.map((loc, i) => (
              <option key={i} value={loc}>
                {loc}
              </option>
            ))}
          </select>
          <CiLocationOn className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none" />
        </div>
      </div>

      {/* Price Range */}
      <div className="p-5 bg-white rounded-md shadow-md border border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-semibold">Price Range</h1>
          <div className="text-sm text-gray-600 bg-gray-100 px-4 py-2 rounded-md">
            ${filters.minPrice} - ${filters.maxPrice}
          </div>
        </div>
        <div className="flex items-end gap-1 h-12 mb-8">
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
        <PriceRangeSlider
          min={0}
          max={1000}
          step={10}
          initialLow={filters.minPrice}
          initialHigh={filters.maxPrice}
          onChange={handlePriceChange}
        />
      </div>
    </div>
  );
};

export default SideFilterBar;

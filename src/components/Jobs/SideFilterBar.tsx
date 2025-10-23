import { CiLocationOn } from "react-icons/ci";
import { MdOutlineKeyboardArrowDown, MdOutlineKeyboardArrowUp } from "react-icons/md";
import PriceRangeSlider from './PriceRangeSlider';
import { useState } from "react";

const SideFilterBar = () => {
  const categories = [
    "All Categories",
    "Cleaning Services",
    "Business Services",
    "Gardening",
    "Carpentry",
  ];
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div className="space-y-6">
      <div className="p-5 bg-white rounded-md shadow-md border border-gray-200">
        <h1 className="text-start text-xl font-semibold mb-6">Keyword</h1>
        <input
          type="text"
          placeholder="Search Here"
          className="w-full text-md border border-gray-300 rounded-md px-3 py-2 mt-2 focus:outline-none"
        />
      </div>
      <div className="p-5 bg-white rounded-md shadow-md border border-gray-200 hover:shadow-lg transition-all duration-300">
      {/* Header */}
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

      {/* Category List */}
      <div
        className={`overflow-hidden transition-all duration-500 ${
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="space-y-3 mt-2 flex flex-col justify-start items-start">
          {categories.map((category, index) => (
            <label
              key={index}
              className="flex items-center gap-3 text-gray-700 hover:bg-gray-50 rounded-md px-2 py-1 w-full cursor-pointer transition-all duration-200"
            >
              <input
                type="checkbox"
                className="w-4 h-4 accent-blue-500 cursor-pointer"
              />
              <span className="text-sm md:text-base">{category}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
      <div className="p-5 bg-white rounded-md shadow-md border border-gray-200">
        <h1 className="text-start text-xl font-semibold mb-6">
          Sub Categories
        </h1>
        <div className="relative">
          <select className="w-full text-md  border border-gray-300 rounded-md px-3 py-2 pr-10 focus:outline-none appearance-none">
            <option value="">All Sub Categories</option>
            <option value="sub1">Sub Category 1</option>
          </select>
          <MdOutlineKeyboardArrowDown className="absolute right-3 top-1/2 transform -translate-y-1/2  pointer-events-none" />
        </div>
      </div>
      <div className="p-5 bg-white rounded-md shadow-md border border-gray-200">
        <h1 className="text-start text-xl font-semibold mb-6">Location</h1>
        <div className="relative">
          <select className="w-full text-md  border border-gray-300 rounded-md px-3 py-2 pr-10 focus:outline-none appearance-none">
            <option value="">Select Location</option>
            <option value="sub1">Location 1</option>
          </select>
          <CiLocationOn className="absolute right-3 top-1/2 transform -translate-y-1/2  pointer-events-none" />
        </div>
      </div>
      <div className="p-5 bg-white rounded-md shadow-md border border-gray-200">
        <div className="flex items-start justify-between mb-4">
          <h1 className="text-start text-xl font-semibold">Price Range</h1>
          <div className="text-sm text-gray-600 bg-gray-100 px-4 py-2 rounded-md">Price : $<span className="price-current">55.00</span></div>
        </div>

        {/* Histogram */}
        <div className="w-full mb-4">
          <div className="flex items-end gap-1 h-12">
            {/* placeholder histogram bars - prettier if values come from props */}
            {Array.from({ length: 40 }).map((_, i) => {
              const height = 6 + Math.round(18 * Math.abs(Math.sin(i / 3)));
              const activeColor = i >= 10 && i <= 30 ? '#FF7346' : '#FFD9CF';
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

        {/* Slider */}
        <PriceRangeSlider min={0} max={1000} step={1} initialLow={50} initialHigh={500} />
      </div>
      <button className="w-full px-5 py-4 mt-4 text-white bg-primary rounded-md text-lg">Filter Search</button>
    </div>
  );
};

export default SideFilterBar;


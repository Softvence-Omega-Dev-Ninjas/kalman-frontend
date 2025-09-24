import { CiLocationOn } from "react-icons/ci";
import { MdOutlineKeyboardArrowDown, MdOutlineStar, MdOutlineStarBorder } from "react-icons/md";
import { reviewFilter } from "../../assets/DummyData/DummyData";

const SideFilterForService = () => {
  const categories = [
    "All Categories",
    "Cleaning Services",
    "Business Services",
    "Gardening",
    "Carpentry",
  ];
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
      <div className="p-5 bg-white rounded-md shadow-md border border-gray-200">
        <div className="flex items-center justify-between gap-5 mb-6">
          <h1 className="text-xl font-semibold ">Categories</h1>
          <MdOutlineKeyboardArrowDown className="text-2xl" />
        </div>
        <div className="space-y-3 flex flex-col justify-start items-start">
          {categories.map((category, index) => (
            <div key={index} className="flex justify-start items-center gap-2">
              <input
                type="checkbox"
                className="w-8 text-lg border border-gray-300 rounded-md  focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <label htmlFor="" className="text-sm ">
                {category}
              </label>
            </div>
          ))}
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
        <div className="flex items-center justify-start gap-5 mb-6">
          <h1 className="text-xl font-semibold ">By Rating</h1>
        </div>
        <div className="space-y-3 flex flex-col justify-start items-start">
          {reviewFilter.map((review, index) => (
            <div key={index} className="flex justify-start items-center gap-3 w-full">
              <input
                type="checkbox"
                className="w-4 h-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <div className="flex items-center gap-1">
                {/* Render filled stars */}
                {[...Array(review.filled_stars)].map((_, starIndex) => (
                  <MdOutlineStar key={`filled-${starIndex}`} className="text-yellow-400 text-lg" />
                ))}
                {/* Render empty stars */}
                {[...Array(review.empty_stars)].map((_, starIndex) => (
                  <MdOutlineStarBorder key={`empty-${starIndex}`} className="text-gray-300 text-lg" />
                ))}
              </div>
              <span className="text-sm text-gray-500 ml-auto">({review.count.toString().padStart(2, '0')})</span>
            </div>
          ))}
        </div>
      </div>
      <button className="w-full px-5 py-4 mt-4 text-white bg-primary rounded-md text-lg">Filter Search</button>
    </div>
  );
};

export default SideFilterForService;

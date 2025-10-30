import { useEffect, useState } from "react";
import { useGetCategoriesHQuery } from "@/redux/features/admin/categoryApi";
import { FaAngleRight } from "react-icons/fa";

interface TCategory {
  id: string;
  name: string;
  image: string;
  subCategories?: string[];
}

const PopularServicesCategory = () => {
  const { data, isLoading, error , refetch } = useGetCategoriesHQuery();
  const [showAll, setShowAll] = useState(false);
  useEffect(()=>{
    refetch()
  }, [])
const showSize = 8
  const categories: TCategory[] = data?.data?.result || [];
  const visibleCategories = showAll ? categories : categories.slice(0, showSize);

  if (error)
    return (
      <p className="text-center text-red-500">Failed to load categories.</p>
    );

  return (
    <div className="text-center bg-[#F2F4F8] py-20">
      <h1 className="font-semibold text-4xl">Popular Service Categories</h1>
      <p className="text-2xl text-[#595959] my-5">
        Find trusted professionals for every job, big or small
      </p>

      {isLoading ? (
        <p className="text-gray-500 mt-10">Loading categories...</p>
      ) : categories.length === 0 ? (
        <p className="text-gray-500 mt-10">No categories found.</p>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mt-10 max-w-[1580px] mx-auto px-5">
            {visibleCategories.map((category) => (
              <div
                key={category.id}
                className="flex bg-white items-center justify-between shadow-md p-5 rounded-md hover:shadow-lg transition-all duration-200"
              >
                <div className="flex items-center gap-3 px-3">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div className="text-left space-y-1">
                    <h1 className="font-semibold text-lg">{category.name}</h1>
                    <p className="text-sm text-gray-500 truncate w-[180px]">
                      {category.subCategories?.join(", ") || "No tags"}
                    </p>
                  </div>
                </div>
                <button className="text-primary hover:text-blue-600 transition-colors duration-200">
                  <FaAngleRight className="text-2xl" />
                </button>
              </div>
            ))}
          </div>

          {/*  Toggle Button */}
          {categories.length > showSize && (
            <div>
              <button
                onClick={() => setShowAll((prev) => !prev)}
                className="text-white cursor-pointer bg-primary px-5 py-3 mt-10 rounded-md font-semibold hover:bg-primary/90 transition-all"
              >
                {showAll ? "See Less" : "See All Categories"}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default PopularServicesCategory;

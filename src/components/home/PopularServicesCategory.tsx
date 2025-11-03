import { useEffect, useState } from "react";
import { useGetCategoriesHQuery } from "@/redux/features/admin/categoryApi";
import { FaAngleRight } from "react-icons/fa";
import { Link } from "react-router-dom";

interface TCategory {
  id: string;
  name: string;
  image: string;
  subCategories?: string[];
}

const PopularServicesCategory = () => {
  const { data, isLoading, error, refetch } = useGetCategoriesHQuery();
  const [showAll, setShowAll] = useState(false);
console.log(data)
  useEffect(() => {
    refetch();
  }, [refetch]);

  const showSize = 8;
  const categories: TCategory[] = data?.data?.result || [];
  const visibleCategories = showAll ? categories : categories.slice(0, showSize);

  if (error)
    return <p className="text-center text-red-500">Failed to load categories.</p>;

  return (
    <div className="text-center bg-[#F2F4F8] py-14 sm:py-20 px-4">
      <h1 className="font-semibold text-2xl sm:text-3xl md:text-4xl">
        Popular Service Categories
      </h1>
      <p className="text-lg sm:text-xl md:text-2xl text-[#595959] my-4 sm:my-5">
        Find trusted professionals for every job, big or small
      </p>

      {isLoading ? (
        <p className="text-gray-500 mt-10">Loading categories...</p>
      ) : categories.length === 0 ? (
        <p className="text-gray-500 mt-10">No categories found.</p>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mt-10 max-w-[1580px] mx-auto">
            {visibleCategories.map((category) => (
              <Link
                to={`/jobs?category=${category.id}`}
                key={category.id}
                className="flex bg-white items-center justify-between shadow-md p-5 rounded-md hover:shadow-lg transition-all duration-200"
              >
                <div className="flex items-center gap-4 sm:gap-5 px-2 sm:px-3 min-h-[90px] sm:min-h-[100px]">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-10 h-10 sm:w-12 sm:h-12 object-cover"
                  />
                  <div className="text-left space-y-1">
                    <h1 className="font-semibold text-base sm:text-lg">
                      {category.name}
                    </h1>
                    <p className="text-xs sm:text-sm text-gray-500 w-[160px] sm:w-[180px]">
                      {category.subCategories?.slice(0, 2).join(", ") + " and more" || "No tags"}
                    </p>
                  </div>
                </div>
                <button className="text-primary cursor-pointer hover:text-orange-500 transition-colors duration-200">
                  <FaAngleRight className="text-xl sm:text-2xl" />
                </button>
              </Link>
            ))}
          </div>

          {categories.length > showSize && (
            <div className="mt-10">
              <button
                onClick={() => setShowAll((prev) => !prev)}
                className="text-white cursor-pointer bg-primary px-6 py-3 rounded-md font-semibold hover:bg-primary/90 transition-all text-sm sm:text-base"
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

// components/Jobs/Jobs.tsx
import { useEffect, useState } from "react";
import SideFilterBar from "@/components/Jobs/SideFilterBar";
import JobResults from "@/components/Jobs/JobCard";
import { useGetJobsQuery } from "@/redux/features/jobs/jobsApi";
import type { FilterState } from "@/types/job";
import { IoMdOptions } from "react-icons/io";

const Jobs = () => {
      useEffect(()=>{
      document.title = `Jobs | ${import.meta.env.VITE_APP_NAME}`
    }, [])
  

  const [filters, setFilters] = useState<FilterState>({
    search: "",
    category: [],
    subCategory: "",
    location: "",
    minPrice: 0,
    maxPrice: 1000,
    page: 1,
    limit: 10,
    sortBy: "relevant",
  });

  const { data: jobData, isLoading, refetch } = useGetJobsQuery(filters);
  const jobs = jobData?.data?.data || [];
  const totalPages = jobData?.data?.meta?.totalPages || 1;
  const totalJobs = jobData?.data?.meta?.total || 0;

  useEffect(() => {
    refetch();
  }, []);

  const handlePageChange = (page: number) => {
    setFilters((prev) => ({ ...prev, page }));
  };

  // const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
  //   setFilters((prev) => ({
  //     ...prev,
  //     sortBy: e.target.value as any,
  //     page: 1,
  //   }));
  // };

  return (
    <div className="min-h-screen bg-[#F2F4F8] py-10 px-4 mt-8">
      <div className="max-w-7xl mx-auto">
        {/* Sorting Header */}
        <div className="r pt-6 mb-2">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex items-center gap-3 mb-4 text-2xl">
                <IoMdOptions />
                <span className=" font-semibold">Filter By</span>
              </div>
            <div>
              <h2 className="md:text-2xl lg:relative right-36 font-medium text-gray-900">
                Available Jobs ({totalJobs})
              </h2>
            </div>
            <div className="flex items-center space-x-4">
              {/* <div className="text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-md">
                Page {filters.page} of {totalPages}
              </div> */}
              {/* <div className="text-sm text-gray-600 flex items-center space-x-2">
                <span>Sort by:</span>
                <select
                  value={filters.sortBy}
                  onChange={handleSortChange}
                  className="font-semibold text-gray-900 border border-gray-300 rounded-md px-3 py-1 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 cursor-pointer"
                >
                  <option value="relevant">Most Relevant</option>
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                  <option value="priceHigh">Price: High to Low</option>
                  <option value="priceLow">Price: Low to High</option>
                </select>
              </div> */}
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar (20%) */}
          <div className="w-full lg:w-2/6">
            <SideFilterBar filters={filters} setFilters={setFilters} />
          </div>

          {/* Job Results (80%) */}
          <div className="w-full lg:w-4/5">
            <JobResults
              jobs={jobs}
              isLoading={isLoading}
              currentPage={filters.page}
              totalPages={totalPages}
              totalJobs={totalJobs}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Jobs;

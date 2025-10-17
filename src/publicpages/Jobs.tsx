import { MdDoubleArrow } from "react-icons/md";
import AllJobs from "../components/Jobs/AllJobs";
import SideFilterBar from "../components/Jobs/SideFilterBar";
import { IoMdOptions } from "react-icons/io";
import { useJobs } from "@/redux/features/jobs/hooks/useJobs";

function Jobs() {
  const { jobs, isLoading, page, setPage, totalPages , total} = useJobs();
  console.log(jobs);

  return (
    <div>
      {/* Header */}
      <div className="bg-[#0D1B2A] py-20 flex flex-col items-center justify-center gap-5">
        <h1 className="text-3xl font-semibold text-white">Find Jobs</h1>
        <span className="flex items-center gap-3 font-semibold">
          <p className="text-white">Home</p>
          <MdDoubleArrow className="text-xl text-primary" />
          <p className="text-primary inline-block">Jobs</p>
        </span>
      </div>

      {/* Main Section */}
      <div className="max-w-[1550px] mx-auto px-4 md:px-10 py-5">
        <div className="flex items-start gap-5 mt-6">
          {/* Sidebar */}
           <div className="w-1/4 hidden lg:block">
              <div className="sticky top-24">
                <div className="flex items-center gap-3 mb-5 text-2xl">
                  <IoMdOptions />
                  <span className="font-semibold">Filter By</span>
                </div>
                <SideFilterBar />
               </div>
            </div>

          {/* Job List */}
          <div className="w-full lg:w-3/4">
            <div className="flex items-center justify-between mb-5">
              <h1 className="text-lg text-primary-txt font-semibold">
                Available Jobs ({total})
              </h1>

              {/* ✅ Single valid select */}
              <select className="border border-secondary rounded-md px-3 py-2 focus:outline-none">
                <option value="relevance">Sort by: My Qualification</option>
                <option value="date">Sort by Date</option>
                <option value="rate-asc">Sort by Rate (Low → High)</option>
                <option value="rate-desc">Sort by Rate (High → Low)</option>
              </select>
            </div>

            <AllJobs
              jobs={jobs}
              isLoading={isLoading}
              page={page}
              setPage={setPage}
              totalPages={totalPages}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Jobs;

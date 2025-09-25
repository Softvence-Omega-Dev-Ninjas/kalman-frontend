import { MdDoubleArrow } from "react-icons/md";
import AllJobs from "../components/Jobs/AllJobs";
import SideFilterBar from "../components/Jobs/SideFilterBar";
import { IoMdOptions } from "react-icons/io";

function Jobs() {
  return (
    <div>
      <div className="bg-[#0D1B2A] py-20 flex flex-col items-center justify-center gap-5">
        <h1 className="text-3xl font-semibold text-white">Find Jobs</h1>
        <span className="flex items-center gap-3 font-semibold">
          <p className="text-white"> Home</p>
          <MdDoubleArrow className="text-xl text-primary" />
          <p className="text-primary inline-block">Jobs</p>
        </span>
      </div>
      <div className="max-w-[1550px] mx-auto px-4 md:px-10 py-5">
        <div className="flex items-start gap-5 mt-6">
          <div className="w-1/4 hidden lg:block">
          <div className="flex items-center gap-3 mb-5 text-2xl">
            <IoMdOptions />
            <span className=" font-semibold">Filter By</span>
          </div>
            <SideFilterBar />
          </div>
          <div className="w-full lg:w-3/4">
            <div className="flex items-center justify-between mb-5">
              <h1 className="text-lg text-primary-txt font-semibold">
                Available Jobs (35)
              </h1>
              <select className="border border-secondary rounded-md px-3 py-2 focus:outline-none">
                <option value="relevance"><span className="font-semibold">Sort by:</span> My Qualification</option>
                <option value="date">Sort by </option>
                <option value="rate-asc">Sort by </option>
                <option value="rate-desc">Sort by </option>
              </select>
            </div>
            <AllJobs />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Jobs;

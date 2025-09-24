import { jobs } from "../../assets/DummyData/DummyData";

import {
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";
import { BsThreeDots } from "react-icons/bs";
import JobCard from "./JobCard";

const AllJobs = () => {
  return (
    <div className="space-y-5">
      {jobs.map((job, index) => (
        <JobCard key={index} data={job} />
      ))}

      <div className="flex items-center justify-center gap-5 mt-10">
        <button className="p-2 rounded-md bg-primary text-white">
          <MdOutlineKeyboardArrowLeft className="text-2xl" />
        </button>
        <button className="p-2 rounded-md bg-white border border-gray-100 px-4">
          1
        </button>
        <button className="p-2 rounded-md bg-white border border-gray-100 px-4">
          2
        </button>
        <button className="p-2 rounded-md bg-white border border-gray-100 px-4">
          3
        </button>
        <BsThreeDots className="text-2xl" />
        <button className="p-2 rounded-md bg-white border border-gray-100 px-4">
          11
        </button>
        <button className="p-2 rounded-md bg-white border border-gray-100 px-4">
          12
        </button>
        <button className="p-2 rounded-md bg-primary text-white">
          <MdOutlineKeyboardArrowRight className="text-2xl" />
        </button>
      </div>
    </div>
  );
};

export default AllJobs;

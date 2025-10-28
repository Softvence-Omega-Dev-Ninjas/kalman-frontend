import { useState } from "react";
import {
  Clock,
  TrendingUp,
  ChevronDown,
} from "lucide-react";
import { Link } from "react-router-dom";
import { FiCalendar, FiClock, FiMapPin } from "react-icons/fi";
import { useGetUserJobsQuery } from "@/redux/features/jobs/jobsApi";
import type { Job, UserJobsResponse } from "./UserJobs";

const UserOverview = () => {
  const [selectedMonth, setSelectedMonth] = useState("Month");
const [viewAll , setViewAll] = useState(false)
const { data} = useGetUserJobsQuery();

  const jobs: Job[] = (data as UserJobsResponse)?.data || [];

const shortlist = viewAll ? jobs : jobs.slice(0, 2)
  const HandleViewAll = ()=> {
    setViewAll((prev)=>!prev)

  }
  return (
    <div className="min-h-screen p-4 md:p-6">
      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent shortlist - Left Column */}
        <div className="lg:col-span-2">
          <div className=" rounded-lg shadow-sm border border-gray-200 p-3 bg-gray-100">
            <div className="flex items-center gap-2 mb-6">
              <Clock className="w-5 h-5 text-gray-600" />
              <h2 className="text-lg font-semibold text-gray-900">
                Recent shortlist
              </h2>
            </div>

            <div className="space-y-4">
                    {shortlist.map((job) => (
                      <div
                        key={job.id}
                        className="flex flex-col sm:flex-row sm:items-center justify-between border rounded-lg bg-white p-4"
                      >
                        <div>
                          <h3 className="font-semibold text-gray-800">{job.title}</h3>
                          <div className="flex flex-wrap gap-4 mt-2 text-sm text-gray-600">
                            <div className="flex items-center gap-1">
                              <FiCalendar /> {job.preferred_date || "N/A"}
                            </div>
                            <div className="flex items-center gap-1">
                              <FiMapPin /> {job.location}
                            </div>
                            <div className="flex items-center gap-1">
                              <FiClock /> {job.timeline || "N/A"}
                            </div>
                          </div>
                        </div>
            
                        <div className="mt-3 sm:mt-0 flex flex-col items-end">
                          <p className="text-gray-800 font-medium">
                            ${job.price.toLocaleString()}
                          </p>
                          <Link className=" cursor-pointer" to={`/user-dashboard/my-jobs/${job.id}`}>
                            <button className="mt-2 bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium px-5 py-2 rounded-md transition cursor-pointer">
                              View
                            </button>
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>

            <div className="mt-3 text-center">
              <button onClick={HandleViewAll} className="text-gray-600 cursor-pointer hover:text-gray-800 font-medium text-sm bg-white p-3 rounded-lg border-gray-200 border-1 w-full">
               {viewAll? "View Less Jobs": "View All Jobs"}  
              </button>
            </div>
          </div>
        </div>

        {/* Activity - Right Column */}
        <div className="space-y-6">
          {/* Activity Stats */}
          <div className="border-gray-200 p-3 bg-gray-100 rounded-lg shadow-sm border">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-gray-600" />
                <h2 className="text-lg font-semibold text-gray-900">
                  Activity
                </h2>
              </div>
            </div>

            <div className="mb-4 bg-white p-3 rounded-lg border-gray-200 border-1">
              <div className="flex items-center justify-between mb-2 ">
                <span className="text-md font-semibold text-gray-600">
                  This Months
                </span>
                <div className="relative">
                  <select
                    value={selectedMonth}
                    onChange={(e) => setSelectedMonth(e.target.value)}
                    className="appearance-none border border-gray-200 rounded-md px-3 py-1 text-sm text-gray-700 pr-8 focus:outline-none focus:border-orange-500 bg-gray-100 font-semibold"
                  >
                    <option>Month</option>
                    <option>January</option>
                    <option>February</option>
                    <option>March</option>
                  </select>
                  <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">2</div>
                  <div className="text-sm text-gray-600">Completed</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">3</div>
                  <div className="text-sm text-gray-600">Shortlisted</div>
                </div>
              </div>
            </div>
          </div>

          {/* MY Shortlist */}
          <div className=" border-gray-200 p-3 bg-gray-100 rounded-lg shadow-sm border">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">
              Quick Action
            </h2>

            <div className="flex flex-col space-y-4">
              <Link
                to="/post-a-job"
                className="bg-white p-3 rounded-lg border-gray-200 border"
              >
                Post a Job
              </Link>
              <Link to="/services" className="bg-white p-3 rounded-lg border-gray-200 border">
                Find Tradespeople
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserOverview;

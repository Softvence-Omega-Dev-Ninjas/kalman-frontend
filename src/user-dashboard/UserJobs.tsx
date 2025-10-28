import { useGetUserJobsQuery } from "@/redux/features/jobs/jobsApi";
import { BriefcaseBusiness } from "lucide-react";
import { FiMapPin, FiClock, FiEdit, FiCalendar } from "react-icons/fi";
import { Link } from "react-router-dom";


export interface Job {
  id: string;
  title: string;
  description: string;
  location: string;
  timeline: string;
  preferred_date: string | null;
  preferred_time: string | null;
  image: string[];
  contact_method: string;
  shortlist_fee: number;
  createdAt: string;
  updatedAt: string;
  userId: string;
  skills_needed: any[]; 
  price: number;
  customerStatus: string;
  isComplete: boolean;
  categoryId: string;
  subCategories: any[];
}

export interface UserJobsResponse {
  statusCode: number;
  success: boolean;
  message: string;
  data: Job[];
}



const UserJobs = () => {
  const { data, isLoading, isError } = useGetUserJobsQuery();

  const jobs: Job[] = (data as UserJobsResponse)?.data || [];
console.log(jobs)
  if (isLoading)
    return (
      <p className="text-center text-gray-600 py-12 text-lg font-medium">
        Loading your jobs...
      </p>
    );

  if (isError)
    return (
      <p className="text-center text-red-500 py-12 text-lg font-medium">
        Failed to load jobs.
      </p>
    );

  return (
    <section className="bg-[#F8F9FA] border rounded-lg shadow-sm p-6 max-w-5xl mx-auto my-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div className="flex items-center gap-2">
          <BriefcaseBusiness className="text-xl text-gray-700" />
          <h2 className="text-lg font-semibold text-gray-800">My Jobs</h2>
        </div>
        <Link className=" cursor-pointer"  to={"/post-a-job"}>
         <button className="flex items-center cursor-pointer gap-2 bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium px-4 py-2 rounded-md transition">
          <FiEdit />
          Post a new Job
        </button>
        </Link>
       
      </div>

      {/* Job List */}
      <div className="space-y-4">
        {jobs.map((job) => (
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
    </section>
  );
};

export default UserJobs;

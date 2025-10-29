import { Clock, Calendar, MapPin, Clock3 } from "lucide-react";

type JobItem = {
  id?: string;
  time?: string;
  messgae?: string;
  user?: {
    name?: string;
    profile_image?: string;
  };
  jobs?: {
    title?: string;
    preferred_date?: string;
    location?: string;
    preferred_time?: string;
  };
};

interface RecentShortlistProps {
  recentJobs?: JobItem[];
}

const RecentShortlist: React.FC<RecentShortlistProps> = ({ recentJobs }) => {
  console.log("Recent Jobs Data:", recentJobs);
  return (
    <div className=" rounded-lg shadow-sm border border-gray-200 p-3 bg-gray-100">
      <div className="flex items-center gap-2 mb-6">
        <Clock className="w-5 h-5 text-gray-600" />
        <h2 className="text-lg font-semibold text-gray-900">
          Recent shortlist
        </h2>
      </div>
      {recentJobs && recentJobs.length > 0 ? (
        <div>
          <div className="space-y-2">
            {recentJobs?.slice(0, 5).map((job, index) => (
              <div
                key={index}
                className={`${
                  index !== recentJobs.length - 1 ? " border-gray-100 pb-4" : ""
                } mb-2 bg-white p-3 rounded-lg border-gray-200 border-1`}
              >
                <h3 className="text-base font-medium text-gray-900 mb-3">
                  {job?.jobs?.title}
                </h3>
                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>{job.jobs?.preferred_date?.split("T")[0]}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    <span>{job?.jobs?.location}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock3 className="w-4 h-4" />
                    <span>{job.jobs?.preferred_time}</span>
                  </div>
                  <div className="ml-auto">
                    <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors">
                      View
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-3 text-center">
            <button className="text-gray-600 hover:bg-orange-500 hover:text-white  font-medium text-sm bg-white p-3 rounded-lg border-gray-200 border-1 w-full">
              View All Jobs
            </button>
          </div>
        </div>
      ) : (
        <p className="text-gray-600">No ShortList found.</p>
      )}
    </div>
  );
};

export default RecentShortlist;

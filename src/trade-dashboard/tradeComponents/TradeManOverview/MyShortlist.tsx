import { Calendar, MapPin } from "lucide-react";

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

interface MyShortlistProps {
  recentJobs?: JobItem[];
}

const MyShortlist: React.FC<MyShortlistProps> = ({ recentJobs }) => {
  return (
    <div className=" border-gray-200 p-3 bg-gray-100 rounded-lg shadow-sm border">
      <h2 className="text-lg font-semibold text-gray-900 mb-6">MY Shortlist</h2>

      {recentJobs && recentJobs.length > 0 ? (
        <div>
          <div className="space-y-6">
            {recentJobs?.slice(0, 3).map((item, index) => (
              <div
                key={index}
                className="bg-white p-3 rounded-lg border-gray-200 border-1"
              >
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-base font-medium text-gray-900">
                    {item.jobs?.title}
                  </h3>
                  <span className="text-xs text-gray-500">{item.time}</span>
                </div>

                <div className="flex items-start gap-3">
                  <img
                    alt={item?.user?.name}
                    src={
                      item?.user?.profile_image
                        ? item?.user?.profile_image
                        : "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face&auto=format"
                    }
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-gray-900 mb-1">
                      {item?.user?.name}
                    </h4>
                    <div className="flex flex-wrap items-center gap-3 text-xs text-gray-600 mb-2">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-orange-500" />
                        <span className="text-orange-500">
                          {item?.jobs?.location}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-orange-500" />
                        <span className="text-orange-500">
                          {item?.jobs?.preferred_date?.split("T")[0]}
                        </span>
                      </div>
                    </div>
                    <p className="text-xs line-clamp-2 text-gray-600 leading-relaxed">
                      {item?.messgae}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-3 text-center bg-white p-3 rounded-lg border-gray-200 border-1">
            <button className="text-orange-500 hover:text-orange-600 font-medium text-sm">
              View All Shortlist
            </button>
          </div>
        </div>
      ) : (
        <p className="text-gray-600">No Shortlist found.</p>
      )}
    </div>
  );
};

export default MyShortlist;

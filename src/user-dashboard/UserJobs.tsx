import { BriefcaseBusiness } from "lucide-react";
import { FiCalendar, FiMapPin, FiClock, FiEdit } from "react-icons/fi";
import { Link } from "react-router-dom";

const UserJobs = () => {
  const jobs = [
    {
      id: 1,
      title: "Emergency Boiler Repair",
      date: "24/01/2024",
      location: "Select Location",
      time: "ASAP",
    },
    {
      id: 2,
      title: "Kitchen Cabinet Installation",
      date: "24/01/2024",
      location: "Select Location",
      time: "Flexible",
    },
  ];

  return (
    <section className="bg-[#F8F9FA] border rounded-lg shadow-sm p-6 max-w-5xl mx-auto my-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div className="flex items-center gap-2">
          <BriefcaseBusiness className="text-xl text-gray-700" />
          <h2 className="text-lg font-semibold text-gray-800">My Jobs</h2>
        </div>
        <button className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium px-4 py-2 rounded-md transition">
          <FiEdit />
          Post a new Job
        </button>
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col md:flex-row gap-3 mb-6">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search jobs.."
            className="w-full border rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>
        <div>
          <select className="w-full md:w-48 border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500">
            <option>All Categories</option>
            <option>Plumbing</option>
            <option>Electrical</option>
            <option>Construction</option>
          </select>
        </div>
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
                  <FiCalendar /> {job.date}
                </div>
                <div className="flex items-center gap-1">
                  <FiMapPin /> {job.location}
                </div>
                <div className="flex items-center gap-1">
                  <FiClock /> {job.time}
                </div>
              </div>
            </div>
           <Link to={`/user-dashboard/my-jobs/${job.id}`}>
            <div className="mt-3 sm:mt-0">
              <button className="bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium px-5 py-2 rounded-md transition">
                View
              </button>
            </div>
           </Link>
          </div>
        ))}
      </div>
    </section>
  );
};

export default UserJobs;

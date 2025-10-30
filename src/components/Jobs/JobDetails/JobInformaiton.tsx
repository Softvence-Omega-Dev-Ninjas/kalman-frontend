/* eslint-disable @typescript-eslint/no-explicit-any */

import { LuCalendarDays } from "react-icons/lu";
import { WiTime4 } from "react-icons/wi";
import { CiLocationOn } from "react-icons/ci";

const JobInformation = ({ job }: { job: any }) => {
  const formattedDate = job?.updatedAt
    ? new Date(job.updatedAt).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : "N/A";

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-6 mb-5 bg-white p-5 rounded-md shadow-md">
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-semibold">{job?.title}</h1>
            {/* {job.tag === "Urgent" && (
              <span className="px-3 py-1 text-sm rounded-md bg-red-100 text-red-500">
                {job?.tag}
              </span>
            )} */}
          </div>
          <div className="flex items-center gap-3 text-secondary">
            <div className="flex items-center gap-2">
              <LuCalendarDays />
              <p>{formattedDate}</p>
            </div>
            <div className="flex items-center gap-2 capitalize">
              <CiLocationOn className="text-lg" />
              <p>{job?.location}</p>
            </div>
            <div className="flex items-center gap-2">
              <WiTime4 className="text-lg" />
              <p className="capitalize">{job?.timeline}</p>
            </div>
          </div>
        </div>
        <div className="text-secondary space-y-3">
          <h1 className="text-2xl font-semibold">{job?.budge_type}</h1>
          {/* <p className="text-lg">Hourly Budget</p> */}
        </div>
      </div>
      <div className="bg-white space-y-10 p-5 rounded-md shadow-md">
        <div>
          <h1 className="text-2xl font-semibold mb-3">Job Description</h1>
          <p className="text-secondary text-sm">{job?.description}</p>
        </div>
        <div>
          <h1 className="text-xl font-semibold mb-3">Timeline</h1>
          <p className="text-secondary">Today if possible</p>
        </div>
        <div>
          <h1 className="text-xl font-semibold mb-3">Skill Needed</h1>
          <div className="flex items-center gap-3 flex-wrap">
            {/* <span className="bg-gray-100 text-secondary px-3 py-2 text-sm rounded-md">
              Heating
            </span>
            <span className="bg-gray-100 text-secondary px-3 py-2 text-sm rounded-md">
              Gas Safety
            </span>
            <span className="bg-gray-100 text-secondary px-3 py-2 text-sm rounded-md">
              Boiler Repair
            </span> */}
            {job?.skills_needed && job.skills_needed.length > 0 ? (
              job.skills_needed.map((skill: string, index: number) => (
                <span
                  key={index}
                  className="bg-gray-100 text-secondary px-3 py-2 text-sm rounded-md"
                >
                  {skill}
                </span>
              ))
            ) : (
              <span className="text-gray-500 text-sm">No skills specified</span>
            )}
          </div>
        </div>
        <div>
          {/* Activity on this lead - pixel-accurate card */}
          <div className="bg-[#F5F7FA] rounded-lg p-6">
            <h2 className="text-lg font-semibold mb-4">
              Activity on this lead
            </h2>
            <div className="grid grid-cols-2 gap-6 items-center">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">
                  {job?.jobActivity?.total_interested}
                </div>
                <div className="font-semibold mt-1">Interested</div>

                <div className="text-sm text-secondary mt-2">
                  Tradespeople who want this job
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">
                  {job?.jobActivity?.shortlisted}
                </div>
                <div className="font-semibold mt-1">Shortlisted</div>
                <div className="text-sm text-secondary mt-2">
                  Tradespeople who received the customer info
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white p-5 rounded-md shadow-md">
        <h1 className="text-2xl font-semibold mb-5">Photos</h1>
        {job?.image && job.image.length > 0 ? (
          <div className="flex flex-wrap gap-4">
            {job.image.map((img: string, index: number) => (
              <img
                key={index}
                src={img}
                alt={`Job Image ${index + 1}`}
                className="w-40 h-40 object-cover rounded-md shadow-sm"
              />
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No photos available</p>
        )}
      </div>
    </div>
  );
};

export default JobInformation;

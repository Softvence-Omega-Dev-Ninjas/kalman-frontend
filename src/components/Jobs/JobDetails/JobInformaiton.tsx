/* eslint-disable @typescript-eslint/no-explicit-any */

import { LuCalendarDays } from "react-icons/lu";
import { WiTime4 } from "react-icons/wi";
import photos from "../../../assets/DummyData/details.png"
const JobInformation = ({ job }: { job: any }) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-6 mb-5 bg-white p-5 rounded-md shadow-md">
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-semibold">{job?.title}</h1>
            {job.tag === "Urgent" && (
              <span className="px-3 py-1 text-sm rounded-md bg-red-100 text-red-500">
                {job?.tag}
              </span>
            )}
          </div>
          <div className="flex items-center gap-3 text-secondary">
            <div className="flex items-center gap-2">
              <LuCalendarDays />
              <p>{job?.date}</p>
            </div>
            <div className="flex items-center gap-2">
              <WiTime4 className="text-lg" />
              <p>{job?.start}</p>
            </div>
          </div>
        </div>
        <div className="text-secondary space-y-3">
          <h1 className="text-2xl font-semibold">{job?.rate}</h1>
          <p className="text-lg">Hourly Budget</p>
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
            <span className="bg-gray-100 text-secondary px-3 py-2 text-sm rounded-md">
              Heating
            </span>
            <span className="bg-gray-100 text-secondary px-3 py-2 text-sm rounded-md">
              Gas Safety
            </span>
            <span className="bg-gray-100 text-secondary px-3 py-2 text-sm rounded-md">
              Boiler Repair
            </span>
          </div>
        </div>
        <div>
            {/* Activity on this lead - pixel-accurate card */}
            <div className="bg-[#F5F7FA] rounded-lg p-6">
              <h2 className="text-lg font-semibold mb-4">Activity on this lead</h2>
              <div className="grid grid-cols-2 gap-6 items-center">
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#FF7346]">4</div>
                  <div className="font-semibold mt-1">Interested</div>
                  <div className="text-sm text-secondary mt-2">Tradespeople who want this job</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#FF7346]">0</div>
                  <div className="font-semibold mt-1">Shortlisted</div>
                  <div className="text-sm text-secondary mt-2">Tradespeople who received the customer info</div>
                </div>
              </div>
            </div>
        </div>
      </div>
      <div className="bg-white  p-5 rounded-md shadow-md">
        <h1 className="text-2xl font-semibold mb-10">Photos</h1>
        <img src={photos} alt="" width={200} height={200} />
      </div>
    </div>
  );
};

export default JobInformation;

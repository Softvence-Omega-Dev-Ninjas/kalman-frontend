/* eslint-disable @typescript-eslint/no-explicit-any */

import { CiLocationOn } from "react-icons/ci";
import { LuCalendarDays } from "react-icons/lu";
import { WiTime4 } from "react-icons/wi";
import { Link } from "react-router-dom";

const JobCard = ({ data }: { data: any }) => {
  console.log(data);
  return (
    <div className="space-y-5 shadow-md bg-white p-5 border border-gray-100 rounded-lg">
      <div className="flex items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl -txt font-semibold">
              {data.title}
            </h1>
            {data.tag === "Urgent" && (
              <span className="px-2 text-sm py-1 rounded-md bg-red-100 text-red-500">
                {data.tag}
              </span>
            )}
          </div>
          <p className="text-sm text-secondary">{data.description}</p>
        </div>
        <div className=" space-y-3 text-secondary">
          <h1 className="text-2xl font-semibold">{data.rate}</h1>
          <p className="text-lg">Applicants: {data.applicants}</p>
        </div>
      </div>
      <div className="flex items-end justify-between gap-5">
        <div className="flex items-center gap-3">
          <img src={data.image} alt="" width={80} height={80} />
          <div className="space-y-3">
            <h1 className="text-2xl font-semibold -txt">
              {data.name}
            </h1>
            <div className="flex items-center gap-3 text-secondary">
              <div className="flex items-center gap-2">
                <CiLocationOn />
                <p>{data.location}</p>
              </div>
              <div className="flex items-center gap-2">
                <LuCalendarDays />
                <p>{data.date}</p>
              </div>
              <div className="flex items-center gap-2">
                <WiTime4 />
                <p>{data.start}</p>
              </div>
            </div>
          </div>
        </div>
        <Link to={`/jobs/${data.id}`} className="px-5 py-3 rounded-md bg-primary text-white">
          Send Proposal
        </Link>
      </div>
    </div>
  );
};

export default JobCard;

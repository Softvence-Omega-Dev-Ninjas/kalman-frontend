/* eslint-disable @typescript-eslint/no-explicit-any */
import { CiLocationOn } from "react-icons/ci";
import { LuCalendarDays } from "react-icons/lu";
import { WiTime4 } from "react-icons/wi";
import { useNavigate } from "react-router-dom";


const JobCard = ({ data }: { data: any }) => {
  const navigate = useNavigate();
  

  const handleCardClick = () => {
    navigate(`/jobs/${data.id || "1"}`);
  };

  const handleSendProsalClick = () => {
    navigate(`/jobs/${data.id || "1"}`);
  };


  return (
    <>
      <div
        className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 w-full gap-3 hover:shadow-md transition-all cursor-pointer"
        onClick={handleCardClick}
      >
        {/* Top Section */}
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              {data.title || "Untitled Job"}
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              {data.description || "No description provided for this job."}
            </p>
          </div>

          <div className="text-right">
            <div className="text-xs text-gray-500">Budget (fixed)</div>
            <div className="text-[#FF7346] font-semibold text-base">
              ${data.price || 0}
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex items-center justify-between mt-4">
          {/* Left part: Profile + meta */}
          <div className="flex items-center gap-3">
            <img
              src={data.image || "https://i.pravatar.cc/100"}
              alt="User"
              className="w-10 h-10 rounded-full object-cover"
            />
            <div>
              <div className="font-medium text-sm text-gray-900">John Smith</div>
              <div className="flex items-center text-xs text-gray-500 gap-3 mt-1">
                <span className="flex items-center gap-1">
                  <CiLocationOn /> {data.location || "Unknown"}
                </span>
                <span className="flex items-center gap-1">
                  <LuCalendarDays /> 24/01/2024
                </span>
                <span className="flex items-center gap-1">
                  <WiTime4 /> ASAP
                </span>
              </div>
            </div>
          </div>

          {/* Right part: Button + applicants */}
          <div className="flex items-center gap-4">
            <span className="text-xs text-gray-500">Applicants: 2</span>
            <button
              onClick={handleSendProsalClick}
              className="bg-[#FF7346] hover:bg-[#ff5722] text-white text-sm px-4 py-2 rounded-md font-medium"
            >
              Send Proposal
            </button>
          </div>
        </div>
      </div>

    </>
  );
};

export default JobCard;

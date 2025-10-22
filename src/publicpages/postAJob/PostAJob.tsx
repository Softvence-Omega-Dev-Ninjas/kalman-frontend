import { useState } from "react";
import PhaseOne from "./PostAJobComponents/PhaseOne";
import PhaseTwo from "./PostAJobComponents/PhaseTwo";
import PhaseThree from "./PostAJobComponents/PhaseThree";



/* {"title":"Fix Leaky Roof","categoryId":"","description":"Roof repair on a two-story house.","location":"Suburb X","timeline":"3 days","contact_method":"Email","skills_needed":["Roofing","Waterproofing"],"price":150}*/

export interface JobData {
  title: string;
  description: string;
  categoryId: string | null;
  timeline: string;
  date: string;
  time: string;
  location: string;
  contact_method: "phone" | "email" | null;
  images: File[];
}

const PostAJob = () => {
  const [phase, setPhase] = useState(1);
  const [jobData, setJobData] = useState<JobData>({
    title: "",
    description: "",
    categoryId: null,
    timeline: "",
    date: "",
    time: "",
    location: "",
    contact_method: null,
    images: [],
  });

  const progressPercent = () => {
    if (phase === 1) return 20;
    if (phase === 2) return 60;
    return 90;
  };

  return (
    <div>
      {/* Header */}
      <div className="py-6 px-4 fixed top-[10%] left-0 right-0 bg-white shadow-md z-10">
        <div className="max-w-[1180px] mx-auto flex items-center justify-between">
          <div>
            <div className="text-sm font-medium">Budget & Timeline</div>
            <div className="text-xs text-secondary">
              Step {phase} of 3 · Add the finishing touches
            </div>
          </div>
          <button className="text-2xl">✕</button>
        </div>

        <div className="max-w-[1180px] mx-auto mt-4">
          <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
            <div
              className="h-2 rounded-full bg-[#FF7346] transition-all duration-700"
              style={{ width: `${progressPercent()}%` }}
            />
          </div>
        </div>
        <div className="max-w-[1180px] mx-auto mt-2 text-right text-xs text-secondary">
          {progressPercent()}% Complete
        </div>
      </div>

      {/* Phases */}
      <div className="bg-[#eff2f7] min-h-screen pt-[8%] py-10">
        {phase === 1 && (
          <PhaseOne
            phase={phase}
            setPhase={setPhase}
            jobData={jobData}
            setJobData={setJobData}
          />
        )}
        {phase === 2 && (
          <PhaseTwo
            phase={phase}
            setPhase={setPhase}
            jobData={jobData}
            setJobData={setJobData}
          />
        )}
        {phase === 3 && (
          <PhaseThree
            phase={phase}
            setPhase={setPhase}
            jobData={jobData}
            setJobData={setJobData}
          />
        )}
      </div>
    </div>
  );
};

export default PostAJob;

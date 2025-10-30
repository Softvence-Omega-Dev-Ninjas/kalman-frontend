import phaseTwoImg from "../../../assets/sample_images/phase2logo.png";
import flexibleIcon from "../../../assets/sample_images/flexible.png";
import emergencyIcon from "../../../assets/sample_images/emergency.png";
import urgentIcon from "../../../assets/sample_images/urgent.png";
import soonIcon from "../../../assets/sample_images/soon.png";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useState } from "react";
import type { JobData } from "../PostAJob";

const timelineOptions = [
  { id: "flexible", title: "Flexible", subtitle: "within 2 weeks", icon: flexibleIcon },
  { id: "soon", title: "Soon", subtitle: "within 1 week", icon: soonIcon },
  { id: "urgent", title: "Urgent", subtitle: "within 2 days", icon: urgentIcon },
  { id: "emergency", title: "Emergency", subtitle: "ASAP", icon: emergencyIcon },
];

const PhaseTwo = ({
  phase,
  setPhase,
  jobData,
  setJobData,
}: {
  phase: number;
  setPhase: (phase: number) => void;
  jobData: JobData;
  setJobData: React.Dispatch<React.SetStateAction<JobData>>;
}) => {
  const [selected, setSelected] = useState(jobData.timeline);
  const [date, setDate] = useState(jobData.date);
  const [time, setTime] = useState(jobData.time);
  const [skillsInput, setSkillsInput] = useState(jobData.skills_needed?.join(", ") || "");

  const handleNext = () => {
    const skillsArray = skillsInput
      .split(",")
      .map((s) => s.trim())
      .filter((s) => s.length > 0);

    setJobData({ ...jobData, timeline: selected, date, time, skills_needed: skillsArray });
    setPhase(phase + 1);
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-md p-10">
      {/* Header */}
      <div className="flex flex-col items-center mb-8">
        <div className="w-16 h-16 rounded-full bg-[#0B1B26] flex items-center justify-center mb-4">
          <img src={phaseTwoImg} alt="timeline" />
        </div>
        <h1 className="text-lg font-semibold">Timeline</h1>
        <p className="text-sm text-secondary">
          Let tradespeople know when you need it done
        </p>
      </div>

      {/* Body */}
      <div className="space-y-6">
        {/* Timeline selection */}
        <div>
          <label className="block text-sm font-medium mb-3">
            When do you need this done?
          </label>
          <div className="grid grid-cols-2 gap-4">
            {timelineOptions.map((opt) => (
              <button
                key={opt.id}
                onClick={() => setSelected(opt.id)}
                className={`text-left p-4 rounded-lg border ${
                  selected === opt.id ? "border-[#FF7346]" : "border-gray-200"
                } bg-white flex flex-col gap-2 transition`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-md bg-gray-50 flex items-center justify-center">
                    <img src={opt.icon} alt={opt.title} />
                  </div>
                  <div>
                    <div className="font-semibold">{opt.title}</div>
                    <div className="text-xs text-secondary">{opt.subtitle}</div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Skills input */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Skills Needed (comma separated)
          </label>
          <input
            type="text"
            value={skillsInput}
            onChange={(e) => setSkillsInput(e.target.value)}
            placeholder="e.g. Plumbing, Painting, Repair"
            className="w-full bg-gray-50 border border-gray-200 rounded-md px-4 py-3 text-sm focus:outline-none"
          />
        </div>

        {/* Date & Time */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              Preferred Date (Optional)
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 rounded-md px-4 py-3 text-sm focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">
              Preferred Time (Optional)
            </label>
            <select
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 rounded-md px-4 py-3 text-sm focus:outline-none"
            >
              <option>Any time</option>
              <option>Morning</option>
              <option>Afternoon</option>
              <option>Evening</option>
            </select>
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => setPhase(phase - 1)}
            className="px-4 py-2 rounded-md border border-gray-200 flex items-center gap-2 font-semibold cursor-pointer"
          >
            <FaArrowLeft /> <span>Previous</span>
          </button>
          <button
            onClick={handleNext}
            className="px-6 py-2 rounded-md bg-[#FF7346] text-white flex items-center gap-2 font-semibold cursor-pointer"
          >
            <span>Continue</span> <FaArrowRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PhaseTwo;

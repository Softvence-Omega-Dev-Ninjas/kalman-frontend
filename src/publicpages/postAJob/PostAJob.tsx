import { useState } from "react";
import PhaseOne from "./PostAJobComponents/PhaseOne";
import PhaseTwo from "./PostAJobComponents/PhaseTwo";
import PhaseThree from "./PostAJobComponents/PhaseThree";
// import { Cross } from "lucide-react";
import { RxCross2 } from "react-icons/rx";
import { useNavigate } from "react-router-dom";



/* // {"title":"Fix Leaky Roof","categoryId":"","description":"Roof repair on a two-story house.","location":"Suburb X","timeline":"3 days","contact_method":"Email","skills_needed":["Roofing","Waterproofing"],"price":150,"budge_type":"FIXED","subCategories":["roofing","waterproofing"]}*/

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
  price:string | number;
  subCategories: string[];
  budge_type : string;
  skills_needed: string[];
}

const PostAJob = () => {
  const navigate = useNavigate()
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
    price: 0 ,
    subCategories: [] ,
    budge_type: "" ,
    skills_needed : []
  });

  const progressPercent = () => {
    if (phase === 1) return 0;
    if (phase === 2) return 50;
    return 90;
  };

  const HanleCancle = ()=>{
       if(phase >1 ){
         setPhase(1) 
        setJobData({
          title: "",
        description: "",
        categoryId: null,
        timeline: "",
        date: "",
        time: "",
        location: "",
        contact_method: null,
        images: [],
        price: 0 ,
        subCategories: [] ,
        budge_type: "" ,
        skills_needed : []
        })
       } else {
          navigate("/")
       }
  }

  return (
    <div>
      {/* Header */}
      <div className="py-5 px-4 fixed top-[14%] left-0 right-0 bg-white shadow-md z-10">
        <div className="max-w-[1180px] mx-auto flex items-center justify-between">
          <div>
            <div className="text-sm font-medium">Budget & Timeline</div>
            <div className="text-xs text-secondary">
              Step {phase} of 3 · Add the finishing touches
            </div>
          </div>
          <button onClick={()=>HanleCancle()} className="text-2xl cursor-pointer hover:scale-105 transition-all duration-300 hover:rotate-90"><RxCross2 /> </button>
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
      <div className="bg-[#eff2f7] min-h-screen pt-[9%] py-10">

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
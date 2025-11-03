import { GoArrowLeft } from "react-icons/go";
import { useNavigate, useParams } from "react-router-dom";
import CustomerInformation from "../components/Jobs/JobDetails/CustomerInformation";
import { useGetJobByIdQuery } from "@/redux/features/jobs/jobsApi";
import JobInformation from "@/components/Jobs/JobDetails/JobInformaiton";
import { useEffect } from "react";

const JobDetails = () => {
      useEffect(()=>{
        document.title = `Job Details | ${import.meta.env.VITE_APP_NAME}`
      }, [])
    
  const { id: jobid } = useParams();
  console.log(jobid);
  const navigate = useNavigate();

  if (!jobid) return null;

  const { data: job, isLoading } = useGetJobByIdQuery(jobid);
  const singlejob = job?.data;
  console.log('singlejob', singlejob)

  if (isLoading) {
    return (
      <div className="max-w-[1550px] mx-auto px-4 md:px-10 py-5">
        <p className="text-gray-500 text-lg">Loading job details...</p>
      </div>
    );
  }

  return (
    <div className="bg-[#F2F4F8]">
      <div className="max-w-[1550px] mx-auto px-4 md:px-10 py-5 mt-9">
        <div
          className="flex items-center gap-2 cursor-pointer mb-5"
          onClick={() => navigate(-1)}
        >
          <GoArrowLeft size={20} />
          <span>Back To Jobs</span>
        </div>
        <div className="flex items-start gap-6">
          <div className="w-3/4">
            <JobInformation job={singlejob} />
          </div>
          <div className="w-1/4">
            <CustomerInformation customer={singlejob} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;

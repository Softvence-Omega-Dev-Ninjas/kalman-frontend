import { jobs } from "../assets/DummyData/DummyData";

import { FaArrowLeft } from "react-icons/fa";

import { useNavigate, useParams } from "react-router-dom";
import JobInformation from "../components/Jobs/JobDetails/JobInformaiton";
import CustomerInformation from "../components/Jobs/JobDetails/CustomerInformation";

const JobDetails = () => {
  const {id: jobid}  = useParams();
  console.log(jobid);
  const navigate = useNavigate();
  const job = jobs.find(
    (j) =>
      j.id ===
      (jobid && typeof jobid === "string" ? parseInt(jobid, 10) : undefined)
  );
  console.log(job);
  return (
    <div className="max-w-[1550px] mx-auto px-4 md:px-10 py-5">
      <div
        className="flex items-center gap-2 cursor-pointer mb-5"
        onClick={() => navigate(-1)}
      >
        <FaArrowLeft />
        <span>Back</span>
      </div>
      <div className="flex items-start gap-6">
        <div className="w-3/4">
          <JobInformation job={job} />
        </div>
        <div className="w-1/4">
          <CustomerInformation customer={job} />
        </div>
      </div>
    </div>
  );
};

export default JobDetails;

// components/Jobs/JobCard.tsx
import { CiLocationOn } from "react-icons/ci";
import { WiTime4 } from "react-icons/wi";
import { LuCalendarDays } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import type { Job } from "@/types/job";
import Pagination from "./common/JobPagination";

interface JobCardsProps {
  jobs: Job[];
  isLoading: boolean;
  currentPage: number;
  totalPages: number;
  totalJobs: number;
  onPageChange: (page: number) => void;
}

const JobCards = ({
  jobs,
  isLoading,
  currentPage,
  totalPages,
  onPageChange,
}: JobCardsProps) => {
  const navigate = useNavigate();

  // Format date dynamically
  const formatDate = (dateString?: string) => {
    if (!dateString) return "N/A";
    
    try {
      return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    } catch (error) {
      return "Invalid Date";
    }
  };

  // Get current date for jobs without posted date
  const getCurrentDate = () => {
    return new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const handleCardClick = (jobId: string) => {
    navigate(`/jobs/${jobId}`);
  };

  const handleSendProposalClick = (jobId: string, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click event
    navigate(`/jobs/${jobId}`);
  };

  const getCustomerName = (job: Job) => {
    return job?.customer?.name || "Unknown User";
  };

  const getProfileImage = (job: Job) => {
    return job?.customer?.profile_image || 
           "https://i.pravatar.cc/100?img=" + (job.id ? job.id.charCodeAt(0) % 70 : 1);
  };

  // Safe access to skills array
  const getJobSkills = (job: Job): string[] => {
    if (!job.skills) return [];
    if (Array.isArray(job.skills)) return job.skills;
    return [];
  };

  // Safe access to job activity
  const getApplicantCount = (job: Job): number => {
    return job.jobActivity?.total_interested || job.total_applicants || 0;
  };

  if (isLoading) {
    return (
      <div className="p-8 bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
        </div>
        <p className="text-center text-gray-600 mt-4">Loading jobs...</p>
      </div>
    );
  }

  if (jobs.length === 0) {
    return (
      <div className="p-8 bg-white rounded-lg shadow-sm border border-gray-200 text-center">
        <div className="text-6xl mb-4">💼</div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          No jobs found
        </h3>
        <p className="text-gray-600 mb-4">
          Try adjusting your filters to find more opportunities
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Job Cards Grid */}
      <div className="grid grid-cols-1 gap-6">
        {jobs.map((job) => {
          const skills = getJobSkills(job);
          const applicantCount = getApplicantCount(job);
          const jobId = job.id || "1";

          return (
            <div
              key={jobId}
              className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 w-full gap-3 hover:shadow-md transition-all cursor-pointer"
              onClick={() => handleCardClick(jobId)}
            >
              {/* Top Section */}
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h2 className="text-lg font-semibold text-gray-900 line-clamp-1">
                    {job.title || "Untitled Job"}
                  </h2>
                  <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                    {job.description || "No description provided for this job."}
                  </p>
                  
                  {/* Skills/Tags */}
                  {skills.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-3">
                      {skills.slice(0, 4).map((skill, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-md"
                        >
                          {skill}
                        </span>
                      ))}
                      {skills.length > 4 && (
                        <span className="px-2 py-1 bg-gray-100 text-gray-500 text-xs rounded-md">
                          +{skills.length - 4} more
                        </span>
                      )}
                    </div>
                  )}
                </div>

                <div className="text-right min-w-[100px] ml-4">
                  <div className="text-xs text-gray-500">
                    {job.budget_type === "hourly" ? "Hourly Rate" : "Budget (fixed)"}
                  </div>
                  <div className="text-[#FF7346] font-semibold text-base">
                    {job.budget_type === "hourly" ? (
                      <>${job.price || 0}/hr</>
                    ) : (
                      <>${job.price || 0}</>
                    )}
                  </div>
                  {job.experience_level && (
                    <div className="text-xs text-gray-500 mt-1 capitalize">
                      {job.experience_level}
                    </div>
                  )}
                </div>
              </div>

              {/* Bottom Section */}
              <div className="flex items-center justify-between mt-4">
                {/* Left part: Profile + meta */}
                <div className="flex items-center gap-3">
                  <img
                    src={getProfileImage(job)}
                    alt={getCustomerName(job)}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <div className="font-medium text-sm text-gray-900">
                      {getCustomerName(job)}
                    </div>
                    <div className="flex items-center text-xs text-gray-500 gap-3 mt-1 flex-wrap">
                      <span className="flex items-center gap-1">
                        <CiLocationOn /> {job.location || "Remote"}
                      </span>
                      <span className="flex items-center gap-1">
                        <LuCalendarDays /> {formatDate(job.createdAt) || getCurrentDate()}
                      </span>
                      <span className="flex items-center gap-1 capitalize">
                        <WiTime4 /> {job.timeline || "Flexible"}
                      </span>
                      
                      {/* Job Type */}
                      {job.job_type && (
                        <span className="px-2 py-1 bg-blue-50 text-blue-600 text-xs rounded-md capitalize">
                          {typeof job.job_type === 'string' ? job.job_type.replace('_', ' ') : job.job_type}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Right part: Button + applicants */}
                <div className="flex items-center gap-4">
                  {applicantCount > 0 && (
                    <span className="text-xs text-gray-500 whitespace-nowrap">
                      {applicantCount} Applicant{applicantCount !== 1 ? 's' : ''}
                    </span>
                  )}
                  <button
                    onClick={(e) => handleSendProposalClick(jobId, e)}
                    className="bg-[#FF7346] hover:bg-[#ff5722] text-white text-sm px-4 py-2 rounded-md font-medium transition-colors whitespace-nowrap"
                  >
                    Send Proposal
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
      />
    </div>
  );
};

export default JobCards;
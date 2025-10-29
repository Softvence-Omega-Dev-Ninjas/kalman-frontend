import { CheckCircle, ArrowLeft, BriefcaseBusiness } from "lucide-react";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { useGetMyProfileQuery } from "@/redux/features/customer/customerApi";
import { MdOutlineVerified } from "react-icons/md";
import { FaEdit } from "react-icons/fa";

export default function UserProfileCard() {
  const {
    data: profileData,
    isLoading,
    error,
  } = useGetMyProfileQuery(undefined);
  console.log(profileData);
  if (isLoading) {
    return (
      <div className="max-w-5xl mx-auto mt-34">
        <Link to="/">
          <button className="flex items-center gap-x-2 bg-[#F8F9FA] px-4 py-2 rounded-md cursor-pointer text-sm sm:text-base hover:bg-gray-200 transition-colors duration-200">
            <span className="text-base sm:text-lg">
              <ArrowLeft />
            </span>
            <span>Back to Home Page</span>
          </button>
        </Link>
        <div className="w-full max-w-5xl mx-auto bg-gray-50 rounded-2xl shadow-sm flex flex-col md:flex-row items-center justify-between p-6 gap-6 mt-5">
          <div className="flex items-center gap-4 w-full">
            {/* Loading skeleton for avatar */}
            <div className="w-20 h-20 bg-gray-300 rounded-full animate-pulse"></div>
            <div className="space-y-2 flex-1">
              <div className="h-4 bg-gray-300 rounded w-32 animate-pulse"></div>
              <div className="h-3 bg-gray-300 rounded w-24 animate-pulse"></div>
              <div className="h-3 bg-gray-300 rounded w-20 animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !profileData?.data?.profile) {
    return (
      <div className="max-w-5xl mx-auto mt-34">
        <Link to="/">
          <button className="flex items-center gap-x-2 bg-[#F8F9FA] px-4 py-2 rounded-md cursor-pointer text-sm sm:text-base hover:bg-gray-200 transition-colors duration-200">
            <span className="text-base sm:text-lg">
              <ArrowLeft />
            </span>
            <span>Back to Home Page</span>
          </button>
        </Link>
        <div className="w-full max-w-5xl mx-auto bg-gray-50 rounded-2xl shadow-sm p-6 mt-5 text-center">
          <p className="text-red-500">Failed to load profile data</p>
        </div>
      </div>
    );
  }

  const { profile, activeJobs, completeJobs } = profileData.data;

  // Format member since date
  const memberSince = profile.createdAt
    ? format(new Date(profile.createdAt), "yyyy")
    : "2025";

  // Get location from profile data
  const getLocation = () => {
    const locationParts = [profile.city, profile.state].filter(Boolean);
    return locationParts.length > 0
      ? locationParts.join(", ")
      : "Location not set";
  };

  return (
    <div className="max-w-5xl mx-auto mt-34 py-5">
      <div className="flex justify-between pb-3">
        <Link to="/">
          <button className="flex items-center gap-x-2 bg-[#F8F9FA] px-4 py-2 rounded-md cursor-pointer text-sm sm:text-base hover:bg-gray-200 transition-colors duration-200">
            <span className="text-base sm:text-lg">
              <ArrowLeft />
            </span>
            <span>Back to Home Page</span>
          </button>
        </Link>

        <Link to="/post-a-job">
          {" "}
          <button
            type="button"
            className="inline-flex items-center cursor-pointer gap-2 px-5 py-3 rounded-xl bg-orange-500 hover:bg-orange-600 active:bg-orange-700 text-white font-medium shadow-sm transition focus:outline-none focus:ring-2 focus:ring-orange-300 disabled:opacity-60 disabled:cursor-not-allowed"
            aria-label="Post e new job"
            title="Post e new job"
          >
            <FaEdit size={18} />

            <span>Post e new job</span>
          </button>
        </Link>
      </div>

      <div className="w-full max-w-5xl mx-auto bg-gray-50 rounded-2xl shadow-sm flex flex-col md:flex-row items-center justify-between p-6 gap-6 mt-5">
        {/* Left Section */}
        <div className="flex items-center gap-4">
          {/* Avatar */}
          <img
            src={
              profile.profile_image ||
              "https://randomuser.me/api/portraits/men/32.jpg"
            }
            alt={profile.name}
            className="w-20 h-20 rounded-full object-cover border-2 border-white shadow-sm"
            onError={(e) => {
              // Fallback image if profile image fails to load
              e.currentTarget.src =
                "https://randomuser.me/api/portraits/men/32.jpg";
            }}
          />

          {/* Info */}
          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              {profile.name || "No Name Provided"}
            </h2>

            {/* Badges */}
            <div className="flex items-center gap-2 mt-1">
              <span className="flex items-center gap-1 text-sm text-orange-500 font-medium">
                <MdOutlineVerified size={18} className="" />
                {profile.verification === "COMPLETE" && "Verified"}
              </span>
            </div>

            {/* Role & Location */}
            <p className="text-sm text-gray-500">{getLocation()}</p>
            {profile.profession && profile.profession !== "string" && (
              <p className="text-sm text-gray-500 mt-1">{profile.profession}</p>
            )}
            <p className="text-sm text-gray-500 mt-1">
              Member Since {memberSince}
            </p>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          {/* Active Jobs */}
          <div className="bg-[#D4EBF0] rounded-lg px-4 py-3 flex flex-col items-center justify-center min-w-[90px]">
            <BriefcaseBusiness size={20} className="text-[#17A2B8]" />
            <span className="text-sm text-gray-600">Active Job</span>
            <span className="text-lg font-semibold text-gray-900">
              {activeJobs || 0}
            </span>
          </div>

          {/* Completed Jobs */}
          <div className="bg-purple-100 rounded-lg px-4 py-3 flex flex-col items-center justify-center min-w-[90px]">
            <CheckCircle size={20} className="text-purple-600" />
            <span className="text-sm text-gray-600">Completed</span>
            <span className="text-lg font-semibold text-gray-900">
              {completeJobs || 0}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

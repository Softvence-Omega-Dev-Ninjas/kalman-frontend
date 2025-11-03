import { useReviewCount } from "@/redux/features/tradesman/hooks/useReviewCount";
import {
  useGetTradesmanOverviewQuery,
  useGetTradesmanProfileQuery,
} from "@/redux/features/tradesman/tradesmanApi";
import { CheckCircle, Star, Award, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import user1 from "../../assets/default-image.jpg";

export default function ProfileCard() {
  const { data } = useGetTradesmanProfileQuery(undefined);
  const { data: overView } = useGetTradesmanOverviewQuery(undefined);
  const { averageRating } = useReviewCount(data?.data?.review);

  console.log(data);
  return (
    <div className="max-w-5xl mx-auto mt-8">
      <Link to="/">
        <button className="flex items-center gap-x-2 bg-[#F8F9FA] px-4 py-2 rounded-md cursor-pointer text-sm sm:text-base hover:bg-gray-200 transition-colors duration-200">
          <span className="text-base sm:text-lg">
            <ArrowLeft />
          </span>
          <span>Back to Home Page</span>
        </button>
      </Link>
      <div className="w-full max-w-5xl mx-auto bg-gray-50 rounded-2xl shadow-sm flex flex-col md:flex-row items-center justify-between p-6 gap-6 mt-5">
        {/* Left Section */}
        <div className="flex items-center gap-4">
          {/* Avatar */}
          <img
            src={data?.data?.profileImage || user1}
            alt="Esther Howard"
            className="w-20 h-20 rounded-full object-cover"
          />

          {/* Info */}
          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              {data?.data?.firstName} {data?.data?.lastName}
            </h2>

            {/* Badges */}
            <div className="flex items-center gap-2 mt-1">
              <span className="flex items-center gap-1 text-sm text-orange-500 font-medium">
                <CheckCircle size={16} className="text-orange-500" />
                Verified
              </span>
              <span className="flex items-center gap-1 text-sm text-orange-500 font-medium">
                <Award size={16} className="text-orange-500" />
                Top Rated
              </span>
            </div>

            {/* Role & Location */}
            <p className="text-sm text-gray-500 mt-1">
              {data?.data?.profession}
            </p>
            <p className="text-sm text-gray-500">{data?.data?.address}</p>
            <p className="text-sm text-gray-500 mt-1">
              ${data?.data?.businessDetail?.hourlyRate}/hourly rate
            </p>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          {/* Rating */}
          <div className="bg-yellow-100 rounded-lg px-4 py-3 flex flex-col items-center justify-center min-w-[90px]">
            <Star size={20} className="text-yellow-500" />
            <span className="text-sm text-gray-600">Rating</span>
            <span className="text-lg font-semibold text-gray-900">
              {averageRating}
            </span>
          </div>

          {/* Completed */}
          <div className="bg-purple-100 rounded-lg px-4 py-3 flex flex-col items-center justify-center min-w-[90px]">
            <CheckCircle size={20} className="text-purple-600" />
            <span className="text-sm text-gray-600">Completed</span>
            <span className="text-lg font-semibold text-gray-900">
              {overView?.data?.myShortlist.length}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

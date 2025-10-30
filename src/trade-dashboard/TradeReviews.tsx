import React, { useState } from "react";
import { Star, Filter, ChevronDown } from "lucide-react";
import { useGetTradesmanProfileQuery } from "@/redux/features/tradesman/tradesmanApi";
import { useReviewCount } from "@/redux/features/tradesman/hooks/useReviewCount";

// Type definitions
interface Review {
  id: number;
  name: string;
  verified: boolean;
  rating: number;
  text: string;
  avatar: string;
  createdAt: Date;
  customer: {
    name: string;
    profile_image: string;
  };
}

interface RatingDistribution {
  stars: number;
  count: number;
  percentage: number;
}

interface StarRatingProps {
  rating: number;
  showCount?: boolean;
  count?: number;
}

interface RatingBarProps {
  stars: number;
  count: number;
  percentage: number;
}

const TradeReviews: React.FC = () => {
  const [selectedFilter, setSelectedFilter] =
    useState<string>("Recent Reviews");
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const { data: profileData } = useGetTradesmanProfileQuery(undefined);
  const reviews: Review[] = profileData?.data?.review ?? [];
  const { totalReviews, averageRating, ratingCounts } = useReviewCount(reviews);

  const filterOptions: string[] = [
    "Recent Reviews",
    "Highest Rated",
    "Lowest Rated",
    "Oldest First",
  ];

  const getFilteredReviews = (): Review[] => {
    if (!reviews) return [];

    switch (selectedFilter) {
      case "Highest Rated":
        return [...reviews].sort((a, b) => b.rating - a.rating);
      case "Lowest Rated":
        return [...reviews].sort((a, b) => a.rating - b.rating);
      case "Oldest First":
        return [...reviews].sort(
          (a, b) =>
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );
      case "Recent Reviews":
      default:
        return [...reviews].sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
    }
  };

  const ratingDistribution: RatingDistribution[] = [5, 4, 3, 2, 1].map(
    (stars) => {
      const count = ratingCounts[stars as keyof typeof ratingCounts] || 0;
      const percentage = totalReviews ? (count / totalReviews) * 100 : 0;
      return { stars, count, percentage };
    }
  );

  const StarRating: React.FC<StarRatingProps> = ({
    rating,
    showCount = false,
  }) => (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star: number) => (
        <Star
          key={star}
          className={`w-4 h-4 ${
            star <= rating
              ? "fill-yellow-400 text-yellow-400"
              : "fill-gray-200 text-gray-200"
          }`}
        />
      ))}
      {showCount && (
        <span className="text-sm text-gray-600 ml-1">
          {totalReviews ? totalReviews : 0} reviews
        </span>
      )}
    </div>
  );

  const RatingBar: React.FC<RatingBarProps> = ({
    stars,
    count,
    percentage,
  }) => (
    <div className="flex items-center gap-3 mb-2">
      <div className="flex items-center gap-1 w-8">
        <span className="text-sm font-medium text-gray-700">{stars}</span>
        <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
      </div>
      <div className="flex-1 bg-gray-200 rounded-full h-2 overflow-hidden">
        <div
          className="bg-orange-400 h-full transition-all duration-300"
          style={{ width: `${percentage}%` }}
        />
      </div>
      <span className="text-sm text-gray-500 min-w-[30px] text-right">
        {count}
      </span>
    </div>
  );

  const handleFilterSelect = (option: string): void => {
    setSelectedFilter(option);
    setIsDropdownOpen(false);
  };

  const toggleDropdown = (): void => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleViewAllReviews = (): void => {
    console.log("View all reviews clicked");
    // Handle view all reviews functionality
  };

  return (
    <div className="max-w-5xl mx-auto p-6 bg-[#F8F9FA] rounded-md mb-28">
      {/* Header Section */}
      <div className="mb-8">
        <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-8">
          Client Reviews ({totalReviews})
        </h2>

        {/* Rating Overview */}
        <div className="flex flex-col lg:flex-row gap-8 mb-8 bg-white p-4 rounded-sm">
          {/* Overall Rating */}
          <div className="flex flex-col items-center justify-center">
            <div className="text-3xl font-bold text-gray-900 mb-2 text-center">
              {averageRating.toFixed(1)}
            </div>
            <div>
              <StarRating
                rating={Math.round(averageRating)}
                showCount
                count={totalReviews}
              />
            </div>
          </div>

          {/* Rating Distribution */}
          <div className="flex-1 max-w-md">
            {ratingDistribution.map((item: RatingDistribution) => (
              <RatingBar
                key={item.stars}
                stars={item.stars}
                count={item.count}
                percentage={item.percentage}
              />
            ))}
          </div>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-4 border-gray-200 bg-white p-2 rounded-md">
          <div className="flex items-center gap-2 text-gray-700">
            <Filter className="w-5 h-5" />
            <span className="font-medium">Filters :</span>
          </div>

          <div className="relative">
            <button
              onClick={toggleDropdown}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              type="button"
            >
              <span className="text-gray-600">{selectedFilter}</span>
              <ChevronDown className="w-4 h-4 text-gray-400" />
            </button>

            {isDropdownOpen && (
              <div className="absolute top-full left-0 mt-1 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                {filterOptions.map((option: string) => (
                  <button
                    key={option}
                    onClick={() => handleFilterSelect(option)}
                    className="w-full text-left px-4 py-2 hover:bg-gray-50 transition-colors first:rounded-t-lg last:rounded-b-lg"
                    type="button"
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-6 mb-8">
        {getFilteredReviews().length === 0 ? (
          <div className="text-center text-gray-500 py-8 bg-white rounded-md">
            No reviews yet. Be the first to leave one!
          </div>
        ) : (
          getFilteredReviews().map((review: Review) => (
            <div
              key={review.id}
              className="flex gap-4 pb-6 border-b border-gray-100 last:border-b-0 bg-white p-2 rounded-md"
            >
              {/* Avatar */}
              <div className="flex-shrink-0">
                <img
                  src={review?.customer?.profile_image || "/default-avatar.png"}
                  alt={`${review?.customer?.name || "Anonymous"} avatar`}
                  className="w-12 h-12 rounded-full object-cover"
                />
              </div>

              {/* Review Content */}
              <div className="flex-1">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
                  <h3 className="font-semibold text-gray-900">
                    {review?.customer?.name || "Anonymous User"}
                  </h3>
                  {review.verified && (
                    <div className="flex items-center gap-1 text-orange-500">
                      <div className="w-4 h-4 rounded-full bg-orange-500 flex items-center justify-center">
                        <svg
                          className="w-2.5 h-2.5 text-white"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          aria-hidden="true"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <span className="text-sm">Verified</span>
                    </div>
                  )}
                </div>

                <div className="mb-3">
                  <StarRating rating={review.rating} />
                </div>

                <p className="text-gray-600 leading-relaxed">{review.text}</p>
              </div>
            </div>
          ))
        )}
      </div>

      {/* View All Reviews Button */}
      {getFilteredReviews().length > 0 && (
        <div className="text-center bg-white p-2 rounded-md">
          <button
            onClick={handleViewAllReviews}
            className="text-orange-500 font-medium hover:text-orange-600 transition-colors"
            type="button"
          >
            View All Reviews
          </button>
        </div>
      )}
    </div>
  );
};

export default TradeReviews;

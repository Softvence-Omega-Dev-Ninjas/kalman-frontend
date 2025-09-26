import React, { useState } from 'react';
import { Star, Filter, ChevronDown } from 'lucide-react';

// Type definitions
interface Review {
  id: number;
  name: string;
  verified: boolean;
  rating: number;
  comment: string;
  avatar: string;
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
  const [selectedFilter, setSelectedFilter] = useState<string>('Recent Reviews');
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

  const filterOptions: string[] = [
    'Recent Reviews',
    'Most Helpful',
    'Highest Rated',
    'Lowest Rated',
    'Oldest First'
  ];

  const reviews: Review[] = [
    {
      id: 1,
      name: "Robert Fox",
      verified: true,
      rating: 4,
      comment: "Sarah transformed our outdated kitchen into a modern masterpiece. Excellent communication throughout!",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=60&h=60&fit=crop&crop=face&auto=format"
    },
    {
      id: 2,
      name: "Robert Fox",
      verified: true,
      rating: 4,
      comment: "Sarah transformed our outdated kitchen into a modern masterpiece. Excellent communication throughout!",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=60&h=60&fit=crop&crop=face&auto=format"
    },
    {
      id: 3,
      name: "Robert Fox",
      verified: true,
      rating: 4,
      comment: "Sarah transformed our outdated kitchen into a modern masterpiece. Excellent communication throughout!",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=60&h=60&fit=crop&crop=face&auto=format"
    }
  ];

  const ratingDistribution: RatingDistribution[] = [
    { stars: 5, count: 85, percentage: 67 },
    { stars: 4, count: 32, percentage: 60 },
    { stars: 3, count: 8, percentage: 15 },
    { stars: 2, count: 2, percentage: 5 },
    { stars: 1, count: 0, percentage: 2 }
  ];

  const StarRating: React.FC<StarRatingProps> = ({ rating, showCount = false, count = 0 }) => (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star: number) => (
        <Star
          key={star}
          className={`w-4 h-4 ${
            star <= rating 
              ? 'fill-yellow-400 text-yellow-400' 
              : 'fill-gray-200 text-gray-200'
          }`}
        />
      ))}
      {showCount && <span className="text-sm text-gray-600 ml-1">{count} reviews</span>}
    </div>
  );

  const RatingBar: React.FC<RatingBarProps> = ({ stars, percentage }) => (
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
    console.log('View all reviews clicked');
    // Handle view all reviews functionality
  };

  return (
    <div className="max-w-5xl mx-auto p-6 bg-[#F8F9FA] rounded-md mb-5">
      {/* Header Section */}
      <div className="mb-8">
        <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-8">
          Client Reviews (127)
        </h2>
        
        {/* Rating Overview */}
        <div className="flex flex-col lg:flex-row gap-8 mb-8 bg-white p-4 rounded-sm">
          {/* Overall Rating */}
          <div className="flex flex-col items-center justify-center">
            <div className="text-3xl font-bold text-gray-900 mb-2 text-center">4.9</div>
            <div>
              <StarRating rating={5} showCount count={127} />
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
        {reviews.map((review: Review) => (
          <div key={review.id} className="flex gap-4 pb-6 border-b border-gray-100 last:border-b-0 bg-white p-2 rounded-md">
            {/* Avatar */}
            <div className="flex-shrink-0">
              <img
                src={review.avatar}
                alt={`${review.name} avatar`}
                className="w-12 h-12 rounded-full object-cover"
              />
            </div>
            
            {/* Review Content */}
            <div className="flex-1">
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
                <h3 className="font-semibold text-gray-900">{review.name}</h3>
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
                <StarRating rating={review.rating}/>
              </div>
              
              <p className="text-gray-600 leading-relaxed">
                {review.comment}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* View All Reviews Button */}
      <div className="text-center bg-white p-2 rounded-md">
        <button 
          onClick={handleViewAllReviews}
          className="text-orange-500 font-medium hover:text-orange-600 transition-colors"
          type="button"
        >
          View All Reviews
        </button>
      </div>
    </div>
  );
};

export default TradeReviews;
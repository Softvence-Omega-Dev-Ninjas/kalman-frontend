
import TradespersonCard from "../reuseable/TradePersonCard";
import { ChevronLeft, ChevronRight } from "lucide-react";
import trade1 from "../../assets/sample_images/trade1.png";
import { useTradesman } from "@/redux/features/tradesman/hooks/useTradesman";
import { useMemo } from "react";

interface Review {
  rating: number;
  text?: string;
  [key: string]: any;
}

interface Tradesman {
  id: string;
  firstName: string;
  lastName: string;
  profession: string;
  address: string;
  images?: string[];
  review: Review[];
  businessDetail: {
    businessType: string;
    hourlyRate: string;
  };
  [key: string]: any;
}

const PopularTradesperson = () => {
  const { tradesmen } = useTradesman() as { tradesmen: Tradesman[] };

  // Pure function to calculate review stats
  const getReviewStats = (reviews: Review[] = []) => {
    const totalReviews = reviews.length;
    if (totalReviews === 0) return { totalReviews: 0, averageRating: 0 };

    const totalStars = reviews.reduce((sum, r) => sum + (r.rating || 0), 0);
    const averageRating = parseFloat((totalStars / totalReviews).toFixed(1));

    return { totalReviews, averageRating };
  };

  // Sort tradesmen by average rating
  const sortedTradesmen = useMemo(() => {
    if (!tradesmen) return [];

    return [...tradesmen].sort((a, b) => {
      const avgA = getReviewStats(a.review).averageRating;
      const avgB = getReviewStats(b.review).averageRating;
      return avgB - avgA;
    });
  }, [tradesmen]);

  return (
    <div className="bg-gray-50 py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12 relative">
          <h2 className="text-4xl font-semibold text-gray-900 mb-4">
            Our Popular Tradesperson
          </h2>
          <div className="space-y-2">
            <p className="text-gray-600 text-lg">
              Our popular tradespeople are here to make life easier.
            </p>
            <p className="text-gray-600 text-lg">
              From trusted home fixes to essential services, we've got you
              covered.
            </p>
          </div>

          {/* Navigation Arrows */}
          <div className="absolute right-0 top-0 flex items-center space-x-2">
            <button className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors duration-200">
              <ChevronLeft className="w-5 h-5 text-gray-600" />
            </button>
            <button className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors duration-200">
              <ChevronRight className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Tradesperson Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {sortedTradesmen?.map((person, index) => (
            <TradespersonCard
              id={person.id}
              key={index}
              image={trade1}
              name={`${person.firstName} ${person.lastName}`}
              profession={person.profession}
              review={person?.review}
              availability={person.businessDetail.businessType}
              location={person.address}
              hourlyRate={person.businessDetail.hourlyRate}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PopularTradesperson;


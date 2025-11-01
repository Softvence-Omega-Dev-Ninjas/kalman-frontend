import TradespersonCard from "../reuseable/TradePersonCard";
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
  businessDetail: { businessType: string; hourlyRate: string };
  [key: string]: any;
}

const PopularTradesperson = () => {
  const { tradesmen } = useTradesman() as { tradesmen: Tradesman[] };

  const getReviewStats = (reviews: Review[] = []) => {
    const totalReviews = reviews.length;
    if (totalReviews === 0) return { totalReviews: 0, averageRating: 0 };
    const totalStars = reviews.reduce((sum, r) => sum + (r.rating || 0), 0);
    const averageRating = parseFloat((totalStars / totalReviews).toFixed(1));
    return { totalReviews, averageRating };
  };

  const sortedTradesmen = useMemo(() => {
    if (!tradesmen) return [];
    return [...tradesmen].sort((a, b) => {
      const avgA = getReviewStats(a.review).averageRating;
      const avgB = getReviewStats(b.review).averageRating;
      return avgB - avgA;
    });
  }, [tradesmen]);

  return (
    <div className="bg-gray-50 py-16 sm:py-20 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-gray-900 mb-4">
            Our Popular Tradesperson
          </h2>
          <p className="text-gray-600 text-base sm:text-lg">
            Our popular tradespeople are here to make life easier.
          </p>
          <p className="text-gray-600 text-base sm:text-lg">
            From trusted home fixes to essential services, we've got you covered.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
          {sortedTradesmen?.map((person, index) => (
            <TradespersonCard
              key={index}
              id={person.id}
              image={person.images?.[0] || trade1}
              name={`${person.firstName} ${person.lastName}`}
              profession={person.profession}
              review={person.review}
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

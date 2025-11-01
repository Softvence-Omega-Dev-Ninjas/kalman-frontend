import TradespersonCard from "../reuseable/TradePersonCard";
import trade1 from "../../assets/sample_images/trade1.png";
import { PaginationControls } from "../Jobs/common/PaginationControls";
interface AllTradesmanProps {
  tradesman: any[];
  isLoading: boolean;
  page: number;
  setPage: (page: number) => void;
  totalPages: number;
}

const AllServices: React.FC<AllTradesmanProps> = ({
  tradesman,
  isLoading,
  page,
  setPage,
  totalPages,
}) => {
  console.log("tradesman", tradesman);
  if (isLoading) {
    return (
      <div className="p-8 bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
        </div>
        <p className="text-center text-gray-600 mt-4">Loading Tradesman...</p>
      </div>
    );
  }

  if (tradesman.length === 0) {
    return (
      <div className="p-8 bg-white rounded-lg shadow-sm border border-gray-200 text-center">
        <div className="text-6xl mb-4">💼</div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          No Tradesman found
        </h3>
        <p className="text-gray-600 mb-4">
          Try adjusting your filters to find more opportunities
        </p>
      </div>
    );
  }

  return (
    <div className="px-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {tradesman.map((person, index) => (
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
      <PaginationControls
        page={page}
        totalPages={totalPages}
        onPageChange={setPage}
      />
    </div>
  );
};

export default AllServices;

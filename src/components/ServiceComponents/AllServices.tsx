import TradespersonCard from "../reuseable/TradePersonCard";
import trade1 from "../../assets/sample_images/trade1.png";
import { Loader2 } from "lucide-react";
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
  if (isLoading)
    return (
      <div className="flex justify-center items-center py-20">
        <Loader2 className="animate-spin w-8 h-8 text-primary" />
      </div>
    );
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

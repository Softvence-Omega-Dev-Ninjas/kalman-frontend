// src/components/Jobs/AllJobs.tsx
import TradespersonCard from "../reuseable/TradePersonCard";
import { Loader2 } from "lucide-react";
import { PaginationControls } from "./common/PaginationControls";


interface AllJobsProps {
  jobs: any[];
  isLoading: boolean;
  page: number;
  setPage: (page: number) => void;
  totalPages: number;
}

const AllJobs: React.FC<AllJobsProps> = ({
  jobs,
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
        {jobs?.map((job, index) => (
          <TradespersonCard
            key={index}
            image={job?.imageUrl}
            name={job?.name}
            profession={job?.category}
            rating={job?.rating}
            availability={job?.availability}
            location={job?.location}
            hourlyRate={job?.price}
            onContact={() => console.log(`Contacting ${job?.name}`)}
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

export default AllJobs;

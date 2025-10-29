// src/components/Jobs/AllJobs.tsx
// import TradespersonCard from "../reuseable/TradePersonCard";`
// import { Loader2 } from "lucide-react";
// import { PaginationControls } from "./common/PaginationControls";
// import JobCard from "./JobCard";


// interface AllJobsProps {
//   jobs: any[];
//   isLoading: boolean;
//   page: number;
//   setPage: (page: number) => void;
//   totalPages: number;
// }

// const AllJobs: React.FC<AllJobsProps> = ({
//   jobs,
//   isLoading,
//   page,
//   setPage,
//   totalPages,
// }) => {
//   if (isLoading)
//     return (
//       <div className="flex justify-center items-center py-20">
//         <Loader2 className="animate-spin w-8 h-8 text-primary" />
//       </div>
//     );
// console.log(jobs)
//   return (
//     <div className="px-4">
//       <div className=" gap-3 flex flex-col ">
//         {jobs?.map((job, index) => (
//           <JobCard
//             key={index}
//              data={job}
//             // onContact={() => console.log(`Contacting ${job?.name}`)}
//           />
//         ))}
//       </div>

//       <PaginationControls
//         page={page}
//         totalPages={totalPages}
//         onPageChange={setPage}
//       />
//     </div>
//   );
// };

// export default AllJobs;

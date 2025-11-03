import { Eye, Filter, Search, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import type { Column } from "../shared/CustomTable/CustomTable";
import CustomTable from "../shared/CustomTable/CustomTable";
import CustomPagination from "../shared/CustomPagination/CustomPagination";
import toast from "react-hot-toast";
import {
  useDeleteAdminJobMutation,
  useGetAllAdminJobsQuery,
} from "@/redux/features/admin/adminJobApi";
import JobDetailDialog from "./JobDetailDialog";

export interface IJobData {
  id: string;
  title: string;
  location: string;
  customer: {
    name: string;
    email: string;
    profile_image?: string;
    verification?: string;
  };
  isComplete: boolean;
  price: number;
  description: string;
  image?: string[];
  skills_needed?: string[];
  timeline?: string;
}

const ManageJobsPage = () => {

       useEffect(()=>{
              document.title = `Manage Jobs | Admin Dashboard | ${import.meta.env.VITE_APP_NAME}`
            }, [])

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const [search, setSearch] = useState("");
  const [selectedJob, setSelectedJob] = useState<IJobData | null>(null);

  const [debouncedSearch, setDebouncedSearch] = useState(search);
useEffect(() => {
  const handler = setTimeout(() => setDebouncedSearch(search), 500);
  return () => clearTimeout(handler);
}, [search]);
  // Fetch jobs dynamically
  const { data, isLoading, isError, refetch } = useGetAllAdminJobsQuery(
    { page: currentPage, limit: pageSize, search  : debouncedSearch},
  { refetchOnMountOrArgChange: true }
  );


useEffect(() => {
  refetch()
  setCurrentPage(1);
}, [debouncedSearch]);

  // Delete job mutation
  const [deleteJob] = useDeleteAdminJobMutation();

  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this job?");
    if (!confirmDelete) return;

    try {
      await deleteJob(id).unwrap();
      toast.success("Job deleted successfully!");
      refetch();
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to delete job!");
    }
  };

  const jobs: IJobData[] = data?.data.jobs || [];
  const totalJobs = data?.data?.totalJobs || 0;
  const totalPages = Math.ceil(totalJobs / pageSize);

  // Table columns
  const jobColumns: Column<IJobData>[] = [
    {
      header: "",
      cell: () => (
        <div className="flex items-center">
          <input
            type="checkbox"
            className="w-4 h-4 text-purple-600 bg-gray-100 border-gray-300 rounded focus:ring-purple-500"
          />
        </div>
      ),
    },
    {
      header: "Job Details",
      cell: (row) => (
        <div className="flex flex-col items-start">
          <div className="text-sm font-medium text-gray-900">{row.title}</div>
          <div className="text-sm text-gray-500">{row.location}</div>
        </div>
      ),
    },
    {
      header: "Location",
      accessor: "location",
    },
    {
      header: "Customer",
      cell: (row) => row?.customer?.name || row?.customer?.email?.split("@")[0] || "N/A",
    },
    {
      header: "Status",
      accessor: "isComplete",
      cell: (row) => {
        const statusText = row.isComplete ? "Completed" : "In Progress";
        const colorClass = row.isComplete
          ? "text-[#0B5A4A] border bg-[#ABEFD530] !rounded-sm border border-[#ABEFD5]"
          : "text-[#C67608] border bg-[#FCE38C30] !rounded-sm border border-[#FCE38C]";
        return (
          <span className={`px-3 py-1 inline-flex text-xs font-semibold rounded-md ${colorClass}`}>
            {statusText}
          </span>
        );
      },
    },
    {
      header: "Amount",
      cell: (row) => (
        <span className="text-gray-800 font-medium">${row.price}</span>
      ),
    },
    {
      header: "Action",
      cell: (row) => (
        <div className="flex items-center space-x-2">
          <button
            className="text-gray-400 cursor-pointer hover:text-primary"
            onClick={() => setSelectedJob(row)}
          >
            <Eye size={18} />
          </button>
          <button
            onClick={() => handleDelete(row.id)}
            className="text-gray-400 hover:text-red-600 cursor-pointer"
          >
            <Trash2 size={18} />
          </button>
        </div>
      ),
    },
  ];

  // if (isLoading) return <div>Loading jobs...</div>;
  if (isError) return <div className="text-red-500">Failed to load jobs.</div>;

  return (
    <div>
      {/* Header */}
      <header className="flex items-center justify-between mb-8 flex-wrap">
        <h1 className="text-2xl font-bold text-gray-900">Job Management</h1>

        <div className="flex items-center space-x-4 flex-wrap gap-5">
          {/* Search Input */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search size={18} className="text-gray-400" />
            </div>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-purple-500 focus:border-purple-500"
              placeholder="Search Project..."
            />
          </div>

          {/* Filter Button */}
          <button className="flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100">
            <Filter size={18} className="mr-2" />
            Filter By
          </button>
        </div>
      </header>

      {/* Table */}
      <CustomTable columns={jobColumns} data={jobs } isLoading={isLoading}    emptyMessage={"No Job Found!"}/>

      {/* Pagination */}
      {totalPages > 1 && (
        <CustomPagination
          totalItems={totalJobs}
          pageSize={pageSize}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
      )}

      {/* Job Detail Dialog */}
      <JobDetailDialog
        job={selectedJob}
        open={!!selectedJob}
        onClose={() => setSelectedJob(null)}
      />
    </div>
  );
};

export default ManageJobsPage;

import { Eye, Filter, Search, Trash2 } from "lucide-react";
import { useState } from "react";
import { type IJobData, jobData } from "./data/jobData";
import type { Column } from "../shared/CustomTable/CustomTable";
import CustomTable from "../shared/CustomTable/CustomTable";
import CustomPagination from "../shared/CustomPagination/CustomPagination";

const ManageJobsPage = () => {
  //Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 6;
  //Table Config
  const jobColumns: Column<IJobData>[] = [
    // Checkbox Column
    {
      header: "",
      cell: () => (
        <div className="flex items-center">
          <input
            id="checkbox-table-2"
            type="checkbox"
            className="w-4 h-4 text-purple-600 bg-gray-100 border-gray-300 rounded focus:ring-purple-500"
          />
        </div>
      ),
    },
    // Job Details Column
    {
      header: "Job Details",
      cell: (row) => (
        <div className="flex flex-col items-start">
          <div className="text-sm font-medium text-gray-900">
            {row.jobTitle.split(" ")[0]} {row.jobTitle.split(" ")[1]}
          </div>
          <div className="text-sm text-gray-500">
            {row.jobTitle.split(" ")[2]} {row.jobTitle.split(" ")[3]}
          </div>
        </div>
      ),
    },
    // Location Column
    {
      header: "Location",
      accessor: "location",
    },
    // Customer Column
    {
      header: "Customer",
      accessor: "customer",
    },
    // Service Provider Column
    {
      header: "Service Provider",
      accessor: "serviceProvider",
    },
    // Status Column
    {
      header: "Status",
      accessor: "status",
      cell: (row) => {
        let colorClass = "";
        switch (row.status) {
          case "Completed":
            colorClass = "bg-green-100 text-green-800";
            break;
          case "In Progress":
            colorClass = "bg-yellow-100 text-yellow-800";
            break;
          case "Disputed":
            colorClass = "bg-red-100 text-red-800";
            break;
          case "Cancelled":
            colorClass = "bg-gray-100 text-gray-800";
            break;
          default:
            colorClass = "bg-gray-100 text-gray-800";
        }
        return (
          <span
            className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-md ${colorClass}`}
          >
            {row.status}
          </span>
        );
      },
    },
    // Amount Column
    {
      header: "Amount",
      accessor: "amount",
    },
    // Rate Column
    {
      header: "Rate",
      accessor: "rate",
    },
    // Action Column
    {
      header: "Action",
      cell: () => (
        <div className="flex items-center space-x-2">
          <button className="text-gray-400 hover:text-primary focus:outline-none focus:text-primary cursor-pointer">
            <Eye size={18} />
          </button>
          <button className="text-gray-400 hover:text-red-600 focus:outline-none focus:text-red-600 cursor-pointer">
            <Trash2 size={18} />
          </button>
        </div>
      ),
    },
  ];
  return (
    <div>
      <header className="flex items-center justify-between mb-8 flex-wrap">
        <h1 className="text-2xl font-bold text-gray-900">Job Management</h1>
        <div className="flex items-center space-x-4 flex-wrap gap-5">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search size={18} className="text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-purple-500 focus:border-purple-500"
              placeholder="Search Project..."
            />
          </div>
          <button className="flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100">
            <Filter size={18} className="mr-2" />
            Filter By
          </button>
        </div>
      </header>
      <CustomTable columns={jobColumns} data={jobData} />
      <CustomPagination
        totalItems={jobData.length}
        pageSize={pageSize}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default ManageJobsPage;

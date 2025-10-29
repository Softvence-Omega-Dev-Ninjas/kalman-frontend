import { Eye, Filter, Search, Trash2 } from "lucide-react";
import { useState } from "react";
import CustomTable from "../shared/CustomTable/CustomTable";
import CustomPagination from "../shared/CustomPagination/CustomPagination";
import type { Column } from "../shared/CustomTable/CustomTable";
import { useGetAllPaymentsQuery } from "@/redux/features/admin/adminPaymentApi";


const ManagePaymentsPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 4;

  const { data, isLoading } = useGetAllPaymentsQuery();

  // Transform API data
  const payments = data?.data?.map((item) => ({
    id: item.id,
    jobTitle: item.job?.title || "N/A",
    serviceProvider: `${item.tradesMan?.firstName || ""} ${
      item.tradesMan?.lastName || ""
    }`.trim(),
    location: item.job?.location || "N/A",
    amount: `$${item.amount || 0}`,
    rate: `$${item.job?.price || 0}`,
    status:
      item.type === "SHORTLISTED_FEE"
        ? "Shortlisted Fee"
        : item.type === "PAYMENT"
        ? "Completed"
        : "Pending",
  })) || [];

  // Table Columns
  const paymentColumns: Column<any>[] = [
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
    {
      header: "Job Details",
      cell: (row) => (
        <div className="flex flex-col items-start">
          <div className="text-sm font-medium text-gray-900">
            {row.jobTitle.split(" ").slice(0, 2).join(" ")}
          </div>
          <div className="text-sm text-gray-500">
            {row.jobTitle.split(" ").slice(2).join(" ")}
          </div>
        </div>
      ),
    },
    {
      header: "Service Provider",
      accessor: "serviceProvider",
    },
    {
      header: "Location",
      accessor: "location",
    },
    {
      header: "Status",
      accessor: "status",
      cell: (row) => {
        let colorClass = "";
        switch (row.status) {
          case "Completed":
            colorClass = "bg-green-100 text-green-800";
            break;
          case "Pending":
            colorClass = "bg-yellow-100 text-yellow-800";
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
    {
      header: "Amount",
      accessor: "amount",
    },
    {
      header: "Rate",
      accessor: "rate",
    },
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

  // Pagination logic
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedData = payments.slice(startIndex, startIndex + pageSize);

  return (
    <div>
      <header className="flex items-center justify-between mb-8 flex-wrap gap-5">
        <h1 className="text-2xl font-bold text-gray-900">All Payments</h1>
        <div className="flex items-center space-x-4 flex-wrap gap-5">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search size={18} className="text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-purple-500 focus:border-purple-500"
              placeholder="Search Payment..."
            />
          </div>
          <button className="flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100">
            <Filter size={18} className="mr-2" />
            Filter By
          </button>
        </div>
      </header>

      {isLoading ? (
        <div className="text-center py-10 text-gray-500">Loading...</div>
      ) : (
        <>
          <CustomTable columns={paymentColumns} data={paginatedData} />
          
         {payments.length > pageSize && (
            <CustomPagination
              totalItems={payments.length}
              pageSize={pageSize}
              currentPage={currentPage}
              onPageChange={setCurrentPage}
            />
          )}

        </>
      )}
    </div>
  );
};

export default ManagePaymentsPage;

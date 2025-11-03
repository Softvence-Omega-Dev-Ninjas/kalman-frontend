import { Eye, 
  // Filter,
   Search } from "lucide-react";
import { useState, useMemo, useEffect } from "react";
import CustomTable from "../shared/CustomTable/CustomTable";
import CustomPagination from "../shared/CustomPagination/CustomPagination";
import type { Column } from "../shared/CustomTable/CustomTable";
import { useGetAllPaymentsQuery } from "@/redux/features/admin/adminPaymentApi";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
// import { Button } from "@/components/ui/button";

const ManagePaymentsPage = () => {

       useEffect(()=>{
              document.title = `Manage Dispute | Admin Dashboard | ${import.meta.env.VITE_APP_NAME}`
            }, [])

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const { data, isLoading ,refetch } = useGetAllPaymentsQuery();

  useEffect(()=>{
    refetch()
  }, [])

  // Modal state
  // const [selectedPayment, setSelectedPayment] = useState<any | null>(null);

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

  // Paginated data
  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return payments.slice(startIndex, startIndex + pageSize);
  }, [payments, currentPage]);

  // Table Columns
  const paymentColumns: Column<any>[] = [
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
          <div className="text-sm font-medium text-gray-900">
            {row.jobTitle.split(" ").slice(0, 2).join(" ")}
          </div>
          <div className="text-sm text-gray-500">
            {row.jobTitle.split(" ").slice(2).join(" ")}
          </div>
        </div>
      ),
    },
    { header: "Service Provider", accessor: "serviceProvider" },
    { header: "Location", accessor: "location" },
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
    { header: "Amount", accessor: "amount" },
    { header: "Rate", accessor: "rate" },
    {
      header: "Action",
      cell: (row) => (
        <Dialog>
          <DialogTrigger asChild>
            <button className="text-gray-400 hover:text-primary focus:outline-none cursor-pointer">
              <Eye size={18} />
            </button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-3xl w-full max-h-[70vh] overflow-y-auto p-6">
            <DialogHeader>
              <DialogTitle>Payment Details</DialogTitle>
              <DialogClose className=" cursor-pointer" asChild>
                {/* <button className="absolute top-3 right-3 text-gray-500 hover:text-gray-900">✕</button> */}
              </DialogClose>
            </DialogHeader>
            {row && (
              <div className="space-y-4 mt-4">
                <div>
                  <strong>Job Title:</strong> {row.jobTitle}
                </div>
                <div>
                  <strong>Service Provider:</strong> {row.serviceProvider}
                </div>
                <div>
                  <strong>Location:</strong> {row.location}
                </div>
                <div>
                  <strong>Status:</strong> {row.status}
                </div>
                <div>
                  <strong>Amount:</strong> {row.amount}
                </div>
                <div>
                  <strong>Rate:</strong> {row.rate}
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      ),
    },
  ];

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
          {/* <Button variant="outline" className="flex items-center px-4 py-2 text-sm font-medium">
            <Filter size={18} className="mr-2" />
            Filter By
          </Button> */}
        </div>
      </header>
{/* 
      {isLoading ? (
        <div className="text-center py-10 text-gray-500">Loading...</div>
      ) :
       ( */}
        <>
          <CustomTable isLoading={isLoading} columns={paymentColumns} data={paginatedData} />

          {payments.length > pageSize && (
            <CustomPagination
              totalItems={payments.length}
              pageSize={pageSize}
              currentPage={currentPage}
              onPageChange={setCurrentPage}
            />
          )}
        </>
       {/* )} */}
    </div>
  );
};

export default ManagePaymentsPage;

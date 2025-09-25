import { Eye, Filter, Search, Star, Trash2 } from "lucide-react";
import { useState } from "react";
import { type IUserData, userData } from "./data/usersData";
import type { Column } from "../shared/CustomTable/CustomTable";
import CustomTable from "../shared/CustomTable/CustomTable";
import CustomPagination from "../shared/CustomPagination/CustomPagination";

const ManageUsersPage = () => {
  //Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 4;

  // const paginatedData = userData.slice(
  //   (currentPage - 1) * pageSize,
  //   currentPage * pageSize
  // );

  //Table Config
  const userColumns: Column<IUserData>[] = [
    // Checkbox Column (first column)
    {
      header: "",
      cell: () => (
        <div className="flex items-center">
          <input
            id="checkbox-table-1"
            type="checkbox"
            className="w-4 h-4 text-purple-600 bg-gray-100 border-gray-300 rounded focus:ring-purple-500"
          />
        </div>
      ),
    },
    // File Name Column
    {
      header: "File Name",
      cell: (row) => (
        <div className="flex items-center">
          <div className="flex-shrink-0 w-10 h-10">
            <img
              className="w-10 h-10 rounded-full"
              src={row.image}
              alt={row.fileName}
            />
          </div>
          <div className="ml-4">
            <div className="text-sm font-medium text-gray-900">
              {row.fileName}
            </div>
          </div>
        </div>
      ),
    },
    // Email Column
    {
      header: "Email",
      accessor: "email",
    },
    // Type Column
    {
      header: "Type",
      cell: (row) => (
        <span
          className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-md ${
            row.type === "Customer"
              ? "bg-purple-100 text-purple-700 border border-purple-600"
              : "bg-blue-100 text-blue-800 border border-blue-600"
          }`}
        >
          {row.type}
        </span>
      ),
    },
    // Status Column
    {
      header: "Status",
      cell: (row) => {
        let colorClass = "";
        switch (row.status) {
          case "Active":
            colorClass = "bg-green-100 text-green-800 border border-[#62D235]";
            break;
          case "Suspended":
            colorClass = "bg-red-100 text-red-800 border border-[#E01C3D]";
            break;
          case "Deactivated":
            colorClass =
              "bg-violet-100 text-violet-600 border border-violet-600";
            break;
          default:
            colorClass = "bg-gray-100 text-gray-800";
        }
        return (
          <span
            className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-md  ${colorClass}`}
          >
            {row.status}
          </span>
        );
      },
    },
    // Location Column
    {
      header: "Location",
      accessor: "location",
    },
    // Performance Column
    {
      header: "Performance",
      cell: (row) => (
        <div className="flex flex-col items-start">
          <span className="text-sm font-medium text-gray-900">
            {row.performance.earned} spent
          </span>
          <span className="text-xs text-gray-500">
            {row.performance.jobsPosted} jobs posted
          </span>
          {row.performance.completed && (
            <span className="text-xs text-gray-500">
              {row.performance.completed} completed
            </span>
          )}
          {row.performance.rating && (
            <div className="flex items-center mt-1">
              <Star size={12} className="text-yellow-400 fill-current" />
              <span className="ml-1 text-xs text-gray-500">
                {row.performance.rating}
              </span>
            </div>
          )}
        </div>
      ),
    },
    // Last Active Column
    {
      header: "Last Active",
      accessor: "lastActive",
    },
    // Action Column
    {
      header: "Action",
      cell: () => (
        <div className="flex items-center space-x-2">
          <button className="text-gray-400 hover:text-indigo-600 focus:outline-none focus:text-indigo-600 cursor-pointer">
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
      <header className="flex items-center justify-between mb-8 flex-wrap gap-5">
        <h1 className="text-2xl font-bold text-gray-900">User Management</h1>
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
      <CustomTable columns={userColumns} data={userData} />
      <CustomPagination
        totalItems={userData.length}
        pageSize={pageSize}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default ManageUsersPage;

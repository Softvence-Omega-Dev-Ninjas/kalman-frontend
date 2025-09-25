import { Eye, Plus, Search, SquarePen, Trash2 } from "lucide-react";
import { blogData, type TBlog } from "./data/blogData";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import type { Column } from "../shared/CustomTable/CustomTable";
import CustomTable from "../shared/CustomTable/CustomTable";
import CustomPagination from "../shared/CustomPagination/CustomPagination";

const ManageBlogPage = () => {
  //Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 4;
  //Table Config
  const blogColumns: Column<TBlog>[] = [
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
      header: "Image",
      cell: (row) => (
        <div className="flex items-center">
          <div className="flex-shrink-0 w-24 h-12 ">
            <img className="w-24 h-12 " src={row.image} alt={row.title} />
          </div>
        </div>
      ),
    },
    {
      header: "Title",
      accessor: "title",
    },
    // Type Column
    {
      header: "Description",
      cell: (row) => (
        <p className="truncate">
          {row.description.split(" ").slice(0, 6).join(" ")}
          {row.description.split(" ").length > 6 ? "..." : ""}
        </p>
      ),
    },
    {
      header: "Date",
      accessor: "date",
    },
    {
      header: "Action",
      cell: () => (
        <div className="flex items-center space-x-2">
          <button className="text-gray-400 hover:text-primary focus:outline-none focus:text-primary cursor-pointer">
            <Eye size={18} />
          </button>
          <button className="text-gray-400 hover:text-primary focus:outline-none focus:text-primary cursor-pointer">
            <SquarePen size={18} />
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
        <h1 className="text-2xl font-bold text-gray-900">Blog Management</h1>
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
          <Button className="flex items-center px-4 py-2 ">
            <Plus size={18} className="mr-2" />
            Add Blog
          </Button>
        </div>
      </header>
      <CustomTable columns={blogColumns} data={blogData} />
      <CustomPagination
        totalItems={blogData.length}
        pageSize={pageSize}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default ManageBlogPage;

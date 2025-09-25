import { useState } from "react";
import { categoryData, type TCategory } from "./data/categoryData";

import { Plus, Search, SquarePen, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Column } from "../shared/CustomTable/CustomTable";
import CustomTable from "../shared/CustomTable/CustomTable";
import CustomPagination from "../shared/CustomPagination/CustomPagination";

const ManageCategoryPage = () => {
  //Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 4;

  //Table config
  const categoryColumn: Column<TCategory>[] = [
    {
      header: "Icon",
      cell: (row) => (
        <div className="flex items-center">
          <div className="flex-shrink-0 w-10 h-10">
            <img
              className="w-10 h-10 rounded-full"
              src={row.image}
              alt={row.image}
            />
          </div>
        </div>
      ),
    },
    // Customer Column
    {
      header: "Category Name",
      accessor: "name",
    },

    // Action Column
    {
      header: "Action",
      cell: () => (
        <div className="flex items-center space-x-3">
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
        <h1 className="text-2xl font-bold text-gray-900">
          Category Management
        </h1>
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
            Add Category
          </Button>
        </div>
      </header>
      <CustomTable columns={categoryColumn} data={categoryData} />
      <CustomPagination
        totalItems={categoryData.length}
        pageSize={pageSize}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default ManageCategoryPage;

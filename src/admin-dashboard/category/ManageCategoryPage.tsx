"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import toast from "react-hot-toast";
import { useCreateCategoryMutation, useGetCategoriesQuery } from "@/redux/features/admin/categoryApi";
import CreateCategory from "./CreateCategory";
import CategoryTable from "./CategoryTable";
import { PaginationControls } from "@/components/Jobs/common/PaginationControls";

interface TCategory {
  id: string;
  name: string;
  image: string;
  subCategories?: string[];
}

const ManageCategoryPage = () => {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  // Fetch categories dynamically
  const { data, isLoading, refetch } = useGetCategoriesQuery({
    search,
    page: currentPage,
    limit: pageSize,
  });

  const categories: TCategory[] = data?.data?.result ?? [];
  const totalItems = data?.data?.metadata?.totalItem ?? 0;
  const totalPages = Math.ceil(totalItems / pageSize);

  const [createCategory] = useCreateCategoryMutation();

  const handleCreateCategory = async (formData: FormData) => {
    try {
      await createCategory(formData).unwrap();
      toast.success("Category created successfully!");
      refetch();
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to create category");
    }
  };

  const handleDeleteCategory = (id: string) => {
    toast.success(`Pretend deleting category ${id}`);
  };

  return (
    <div className="p-5 bg-gray-50 rounded-lg shadow-sm">
      {/* Header */}
      <header className="flex items-center justify-between mb-8 flex-wrap gap-5">
        <h1 className="text-2xl font-bold text-gray-900">Category Management</h1>

        <div className="flex items-center space-x-4 flex-wrap gap-5">
          {/* Search */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search size={18} className="text-gray-400" />
            </div>
            <input
              type="text"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
              className="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-0 focus:border-primary"
              placeholder="Search Category..."
            />
          </div>

          {/* Add Category */}
          <CreateCategory onCreate={handleCreateCategory} />
        </div>
      </header>

      {/* Loading */}
      {isLoading && <p className="text-gray-500 mb-3">Loading categories...</p>}

      {/* Table */}
      <CategoryTable
        data={categories}
        isLoading={isLoading}
        onDelete={handleDeleteCategory}
        onEdit={(id) => console.log("Edit", id)}
      />

      {/* Pagination */}
      {totalPages > 1 && (
        <PaginationControls
          page={currentPage}
          totalPages={totalPages}
          onPageChange={(page) => setCurrentPage(page)}
        />
      )}
    </div>
  );
};

export default ManageCategoryPage;

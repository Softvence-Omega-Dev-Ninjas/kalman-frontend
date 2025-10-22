
import { useState } from "react";
import { Search } from "lucide-react";
import toast from "react-hot-toast";
import {
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
  useGetCategoriesQuery,
} from "@/redux/features/admin/categoryApi";
import CreateCategory from "./CreateCategory";
import CategoryTable from "./CategoryTable";
import { PaginationControls } from "@/components/Jobs/common/PaginationControls";
import { Button } from "@/components/ui/button";

interface TCategory {
  id: string;
  name: string;
  image: string;
  subCategories?: string[];
}

const ManageCategoryPage = () => {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [editingCategory, setEditingCategory] = useState<TCategory | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const pageSize = 10;

  const { data, isLoading, refetch } = useGetCategoriesQuery({
    search,
    page: currentPage,
    limit: pageSize,
  });
console.log(data)
  const categories: TCategory[] = data?.data?.result ?? [];
  const totalItems = data?.data?.metadata?.totalItem ?? 0;
  const totalPages = Math.ceil(totalItems / pageSize);

  const [createCategory] = useCreateCategoryMutation();
  const [updateCategory] = useUpdateCategoryMutation();
  const [deleteCategory] = useDeleteCategoryMutation();

  // Handle create or update
// Handle create or update
// Handle create or update
const handleCreateOrUpdate = async (formData: FormData) => {
  try {
    if (editingCategory?.id) {
      // Prepare JSON payload for PATCH
      const data: any = {};

      formData.forEach((value, key) => {
        if (key === "subCategories") {
          if (typeof value === "string" && value.trim() !== "") {
            // Convert CSV string to array only if not empty
            data[key] = value.split(",").map((v) => v.trim());
          }
          // if empty, do not include subCategories
        } else if (key !== "image") {
          data[key] = value;
        }
      });

      console.log("PATCH payload:", data);
      await updateCategory({ id: editingCategory.id, data }).unwrap();
      toast.success("Category updated successfully!");
    } else {
      // CreateCategory keeps FormData (multipart/form-data)
      await createCategory(formData).unwrap();
      toast.success("Category created successfully!");
    }

    refetch();
    setEditingCategory(null);
    setModalOpen(false);
  } catch (err: any) {
    console.error("Operation error:", err);
    toast.error(err?.data?.message || "Operation failed");
  }
};





  // Edit category
  const handleEdit = (category: TCategory) => {
    setEditingCategory(category);
    setModalOpen(true);
  };

  // Delete category
  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this category?")) return;
    try {
      await deleteCategory(id).unwrap();
      toast.success("Category deleted successfully!");
      refetch();
    } catch (err: any) {
      toast.error(err?.data?.message || "Delete failed");
    }
  };

  // Add new category
  const handleAdd = () => {
    setEditingCategory(null); // Clear edit data
    setModalOpen(true);       // Open modal blank
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
          <Button onClick={handleAdd} className="cursor-pointer">Add Category</Button>

          {/* Create/Edit Modal */}
          <CreateCategory
            onCreate={handleCreateOrUpdate}
            editingCategory={editingCategory}
            isOpen={modalOpen}
            onOpenChange={setModalOpen}
          />
        </div>
      </header>

      {/* Loading */}
      {isLoading && <p className="text-gray-500 mb-3">Loading categories...</p>}

      {/* Category Table */}
      <CategoryTable
        data={categories}
        isLoading={isLoading}
        onDelete={handleDelete}
        onEdit={handleEdit}
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

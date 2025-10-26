import { useState } from "react";
import { Search, SquarePen, Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import {
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
  useGetCategoriesQuery,
} from "@/redux/features/admin/categoryApi";
import CreateCategory from "./CreateCategory";
import CustomTable, { type Column } from "../shared/CustomTable/CustomTable";
import { PaginationControls } from "@/components/Jobs/common/PaginationControls";
import { Button } from "@/components/ui/button";

interface TCategory {
  id: string;
  name: string;
  image: string;
  subCategories?: string[];
  createdAt?: string;
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

  const categories: TCategory[] = data?.data?.result ?? [];
  const totalItems = data?.data?.metadata?.totalItem ?? 0;
  const totalPages = Math.ceil(totalItems / pageSize);

  const [createCategory] = useCreateCategoryMutation();
  const [updateCategory] = useUpdateCategoryMutation();
  const [deleteCategory] = useDeleteCategoryMutation();

  const handleCreateOrUpdate = async (formData: FormData) => {
    try {
      if (editingCategory?.id) {
        // Prepare JSON payload for PATCH
        const data: any = {};
        formData.forEach((value, key) => {
          if (key === "subCategories") {
            if (typeof value === "string" && value.trim() !== "") {
              data[key] = value.split(",").map((v) => v.trim());
            }
          } else if (key !== "image") {
            data[key] = value;
          }
        });

        await updateCategory({ id: editingCategory.id, data }).unwrap();
        toast.success("Category updated successfully!");
      } else {
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

  const handleEdit = (category: TCategory) => {
    setEditingCategory(category);
    setModalOpen(true);
  };

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

  const handleAdd = () => {
    setEditingCategory(null);
    setModalOpen(true);
  };

  // Define CustomTable columns
  const categoryColumns: Column<TCategory>[] = [
    { header: "", cell: () => <input type="checkbox" className="w-4 h-4" /> },
    {
      header: "Image",
      cell: (row) => (
       <img
  src={row?.image}
  alt={row?.name}
  className="w-16 h-10 object-cover rounded"
/>

      ),
    },
    { header: "Name", accessor: "name" },
    {
      header: "Subcategories",
      cell: (row) =>
        row.subCategories?.length ? (
          <span>{row.subCategories.join(", ")}</span>
        ) : (
          <span className="text-gray-400 italic">—</span>
        ),
    },
    {
      header: "Created",
      cell: (row) =>
        row.createdAt ? new Date(row.createdAt).toLocaleDateString() : "—",
    },
    {
      header: "Actions",
      cell: (row) => (
        <div className="flex items-center space-x-3">
          <button
            onClick={() => handleEdit(row)}
            className="cursor-pointer hover:text-blue-600 text-sm"
          >
           <SquarePen size={18} />
          </button>
          <button
            onClick={() => handleDelete(row.id)}
            className="cursor-pointer hover:text-red-600 text-sm"
          >
            <Trash2 size={18}/>
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className=" rounded-lg ">
      {/* Header */}
      <header className="flex items-center justify-between mb-8 flex-wrap gap-5">
        <h1 className="text-2xl font-bold text-gray-900">Category Management</h1>

        <div className="flex items-center space-x-4 flex-wrap gap-5">
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

          <Button onClick={handleAdd} className="cursor-pointer">
            Add Category
          </Button>

          <CreateCategory
            onCreate={handleCreateOrUpdate}
            editingCategory={editingCategory}
            isOpen={modalOpen}
            onOpenChange={setModalOpen}
          />
        </div>
      </header>

      {/* Table */}
      <CustomTable
        columns={categoryColumns}
        data={categories}
        isLoading={isLoading}
        emptyMessage={"No Category Found!"}
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

import { Eye, Plus, Search, SquarePen, Trash2 } from "lucide-react";
import { type TBlog } from "./data/blogData";

import { useState, useMemo, useEffect } from "react";
import { Button } from "@/components/ui/button";
import type { Column } from "../shared/CustomTable/CustomTable";
import CustomTable from "../shared/CustomTable/CustomTable";
import CustomPagination from "../shared/CustomPagination/CustomPagination";
import Modal from "@/components/reuseable/Modal";
import AddBlog from "./AddBlog";
import ViewBlog from "./ViewBlog";
import { useDeleteBlogMutation, useGetAllBlogsQuery } from "@/redux/features/blog/blogApi";
import { toast } from "react-hot-toast";

const ManageBlogPage = () => {


         useEffect(()=>{
                document.title = `Manage Blog | Admin Dashboard | ${import.meta.env.VITE_APP_NAME}`
              }, [])

  const { data , isLoading} = useGetAllBlogsQuery(undefined);
  const [deleteBlog] = useDeleteBlogMutation();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [viewMode, setViewMode] = useState<"view" | "edit" | "add">("add");
  const [editingBlog, setEditingBlog] = useState<TBlog | null>(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10; // items per page

  const blogs = data?.data || [];

  // Frontend paginated data
  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return blogs.slice(startIndex, startIndex + pageSize);
  }, [blogs, currentPage]);

  // Handlers
  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const blogColumns: Column<TBlog>[] = [
    { header: "", cell: () => <input type="checkbox" className="w-4 h-4" /> },
    {
      header: "Image",
      cell: (row) => (
        <img
          className="w-24 h-12 rounded-md"
          src={row?.imeges?.[0] instanceof File ? URL.createObjectURL(row?.imeges[0]) : row?.imeges?.[0]}
          alt={row?.title}
        />
      ),
    },
    { header: "Title", accessor: "title" },
    {
      header: "Description",
      cell: (row) => {
        const words = row.description.split(" ");
        return words.slice(0, 6).join(" ") + (words.length > 6 ? "..." : "");
      },
    },
    { header: "Date", cell: (row) => row.createdAt?.split("T")[0] },
    {
      header: "Action",
      cell: (row) => (
        <div className="flex items-center space-x-2">
          <button
            onClick={() => {
              setEditingBlog(row);
              setViewMode("view");
              handleOpenModal();
            }}
            className="text-gray-400 hover:text-primary cursor-pointer"
          >
            <Eye size={18} />
          </button>
          <button
            onClick={() => {
              setEditingBlog(row);
              setViewMode("edit");
              handleOpenModal();
            }}
            className="text-gray-400 hover:text-primary cursor-pointer"
          >
            <SquarePen size={18} />
          </button>
          <button
            onClick={() => {
              deleteBlog(row?.id);
              toast.success("Blog deleted successfully!");
            }}
            className="text-gray-400 hover:text-red-600 cursor-pointer"
          >
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
              placeholder="Search Blog..."
            />
          </div>
          <Button
            onClick={() => {
              setEditingBlog(null);
              setViewMode("add");
              handleOpenModal();
            }}
            className="flex items-center px-4 py-2"
          >
            <Plus size={18} className="mr-2" />
            Add Blog
          </Button>
        </div>
      </header>

      <CustomTable isLoading={isLoading} columns={blogColumns} data={paginatedData} emptyMessage="No Blog Found!" />

      {/* Only show pagination if more than 1 page */}
      {Math.ceil(blogs.length / pageSize) > 1 && (
        <CustomPagination
          totalItems={blogs.length}
          pageSize={pageSize}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
      )}

      <Modal
        widthClass={viewMode === "view" ? "max-w-7xl" : ""}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={
          viewMode === "view" ? "View Blog Post" : editingBlog ? "Edit Blog Post" : "Create New Blog Post"
        }
      >
        {viewMode === "view" && editingBlog ? (
          <ViewBlog data={editingBlog} />
        ) : (
          <AddBlog
            initialData={editingBlog}
            onCancel={() => {
              handleCloseModal();
              setEditingBlog(null);
            }}
          />
        )}
      </Modal>
    </div>
  );
};

export default ManageBlogPage;

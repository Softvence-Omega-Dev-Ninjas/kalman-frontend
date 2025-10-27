import { Eye, Plus, Search, SquarePen, Trash2 } from "lucide-react";
import { type TBlog } from "./data/blogData";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import type { Column } from "../shared/CustomTable/CustomTable";
import CustomTable from "../shared/CustomTable/CustomTable";
import CustomPagination from "../shared/CustomPagination/CustomPagination";
import Modal from "@/components/reuseable/Modal";
import AddBlog from "./AddBlog";
import {
  useDeleteBlogMutation,
  useGetAllBlogsQuery,
} from "@/redux/features/blog/blogApi";
import ViewBlog from "./ViewBlog";
import { toast } from "react-hot-toast";

const ManageBlogPage = () => {
  const { data } = useGetAllBlogsQuery(undefined);
  const [deleteBlog] = useDeleteBlogMutation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [viewMode, setViewMode] = useState<"view" | "edit" | "add">("add");

  const [editingBlog, setEditingBlog] = useState<TBlog | null>(null);

  // 3. Handlers for Modal
  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);
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
          <div className="flex-shrink-0 w-20 h-12 ">
            <img
              className="w-24 h-12 rounded-md"
              src={
                row?.imeges?.[0] instanceof File
                  ? URL.createObjectURL(row?.imeges?.[0])
                  : row?.imeges?.[0]
              }
              alt={row?.title}
            />
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
          {row?.description.split(" ").slice(0, 6).join(" ")}
          {row?.description.split(" ").length > 6 ? "..." : ""}
        </p>
      ),
    },
    {
      header: "Date",
      cell: (row) => (
        <p className="truncate">{row?.createdAt?.split("T")[0]}</p>
      ),
    },
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
            className="text-gray-400 hover:text-primary focus:outline-none focus:text-primary cursor-pointer"
          >
            <Eye size={18} />
          </button>
          <button
            onClick={() => {
              setEditingBlog(row);
              setViewMode("edit");
              handleOpenModal();
            }}
            className="text-gray-400 hover:text-primary focus:outline-none focus:text-primary cursor-pointer"
          >
            <SquarePen size={18} />
          </button>
          <button
            onClick={() => {
              deleteBlog(row?.id);
              toast.success("Blog deleted successfully!");
            }}
            className="text-gray-400 hover:text-red-600 focus:outline-none focus:text-red-600 cursor-pointer"
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
              placeholder="Search Project..."
            />
          </div>
          <Button
            onClick={() => {
              setEditingBlog(null);
              setViewMode("add");
              setIsModalOpen(true);
            }}
            className="flex items-center px-4 py-2 "
          >
            <Plus size={18} className="mr-2" />
            Add Blog
          </Button>
        </div>
      </header>
      <CustomTable columns={blogColumns} data={data?.data} />
      <CustomPagination
        totalItems={data?.data.length}
        pageSize={pageSize}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />

      <Modal
        widthClass={viewMode === "view" ? "max-w-7xl" : ""}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={
          viewMode === "view"
            ? "View Blog Post"
            : editingBlog
            ? "Edit Blog Post"
            : "Create New Blog Post"
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

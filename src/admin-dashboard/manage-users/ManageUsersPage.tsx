import { Eye, Filter, Search, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import CustomTable, { type Column } from "../shared/CustomTable/CustomTable";
import CustomPagination from "../shared/CustomPagination/CustomPagination";
import toast from "react-hot-toast";
import {
  useDeleteAdminCustomerMutation,
  useGetAllAdminCustomersQuery,
} from "@/redux/features/admin/adminCustomerApi";
import UserDetailDialog from "./UserDetailDialog";

interface IUserData {
  id: string;
  fileName: string;
  email: string;
  image?: string | null;
  type: "Customer" | "Tradesman" | string;
  status: "Active" | "Suspended" | "Deactivated" | string;
  location: string;
  performance?: {
    jobsPosted?: number;
  };
  lastActive?: string;
}

const ManageUsersPage = () => {

       useEffect(()=>{
              document.title = `Manage User | Admin Dashboard | ${import.meta.env.VITE_APP_NAME}`
            }, [])

  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState(search);
  const pageSize = 10;
  // debounce search
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
      setCurrentPage(1);
    }, 500);

    return () => clearTimeout(handler);
  }, [search]);

  // Fetch users
  const { data, isLoading, refetch } = useGetAllAdminCustomersQuery({
    page: currentPage,
    limit: pageSize,
    search: debouncedSearch,
  });

  useEffect(()=>{
  refetch()
}, [])

  const users = data?.data.users || [];
  const totalUser = data?.data.totalUser || 0;

  // Dialog state
  const [selectedUser, setSelectedUser] = useState<IUserData | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Delete mutation
  const [deleteCustomer] = useDeleteAdminCustomerMutation();

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this user?")) return;
    try {
      await deleteCustomer(id).unwrap();
      toast.success("User deleted successfully!");
      refetch();
    } catch (err: any) {
      toast.error(err?.data?.message || "Delete failed");
    }
  };

  const handleView = (user: IUserData) => {
    setSelectedUser(user);
    setIsDialogOpen(true);
  };

  // Map users for table
  const customers: IUserData[] = Array.isArray(users)
    ? users.map((user: any) => ({
        id: user.id,
        fileName: user.name || user.email.split("@")[0],
        email: user.email,
        image: user.profile_image || null,
        type:
          user.role === "CUSTOMER"
            ? "Customer"
            : user.role === "TRADESMAN"
            ? "Tradesman"
            : user.role,
        status: user.verification === "COMPLETE" ? "Active" : "Suspended",
        location: user.city || "-",
        performance: { jobsPosted: user._count?.jobs || 0 },
        lastActive: new Date(user.updatedAt).toLocaleDateString(),
      }))
    : [];

  const totalPages = Math.ceil(totalUser / pageSize);

  // Table columns
  const userColumns: Column<IUserData>[] = [
    {
      header: "",
      cell: () => (
        <div className="flex items-center">
          <input
            type="checkbox"
            className="w-4 h-4 text-purple-600 bg-gray-100 border-gray-300 rounded"
          />
        </div>
      ),
    },
    {
      header: "File Name",
      cell: (row) => (
        <div className="flex items-center">
          {row.image ? (
            <div className="flex-shrink-0 w-10 h-10">
              <img
                className="w-10 h-10 rounded-full object-cover"
                src={row.image}
                alt={row.fileName}
              />
            </div>
          ) : (
            <div className="w-10 h-10 bg-gray-100 flex items-center justify-center rounded-full shadow-lg border-4 border-gray-200" />
          )}
          <div className="ml-4">
            <div className="text-sm font-medium text-gray-900">{row.fileName}</div>
          </div>
        </div>
      ),
    },
    { header: "Email", accessor: "email" },
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
    {
      header: "Status",
      cell: (row) => {
        let colorClass = "";
        switch (row.status) {
          case "Active":
            colorClass = "bg-green-100 text-green-800 border border-green-500";
            break;
          case "Suspended":
            colorClass = "bg-red-100 text-red-800 border border-red-500";
            break;
          case "Deactivated":
            colorClass = "bg-gray-100 text-gray-800 border";
            break;
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
    { header: "Location", accessor: "location" },
    {
      header: "Performance",
      cell: (row) => (
        <div className="flex flex-col items-start">
          {row.performance?.jobsPosted !== undefined && (
            <span className="text-xs text-gray-500">
              {row.performance.jobsPosted} jobs posted
            </span>
          )}
        </div>
      ),
    },
    { header: "Last Active", accessor: "lastActive" },
    {
      header: "Action",
      cell: (row) => (
        <div className="flex items-center space-x-2">
          <button
            onClick={() => handleView(row)}
            className="text-gray-400 hover:text-indigo-600 cursor-pointer"
          >
            <Eye size={18} />
          </button>
          <button
            onClick={() => handleDelete(row.id)}
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
        <h1 className="text-2xl font-bold text-gray-900">User Management</h1>
        <div className="flex items-center space-x-4 flex-wrap gap-5">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search size={18} className="text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-purple-500 focus:border-purple-500"
              placeholder="Search User..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <button className="flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100">
            <Filter size={18} className="mr-2" /> Filter By
          </button>
        </div>
      </header>

      <CustomTable
        columns={userColumns}
        data={customers}
        isLoading={isLoading}
        emptyMessage={"No User Found!"}
      />

      {totalPages > 1 && (
        <CustomPagination
          totalItems={totalUser}
          pageSize={pageSize}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
      )}

      <UserDetailDialog
        user={selectedUser as any}
        open={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
      />
    </div>
  );
};

export default ManageUsersPage;

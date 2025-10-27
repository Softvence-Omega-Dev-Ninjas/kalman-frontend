import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import type { IUserData } from "./data/usersData";
// import type { IUserData } from "./data/usersData";

interface UserDetailDialogProps {
  user: IUserData | null;
  open: boolean;
  onClose: () => void;
}

const UserDetailDialog = ({ user, open, onClose }: UserDetailDialogProps) => {
  if (!user) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="w-full max-w-3xl mt-22 sm:my-0 md:min-w-7xl p-8 bg-white rounded-xl shadow-xl">
        <DialogHeader>
          <DialogTitle className="text-3xl font-bold text-gray-900">
            User Details
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col md:flex-row gap-8 mt-6">
          {/* Left: Profile Image */}
          <div className="md:w-1/3 flex justify-center items-start">
            {user.image ? (
              <img
                src={user.image}
                alt={user.fileName}
                className="w-64 h-64 object-cover rounded-full shadow-lg border-4 border-purple-200"
              />
            ) : (
              <div className="w-64 h-64 bg-gray-100 flex items-center justify-center rounded-full shadow-lg border-4 border-gray-200">
                <span className="text-gray-400 font-semibold text-center text-lg">
                  No Image
                </span>
              </div>
            )}
          </div>

          {/* Right: User Info */}
          <div className="md:w-2/3 flex flex-col gap-6">
            <h3 className="text-2xl font-semibold text-gray-900">{user.fileName}</h3>

            {/* Info Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Email */}
              <div className="bg-gray-50 p-5 rounded-xl shadow hover:shadow-lg transition">
                <p className="text-gray-600  mb-1">Email</p>
                <p className="text-gray-900 text-lg">{user.email}</p>
              </div>

              {/* Type */}
              <div className="bg-gray-50 p-5 rounded-xl shadow hover:shadow-lg transition flex items-center justify-between">
                <p className="text-gray-600 font-medium">Type</p>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    user.type === "Customer"
                      ? "bg-purple-100 text-purple-700 border border-purple-600"
                      : "bg-blue-100 text-blue-800 border border-blue-600"
                  }`}
                >
                  {user.type}
                </span>
              </div>

              {/* Status */}
              <div className="bg-gray-50 p-5 rounded-xl shadow hover:shadow-lg transition flex items-center justify-between">
                <p className="text-gray-600 font-medium">Status</p>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    user.status === "Active"
                      ? "bg-green-100 text-green-800 border border-green-500"
                      : user.status === "Suspended"
                      ? "bg-red-100 text-red-800 border border-red-500"
                      : "bg-gray-100 text-gray-800 border"
                  }`}
                >
                  {user.status}
                </span>
              </div>

              {/* Location */}
              <div className="bg-gray-50 p-5 rounded-xl shadow hover:shadow-lg transition">
                <p className="text-gray-600 font-medium mb-1">Location</p>
                <p className="text-gray-900">{user.location || "N/A"}</p>
              </div>

              {/* Performance */}
              {user.performance && (
                <div className="bg-gray-50 p-5 rounded-xl shadow hover:shadow-lg transition">
                  <p className="text-gray-600 font-medium mb-1">Performance</p>
                  <p className="text-gray-900">
                    {user.performance.jobsPosted !== undefined
                      ? `${user.performance.jobsPosted} jobs posted`
                      : "N/A"}
                  </p>
                </div>
              )}

              {/* Last Active */}
              <div className="bg-gray-50 p-5 rounded-xl shadow hover:shadow-lg transition">
                <p className="text-gray-600 font-medium mb-1">Last Active</p>
                <p className="text-gray-900">{user.lastActive || "N/A"}</p>
              </div>
            </div>
          </div>
        </div>

        <DialogClose className="flex justify-end mt-8">
          <Button variant="outline" size="lg">
            Close
          </Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
};

export default UserDetailDialog;

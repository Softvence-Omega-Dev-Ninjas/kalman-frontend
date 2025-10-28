import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import type { IUserData } from "./data/usersData";

interface UserDetailDialogProps {
  user: IUserData | null;
  open: boolean;
  onClose: () => void;
}

const UserDetailDialog = ({ user, open, onClose }: UserDetailDialogProps) => {
  if (!user) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="w-full max-w-3xl max-h-[90vh] p-4 md:p-6 rounded-xl overflow-y-auto bg-white shadow-xl">
        <DialogHeader>
          <DialogTitle className="text-xl md:text-2xl font-bold text-gray-900 text-center md:text-left">
            User Details
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-6 mt-4">
          {/* Left: Profile Image */}
          <div className=" flex justify-center items-start">
            {user.image ? (
              <img
                src={user.image}
                alt={user.fileName}
                className="w-40 h-40 md:w-64 md:h-64 object-cover rounded-full shadow-lg border-4 border-purple-200"
              />
            ) : (
              <div className="w-40 h-40 md:w-64 md:h-64 bg-gray-100 flex items-center justify-center rounded-full shadow-lg border-4 border-gray-200">
                <span className="text-gray-400 font-semibold text-center text-sm md:text-lg">
                  No Image
                </span>
              </div>
            )}
          </div>

          {/* Right: User Info */}
          <div className="w-full flex flex-col gap-4 md:gap-6 text-sm md:text-base">
            <h3 className="text-lg md:text-2xl font-semibold text-gray-900">{user.fileName}</h3>

            {/* Info Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              {/* Email */}
              <div className="bg-gray-50 p-4 md:p-5 rounded-xl shadow hover:shadow-lg transition">
                <p className="text-gray-600 mb-1">Email</p>
                <p className="text-gray-900 text-sm md:text-base">{user.email}</p>
              </div>

              {/* Type */}
              <div className="bg-gray-50 p-4 md:p-5 rounded-xl shadow hover:shadow-lg transition flex items-center justify-between">
                <p className="text-gray-600 font-medium">Type</p>
                <span
                  className={`px-3 py-1 rounded-full text-xs md:text-sm font-semibold ${
                    user.type === "Customer"
                      ? "bg-purple-100 text-purple-700 border border-purple-600"
                      : "bg-blue-100 text-blue-800 border border-blue-600"
                  }`}
                >
                  {user.type}
                </span>
              </div>

              {/* Status */}
              <div className="bg-gray-50 p-4 md:p-5 rounded-xl shadow hover:shadow-lg transition flex items-center justify-between">
                <p className="text-gray-600 font-medium">Status</p>
                <span
                  className={`px-3 py-1 rounded-full text-xs md:text-sm font-semibold ${
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
              <div className="bg-gray-50 p-4 md:p-5 rounded-xl shadow hover:shadow-lg transition">
                <p className="text-gray-600 font-medium mb-1">Location</p>
                <p className="text-gray-900">{user.location || "N/A"}</p>
              </div>

              {/* Performance */}
              {user.performance && (
                <div className="bg-gray-50 p-4 md:p-5 rounded-xl shadow hover:shadow-lg transition">
                  <p className="text-gray-600 font-medium mb-1">Performance</p>
                  <p className="text-gray-900">
                    {user.performance.jobsPosted !== undefined
                      ? `${user.performance.jobsPosted} jobs posted`
                      : "N/A"}
                  </p>
                </div>
              )}

              {/* Last Active */}
              <div className="bg-gray-50 p-4 md:p-5 rounded-xl shadow hover:shadow-lg transition">
                <p className="text-gray-600 font-medium mb-1">Last Active</p>
                <p className="text-gray-900">{user.lastActive || "N/A"}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end mt-6">
          <DialogClose asChild>
            <Button size="sm" className="bg-[#FF7346] text-white hover:bg-[#e66534]">
              Close
            </Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UserDetailDialog;

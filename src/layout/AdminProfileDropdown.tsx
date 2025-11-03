import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { adminLogout } from "@/redux/features/admin/adminSlice";
import { useAppDispatch, useAppSelector } from "@/redux/typeHook";
import { useState, useEffect, useRef } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const AdminProfileDropdown = () => {
  const { admin } = useAppSelector((state) => state.admin);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  // Derived info
  const displayName = admin?.name || admin?.email?.split("@")[0] || "User";
  const email = admin?.email || "N/A";
  const role = admin?.role || "N/A";

  const handleLogout = () => {
    // Clear Redux state
    dispatch(adminLogout());
    // Redirect to login
    navigate("/admin/login");
    toast("Admin logout successfully!");
  };

  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Avatar Trigger */}
      <div onClick={() => setOpen((prev) => !prev)} className="cursor-pointer">
        <Avatar className="h-10 w-10">
          {admin?.image ? (
            <AvatarImage src={admin.image} alt={displayName} />
          ) : (
            <AvatarFallback className="bg-gray-700 text-white">
              {displayName[0]}
            </AvatarFallback>
          )}
        </Avatar>
      </div>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 mt-2 w-56 p-4 space-y-2 rounded-xl shadow-lg bg-white border border-gray-200 z-50">
          {/* Profile Info */}
          <div className="flex flex-col items-start gap-2">
            <p className="font-bold text-gray-900 text-sm">{displayName}</p>
            <p className="text-xs text-gray-500 truncate">{email}</p>
            <span className="text-xs font-medium px-2 py-1 rounded-full bg-purple-100 text-purple-700 border border-purple-600">
              Role: {role}
            </span>
          </div>

          <hr className="border-gray-200 my-2" />

          {/* Logout Button */}
          <Button className="w-full cursor-pointer" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      )}
    </div>
  );
};

export default AdminProfileDropdown;

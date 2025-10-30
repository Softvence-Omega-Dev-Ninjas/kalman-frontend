import { useAppSelector } from "@/redux/typeHook";
import { Navigate } from "react-router-dom";
import toast from "react-hot-toast";

interface Props {
  children: React.ReactNode;
}

const UserProtectedRoute = ({ children }: Props) => {
  const { user, token } = useAppSelector((state) => state.auth);

  if (!token) {
    toast.error("Please login to continue!");
    return <Navigate to="/general-login" replace />;
  }

  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const decoded = JSON.parse(window.atob(base64));
    const exp = decoded?.exp ? decoded.exp * 1000 : 0;

    if (Date.now() > exp) {
      toast.error("Session expired! Please login again.");
      return <Navigate to="/admin/general-login" replace />;
    }
  } catch {
    toast.error("Invalid token! Please login again.");
    return <Navigate to="/admin/general-login" replace />;
  }

  if (user?.role !== "CUSTOMER") {
    toast.error("Access denied! Only customers can access this page.");
    return <Navigate to="/general-login" replace />;
  }

  return <>{children}</>;
};

export default UserProtectedRoute;

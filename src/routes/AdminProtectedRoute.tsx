import { useAppSelector } from "@/redux/typeHook";
import { Navigate } from "react-router-dom";
import toast from "react-hot-toast";

interface Props {
  children: React.ReactNode;
}

const AdminProtectedRoute = ({ children }: Props) => {
  const { admin, token } = useAppSelector((state) => state.admin);

  if (!token) {
    toast.error("Please login to continue!");
    return <Navigate to="/admin/login" replace />;
  }

  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const decoded = JSON.parse(window.atob(base64));
    const exp = decoded?.exp ? decoded.exp * 1000 : 0;

    if (Date.now() > exp || !admin) {
      toast.error("Session expired! Please login again.");
      return <Navigate to="/admin/login" replace />;
    }

    return <>{children}</>;
  } catch {
    toast.error("Invalid token! Please login again.");
    return <Navigate to="/admin/login" replace />;
  }
};

export default AdminProtectedRoute;

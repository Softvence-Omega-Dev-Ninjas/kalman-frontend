import { useAppSelector } from "@/redux/typeHook";
import { Navigate } from "react-router-dom";

interface Props {
  children: React.ReactNode;
}

const AdminProtectedRoute = ({ children }: Props) => {
  const { admin, token } = useAppSelector((state) => state.admin);
// console.log(admin, "------------")
  if (!token) return <Navigate to="/admin/login" replace />;

  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const decoded = JSON.parse(window.atob(base64));
    const exp = decoded?.exp ? decoded.exp * 1000 : 0;

    if (Date.now() > exp || !admin) {
      return <Navigate to="/admin/login" replace />;
    }

    return children;
  } catch {
    return <Navigate to="/admin/login" replace />;
  }
};

export default AdminProtectedRoute;

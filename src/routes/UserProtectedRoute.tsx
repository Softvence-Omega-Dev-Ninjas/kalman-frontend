import { useAppSelector } from "@/redux/typeHook";
import { Navigate } from "react-router-dom";

interface Props {
  children: React.ReactNode;
}

const UserProtectedRoute = ({ children }: Props) => {
  const { user, token } = useAppSelector((state) => state.auth);

  if (!token) return <Navigate to="/admin/login" replace />;

  if (user?.role !== "CUSTOMER") return <Navigate to="/admin/general-login" replace />;

  return <>{children}</>;
};

export default UserProtectedRoute;

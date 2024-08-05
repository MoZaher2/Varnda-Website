import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ role }) => {
  return role==="admin" ? <Outlet /> : <Navigate to="/" replace />;
};

export default ProtectedRoute;

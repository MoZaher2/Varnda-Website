import { Navigate, Outlet } from "react-router-dom";

const AdminRoute = ({ role }) => {
  return role==="admin" ? <Outlet /> : <Navigate to="/" replace />;
};

export default AdminRoute;

import { Navigate, Outlet } from "react-router-dom";
const UserRoute = ({ role }) => {
  console.log(role);
  return role==="user"||role==="admin" ? <Outlet /> : <Navigate to="/login" replace />;
};
export default UserRoute;

import { useState, useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import api from "../../API/ApiLink";
import OverPage from "../OverPage/OverPage";

const UserRoute = ({ isAuth, role }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  console.log(isAuth);
  console.log(role);

  useEffect(() => {
    const handleToken = async () => {
      try {
        const response = await api.get("/getAuthStatus", {
          headers: {
            Authorization: `Bearer ${isAuth}`,
          },
        });
        const tokenValid = response.data.auth;
        if (tokenValid) {
            setIsAuthenticated(true);
          }
        else {
          setIsAuthenticated(false);
        }
      } catch (err) {
        console.log(err);
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };
    handleToken();
  }, [isAuth, role]);

  if (isLoading) {
    return <OverPage/>;
  }
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default UserRoute;
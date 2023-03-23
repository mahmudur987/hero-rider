import { React, useContext } from "react";
import { toast } from "react-hot-toast";
import { Navigate, useLocation } from "react-router-dom";
import { authContext } from "../Context/UserContext";

const PrivatRoutes = ({ children }) => {
  const location = useLocation();
  const { user, loading } = useContext(authContext);
  // console.log(user);
  if (loading) {
    return (
      <div>
        <h1 className="text-5xl text-center">Loading</h1>
      </div>
    );
  }

  if (user?.email !== "admin@admin.com") {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    toast.error("please login with admin email and password");
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default PrivatRoutes;

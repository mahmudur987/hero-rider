import { createBrowserRouter } from "react-router-dom";
import Main from "../Layouts/Main";
import Dashboard from "../Pages/Dashboard/Dashboard";
import UserList from "../Pages/Dashboard/UserList";
import Home from "../Pages/Home/Home";
import LogIn from "../Pages/LogIn/LogIn";
import Profile from "../Pages/profile/Profile";
import SignbUpLearner from "../Pages/SignUP/SignbUpLearner";
import SignUp from "../Pages/SignUP/SignUp";
import PrivatRoutes from "./PrivetRoutes";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/dashboard",
        element: (
          <PrivatRoutes>
            <Dashboard></Dashboard>
          </PrivatRoutes>
        ),
        children: [
          {
            path: "/dashboard",
            element: <UserList />,
          },
        ],
      },

      {
        path: "/login",
        element: <LogIn></LogIn>,
      },
      {
        path: "/signup",
        element: <SignUp></SignUp>,
      },
      {
        path: "/signuplearner",
        element: <SignbUpLearner />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
    ],
  },
]);

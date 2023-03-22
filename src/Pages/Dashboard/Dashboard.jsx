import React, { useContext } from "react";
import { Link, Outlet } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";

const Dashboard = () => {
  return (
    <div className="drawer drawer-mobile">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        <label
          htmlFor="my-drawer-2"
          className="btn text-2xl   btn-sm drawer-button lg:hidden"
        >
          <GiHamburgerMenu />
        </label>
        <Outlet />
      </div>
      <div className="drawer-side ">
        <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
        <ul className="menu p-4 w-72 font-bold lg:border m-5 text-base-content">
          <li>
            <Link to={"/dashboard"}>User List</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;

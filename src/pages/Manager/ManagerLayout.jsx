import React from "react";

import SideBarManager from "../../components/SideBar/SideBarManager";
import { Outlet } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ManagerLayout() {
  return (
    <div className="flex h-screen">
      <SideBarManager />
      <div className="flex-1 overflow-auto">
        <Outlet />
        <ToastContainer />
      </div>
    </div>
  );
}

export default ManagerLayout;

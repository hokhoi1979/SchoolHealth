import React, { useEffect } from "react";

import SideBarManager from "../../components/SideBar/SideBarManager";
import { Outlet } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Toaster } from "react-hot-toast";

function ManagerLayout() {
  useEffect(() => {
    toast.success("Login successful!");
  }, []);
  return (
    <div className="flex h-screen">
      <SideBarManager />
      <div className="flex-1 overflow-auto">
        <Outlet />
        <Toaster position="top-right" />
      </div>
    </div>
  );
}

export default ManagerLayout;

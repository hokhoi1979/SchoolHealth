import React, { useEffect } from "react";

import SideBarManager from "../../components/SideBar/SideBarManager";
import { Outlet } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Toaster } from "react-hot-toast";
import SideBarAdmin from "../../components/SideBar/SideBarAdmin";

function AdminLayout() {
  return (
    <div className="flex h-screen">
      <SideBarAdmin />
      <div className="flex-1 overflow-auto">
        <Outlet />
        <Toaster position="top-right" />
      </div>
    </div>
  );
}

export default AdminLayout;

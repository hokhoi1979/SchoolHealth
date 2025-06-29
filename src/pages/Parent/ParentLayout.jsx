import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import SideBar from "../../components/SideBar/SideBarParent";
import { toast } from "react-toastify";
const ParentLayout = () => {
  useEffect(() => {
    toast.success("Login successful!");
  }, []);
  return (
    <div className="flex h-screen">
      <SideBar />
      <div className="flex-1 overflow-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default ParentLayout;

import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import SideBar from "../../components/SideBar/SideBarNurse";

import { toast } from "react-toastify";

const NurseLayout = () => {
  useEffect(() => {
    toast.success("Login successful!");
  }, []); // chỉ gọi 1 lần khi component mount

  return (
    <div className="flex h-screen">
      <SideBar />
      <div className="flex-1 overflow-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default NurseLayout;

import React from "react";
import { useState } from "react";
import CommonBreadcrumb from "../../../components/CommonBreadcrumb/CommonBreadcrumb";
import { Link, Outlet } from "react-router-dom";
import { AppFooter } from "../../../components/Footer/AppFooter";

const History = () => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="flex flex-col min-h-screen">
      <h1 className="pl-10 pt-5 text-xl font-inria font-medium mb-4">
        <CommonBreadcrumb role={"Parent"} page={"history"} />
      </h1>
      <div className="p-6 flex flex-col flex-1">
        <h1 className="text-3xl font-bold text-blue-400 ml-5">
          HISTORY & DASHBOARD
        </h1>
        <p className="pt-5 ml-5 text-blue-400">
          View health record declaration history, send medication and confirm
          notifications.
        </p>
        <div className="flex mt-5 bg-[#F3F3F3] font-kameron w-[500px] h-10 items-center rounded-xl ml-5">
          <div className="m-auto flex gap-5">
            <div className="hover:bg-white p-1 rounded-lg w-50">
              <Link to={""}>All Information</Link>
            </div>
            <div className="hover:bg-white p-1 rounded-lg w-50">
              <Link to={"health_infor"}>Student Health</Link>
            </div>
            <div className="hover:bg-white p-1 rounded-lg w-50">
              <Link to={"send_result"}>Medical Request</Link>
            </div>
            <div className="hover:bg-white p-1 rounded-lg w-50">
              <Link to={"notification"}>Notification Confirm</Link>
            </div>
          </div>
        </div>
        <div className="flex-1 overflow-auto mt-5 ml-5 mr-5">
          <Outlet />
        </div>
        <div className="h-[160px] w-full"></div>
      </div>
      <AppFooter />
    </div>
  );
};
export default History;

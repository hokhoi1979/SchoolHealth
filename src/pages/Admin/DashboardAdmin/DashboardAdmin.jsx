import React from "react";
import CommonBreadcrumb from "../../../components/CommonBreadcrumb/CommonBreadcrumb";
import { Link, Outlet } from "react-router-dom"; // Đã sửa
import { AppFooter } from "../../../components/Footer/AppFooter";

function DashboardAdmin() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Tiêu đề breadcrumb */}
      <h1 className="pl-10 pt-5 text-xl font-inria font-medium mb-4">
        <CommonBreadcrumb role={"Admin"} page={"dashboard"} />
      </h1>

      {/* Thanh chọn dashboard con */}
      <div className="flex justify-center mt-5 bg-[#f3f3f300] w-[300px] h-10 rounded-xl">
        <div className="flex gap-10">
          <Link to={""}>Health Profile</Link>
          <Link to={"medical_event"}>Medical Event</Link>
        </div>
      </div>

      {/* Vùng render nội dung dashboard con */}
      <div className="flex-1 mt-6 px-10 pb-[180px]">
        <Outlet />
      </div>

      {/* Footer */}
      <AppFooter />
    </div>
  );
}

export default DashboardAdmin;

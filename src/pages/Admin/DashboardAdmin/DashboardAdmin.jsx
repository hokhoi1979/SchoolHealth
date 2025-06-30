import React from "react";
import CommonBreadcrumb from "../../../components/CommonBreadcrumb/CommonBreadcrumb";

function DashboardAdmin() {
  return (
    <div className="p-5">
      <CommonBreadcrumb role={"Admin"} page={"dashboard"} />
    </div>
  );
}

export default DashboardAdmin;

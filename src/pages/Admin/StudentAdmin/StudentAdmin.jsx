import React from "react";
import CommonBreadcrumb from "../../../components/CommonBreadcrumb/CommonBreadcrumb";

function StudentAdmin() {
  return (
    <div className="p-5">
      <CommonBreadcrumb role={"Admin"} page={"student"} />
    </div>
  );
}

export default StudentAdmin;

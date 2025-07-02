import React from "react";
import CommonBreadcrumb from "../../../components/CommonBreadcrumb/CommonBreadcrumb";

function AccountAdmin() {
  return (
    <div className="p-5">
      <CommonBreadcrumb role={"Admin"} page={"account"} />
    </div>
  );
}

export default AccountAdmin;

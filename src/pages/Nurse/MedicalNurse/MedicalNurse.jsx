import { Button, Input, Modal, Space, Table, Tooltip } from "antd";
import React, { useEffect, useState } from "react";

import { AppFooter } from "../../../components/Footer/AppFooter";
import CommonBreadcrumb from "../../../components/CommonBreadcrumb/CommonBreadcrumb";
import { Link, Outlet } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { fetchCheckup } from "../../../redux/checkupNurse/checkupDay/checkupSlice";

const MedicalNurse = () => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [click, setClick] = useState("medicalDay");

  const showModal = () => {
    setOpen(true);
  };

  const handleCancel = () => {};
  const closeModal = () => {
    setOpen(false);
  };
  const handleOK = () => {
    setLoading(true);

    setTimeout(() => {
      setOpen(false);
      setLoading(false);
    }, 3000);
  };

  return (
    <>
      {" "}
      <div className="flex flex-col min-h-screen">
        <div className="p-6 flex flex-col flex-1">
          <h1 className="text-xl font-inria font-medium mb-4">
            <CommonBreadcrumb role={"Nurse"} page={"medicalCheckup"} />
          </h1>

          <div className="flex-1 overflow-auto mr-5 mt-5 mb-10">
            <Outlet />
          </div>
        </div>

        <AppFooter />
      </div>
      <Modal
        open={open}
        title="New Medical Event"
        onOk={handleOK}
        onCancel={closeModal}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Return
          </Button>,
          <Button key="submit" type="primary" loading={loading}>
            Submit
          </Button>,
        ]}
      ></Modal>
    </>
  );
};

export default MedicalNurse;

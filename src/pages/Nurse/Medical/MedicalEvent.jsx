import { Button, Input, Modal, Space, Table, Tooltip } from "antd";
import React, { useState } from "react";

import { AppFooter } from "../../../components/Footer/AppFooter";
import CommonBreadcrumb from "../../../components/CommonBreadcrumb/CommonBreadcrumb";
import { Link, Outlet } from "react-router";

const MedicalEvent = () => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [click, setClick] = useState("vaccineDay");
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
            <CommonBreadcrumb role={"Nurse"} page={"medicalEvent"} />
          </h1>

          <div className="grid grid-cols-4 gap-5 mt-5 w-[100%] pl-5 pr-5 font-kameron ">
            <div className="h-[120px] bg-white rounded-2xl">
              <p className="flex justify-center mt-5">Total Vaccination</p>
              <p className="flex justify-center text-[50px]">40</p>
            </div>
            <div className="h-[120px] bg-white rounded-2xl">
              <p className="flex justify-center mt-5">Sick student</p>
              <p className="flex justify-center text-[50px]">12</p>
            </div>
            <div className="h-[120px] bg-white rounded-2xl">
              <p className="flex justify-center mt-5">
                Waiting for Confirmation
              </p>
              <p className="flex justify-center text-[50px]">7</p>
            </div>
          </div>

          <div className="flex bg-[#F3F3F3] font-kameron w-[430px] h-10 items-center rounded-md ml-5 mt-5">
            <div className="m-auto flex gap-5">
              <div
                className={`hover:bg-white p-1 rounded-md ${
                  click === "vaccineDay" ? "bg-white rounded-md text-black" : ""
                }`}
              >
                <Link onClick={() => setClick("vaccineDay")} to={""}>
                  Vaccination day
                </Link>
              </div>
              <div
                className={`hover:bg-white p-1 rounded-md ${
                  click === "studentList"
                    ? "bg-white rounded-md text-black"
                    : ""
                }`}
              >
                <Link
                  onClick={() => setClick("studentList")}
                  to={"studentList"}
                >
                  Student list
                </Link>
              </div>

              <div
                className={`hover:bg-white p-1 rounded-md ${
                  click === "vaccineHistory"
                    ? "bg-white rounded-md text-black"
                    : ""
                }`}
              >
                <Link
                  onClick={() => setClick("vaccineHistory")}
                  to={"vaccineHistory"}
                >
                  Vaccination history
                </Link>
              </div>
            </div>
          </div>

          <div className="pl-5 mt-5 flex gap-5">
            <Input
              style={{ borderRadius: "7px", width: "300px" }}
              placeholder="Search vaccination"
            />
            <Button
              className="!bg-[#90A8B0] !hover:bg-gray-600"
              type="secondary"
            >
              <p className="text-white font-kameron"> Search</p>
            </Button>
          </div>
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

export default MedicalEvent;

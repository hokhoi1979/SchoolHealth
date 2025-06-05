import React, { useState } from "react";
import { AppFooter } from "../../../components/Footer/AppFooter";
import CommonBreadcrumb from "../../../components/CommonBreadcrumb/CommonBreadcrumb";
import { Link } from "react-router-dom";
import { Button, Input, Modal, Select, Space, Table, Tooltip } from "antd";
import { Option } from "antd/es/mentions";
import TextArea from "antd/es/input/TextArea";

const MedicalEvent = () => {
  const [open, setOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("Choose Event");
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      align: "center",
    },
    {
      title: "Student",
      dataIndex: "name",
      key: "name",
      align: "center",
    },
    {
      title: "Grade",
      dataIndex: "grade",
      key: "grade",
      align: "center",
    },
    {
      title: "Type Event",
      dataIndex: "type",
      key: "type",
      align: "center",
    },

    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      align: "center",
    },
    {
      title: "Handle Event",
      dataIndex: "handle",
      key: "handle",
      align: "center",
    },
    {
      title: "Time",
      dataIndex: "time",
      key: "time",
      align: "center",
    },
  ];

  const dataSource = [
    {
      id: "SE182629",
      name: "Ho Khoi",
      grade: "12A3",
      type: "sot",
      description: "Sốt 38.5°C, đau đầu",
      handle: "Uống thuốc hạ sốt, nghỉ ngơi",
      time: "10:15-31/5/2025",
    },
    {
      id: "SE182629",
      name: "Ho Khoi",
      grade: "12A3",
      type: "sot",
      description: "Sốt 38.5°C, đau đầu",
      handle: "Uống thuốc hạ sốt, nghỉ ngơi",
      time: "10:15-31/5/2025",
    },
    {
      id: "SE182629",
      name: "Ho Khoi",
      grade: "12A3",
      type: "sot",
      description: "Sốt 38.5°C, đau đầu",
      handle: "Uống thuốc hạ sốt, nghỉ ngơi",
      time: "10:15-31/5/2025",
    },
    {
      id: "SE182629",
      name: "Ho Khoi",
      grade: "12A3",
      type: "sot",
      description: "Sốt 38.5°C, đau đầu",
      handle: "Uống thuốc hạ sốt, nghỉ ngơi",
      time: "10:15-31/5/2025",
    },
    {
      id: "SE182629",
      name: "Ho Khoi",
      grade: "12A3",
      type: "sot",
      description: "Sốt 38.5°C, đau đầu",
      handle: "Uống thuốc hạ sốt, nghỉ ngơi",
      time: "10:15-31/5/2025",
    },
  ];
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
              <p className="flex justify-center mt-5">Total Event</p>
              <p className="flex justify-center text-[50px]">12</p>
            </div>
            <div className="h-[120px] bg-white rounded-2xl">
              <p className="flex justify-center mt-5">Total sick</p>
              <p className="flex justify-center text-[50px]">12</p>
            </div>
            <div className="h-[120px] bg-white rounded-2xl">
              <p className="flex justify-center mt-5">Total injured</p>
              <p className="flex justify-center text-[50px]">7</p>
            </div>
          </div>
          <div className="pl-5 mt-5 flex justify-between">
            <div className="flex gap-5">
              {" "}
              <Input
                style={{ borderRadius: "7px", width: "300px" }}
                placeholder="Search for ID, Name student..."
              />
              <Button
                className="!bg-[#90A8B0] !hover:bg-gray-600"
                type="secondary"
              >
                <p className="text-white font-kameron"> Search</p>
              </Button>
            </div>
            <Button
              type="secondary"
              className="!bg-black hover:!bg-gray-600"
              onClick={() => setOpen(true)}
            >
              <p
                className="text-white font-serif p-1"
                onClick={() => setOpen(true)}
              >
                + Add Event
              </p>
            </Button>
          </div>
          <Table className="mt-5" columns={columns} dataSource={dataSource} />
        </div>
        <div className="h-30"></div>

        <AppFooter />

        <Modal open={open} onCancel={() => setOpen(false)} footer={null}>
          <div className="font-serif">
            <h1 className=" text-3xl flex justify-center">
              Add New Medical Event
            </h1>
            <p className=" flex justify-center text-gray-400 mt-1">
              Enter basic information about the student's medical event
            </p>

            <div className="grid grid-cols-2 gap-4 mt-3">
              <div>
                <p>ID Student</p>
                <Input placeholder="Enter ID Student"></Input>
              </div>
              <div>
                <p>Student</p>
                <Input placeholder="Enter Name Student"></Input>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-3">
              <div>
                <p>Grade</p>
                <Input placeholder="Enter ID Student"></Input>
              </div>
              <div>
                <div>
                  <p>Type</p>
                  <Select
                    placeholder="Select action"
                    value={selectedOption}
                    onChange={(value) => setSelectedOption(value)}
                    className="w-full rounded-md"
                  >
                    <Option value="fever">Fever, flu</Option>
                    <Option value="stomach">Stomach ache</Option>
                    <Option value="allergy">Allergy</Option>
                    <Option value="headache">Headache</Option>
                    <Option value="others">Others</Option>
                  </Select>
                </div>
              </div>
            </div>

            <div className="mt-3">
              <p>Description</p>
              <TextArea cols={3} placeholder="Enter"></TextArea>
            </div>

            <div className="mt-3">
              <p>Handle Event</p>
              <TextArea cols={3} placeholder="Enter">
                Enter
              </TextArea>
            </div>

            <div className="flex mt-5 justify-between">
              <div></div>
              <div className="flex gap-3">
                <Button
                  type="secondary"
                  className="!bg-[#E26666] hover:!bg-[#E53838] w-[100px]"
                  onClick={() => setOpen(false)}
                >
                  <p className="text-white text-xl font-serif p-1">Cancel</p>
                </Button>
                <Button
                  type="secondary"
                  className="!bg-[#6CC76F] hover:!bg-[#29CD2F] w-[100px]"
                  onClick={() => setOpen(true)}
                >
                  <p className="text-white text-xl font-serif p-1">Save</p>
                </Button>
              </div>
            </div>
          </div>
        </Modal>
      </div>
    </>
  );
};

export default MedicalEvent;

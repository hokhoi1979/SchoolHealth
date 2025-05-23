import React, { useState } from "react";

import { Link } from "react-router";
import { Button, Input, Modal, Select, Space, Table, Tooltip } from "antd";
import TextArea from "antd/es/input/TextArea";
import CommonBreadcrumb from "../../../components/CommonBreadcrumb/CommonBreadcrumb";
function Materials() {
  const [open, setOpen] = useState(false);
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      align: "center",
    },
    {
      title: "Name of medicine/supplies",
      dataIndex: "nameMedicine",
      key: "nameMedicine",
      align: "center",
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      align: "center",
    },
    {
      title: "Number",
      dataIndex: "number",
      key: "number",
      align: "center",
    },
    {
      title: "Inventory",
      dataIndex: "inventory",
      key: "inventory",
      align: "center",
    },
    {
      title: "Action",
      key: "action",
      align: "center",
      render: (_, record) => (
        <Space>
          <Tooltip
            placement="bottom"
            title="View"
            overlayInnerStyle={{
              fontFamily: "Poppins, sans-serif",
              fontSize: "12px",
            }}
          >
            <div style={{ cursor: "pointer" }}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={20}
                height={20}
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M12 9a3 3 0 0 0-3 3a3 3 0 0 0 3 3a3 3 0 0 0 3-3a3 3 0 0 0-3-3m0 8a5 5 0 0 1-5-5a5 5 0 0 1 5-5a5 5 0 0 1 5 5a5 5 0 0 1-5 5m0-12.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5"
                ></path>
              </svg>
            </div>
          </Tooltip>
        </Space>
      ),
    },
  ];

  const dataSource = [
    {
      id: "MED001",
      nameMedicine: "Paracetamol",
      type: "Tablet",
      number: 150,
      inventory: "Available",
    },
    {
      id: "MED002",
      nameMedicine: "Amoxicillin",
      type: "Capsule",
      number: 80,
      inventory: "Low Stock",
    },
    {
      id: "MED003",
      nameMedicine: "Syringe 5ml",
      type: "Supply",
      number: 300,
      inventory: "Available",
    },
    {
      id: "MED004",
      nameMedicine: "Vitamin C",
      type: "Tablet",
      number: 0,
      inventory: "Out of Stock",
    },
  ];

  const data = [{}];

  return (
    <>
      <div className="p-6">
        <h1 className="text-xl font-inria font-medium mb-4">
          <CommonBreadcrumb role={"Nurse"} page={"materials"} />
        </h1>

        {/* <p className="text-[#787878] font-inria ">{text.dashboardTitle}</p> */}

        <div className="grid grid-cols-2 gap-5 mt-5 w-[50%] pl-5 pr-5 font-kameron ">
          <div className="h-[120px] bg-white rounded-2xl">
            <p className="flex justify-center mt-5">Total Drugs</p>
            <p className="flex justify-center text-[50px]">7</p>
          </div>
          <div className="h-[120px] bg-white rounded-2xl">
            <p className="flex justify-center mt-5">Out of Stoke</p>
            <p className="flex justify-center text-[50px]">12</p>
          </div>
        </div>

        <div className="pl-5 mt-5 flex gap-5">
          <Input
            style={{ borderRadius: "7px", width: "300px" }}
            placeholder="Search drugs, materials..."
          ></Input>

          <Button className="!bg-[#90A8B0] !hover:bg-gray-600" type="secondary">
            <p className="text-white font-kameron"> Search</p>
          </Button>
        </div>

        <div className="flex justify-between">
          <div className="flex mt-5 bg-[#F3F3F3] font-kameron w-[400px] h-10 items-center rounded-xl ml-5">
            <div className=" m-auto flex gap-5">
              <div className="hover:bg-white p-1 rounded-lg">
                <Link>Inventory</Link>
              </div>
              <div className="hover:bg-white p-1 rounded-lg">
                <Link>Import</Link>
              </div>
              <div className="hover:bg-white p-1 rounded-lg">
                <Link>Export</Link>
              </div>
              <div className="hover:bg-white p-1 rounded-lg">
                <Link>Drugs for Student</Link>
              </div>
            </div>
          </div>

          <Button
            type="secondary"
            className="!bg-black !hover:bg-gray-600"
            onClick={() => setOpen(true)}
          >
            <p className="text-white font-kameron p-1">+ Import Medicine</p>
          </Button>
        </div>

        <Table className="mt-5" columns={columns} dataSource={dataSource} />

        <Modal open={open} onCancel={() => setOpen(false)} footer={false}>
          <h1 className="font-kameron text-2xl flex justify-center">
            Import medicine/medical supplies
          </h1>

          <div>
            <h1 className="text-[17px] font-medium font-kameron mt-3">
              Choose medicine/ medical
            </h1>
            <Select
              placeholder="--Choose medicine/medical--"
              className="w-full"
            >
              <Option value="Paracetamol 250mg">Paracetamol 250mg</Option>
              <Option value="Betadine 100ml">Betadine 100ml</Option>
              <Option value="Band-Aid">Band-Aid</Option>
              <Option value="Cough medicine">Cough medicine</Option>
              <Option value="Medical cotton">Medical cotton</Option>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <h1 className="text-[17px] font-medium font-kameron mt-3">
                Quantity imported
                <Input type="number"></Input>
              </h1>
            </div>
            <div>
              <h1 className="text-[17px] font-medium font-kameron mt-3">
                Expiry
                <Input type="date"></Input>
              </h1>
            </div>
          </div>

          <div>
            <h1 className="text-[17px] font-medium font-kameron mt-3">
              Note
              <TextArea></TextArea>
            </h1>
          </div>

          <div className="mt-5 flex justify-between">
            <div></div>
            <div className="flex gap-3">
              <Button
                type="secondary"
                className="bg-[#E26666] hover:bg-gray-600"
                onClick={() => setOpen(false)}
              >
                <p className="text-white text-xl font-kameron p-1">Cancel</p>
              </Button>
              <Button
                type="secondary"
                className="bg-[#6CC76F] hover:bg-gray-600"
                onClick={() => setOpen(true)}
              >
                <p className="text-white text-xl font-kameron p-1">Save</p>
              </Button>
            </div>
          </div>
        </Modal>
      </div>
    </>
  );
}

export default Materials;

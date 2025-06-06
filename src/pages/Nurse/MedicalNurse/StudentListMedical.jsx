import { Button, Input, Select, Space, Table, Tooltip } from "antd";
import React, { useState } from "react";
import MedicalResult from "./MedicalResult";
import SentMedicalToParents from "./SentMedicalToParents";

function StudentListMedical() {
  const [selectedOption, setSelectedOption] = useState("student");

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
      title: "Parents",
      dataIndex: "parent",
      key: "parent",
      align: "center",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
      align: "center",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      align: "center",
      render: (_, record) => (
        <Space>
          {record.status?.toLowerCase() === "confirm" ? (
            <p
              type="secondary"
              className="rounded-2xl w-[80px] text-[#6CC76F] font-medium "
            >
              Confirm
            </p>
          ) : (
            <p
              type="secondary"
              className="rounded-2xl w-[80px] text-[#E26666] font-medium"
            >
              Refuse
            </p>
          )}
        </Space>
      ),
    },
    {
      title: "Note",
      dataIndex: "note",
      key: "note",
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
      id: "SE182629",
      name: "Ho Khoi",
      grade: "12A3",
      parent: "Elon Musk",
      phone: "0997899689",
      status: "Confirm",
      note: "dong y",
    },
    {
      id: "SE182629",
      name: "Ho Khoi",
      grade: "12A3",
      parent: "Elon Musk",
      phone: "0997899689",
      status: "Refuse",
      note: "dong y",
    },
    {
      id: "SE182629",
      name: "Ho Khoi",
      grade: "12A3",
      parent: "Elon Musk",
      phone: "0997899689",
      status: "Confirm",
      note: "dong y",
    },
    {
      id: "SE182629",
      name: "Ho Khoi",
      grade: "12A3",
      parent: "Elon Musk",
      phone: "0997899689",
      status: "Special tracking",
      note: "Refuse",
    },
    {
      id: "SE182629",
      name: "Ho Khoi",
      grade: "12A3",
      parent: "Elon Musk",
      phone: "0997899689",
      status: "confirm",
      note: "dong y",
    },
  ];
  return (
    <div>
      {" "}
      <div className="flex justify-between">
        {selectedOption === "student" ? (
          <div className="flex gap-5 pl-5">
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
        ) : (
          <>
            <div></div>
          </>
        )}

        <div className="">
          <Select
            placeholder="Select action"
            style={{ width: 250 }}
            value={selectedOption}
            onChange={(value) => setSelectedOption(value)}
            className="!w-[255px]"
          >
            <Option value="student">Student List</Option>
            <Option value="record">Recording Vaccination Results</Option>
            <Option value="send">Send to Vaccination Results</Option>
          </Select>
        </div>
      </div>
      {selectedOption === "student" && (
        <>
          <Table className="mt-5" columns={columns} dataSource={dataSource} />
        </>
      )}
      {selectedOption === "record" && (
        <div className="flex gap-5 pl-5">
          <MedicalResult />
        </div>
      )}
      {selectedOption === "send" && (
        <div className="flex gap-5 pl-5">
          <SentMedicalToParents />
        </div>
      )}
      <div className="h-20"></div>
    </div>
  );
}

export default StudentListMedical;

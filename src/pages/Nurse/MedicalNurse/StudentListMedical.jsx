import { Button, Space, Table, Tooltip } from "antd";
import React from "react";

function StudentListMedical() {
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
      <Table className="mt-5" columns={columns} dataSource={dataSource} />
      <div className="h-20"></div>
    </div>
  );
}

export default StudentListMedical;

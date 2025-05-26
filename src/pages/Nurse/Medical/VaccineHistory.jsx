import { Space, Table, Tooltip } from "antd";
import React from "react";

function VaccineHistory() {
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "num",
      align: "center",
    },

    {
      title: "Name of vaccination day",
      dataIndex: "name",
      key: "name",
      align: "center",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      align: "center",
    },
    {
      title: "Place",
      dataIndex: "place",
      key: "place",
      align: "center",
    },
    {
      title: "Participation rate",
      dataIndex: "rate",
      key: "rate",
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
      id: "VAC01",
      name: "Tiêm chủng phòng cúm",
      place: "	Trung tâm Y tế Quận 1",
      rate: "	92% (230/250)",
      date: "24/5/2025",
    },
    {
      id: "VAC02",
      name: "	Tiêm ngừa viêm gan B",
      place: "	Trung tâm Y tế Quận 1",
      rate: "	92% (230/250)",
      date: "24/5/2025",
    },
    {
      id: "VAC03",
      name: "	Tiêm ngừa viêm gan B 5ml",
      place: "	Bệnh viện Nhi Đồng",
      rate: "	92% (230/250)",
      date: "24/5/2025",
    },
    {
      id: "VAC04",
      name: "Tiêm chủng phòng cúm",
      place: "	Bệnh viện Nhi Đồng",
      rate: "	92% (230/250)",
      date: "24/5/2025",
    },
    {
      id: "VAC05",
      name: "Tiêm chủng phòng cúm",
      place: "	Bệnh viện Nhi Đồng",
      rate: "	92% (230/250)",
      date: "24/5/2025",
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

export default VaccineHistory;

import { Space, Table, Tooltip } from "antd";
import React from "react";

function Import() {
  const columns = [
    {
      title: "Number",
      dataIndex: "num",
      key: "num",
      align: "center",
    },

    {
      title: "Name of medicine/supplies",
      dataIndex: "nameMedicine",
      key: "nameMedicine",
      align: "center",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      align: "center",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
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
      num: "1",
      nameMedicine: "Paracetamol",
      type: "Tablet",
      amount: 150,
      date: "24/5/2025",
    },
    {
      num: "2",
      nameMedicine: "Amoxicillin",
      type: "Capsule",
      amount: 80,
      date: "24/5/2025",
    },
    {
      num: "3",
      nameMedicine: "Syringe 5ml",
      type: "Supply",
      amount: 300,
      date: "24/5/2025",
    },
    {
      num: "4",
      nameMedicine: "Vitamin C",
      type: "Tablet",
      amount: 0,
      date: "24/5/2025",
    },
    {
      num: "5",
      nameMedicine: "Syringe 5ml",
      type: "Supply",
      amount: 300,
      date: "24/5/2025",
    },
  ];
  return (
    <div>
      <Table className="mt-5" columns={columns} dataSource={dataSource} />
    </div>
  );
}

export default Import;

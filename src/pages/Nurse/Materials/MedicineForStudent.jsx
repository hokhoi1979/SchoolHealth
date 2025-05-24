import { Space, Table, Tooltip } from "antd";
import React from "react";

function MedicineForStudent() {
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
      title: "Name of medicine/supplies",
      dataIndex: "nameMedicine",
      key: "nameMedicine",
      align: "center",
    },
    {
      title: "Dosage",
      dataIndex: "dosage",
      key: "dosage",
      align: "center",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
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
      nameMedicine: "Paracetamol",
      dosage: "1 tablet 500mg",
      status: "Headetch",
    },
    {
      id: "SE182629",
      name: "Ho Khoi",
      grade: "12A3",
      nameMedicine: "Amoxicillin",
      dosage: "1 tablet 500mg",
      status: "Headetch",
    },
    {
      id: "SE182629",
      name: "Ho Khoi",
      grade: "12A3",
      nameMedicine: "Syringe 5ml",
      dosage: "1 tablet 500mg",
      status: "Headache",
    },
    {
      id: "SE182629",
      name: "Ho Khoi",
      grade: "12A3",
      nameMedicine: "Vitamin C",
      dosage: "1 tablet 500mg",
      status: "Headetch",
    },
    {
      id: "SE182629",
      name: "Ho Khoi",
      grade: "12A3",
      nameMedicine: "Syringe 5ml",
      dosage: "1 tablet 500mg",
      status: "Headetch",
    },
  ];
  return (
    <div>
      {" "}
      <Table className="mt-5" columns={columns} dataSource={dataSource} />
    </div>
  );
}

export default MedicineForStudent;

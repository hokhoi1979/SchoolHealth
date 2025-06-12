import { Space, Table, Tooltip, Tag } from "antd";
import React from "react";

function ImportManager() {
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      align: "center",
    },
    {
      title: "Mặt hàng",
      dataIndex: "nameMedicine",
      key: "nameMedicine",
      align: "center",
    },
    {
      title: "Danh mục",
      dataIndex: "category",
      key: "category",
      align: "center",
    },
    {
      title: "Tồn kho",
      dataIndex: "stock",
      key: "stock",
      align: "center",
      render: (stock) => `${stock} viên`,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      align: "center",
      render: (status) => {
        let color;
        if (status === "Bình thường") {
          color = "bg-green-500";
        } else if (status === "Cần bổ sung") {
          color = "bg-pink-300";
        } else if (status === "Sắp hết") {
          color = "bg-yellow-300";
        }
        return (
          <span
            className={`inline-block px-2 py-1 rounded text-white text-xs ${color}`}
          >
            {status}
          </span>
        );
      },
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
            <div className="cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={20}
                height={20}
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M12 9a3 3 0 0 0-3 3a3 3 0 0 0 3 3a3 3 0 0 0 3-3a3 3 0 0 0-3-3m0 8a5 5 0 1-5-5a5 5 0 1 5-5a5 5 0 1 5 5a5 5 0 1-5 5m0-12.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5"
                />
              </svg>
            </div>
          </Tooltip>
        </Space>
      ),
    },
  ];

  const dataSource = [
    {
      id: "ST001",
      nameMedicine: "Paracetamol 500mg",
      category: "Thuốc hạ sốt",
      stock: 150,
      status: "Bình thường",
    },
    {
      id: "ST002",
      nameMedicine: "Vaccine COVID-19",
      category: "Vaccine",
      stock: 5,
      status: "Cần bổ sung",
    },
    {
      id: "ST003",
      nameMedicine: "Băng gạc y tế",
      category: "Vật tư y tế",
      stock: 150,
      status: "Sắp hết",
    },
    {
      id: "ST004",
      nameMedicine: "Nhiết kế điện tử",
      category: "Thiết bị y tế",
      stock: 150,
      status: "Bình thường",
    },
    {
      id: "ST005",
      nameMedicine: "Aspirin 100mg",
      category: "Thuốc tim mạch",
      stock: 150,
      status: "Bình thường",
    },
  ];

  return (
    <>
      <div>
        <Table
          className="mt-5"
          columns={columns}
          dataSource={dataSource}
          rowClassName="text-center text-sm"
          bordered
          components={{
            header: {
              cell: (props) => (
                <th
                  {...props}
                  className="bg-gray-200 font-semibold text-center text-sm py-3"
                />
              ),
            },
          }}
        />
      </div>
    </>
  );
}

export default ImportManager;
// vien chai lo cai
// ten thuoc , decription,cach su dung

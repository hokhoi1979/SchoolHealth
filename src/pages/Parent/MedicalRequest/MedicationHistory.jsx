import { Table } from "antd";

const style = {
  pending: {
    color: "white",
    backgroundColor: "orange",
    border: "1px solid #fbbf24",
    borderRadius: "8px",
    padding: "5px 15px",
    fontWeight: "600",
  },
  completed: {
    color: "white",
    backgroundColor: "green",
    border: "1px solid #34d399",
    borderRadius: "8px",
    padding: "5px 15px",
    fontWeight: "600",
  },
};

const MedicationHistory = () => {
  const data = [
    {
      id: 1,
      name: "Amoxicillin",
      dosage: "250mg",
      time: "29/05/2025 - 31/05/2025",
      status: "Completed",
      date: "29/05/2025",
    },
    {
      id: 2,
      name: "Amoxicillin",
      dosage: "10mg",
      time: "29/05/2025 - 31/05/2025",
      status: "Completed",
      date: "29/05/2025",
    },
    {
      id: 3,
      name: "Ibuprofen",
      dosage: "30mg",
      time: "29/05/2025 - 31/05/2025",
      status: "Completed",
      date: "29/05/2025",
    },
  ];

  const columns = [
    { title: "Name", dataIndex: "name" },
    { title: "Dosage", dataIndex: "dosage" },
    { title: "Time", dataIndex: "time" },
    {
      title: "Status",
      dataIndex: "status",
      render: (status) => {
        const key = status.toLowerCase();
        return (
          <span style={style[key]}>
            {status === "Completed" ? "Completed" : status}
          </span>
        );
      },
    },
    { title: "Register Date", dataIndex: "date" },
  ];

  return (
    <Table
      dataSource={data}
      columns={columns}
      rowKey={"id"}
      locale={{ emptyText: "No medicine completed" }}
    />
  );
};

export default MedicationHistory;

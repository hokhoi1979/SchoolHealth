import { useState } from "react";
import { Button, Card, Table, Tag, Modal, Descriptions } from "antd";
import { Activity, Syringe } from "lucide-react";
import { EyeOutlined } from "@ant-design/icons";

const Notification = () => {
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleViewDetails = (record) => {
    setSelectedRecord(record);
    setIsModalOpen(true);
  };

  const typeConfig = {
    vaccination: {
      icon: <Syringe className="h-3 w-3" />,
      text: "Vaccination",
      color: "bg-amber-100 text-amber-700 border-amber-300",
    },
    checkup: {
      icon: <Activity className="h-3 w-3" />,
      text: "Check Up",
      color: "bg-purple-100 text-purple-700 border-purple-300",
    },
  };

  const statusConfig = {
    rejected: { text: "Rejected", color: "red" },
    confirmed: { text: "Confirmed", color: "green" },
  };

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      width: 300,
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      width: 150,
      render: (type) => (
        <Tag className={`${typeConfig[type].color}`}>
          <span className="flex items-center gap-1">
            {typeConfig[type].icon}
            {typeConfig[type].text}
          </span>
        </Tag>
      ),
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      width: 120,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: 120,
      render: (status) => (
        <Tag color={statusConfig[status].color}>
          {statusConfig[status].text}
        </Tag>
      ),
    },
    {
      title: "Action",
      key: "action",
      width: 120,
      render: (_, record) => (
        <Button
          type="text"
          icon={<EyeOutlined />}
          onClick={() => handleViewDetails(record)}
        />
      ),
      align: "center",
    },
  ];

  const data = [
    {
      key: "1",
      type: "vaccination",
      title: "Confirm flu vaccination",
      date: "15/05/2025",
      status: "rejected",
      details:
        "Consent has been given for students to participate in flu vaccination on June 15, 2025",
    },
    {
      key: "2",
      type: "checkup",
      title: "Confirmation of periodic health check-up",
      date: "May 10, 2025",
      status: "confirmed",
      details:
        "Agreed for students to participate in periodic health check-up on June 20, 2025",
    },
  ];

  const renderDetail = (record) => {
    return <p>{record.details}</p>;
  };

  return (
    <div className="container mx-auto py-6 px-4">
      <Card title="Medication history">
        <p className="mb-4 text-gray-600">
          History of sending medicine to students for use at school
        </p>
        <Table
          columns={columns}
          dataSource={data}
          pagination={false}
          scroll={{ x: 800 }}
        />
      </Card>

      <Modal
        title={selectedRecord?.title}
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
        width={700}
      >
        {selectedRecord && (
          <>
            <p className="text-gray-500 mb-4">Date: {selectedRecord.date}</p>
            <div className="flex items-center gap-2 mb-4">
              <Tag
                className={`flex items-center gap-1 ${
                  typeConfig[selectedRecord.type]?.color || "bg-gray-200"
                }`}
              >
                {typeConfig[selectedRecord.type]?.text || "Không xác định"}
              </Tag>
              <Tag color={statusConfig[selectedRecord.status]?.color || "gray"}>
                {statusConfig[selectedRecord.status]?.text ||
                  selectedRecord.status}
              </Tag>
            </div>
            <div className="border rounded-md p-4 bg-gray-50">
              {renderDetail(selectedRecord)}
            </div>
          </>
        )}
      </Modal>
    </div>
  );
};
export default Notification;

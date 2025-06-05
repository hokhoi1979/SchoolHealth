import { useState } from "react";
import { Button, Card, Table, Tag, Modal, Descriptions } from "antd";
import { MedicineBoxOutlined } from "@ant-design/icons";

const SendResult = () => {
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleViewDetails = (record) => {
    setSelectedRecord(record);
    setIsModalOpen(true);
  };

  const typeConfig = {
    medication: {
      icon: <MedicineBoxOutlined />,
      text: "Send Result",
      color: "bg-green-100 text-green-700 border-green-300",
    },
  };

  const statusConfig = {
    completed: { text: "Completed", color: "green" },
    pending: { text: "Pending", color: "yellow" },
  };

  const columns = [
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      width: 150,
      render: (type) => (
        <Tag className={`flex items-center gap-1 ${typeConfig[type].color}`}>
          {typeConfig[type].icon}
          {typeConfig[type].text}
        </Tag>
      ),
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      width: 400,
    },
    {
      title: "Request Date",
      dataIndex: "date",
      key: "date",
      width: 120,
    },
    {
      title: "Time of use",
      dataIndex: "time",
      key: "time",
      width: 300,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: 120,
      render: (status) => (
        <Tag color={statusConfig[status]?.color || "gray"}>
          {statusConfig[status]?.text || status}
        </Tag>
      ),
    },
    {
      title: "Action",
      key: "action",
      width: 120,
      render: (_, record) => (
        <Button type="link" onClick={() => handleViewDetails(record)}>
          View Details
        </Button>
      ),
      align: "center",
    },
  ];

  const data = [
    {
      key: "1",
      type: "medication",
      title: "Send Paracetamol",
      date: "18/05/2025",
      time: "18/05/2025-20/05/2025",
      status: "pending",
      details: {
        name: "Paracetamol",
        dosage: "500mg",
        frequency: "Every 6 hours",
        startDate: "20/05/2025",
        endDate: "25/05/2025",
        instructions: "Take with water after meals.",
        status: "Pending",
      },
    },
    {
      key: "2",
      type: "medication",
      title: "Send Amoxicillin",
      date: "19/05/2025",
      time: "19/05/2025-21/05/2025",
      status: "completed",
      details: {
        name: "Amoxicillin",
        dosage: "250mg",
        frequency: "Three times a day",
        startDate: "21/05/2025",
        endDate: "27/05/2025",
        instructions: "Take before meals. Complete the course.",
        status: "Completed",
      },
    },
    {
      key: "3",
      type: "medication",
      title: "Send Ibuprofen",
      date: "20/05/2025",
      time: "20/05/2025-23/05/2025",
      status: "pending",
      details: {
        name: "Ibuprofen",
        dosage: "400mg",
        frequency: "Twice a day",
        startDate: "22/05/2025",
        endDate: "26/05/2025",
        instructions: "Take after food. Avoid alcohol.",
        status: "Pending",
      },
    },
  ];

  const renderMedicineData = (medication) => (
    <div className="mb-6">
      <h3 className="font-semibold text-lg mb-2">Medication Details</h3>
      <Descriptions bordered column={1}>
        <Descriptions.Item label="Name of Medicine">
          {medication.name}
        </Descriptions.Item>
        <Descriptions.Item label="Dosage">
          {medication.dosage}
        </Descriptions.Item>
        <Descriptions.Item label="Frequency">
          {medication.frequency}
        </Descriptions.Item>
        <Descriptions.Item label="Start Date">
          {medication.startDate}
        </Descriptions.Item>
        <Descriptions.Item label="End Date">
          {medication.endDate}
        </Descriptions.Item>
        <Descriptions.Item label="Instructions">
          {medication.instructions}
        </Descriptions.Item>
        <Descriptions.Item label="Status">
          {medication.status}
        </Descriptions.Item>
      </Descriptions>
    </div>
  );

  const renderDetail = (record) => {
    return renderMedicineData(record.details);
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

export default SendResult;

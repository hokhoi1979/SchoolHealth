import React from "react";
import { Card, Space, Typography, Button } from "antd";
import { ClockCircleOutlined } from "@ant-design/icons";
import { Syringe } from "lucide-react";

const { Title, Paragraph } = Typography;

const Pending = ({ notifications, onOpenModal }) => {
  const pendingVaccinations = notifications.filter(
    (n) => n.type === "vaccination" && n.status === "pending"
  );

  if (pendingVaccinations.length === 0) {
    return (
      <Card className="text-center py-10">
        <ClockCircleOutlined style={{ fontSize: 40, color: "orange" }} />
        <Paragraph className="text-gray-400 mt-4">
          No vaccination notifications pending confirmation
        </Paragraph>
      </Card>
    );
  }
  return (
    <Space direction="vertical" size="middle" className="w-full">
      {pendingVaccinations.map((notification) => (
        <Card key={notification.id} style={{ borderLeft: `4px solid #d97706` }}>
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-2">
              <Syringe style={{ fontSize: 20, color: "#d97706" }} />
              <Title level={5} style={{ margin: 0 }}>
                {notification.title}
              </Title>
            </div>
            <small className="text-gray-500">Date {notification.date}</small>
          </div>
          <Paragraph className="text-gray-500 mt-2">
            {notification.description}
          </Paragraph>
          <div className="flex justify-end gap-2">
            <Button danger onClick={() => onOpenModal(notification)}>
              Rejected
            </Button>
            <Button
              type="primary"
              style={{ backgroundColor: "#d97706", borderColor: "#b45309" }}
              onClick={() => onOpenModal(notification)}
            >
              Confirm
            </Button>
          </div>
        </Card>
      ))}
    </Space>
  );
};

export default Pending;

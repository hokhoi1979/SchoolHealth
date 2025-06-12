import React from "react";
import { Card, Space, Typography } from "antd";
import { CheckCircleOutlined } from "@ant-design/icons";
import { Syringe } from "lucide-react";

const { Title, Paragraph } = Typography;

const style = {
  completed: {
    color: "white",
    backgroundColor: "green",
    border: "1px solid #34d399",
    borderRadius: "8px",
    padding: "5px 15px",
    fontWeight: "600",
  },
};

const Completed = ({ notifications }) => {
  const approvedVaccinations = notifications.filter(
    (n) => n.type === "vaccination" && n.status === "completed"
  );

  if (approvedVaccinations.length === 0) {
    return (
      <Card className="text-center py-10">
        <CheckCircleOutlined style={{ fontSize: 40, color: "#a0aec0" }} />
        <Paragraph className="text-gray-400 mt-4">
          No vaccination notifications pending confirmation
        </Paragraph>
      </Card>
    );
  }

  return (
    <Space direction="vertical" size="middle" className="w-full">
      {approvedVaccinations.map((notification) => (
        <Card key={notification.id} style={{ borderLeft: `4px solid #d97706` }}>
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Syringe style={{ fontSize: 20, color: "#d97706" }} />
              <Title level={5} style={{ margin: 0 }}>
                {notification.title}
              </Title>
            </div>
            <span style={style.completed}>Confirmed</span>
          </div>
          <small className="text-gray-500">Date {notification.date}</small>
          <Paragraph className="text-gray-500 mt-2">
            {notification.description}
          </Paragraph>
        </Card>
      ))}
    </Space>
  );
};

export default Completed;

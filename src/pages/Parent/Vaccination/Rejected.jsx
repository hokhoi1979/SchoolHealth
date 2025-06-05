import React from "react";
import { Card, Space, Typography } from "antd";
import { CloseCircleOutlined } from "@ant-design/icons";
import { Syringe } from "lucide-react";

const { Title, Paragraph } = Typography;

const style = {
  rejected: {
    color: "white",
    backgroundColor: "red",
    border: "1px solid #fbbf24",
    borderRadius: "8px",
    padding: "5px 15px",
    fontWeight: "600",
  },
};

const Rejected = ({ notifications }) => {
  const rejectedVaccinations = notifications.filter(
    (n) => n.type === "vaccination" && n.status === "rejected"
  );

  if (rejectedVaccinations.length === 0) {
    return (
      <Card className="text-center py-10">
        <CloseCircleOutlined style={{ fontSize: 40, color: "#a0aec0" }} />
        <Paragraph className="text-gray-400 mt-4">
          No vaccination notifications pending confirmation
        </Paragraph>
      </Card>
    );
  }

  return (
    <Space direction="vertical" size="middle" className="w-full">
      {rejectedVaccinations.map((notification) => (
        <Card key={notification.id} style={{ borderLeft: `4px solid #d97706` }}>
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Syringe style={{ fontSize: 20, color: "#d97706" }} />
              <Title level={5} style={{ margin: 0 }}>
                {notification.title}
              </Title>
            </div>
            <span style={style.rejected}>Rejected</span>
          </div>
          <small className="text-gray-500">Ngày {notification.date}</small>
          <Paragraph className="text-gray-500 mt-2">
            {notification.description}
          </Paragraph>
        </Card>
      ))}
    </Space>
  );
};

export default Rejected;

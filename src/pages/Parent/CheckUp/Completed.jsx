"use client";

import { Card, Space, Typography, Button } from "antd";
import {
  CheckCircleOutlined,
  CalendarOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import { Activity, User } from "lucide-react";

const { Title, Paragraph, Text } = Typography;

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

const Completed = ({ notifications, onViewDetail, onViewResult }) => {
  const approvedVaccinations = notifications.filter(
    (n) => n.type === "checkup" && n.status === "completed"
  );

  if (approvedVaccinations.length === 0) {
    return (
      <Card className="text-center py-10">
        <CheckCircleOutlined style={{ fontSize: 40, color: "#a0aec0" }} />
        <Paragraph className="text-gray-400 mt-4">
          No completed checkup confirmation
        </Paragraph>
      </Card>
    );
  }

  return (
    <Space direction="vertical" size="middle" className="w-full">
      {approvedVaccinations.map((notification) => (
        <Card
          key={notification.id}
          style={{ borderLeft: `4px solid  #16a34a` }}
          className="hover:shadow-md transition-shadow"
        >
          <div className="flex justify-between items-start mb-3">
            <div className="flex items-center gap-2">
              <Activity style={{ fontSize: 20, color: "#16a34a" }} />
              <Title level={5} style={{ margin: 0 }}>
                {notification.title}
              </Title>
            </div>
            <div className="flex flex-col items-end gap-2">
              <span style={style.completed}>Confirmed</span>
              <div className="flex items-center gap-1 text-gray-500">
                <CalendarOutlined />
                <small>Scheduled: {notification.date}</small>
              </div>
            </div>
          </div>

          {/* Student Information */}
          {notification.student && (
            <div className="flex items-center gap-2 mb-2">
              <User size={16} className="text-blue-500" />
              <Text className="text-blue-600">
                Student: {notification.student.account?.fullname}
                <span className="text-gray-500 ml-2">
                  ({notification.student.student_code})
                </span>
              </Text>
            </div>
          )}

          <Paragraph className="text-gray-600 mt-2 mb-4">
            {notification.description}
          </Paragraph>

          {/* Response Information */}
          <div className="bg-green-50 p-3 rounded-lg border border-green-200">
            <div className="flex items-center gap-2">
              <CheckCircleOutlined style={{ color: "#16a34a" }} />
              <Text strong className="text-green-700">
                Check Up Accepted
              </Text>
            </div>
            {notification.respondedAt && (
              <div className="mt-2">
                <Text className="text-sm text-gray-600">
                  <strong>Responded on:</strong>{" "}
                  {new Date(notification.respondedAt).toLocaleString("vi-VN")}
                </Text>
              </div>
            )}
          </div>

          <div className="flex justify-between items-center mt-4">
            <Button
              type="primary"
              icon={<EyeOutlined />}
              onClick={() => onViewDetail(notification.healthCheckUpID)}
              style={{ backgroundColor: "#16a34a", borderColor: "#16a34a" }}
            >
              View Detail
            </Button>
            <Button
              type="primary"
              icon={<EyeOutlined />}
              onClick={() =>
                onViewResult(
                  notification.healthCheckUpID,
                  notification.studentID
                )
              }
              style={{ backgroundColor: "#16a34a", borderColor: "#16a34a" }}
            >
              View Result
            </Button>
          </div>
        </Card>
      ))}
    </Space>
  );
};

export default Completed;

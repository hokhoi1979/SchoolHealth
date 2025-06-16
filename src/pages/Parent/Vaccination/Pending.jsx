"use client";

import { Card, Space, Typography, Button, Tag } from "antd";
import { ClockCircleOutlined, CalendarOutlined } from "@ant-design/icons";
import { Syringe, User } from "lucide-react";

const { Title, Paragraph, Text } = Typography;

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
        <Card
          key={notification.id}
          style={{ borderLeft: `4px solid #d97706` }}
          className="hover:shadow-md transition-shadow"
        >
          <div className="flex justify-between items-start mb-3">
            <div className="flex items-center gap-2">
              <Syringe style={{ fontSize: 20, color: "#d97706" }} />
              <Title level={5} style={{ margin: 0 }}>
                {notification.title}
              </Title>
              <Tag color="orange">PENDING</Tag>
            </div>
            <div className="flex items-center gap-1 text-gray-500">
              <CalendarOutlined />
              <small>Scheduled: {notification.date}</small>
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

          {/* Vaccination Event Details */}
          <div className="bg-gray-50 p-3 rounded-lg mb-4">
            <Text strong className="text-sm text-gray-700">
              Notification ID: {notification.id}
            </Text>
            <div className="mt-1">
              <Text className="text-sm text-gray-600">
                Student ID: {notification.studentID}
              </Text>
            </div>
            {notification.vaccinationEvent?.scheduledAt && (
              <div className="mt-1">
                <Text className="text-sm text-gray-600">
                  Scheduled Date:{" "}
                  {new Date(
                    notification.vaccinationEvent.scheduledAt
                  ).toLocaleString("vi-VN")}
                </Text>
              </div>
            )}
          </div>

          <div className="flex justify-end gap-2">
            <Button danger onClick={() => onOpenModal(notification)}>
              Decline
            </Button>
            <Button
              type="primary"
              style={{ backgroundColor: "#d97706", borderColor: "#b45309" }}
              onClick={() => onOpenModal(notification)}
            >
              Accept
            </Button>
          </div>
        </Card>
      ))}
    </Space>
  );
};

export default Pending;

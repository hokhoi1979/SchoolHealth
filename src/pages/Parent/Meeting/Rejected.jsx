import { useState } from "react";
import { Card, Space, Typography, Button, Modal, Tag } from "antd";
import {
  CheckCircleOutlined,
  CalendarOutlined,
  EyeOutlined,
  CheckCircleTwoTone,
  CloseCircleTwoTone,
  ExclamationCircleTwoTone,
  CloseCircleOutlined,
} from "@ant-design/icons";
import { BellRing, User } from "lucide-react";

const { Title, Paragraph, Text } = Typography;

const style = {
  rejected: {
    color: "white",
    backgroundColor: "red",
    border: "1px solid #ef4444",
    borderRadius: "8px",
    padding: "5px 15px",
    fontWeight: "600",
  },
};

const Reject = ({ notifications }) => {
  const [selectedItem, setSelectedItem] = useState(null);

  const rejectMeeting = notifications.filter(
    (n) => n.type === "meeting" && n.status === "rejected"
  );

  if (rejectMeeting.length === 0) {
    return (
      <Card className="text-center py-10">
        <CloseCircleOutlined style={{ fontSize: 40, color: "#a0aec0" }} />
        <Paragraph className="text-gray-400 mt-4">
          No rejected vaccination notifications
        </Paragraph>

        {/* Debug info khi không có data */}
        <div className="mt-4 p-4 bg-gray-100 rounded text-left">
          <Text className="text-xs text-gray-600">
            <strong>Debug Info:</strong>
            <br />
            Total notifications: {notifications.length}
            <br />
            Status breakdown:{" "}
            {JSON.stringify(
              notifications.reduce((acc, n) => {
                acc[n.status] = (acc[n.status] || 0) + 1;
                return acc;
              }, {}),
              null,
              2
            )}
          </Text>
        </div>
      </Card>
    );
  }

  return (
    <Space direction="vertical" size="middle" className="w-full">
      {rejectMeeting.map((notification) => (
        <Card
          key={notification.id}
          style={{ borderLeft: `4px solid #dc2626` }}
          className="hover:shadow-md transition-shadow"
        >
          <div className="flex justify-between items-start mb-3">
            <div className="flex items-center gap-2">
              <BellRing style={{ fontSize: 20, color: "#dc2626" }} />
              <Title level={5} style={{ margin: 0 }}>
                {notification.reason}
              </Title>
            </div>
            <div className="flex flex-col items-end gap-2">
              <span style={style.rejected}>Rejected</span>
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
            Reason: {notification.description}
          </Paragraph>

          {/* Response Information */}
          <div className="bg-red-50 p-3 rounded-lg border border-red-200">
            <div className="flex items-center gap-2">
              <CloseCircleOutlined style={{ color: "#dc2626" }} />
              <Text strong className="text-red-700">
                Meeting Rejected
              </Text>
            </div>
            {notification.updatedAt && (
              <div className="mt-2">
                <Text className="text-sm text-gray-600">
                  <strong>Responded on:</strong>{" "}
                  {new Date(notification.updatedAt).toLocaleString("vi-VN")}
                </Text>
              </div>
            )}
          </div>
        </Card>
      ))}
    </Space>
  );
};
export default Reject;

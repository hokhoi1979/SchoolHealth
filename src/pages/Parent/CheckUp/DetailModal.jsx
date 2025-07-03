import {
  Modal,
  Card,
  Typography,
  Tag,
  Spin,
  Alert,
  Descriptions,
  Tooltip,
} from "antd";
import {
  CalendarOutlined,
  CheckCircleOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import { Activity } from "lucide-react";

const { Title, Text, Paragraph } = Typography;

const DetailModal = ({ open, onclose, checkupDetail, loading, error }) => {
  const getStatusColor = (status) => {
    switch (status?.toUpperCase()) {
      case "CONFIRMED":
        return "green";
      case "PENDING":
        return "orange";
      case "DECLINED":
        return "red";
      default:
        return "default";
    }
  };

  const getStatusText = (status) => {
    switch (status?.toUpperCase()) {
      case "ACCEPTED":
        return "Completed";
      case "PENDING":
        return "Pending";
      case "DECLINED":
        return "Rejected";
      default:
        return status || "Unknown";
    }
  };

  const renderContent = () => {
    if (loading) {
      return (
        <div className="flex justify-center items-center py-12">
          <Spin size="large" />
        </div>
      );
    }

    if (error) {
      return (
        <Alert
          message="Error"
          description="Failed to load checkup details"
          type="error"
          showIcon
        />
      );
    }

    if (!checkupDetail?.data?.data) {
      return (
        <Alert
          message="No Data"
          description="No checkup details available"
          type="info"
          showIcon
        />
      );
    }

    const detail = checkupDetail.data.data;

    return (
      <div className="space-y-5">
        {/* Header */}
        <Card
          className="border-0 shadow-md rounded-xl bg-gradient-to-br from-blue-50 via-green-50 to-lime-100"
          bodyStyle={{ padding: "24px" }}
        >
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <Activity className="text-emerald-600" size={28} />
              <div>
                <Title level={4} className="mb-1 text-emerald-700">
                  {detail.title}
                </Title>
                <Text type="secondary" className="text-sm text-gray-600">
                  ID: {detail.id}
                </Text>
              </div>
            </div>
            <Tag
              color={getStatusColor(detail.status)}
              className="text-sm px-4 py-1 rounded-full font-semibold shadow-sm"
            >
              {getStatusText(detail.status)}
            </Tag>
          </div>

          {detail.description && (
            <Paragraph className="mt-4 text-gray-800 leading-relaxed">
              {detail.description}
            </Paragraph>
          )}

          <Descriptions
            column={1}
            size="small"
            labelStyle={{ fontWeight: 600 }}
            className="mt-4"
          >
            <Descriptions.Item
              label={
                <span className="flex items-center gap-2 text-blue-700">
                  <CalendarOutlined />
                  Scheduled Date
                </span>
              }
            >
              {new Date(detail.scheduledAt).toLocaleString("vi-VN")}
            </Descriptions.Item>
            <Descriptions.Item label="Target Type">
              <Tag color="cyan" className="rounded-full px-3">
                {detail.targetType}
              </Tag>
            </Descriptions.Item>
            <Descriptions.Item label="Created Date">
              {new Date(detail.createdAt).toLocaleString("vi-VN")}
            </Descriptions.Item>
          </Descriptions>
        </Card>
        {/* Target Groups */}
        <Card
          title={
            <span className="text-purple-600 font-medium text-base">
              🎯 Target Groups
            </span>
          }
          size="small"
          className="bg-white border border-purple-100 rounded-xl shadow-sm"
        >
          <div className="flex flex-wrap gap-2">
            {detail.targetType === "GRADE" &&
              detail.targets.map((grade, idx) => (
                <Tag
                  key={idx}
                  color="magenta"
                  className="rounded-full px-4 py-1 text-sm font-medium"
                >
                  Grade {grade.grade}
                </Tag>
              ))}
            {detail.targetType === "CLASS" &&
              detail.targets.map((cls, idx) => (
                <Tag
                  key={idx}
                  color="geekblue"
                  className="rounded-full px-4 py-1 text-sm font-medium"
                >
                  {cls.className}
                </Tag>
              ))}
          </div>
        </Card>
        {/* Checkup Items */}
        <Card
          title={
            <span className="text-green-600 font-medium text-base">
              🩺 Checkup Items
            </span>
          }
          size="small"
          className="bg-white border border-green-100 rounded-xl shadow-sm"
        >
          <div className="space-y-3">
            {detail.content.map((item) => (
              <Card
                key={item.id}
                size="small"
                className="bg-[#f0fdf4] hover:bg-green-50 transition-all duration-200 border border-emerald-100 rounded-lg shadow-sm"
                bodyStyle={{ padding: "12px 16px" }}
              >
                <div className="flex items-start gap-3">
                  <CheckCircleOutlined className="text-green-500 mt-1" />
                  <div>
                    <Text strong className="text-gray-800">
                      {item.name}
                    </Text>
                    {item.description && (
                      <Text
                        type="secondary"
                        className="text-sm block mt-1 text-gray-600"
                      >
                        {item.description}
                      </Text>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </Card>
      </div>
    );
  };

  return (
    <Modal
      title={
        <div className="flex items-center gap-2 text-xl font-semibold text-blue-600">
          <InfoCircleOutlined />
          Checkup Details
        </div>
      }
      open={open}
      onCancel={onclose}
      footer={null}
      width={820}
      className="checkup-detail-modal"
      bodyStyle={{ backgroundColor: "#f9fafb", padding: "24px" }}
    >
      {renderContent()}
    </Modal>
  );
};

export default DetailModal;

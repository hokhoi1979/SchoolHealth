import { Modal, Card, Typography, Tag, Spin, Alert, Descriptions } from "antd";
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
        <div className="flex justify-center items-center py-10">
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
      <div className="space-y-4">
        {/* Header Information */}
        <Card className="border-l-4 border-l-green-500">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <Activity className="text-green-600" size={24} />
              <div>
                <Title level={4} className="mb-1">
                  {detail.title}
                </Title>
                <Text className="text-gray-600">ID: {detail.id}</Text>
              </div>
            </div>
            <Tag
              color={getStatusColor(detail.status)}
              className="text-sm px-3 py-1"
            >
              {getStatusText(detail.status)}
            </Tag>
          </div>

          <Paragraph className="text-gray-700 mb-4">
            {detail.description}
          </Paragraph>

          <Descriptions column={1} size="small">
            <Descriptions.Item
              label={
                <span className="flex items-center gap-2">
                  <CalendarOutlined />
                  Scheduled Date
                </span>
              }
            >
              {new Date(detail.scheduledAt).toLocaleString("vi-VN")}
            </Descriptions.Item>
            <Descriptions.Item label="Target Type">
              <Tag color="blue">{detail.targetType}</Tag>
            </Descriptions.Item>
            <Descriptions.Item label="Created Date">
              {new Date(detail.createdAt).toLocaleString("vi-VN")}
            </Descriptions.Item>
          </Descriptions>
        </Card>

        {/* Target Grades */}
        {detail.targets && detail.targets.length > 0 && (
          <Card title="Targets" size="small">
            <div className="flex flex-wrap gap-2">
              {/* {detail.targetType === "SCHOOL" &&
                detail.targets.map((school, idx) => (
                  <Tag key={idx} color="blue">
                    {school.school || "All Schools"}
                  </Tag>
                ))} */}
              {detail.targetType === "GRADE" &&
                detail.targets.map((grade, idx) => (
                  <Tag key={idx} color="purple">
                    Grade {grade.grade}
                  </Tag>
                ))}
              {detail.targetType === "CLASS" &&
                detail.targets.map((cls, idx) => (
                  <Tag key={idx} color="geekblue">
                    {cls.className}
                  </Tag>
                ))}
            </div>
          </Card>
        )}

        {/* Checkup Content */}
        {detail.content && detail.content.length > 0 && (
          <Card title="Checkup Items" size="small">
            <div className="space-y-3">
              {detail.content.map((item) => (
                <Card key={item.id} size="small" className="bg-gray-50">
                  <div className="flex items-start gap-3">
                    <CheckCircleOutlined className="text-green-500 mt-1" />
                    <div className="flex-1">
                      <Text strong className="block mb-1">
                        {item.name}
                      </Text>
                      {item.description && (
                        <Text className="text-gray-600 text-sm block mb-2">
                          {item.description || "N/A"}
                        </Text>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </Card>
        )}
      </div>
    );
  };

  return (
    <Modal
      title={
        <div className="flex items-center gap-2">
          <InfoCircleOutlined className="text-blue-500" />
          <span>Checkup Details</span>
        </div>
      }
      open={open}
      onCancel={onclose}
      footer={null}
      width={800}
      className="checkup-detail-modal"
    >
      {renderContent()}
    </Modal>
  );
};
export default DetailModal;

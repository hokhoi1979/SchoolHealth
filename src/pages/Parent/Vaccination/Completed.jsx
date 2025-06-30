import { useState } from "react";
import { Card, Space, Typography, Button, Modal, Tag } from "antd";
import {
  CheckCircleOutlined,
  CalendarOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import { Syringe, User } from "lucide-react";

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

const Completed = ({
  notifications,
  resultsList,
  resultLoading,
  resultError,
}) => {
  const [openModal, setOpenModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const handleViewDetail = (notification) => {
    setSelectedItem(notification);
    setOpenModal(true);
  };

  const approvedVaccinations = notifications.filter(
    (n) => n.type === "vaccination" && n.status === "completed"
  );

  // Tìm kết quả tương ứng
  const result = resultsList.find(
    (r) =>
      r.vaccinationEvent.name === selectedItem?.title &&
      r.student.student_code === selectedItem?.student?.student_code
  );

  return (
    <>
      {approvedVaccinations.length === 0 ? (
        <Card className="text-center py-10">
          <CheckCircleOutlined style={{ fontSize: 40, color: "#a0aec0" }} />
          <Paragraph className="text-gray-400 mt-4">
            No completed vaccination confirmations
          </Paragraph>
        </Card>
      ) : (
        <Space direction="vertical" size="middle" className="w-full">
          {approvedVaccinations.map((notification) => (
            <Card
              key={notification.id}
              style={{ borderLeft: `4px solid #16a34a` }}
              className="hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-2">
                  <Syringe style={{ fontSize: 20, color: "#16a34a" }} />
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

              <div className="bg-green-50 p-3 rounded-lg border border-green-200">
                <div className="flex items-center gap-2">
                  <CheckCircleOutlined style={{ color: "#16a34a" }} />
                  <Text strong className="text-green-700">
                    Vaccination Accepted
                  </Text>
                </div>
                {notification.respondedAt && (
                  <div className="mt-2">
                    <Text className="text-sm text-gray-600">
                      <strong>Responded on:</strong>{" "}
                      {new Date(notification.respondedAt).toLocaleString(
                        "vi-VN"
                      )}
                    </Text>
                  </div>
                )}
              </div>

              <div className="flex justify-end mt-4">
                <Button
                  type="primary"
                  icon={<EyeOutlined />}
                  onClick={() => handleViewDetail(notification)}
                  style={{ backgroundColor: "#16a34a", borderColor: "#16a34a" }}
                >
                  Xem chi tiết kết quả
                </Button>
              </div>
            </Card>
          ))}
        </Space>
      )}

      {/* Modal hiển thị kết quả */}
      <Modal
        title={
          <span className="text-xl font-semibold text-green-600">
            Kết quả tiêm chủng
          </span>
        }
        open={openModal}
        onCancel={() => setOpenModal(false)}
        footer={null}
        bodyStyle={{ padding: "24px 24px 12px 24px", borderRadius: 8 }}
      >
        {resultLoading ? (
          <Paragraph>Đang tải dữ liệu...</Paragraph>
        ) : resultError ? (
          <Paragraph type="danger">Lỗi: {resultError}</Paragraph>
        ) : result ? (
          <>
            <div className="mb-5 p-4 rounded-lg bg-gray-50 border border-gray-200 space-y-3">
              <div className="flex items-center gap-2">
                <Text strong className="text-gray-700">
                  Trạng thái:
                </Text>
                {result.status === "SUCCESS" ? (
                  <Tag color="green">THÀNH CÔNG</Tag>
                ) : result.status === "SKIPPED" ? (
                  <Tag color="volcano">VẮNG MẶT</Tag>
                ) : (
                  <Tag>{result.status}</Tag>
                )}
              </div>

              {result.status === "SUCCESS" && (
                <div className="grid grid-cols-1 gap-2 text-[15px] text-gray-700">
                  <p>
                    <strong>Mã học sinh:</strong>{" "}
                    <span className="text-gray-800">
                      {result.student.student_code}
                    </span>
                  </p>
                  <p>
                    <strong>Họ tên:</strong>{" "}
                    <span className="text-gray-800">
                      {result.student.account.fullname}
                    </span>
                  </p>
                  <p>
                    <strong>Lớp:</strong>{" "}
                    <span className="text-gray-800">
                      {result.student.classAssignments?.[0]?.class?.name ||
                        "Chưa có"}
                    </span>
                  </p>
                  <p>
                    <strong>Kết quả:</strong>{" "}
                    <span className="text-blue-600 font-medium">
                      {result.result}
                    </span>
                  </p>
                  <p>
                    <strong>Ghi chú:</strong>{" "}
                    <span className="text-gray-700">{result.note}</span>
                  </p>
                </div>
              )}

              {result.status === "SKIPPED" && (
                <Paragraph className="italic text-gray-500 mt-2">
                  Học sinh vắng mặt, không có thông tin kết quả.
                </Paragraph>
              )}
            </div>
          </>
        ) : (
          <Paragraph>Không tìm thấy kết quả tương ứng.</Paragraph>
        )}
      </Modal>
    </>
  );
};

export default Completed;

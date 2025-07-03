import { useState } from "react";
import { Card, Space, Typography, Button, Modal, Tag } from "antd";
import {
  CheckCircleOutlined,
  CalendarOutlined,
  EyeOutlined,
  CheckCircleTwoTone,
  CloseCircleTwoTone,
  ExclamationCircleTwoTone,
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
                  View detail result vaccination
                </Button>
              </div>
            </Card>
          ))}
        </Space>
      )}

      {/* Modal hiển thị kết quả */}
      <Modal
        title={
          <div className="flex items-center gap-3 text-2xl font-semibold text-green-600">
            <CheckCircleTwoTone twoToneColor="#52c41a" />
            Vaccination Result
          </div>
        }
        open={openModal}
        onCancel={() => setOpenModal(false)}
        footer={null}
        bodyStyle={{ padding: "24px 24px 16px 24px", borderRadius: 12 }}
      >
        {resultLoading ? (
          <div className="text-center py-8 text-base text-gray-500">
            <ExclamationCircleTwoTone twoToneColor="#faad14" className="mr-2" />
            Loading data...
          </div>
        ) : resultError ? (
          <Paragraph type="danger">
            <CloseCircleTwoTone twoToneColor="#ff4d4f" className="mr-2" />
            Error: {resultError}
          </Paragraph>
        ) : result ? (
          <div className="p-6 rounded-2xl border border-gray-200 bg-gradient-to-br from-white via-green-50 to-emerald-100 shadow-lg space-y-6">
            {/* STATUS */}
            <div className="flex items-center space-x-2 text-lg">
              <span className="font-semibold text-gray-800">Status:</span>
              {result.status === "SUCCESS" ? (
                <Tag
                  color="green"
                  className="text-sm px-4 py-1 rounded-full font-medium"
                >
                  SUCCESS
                </Tag>
              ) : result.status === "SKIPPED" ? (
                <Tag
                  color="volcano"
                  className="text-sm px-4 py-1 rounded-full font-medium"
                >
                  ABSENT
                </Tag>
              ) : (
                <Tag
                  color="default"
                  className="text-sm px-4 py-1 rounded-full font-medium"
                >
                  {result.status}
                </Tag>
              )}
            </div>

            {/* DETAILS */}
            {result.status === "SUCCESS" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-[15px] text-gray-700">
                <div className="bg-white rounded-xl shadow p-4 border border-green-100">
                  <p>
                    <span className="font-semibold text-gray-800">
                      Student Code:
                    </span>{" "}
                    {result.student.student_code}
                  </p>
                  <p>
                    <span className="font-semibold text-gray-800">
                      Full Name:
                    </span>{" "}
                    {result.student.account.fullname}
                  </p>
                  <p>
                    <span className="font-semibold text-gray-800">Class:</span>{" "}
                    {result.student.classAssignments?.[0]?.class?.name ||
                      "Not assigned"}
                  </p>
                </div>
                <div className="bg-white rounded-xl shadow p-4 border border-blue-100">
                  <p>
                    <span className="font-semibold text-gray-800">Result:</span>{" "}
                    <span className="text-blue-600 font-semibold">
                      {result.result}
                    </span>
                  </p>
                  <p>
                    <span className="font-semibold text-gray-800">Note:</span>{" "}
                    <span className="italic text-gray-600">{result.note}</span>
                  </p>
                </div>
              </div>
            )}

            {/* ABSENT */}
            {result.status === "SKIPPED" && (
              <div className="bg-yellow-50 text-yellow-700 rounded-lg px-4 py-3 text-sm border border-yellow-200 italic">
                Student was absent, no result information available.
              </div>
            )}
          </div>
        ) : (
          <Paragraph>No matching result found.</Paragraph>
        )}
      </Modal>
    </>
  );
};

export default Completed;

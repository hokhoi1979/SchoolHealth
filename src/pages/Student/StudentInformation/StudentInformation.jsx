import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Card,
  Descriptions,
  Avatar,
  Tag,
  Spin,
  Alert,
  Modal,
  Button,
  Timeline,
} from "antd";
import { UserOutlined, CalendarOutlined } from "@ant-design/icons";
import CommonBreadcrumb from "../../../components/CommonBreadcrumb/CommonBreadcrumb";
import { AppFooter } from "../../../components/Footer/AppFooter";
import { fetchGetProfile } from "../../../redux/getProflie/getProfileSlice";
import { fetchStudentDetail } from "../../../redux/getProflie/getProfileStudentSlice";
import hs from "../../../img/hs.jpg";
import vaccineSuccess from "../../../img/successVaccine.png";
import vaccineReject from "../../../img/rejectVaccine.png";
import checkUpSuccess from "../../../img/successCheckUp.png";
import checkUpReject from "../../../img/rejectCheckUp.png";
import eventSuccess from "../../../img/successMedicineEvent.png";
import eventReject from "../../../img/rejectMedicineEvent.png";
import AIChatWidget from "../AI/AIChatWidget ";

const StudentInformation = () => {
  const dispatch = useDispatch();
  const { profile = [] } = useSelector((state) => state.getProfile);
  const { student, loading, error } = useSelector(
    (state) => state.getProfileStudent
  );
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedResult, setSelectedResult] = useState(null);

  const ResultStatusImage = ({ type, status, severity }) => {
    // Normalize status nếu cần
    const normalizedStatus = status === "SKIPPED" ? "REJECT" : status;

    // Nếu là MEDICAL thì override theo severity
    const finalStatus =
      type === "MEDICAL"
        ? severity === "HOSPITAL"
          ? "SUCCESS"
          : "REJECT"
        : normalizedStatus;

    const images = {
      VACCINE: {
        SUCCESS: vaccineSuccess,
        REJECT: vaccineReject,
      },
      CHECKUP: {
        SUCCESS: checkUpSuccess,
        REJECT: checkUpReject,
      },
      MEDICAL: {
        SUCCESS: eventSuccess,
        REJECT: eventReject,
      },
    };

    const src = images?.[type]?.[finalStatus];
    return src ? (
      <img
        src={src}
        alt={`${type}-${finalStatus}`}
        className="w-40 mx-auto mb-4"
      />
    ) : null;
  };

  useEffect(() => {
    dispatch(fetchGetProfile());
  }, [dispatch]);

  useEffect(() => {
    if (profile?.data?.id) {
      dispatch(fetchStudentDetail(profile?.data?.id));
    }
  }, [dispatch, profile?.data?.id]);

  const formDate = (date) =>
    date ? new Date(date).toLocaleDateString("vi-VN") : "N/A";

  const showResultModal = (item, type = "UNKNOWN") => {
    setSelectedResult({ ...item, __type: type });
    setModalVisible(true);
  };

  const cardClass =
    "bg-white rounded-2xl shadow-md hover:shadow-xl border border-gray-200 transition-all";

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen bg-slate-50">
        <h1 className="pl-10 pt-5 text-xl font-inria font-medium mb-4">
          <CommonBreadcrumb role={"Student"} page={"information"} />
        </h1>
        <div className="flex-1 flex items-center justify-center">
          <Spin size="large" />
        </div>
        <AppFooter />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col min-h-screen bg-slate-50">
        <h1 className="pl-10 pt-5 text-xl font-inria font-medium mb-4">
          <CommonBreadcrumb role={"Student"} page={"information"} />
        </h1>
        <div className="p-6 flex-1">
          <Alert
            message="Lỗi tải thông tin"
            description={`Không thể tải thông tin học sinh: ${error}`}
            type="error"
            showIcon
          />
        </div>
        <AppFooter />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <h1 className="pl-10 pt-5 text-xl font-inria font-medium mb-4">
        <CommonBreadcrumb role={"Student"} page={"information"} />
      </h1>
      <div className="p-6 flex-1">
        <h1 className="text-3xl font-extrabold text-blue-500 ml-5 underline underline-offset-4 decoration-blue-300">
          📘 STUDENT INFORMATION
        </h1>
        <p className="pt-2 ml-5 text-gray-500 font-medium">
          Thông tin chi tiết về học sinh
        </p>

        {/* Thông tin cơ bản */}
        <div className={`${cardClass} p-6 my-6`}>
          <div className="flex items-center gap-6">
            <Avatar
              size={120}
              src={hs}
              icon={<UserOutlined />}
              className="border-4 border-blue-100 shadow-lg"
            />
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-800 mb-2 font-inria">
                {student?.account?.fullname || "N/A"}
              </h1>
              <div className="flex flex-wrap gap-4 text-gray-600">
                <div className="flex items-center gap-2">
                  <UserOutlined className="text-blue-500" />
                  <span>
                    Mã học sinh: <strong>{student?.student_code}</strong>
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <CalendarOutlined className="text-blue-500" />
                  <span>
                    Lớp:{" "}
                    <strong>
                      {student?.lastAcamedicYear?.class?.name || "N/A"}
                    </strong>
                  </span>
                </div>
                <Tag
                  color={student?.graduated ? "green" : "orange"}
                  className="rounded-full px-3"
                >
                  {student?.graduated ? "Đã tốt nghiệp" : "Đang học"}
                </Tag>
              </div>
            </div>
          </div>
        </div>

        {/* Các card */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card title="🧑‍🎓 Thông tin học sinh" className={cardClass}>
            <Descriptions column={1} className="text-sm">
              <Descriptions.Item label="Họ tên">
                {student?.account?.fullname}
              </Descriptions.Item>
              <Descriptions.Item label="Mã học sinh">
                {student?.student_code}
              </Descriptions.Item>
              <Descriptions.Item label="Ngày sinh">
                {formDate(student?.dateOfBirth)}
              </Descriptions.Item>
              <Descriptions.Item label="Giới tính">
                {student?.gender}
              </Descriptions.Item>
              <Descriptions.Item label="Trạng thái">
                <Tag
                  color={student?.graduated ? "green" : "orange"}
                  className="rounded-full px-3"
                >
                  {student?.graduated ? "Đã tốt nghiệp" : "Đang học"}
                </Tag>
              </Descriptions.Item>
            </Descriptions>
          </Card>

          <Card title="📧 Liên hệ" className={cardClass}>
            <Descriptions column={1} className="text-sm">
              <Descriptions.Item label="Email">
                {student?.account?.email}
              </Descriptions.Item>
            </Descriptions>
          </Card>

          <Card title="👨‍👩‍👧 Phụ huynh" className={cardClass}>
            <Descriptions column={1} className="text-sm">
              <Descriptions.Item label="Họ tên phụ huynh">
                {student?.ParentInfo?.fullname}
              </Descriptions.Item>
              <Descriptions.Item label="Email">
                {student?.ParentInfo?.email}
              </Descriptions.Item>
              <Descriptions.Item label="Số điện thoại">
                {student?.ParentInfo?.phone}
              </Descriptions.Item>
            </Descriptions>
          </Card>

          <Card title="🆘 Sự kiện y tế" className={cardClass}>
            {student?.medicalEventHistoty?.map((event, idx) => (
              <div
                key={idx}
                className="mb-2 p-3 border rounded bg-red-50 space-y-1"
              >
                <p>
                  <strong>Loại:</strong> {event.type}
                </p>
                <p>
                  <strong>Mức độ:</strong> {event.severity}
                </p>
                <Button
                  size="small"
                  onClick={() => showResultModal(event, "MEDICAL")}
                >
                  Xem chi tiết
                </Button>
              </div>
            ))}
          </Card>

          <Card title="💉 Lịch sử tiêm chủng" className={cardClass}>
            <Timeline className="pl-2">
              {student?.vaccinationEventHistoryFormat?.map((event, index) => (
                <Timeline.Item key={index}>
                  <div className="flex justify-between items-center">
                    <div>
                      <strong>{event.title}</strong> -{" "}
                      {formDate(event.scheduledAt)}
                    </div>
                    {event.result ? (
                      <Button
                        size="small"
                        type={
                          event.result.status === "SKIPPED"
                            ? "dashed"
                            : "default"
                        }
                        danger={event.result.status === "SKIPPED"}
                        onClick={() => showResultModal(event, "VACCINE")}
                      >
                        {event.result.status === "SKIPPED"
                          ? "Xem chi tiết "
                          : "Xem chi tiết"}
                      </Button>
                    ) : (
                      <span className="text-gray-500 text-sm">
                        Không có dữ liệu
                      </span>
                    )}
                  </div>
                </Timeline.Item>
              ))}
            </Timeline>
          </Card>

          <Card title="🩺 Khám sức khỏe" className={cardClass}>
            <Timeline className="pl-2">
              {student?.healthCheckupHistoryFormat?.map((event, index) => (
                <Timeline.Item key={index}>
                  <div className="flex justify-between items-center">
                    <div>
                      <strong>{event.title}</strong> -{" "}
                      {formDate(event.scheduledAt)}
                    </div>
                    {event.result ? (
                      <Button
                        size="small"
                        type={
                          event.result.status === "SKIPPED"
                            ? "dashed"
                            : "default"
                        }
                        danger={event.result.status === "SKIPPED"}
                        onClick={() => showResultModal(event, "CHECKUP")}
                      >
                        {event.result.status === "SKIPPED"
                          ? "Xem chi tiết "
                          : "Xem chi tiết"}
                      </Button>
                    ) : (
                      <span className="text-gray-500 text-sm">
                        Không có dữ liệu
                      </span>
                    )}
                  </div>
                </Timeline.Item>
              ))}
            </Timeline>
          </Card>
        </div>
      </div>

      {/* Modal kết quả tổng hợp */}
      <Modal
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={null}
        title="Chi tiết kết quả"
        className="custom-result-modal"
        bodyStyle={{
          backgroundColor: "#f9fafb",
          borderRadius: "16px",
          padding: "24px",
        }}
      >
        <div
          className={`space-y-4 p-4 rounded-xl ${
            selectedResult?.__type === "VACCINE"
              ? "bg-green-50 border-l-4 border-green-400"
              : selectedResult?.__type === "CHECKUP"
              ? "bg-blue-50 border-l-4 border-blue-400"
              : selectedResult?.__type === "MEDICAL"
              ? "bg-red-50 border-l-4 border-red-400"
              : "bg-gray-100 border-l-4 border-gray-300"
          }`}
        >
          {/* 🖼 Ảnh trạng thái chỉ hiển thị đúng một lần */}
          <ResultStatusImage
            type={selectedResult?.__type}
            status={selectedResult?.result?.status}
            severity={selectedResult?.severity}
          />

          {/* 🏷 Tag phân loại */}
          <Tag
            color={
              selectedResult?.__type === "VACCINE"
                ? "green"
                : selectedResult?.__type === "CHECKUP"
                ? "blue"
                : selectedResult?.__type === "MEDICAL"
                ? "red"
                : "default"
            }
            className="text-base font-semibold px-5 py-1 rounded-xl shadow"
          >
            {selectedResult?.__type === "VACCINE"
              ? "💉 TIÊM CHỦNG"
              : selectedResult?.__type === "CHECKUP"
              ? "🩺 KHÁM SỨC KHỎE"
              : selectedResult?.__type === "MEDICAL"
              ? "🏥 SỰ KIỆN Y TẾ"
              : "LOẠI KHÁC"}
          </Tag>

          {/* 📌 Nếu là SKIPPED thì chỉ hiện cảnh báo */}
          {selectedResult?.result?.status === "SKIPPED" ? (
            <div className="text-center space-y-4">
              <Alert
                message="Học sinh vắng mặt"
                description="Không có thông tin kết quả cho sự kiện này."
                type="warning"
                showIcon
                className="rounded max-w-md mx-auto"
              />
            </div>
          ) : (
            <>
              {/* ✅ Hiển thị chi tiết kết quả */}
              <Descriptions
                column={1}
                bordered
                size="middle"
                labelStyle={{ fontWeight: "bold", backgroundColor: "#f0f9ff" }}
                contentStyle={{ backgroundColor: "#fff" }}
              >
                {selectedResult?.title && (
                  <Descriptions.Item label="📌 Tên sự kiện">
                    {selectedResult.title}
                  </Descriptions.Item>
                )}
                <Descriptions.Item label="✅ Kết quả">
                  {selectedResult?.result?.result || "N/A"}
                </Descriptions.Item>
                <Descriptions.Item label="📝 Ghi chú">
                  {selectedResult?.result?.overallNotes ||
                    selectedResult?.result?.note ||
                    "Không có ghi chú"}
                </Descriptions.Item>
              </Descriptions>

              {/* 📋 Nội dung kiểm tra chi tiết */}
              {selectedResult?.contents?.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {selectedResult.contents.map((item, idx) => (
                    <div
                      key={idx}
                      className="rounded-lg border border-gray-300 bg-white p-4 shadow-md"
                    >
                      <h3 className="text-blue-600 font-semibold mb-2">
                        📋 {item.name}
                      </h3>
                      <p className="text-sm">
                        <strong>Giá trị:</strong> {item.value || "N/A"}
                      </p>
                      {item.note && (
                        <p className="text-sm">
                          <strong>Ghi chú:</strong> {item.note}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* 🏥 Thông tin thêm nếu là Sự kiện y tế */}
              {selectedResult?.__type === "MEDICAL" && (
                <div className="rounded-lg bg-red-100 p-4 border border-red-300 space-y-2 shadow">
                  <h3 className="text-lg font-bold text-red-700">
                    🏥 Thông tin sự kiện y tế
                  </h3>
                  <p>
                    <strong>📂 Loại:</strong> {selectedResult?.type}
                  </p>
                  <p>
                    <strong>⚠️ Mức độ:</strong> {selectedResult?.severity}
                  </p>
                  <p>
                    <strong>📝 Mô tả:</strong> {selectedResult?.description}
                  </p>
                  {selectedResult?.HospitalTransfer ? (
                    <>
                      <p>
                        <strong>🚑 Chuyển viện:</strong>{" "}
                        {selectedResult.HospitalTransfer.hospitalName}
                      </p>
                      <p>
                        <strong>🕒 Thời gian:</strong>{" "}
                        {formDate(
                          selectedResult.HospitalTransfer.transferredAt
                        )}
                      </p>
                    </>
                  ) : (
                    <p>
                      <strong>🚫 Chuyển viện:</strong> Không
                    </p>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </Modal>

      {/* Phần modal đã được cập nhật đẹp sẵn ở yêu cầu trước */}

      <div className="fixed bottom-8 right-8 z-[9999]">
        <AIChatWidget />
      </div>
      <div className="h-[160px] w-full mb-[100px]"></div>
      <AppFooter />
    </div>
  );
};

export default StudentInformation;

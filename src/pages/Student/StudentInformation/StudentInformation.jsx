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
          Detailed student information
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
                    Lớp:{" "}
                    <strong>
                      {student?.lastAcamedicYear?.class?.name || "N/A"}
                    </strong>
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <CalendarOutlined className="text-blue-500" />
                  <span>
                    Class:{" "}
                    <strong>
                      {student?.lastAcamedicYear?.class?.name || "N/A"}
                    </strong>
                  </span>
                </div>
                <Tag
                  color={student?.graduated ? "green" : "orange"}
                  className="rounded-full px-3"
                >
                  {student?.graduated ? "Graduated" : "Enrolled"}
                </Tag>
              </div>
            </div>
          </div>
        </div>

        {/* Các card */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card title="🧑‍🎓 Student Information" className={cardClass}>
            <Descriptions column={1} className="text-sm">
              <Descriptions.Item label="Full Name">
                {student?.account?.fullname}
              </Descriptions.Item>
              <Descriptions.Item label="Student Code">
                {student?.student_code}
              </Descriptions.Item>
              <Descriptions.Item label="Date of Birth">
                {formDate(student?.dateOfBirth)}
              </Descriptions.Item>
              <Descriptions.Item label="Gender">
                {student?.gender}
              </Descriptions.Item>
              <Descriptions.Item label="Status">
                <Tag
                  color={student?.graduated ? "green" : "orange"}
                  className="rounded-full px-3"
                >
                  {student?.graduated ? "Gradutated" : "Enrolled"}
                </Tag>
              </Descriptions.Item>
            </Descriptions>
          </Card>

          <Card title="📧 Contact" className={cardClass}>
            <Descriptions column={1} className="text-sm">
              <Descriptions.Item label="Email">
                {student?.account?.email}
              </Descriptions.Item>
            </Descriptions>
          </Card>

          <Card title="👨‍👩‍👧 Parent" className={cardClass}>
            <Descriptions column={1} className="text-sm">
              <Descriptions.Item label="Parent Name">
                {student?.ParentInfo?.fullname}
              </Descriptions.Item>
              <Descriptions.Item label="Email">
                {student?.ParentInfo?.email}
              </Descriptions.Item>
              <Descriptions.Item label="Phone Number">
                {student?.ParentInfo?.phone}
              </Descriptions.Item>
            </Descriptions>
          </Card>

          <Card title="🆘 Medicine Event" className={cardClass}>
            {student?.medicalEventHistoty?.map((event, idx) => (
              <div
                key={idx}
                className="mb-2 p-3 border rounded bg-red-50 space-y-1"
              >
                <p>
                  <strong>Type:</strong> {event.type}
                </p>
                <p>
                  <strong>Severity:</strong> {event.severity}
                </p>
                <Button
                  size="small"
                  onClick={() => showResultModal(event, "MEDICAL")}
                >
                  View details
                </Button>
              </div>
            ))}
          </Card>

          <Card title="💉 Vaccination History" className={cardClass}>
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
                          ? "View details"
                          : "View details"}
                      </Button>
                    ) : (
                      <span className="text-gray-500 text-sm">
                        No Data Available
                      </span>
                    )}
                  </div>
                </Timeline.Item>
              ))}
            </Timeline>
          </Card>

          <Card title="🩺 Health Check" className={cardClass}>
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
                        No Data Available
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
        title="Result Details"
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
                message="Student Absent"
                description="No result available for this event."
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
                  <Descriptions.Item label="📌 Event Name">
                    {selectedResult.title}
                  </Descriptions.Item>
                )}
                <Descriptions.Item label="✅ Result">
                  {selectedResult?.result?.result || "N/A"}
                </Descriptions.Item>
                <Descriptions.Item label="📝 Notes">
                  {selectedResult?.result?.overallNotes ||
                    selectedResult?.result?.note ||
                    "No notes result"}
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
                        <strong>Type:</strong> {item.value || "N/A"}
                      </p>
                      {item.note && (
                        <p className="text-sm">
                          <strong>Notes:</strong> {item.note}
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
                    <strong>📂 Type:</strong> {selectedResult?.type}
                  </p>
                  <p>
                    <strong>⚠️ Severity:</strong> {selectedResult?.severity}
                  </p>
                  <p>
                    <strong>📝 Description:</strong>{" "}
                    {selectedResult?.description}
                  </p>
                  {selectedResult?.HospitalTransfer ? (
                    <>
                      <p>
                        <strong>🚑 Hospital Transfer:</strong>{" "}
                        {selectedResult.HospitalTransfer.hospitalName}
                      </p>
                      <p>
                        <strong>🕒 Time:</strong>{" "}
                        {formDate(
                          selectedResult.HospitalTransfer.transferredAt
                        )}
                      </p>
                    </>
                  ) : (
                    <p>
                      <strong>🚫 Hospital Transfer:</strong> Không
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

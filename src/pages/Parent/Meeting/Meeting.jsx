import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Pending from "./Pending";
import Completed from "./Completed";
import Rejected from "./Rejected";
import { AppFooter } from "../../../components/Footer/AppFooter";
import CommonBreadcrumb from "../../../components/CommonBreadcrumb/CommonBreadcrumb";
import { fetchMeetingParent } from "../../../redux/getMettingParent/getAllMettingParentSlice";
import { fetchAcceptMeeting } from "../../../redux/getMettingParent/getMeetingParentAcceptSlice";
import { fetchDeclineMeeting } from "../../../redux/getMettingParent/getMeetingParentDeclineSlice";
import { Spin, Alert, message, Modal, Typography } from "antd";

const { Text } = Typography;

const Meeting = () => {
  const dispatch = useDispatch();

  const { meeting, loading, error } = useSelector(
    (state) => state.meetingParent
  );

  const { loading: acceptLoading, error: acceptError } = useSelector(
    (state) => state.meetingParentAccept
  );

  const [selectedNotification, setSelectedNotification] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [consentType, setConsentType] = useState("yes");

  useEffect(() => {
    dispatch(fetchMeetingParent());
  }, [dispatch]);

  const mapStatus = (apiStatus) => {
    const status = apiStatus?.toUpperCase();
    switch (status) {
      case "ACCEPTED":
        return "completed";
      case "DECLINED":
        return "rejected";
      case "PENDING":
      default:
        return "pending";
    }
  };

  const notificationsItem =
    meeting?.data?.map((item) => ({
      id: item.id,
      healthCheckUpID: item.healthCheckUpID,
      studentID: item.studentID,
      scheduledAt: item.scheduledAt,
      date: item.scheduledAt
        ? new Date(item.scheduledAt).toLocaleDateString("en-GB")
        : "No date",
      type: "meeting",
      reason: item.reason,
      description: item.reason,
      status: mapStatus(item.status),
      formatStudentInfo: item.formatStudentInfo,
      updatedAt: item.updatedAt,
    })) || [];

  const onOpenModal = (notification, type = "yes") => {
    setSelectedNotification(notification);
    setConsentType(type);
    setModalVisible(true);
  };

  const handleAccept = async () => {
    try {
      if (consentType === "yes") {
        await dispatch(fetchAcceptMeeting(selectedNotification.id));
        message.success("Đã xác nhận tham gia cuộc họp!");
      } else {
        await dispatch(fetchDeclineMeeting(selectedNotification.id));
        message.success("Đã từ chối cuộc họp!");
      }
      await dispatch(fetchMeetingParent());
      setModalVisible(false);
    } catch (err) {
      message.error("Có lỗi xảy ra khi gửi phản hồi.");
    }
  };

  const location = useLocation();
  const currentTab = location.pathname.split("/").pop() || "pending";

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
          description={`Failed to load notifications: ${error}`}
          type="error"
          showIcon
          className="mb-4"
        />
      );
    }

    switch (currentTab) {
      case "completed":
        return <Completed notifications={notificationsItem} />;
      case "rejected":
        return <Rejected notifications={notificationsItem} />;
      case "pending":
      default:
        return (
          <Pending
            notifications={notificationsItem}
            onOpenModal={onOpenModal}
          />
        );
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <h1 className="pl-10 pt-5 text-xl font-inria font-medium mb-4">
        <CommonBreadcrumb role={"Parent"} page={"meeting"} />
      </h1>
      <div className="p-6 flex flex-col flex-1">
        <h1 className="text-3xl font-bold text-blue-400 ml-5">
          MEETING NOTICE
        </h1>
        <p className="pt-5 ml-5 text-blue-400">
          Confirm student meeting information
        </p>
        <div className="flex mt-5 bg-[#F3F3F3] font-kameron w-[500px] h-10 items-center rounded-xl ml-5">
          <div className="m-auto flex gap-5">
            <Link
              to={""}
              className={currentTab === "pending" ? "font-bold" : ""}
            >
              Pending (
              {notificationsItem.filter((n) => n.status === "pending").length})
            </Link>
            <Link
              to={"completed"}
              className={currentTab === "completed" ? "font-bold" : ""}
            >
              Completed (
              {notificationsItem.filter((n) => n.status === "completed").length}
              )
            </Link>
            <Link
              to={"rejected"}
              className={currentTab === "rejected" ? "font-bold" : ""}
            >
              Rejected (
              {notificationsItem.filter((n) => n.status === "rejected").length})
            </Link>
          </div>
        </div>

        <div className="flex-1 overflow-auto mt-5 ml-5 mr-5">
          {renderContent()}
        </div>

        {acceptError && (
          <Alert
            message="Lỗi xác nhận"
            description={acceptError.message || "Không thể xác nhận cuộc họp"}
            type="error"
            showIcon
            className="mb-4"
          />
        )}
        <Modal
          title={
            consentType === "yes"
              ? "🎉 Xác nhận tham gia họp phụ huynh"
              : "❌ Từ chối tham gia họp phụ huynh"
          }
          open={modalVisible}
          onOk={handleAccept}
          onCancel={() => setModalVisible(false)}
          okText={
            consentType === "yes" ? "Xác nhận tham gia" : "Xác nhận từ chối"
          }
          cancelText="Hủy"
          okButtonProps={{
            style: {
              backgroundColor: consentType === "yes" ? "#3b82f6" : "#ef4444",
              borderColor: consentType === "yes" ? "#2563eb" : "#dc2626",
            },
          }}
        >
          {selectedNotification && (
            <div className="space-y-3 text-[15px]">
              <div className="p-3 rounded-md bg-blue-50 border border-blue-200">
                <Text className="text-blue-600 font-semibold">
                  👩‍🎓 Thông tin học sinh
                </Text>
                <div>
                  {selectedNotification.formatStudentInfo?.fullname} (
                  {selectedNotification.formatStudentInfo?.student_code})
                </div>
              </div>
              <div className="p-3 rounded-md bg-yellow-50 border border-yellow-200">
                <Text className="text-yellow-700 font-semibold">
                  📅 Thời gian họp
                </Text>
                <div>
                  {new Date(selectedNotification.scheduledAt).toLocaleString(
                    "vi-VN"
                  )}
                </div>
              </div>
              <div className="p-3 rounded-md bg-gray-50 border border-gray-200">
                <Text className="text-gray-700 font-semibold">📄 Lý do</Text>
                <div>{selectedNotification.description}</div>
              </div>

              {consentType === "yes" ? (
                <div className="p-3 rounded-md bg-green-50 border border-green-200">
                  <Text className="text-green-700 font-semibold">
                    ✔️ Bạn sắp xác nhận tham gia cuộc họp
                  </Text>
                </div>
              ) : (
                <div className="p-3 rounded-md bg-red-50 border border-red-200">
                  <Text className="text-red-700 font-semibold">
                    ❗ Bạn sắp từ chối cuộc họp này
                  </Text>
                </div>
              )}
            </div>
          )}
        </Modal>

        <div className="h-[160px] w-full"></div>
      </div>
      <AppFooter />
    </div>
  );
};

export default Meeting;

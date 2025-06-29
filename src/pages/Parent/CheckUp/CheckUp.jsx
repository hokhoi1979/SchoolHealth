"use client";

import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Pending from "./Pending";
import Completed from "./Completed";
import Rejected from "./Rejected";
import ModalResponse from "./ModalResponse";
import DetailModal from "./DetailModal";
import { AppFooter } from "../../../components/Footer/AppFooter";
import CommonBreadcrumb from "../../../components/CommonBreadcrumb/CommonBreadcrumb";
import { fetchCheckUpParent } from "../../../redux/getCheckupParent/getCheckupParentSlice";
import { fetchAcceptCheckUp } from "../../../redux/getCheckupParent/getCheckupParentAcceptSlice";
import { fetchDeclineCheckUp } from "../../../redux/getCheckupParent/getCheckupParentDeclineSlice";
import { fetchDetailCheckUpParent } from "../../../redux/getCheckupParent/getDetailCheckupParentSlice";
import { Spin, Alert, message } from "antd";

const CheckUp = () => {
  const dispatch = useDispatch();
  const { checkup, loading, error } = useSelector(
    (state) => state.checkupParent
  );
  const { loading: acceptLoading, error: acceptError } = useSelector(
    (state) => state.checkupParentAccept
  );
  const { loading: declineLoading, error: declineError } = useSelector(
    (state) => state.checkupParentDecline
  );
  const {
    checkup: checkupDetail,
    loading: detailLoading,
    error: detailError,
  } = useSelector((state) => state.detailCheckUpParent);

  const [selectedNotification, setSelectedNotification] = useState(null);
  const [response, setResponse] = useState({ consent: "yes", reason: "" });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchCheckUpParent());
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

  const notificationItem =
    checkup?.data?.map((item) => ({
      id: item.id,
      healthCheckUpID: item.healthCheckUpID,
      studentID: item.studentID,
      title: item.healthCheckup?.title || "N/A",
      description: item.healthCheckup?.description || "N/A",
      date: item.healthCheckup?.scheduledAt
        ? new Date(item.healthCheckup.scheduledAt).toLocaleDateString("en-GB")
        : "No date",
      type: "checkup",
      status: mapStatus(item.status),
      originalStatus: item.status,
      note: item.note,
      respondedAt: item.respondedAt,
      student: item.student,
      healthCheckup: item.healthCheckup,
    })) || [];

  const handleOpenModal = (notification, consnetType = "yes") => {
    setSelectedNotification(notification);
    setResponse({ consent: consnetType, reason: "" });
    setIsModalOpen(true);
  };

  const handleViewDetail = (healthCheckUpID) => {
    console.log("Viewing detail for:", healthCheckUpID); // Debug log
    dispatch(fetchDetailCheckUpParent({ id: healthCheckUpID }));
    setIsDetailModalOpen(true);
  };

  const handleCloseDetailModal = () => {
    setIsDetailModalOpen(false);
  };

  const handleConfirm = async () => {
    if (!selectedNotification) return;
    const payload = {
      studentID: selectedNotification.studentID,
      healthCheckUpID: selectedNotification.healthCheckUpID,
    };

    try {
      if (response.consent === "yes") {
        console.log("Accepting checkup with payload:", payload);
        await dispatch(fetchAcceptCheckUp(payload));
        message.success("CheckUp accepted successfully!");
      } else {
        if (!response.reason?.trim()) {
          message.error("Please provide a reason for rejection");
          return;
        }
        console.log("Declining checkup with payload:", {
          ...payload,
          note: response.reason,
        });
        await dispatch(
          fetchDeclineCheckUp({
            ...payload,
            note: response.reason,
          })
        );
        message.success("CheckUp declined successfully!");
      }

      setIsModalOpen(false);
      setSelectedNotification(null);
      setResponse({ consent: "yes", reason: "" });

      setTimeout(() => {
        console.log("Refreshing data...");
        dispatch(fetchCheckUpParent());
      }, 1000);
    } catch (error) {
      console.error("Error submitting response:", error);
      message.error("Failed to submit response. Please try again.");
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setSelectedNotification(null);
    setResponse({ consent: "yes", reason: "" });
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
          description={`Failed to load checkup notifications: ${error}`}
          type="error"
          showIcon
          className="mb-4"
        />
      );
    }
    switch (currentTab) {
      case "completed":
        return (
          <Completed
            notifications={notificationItem}
            onViewDetail={handleViewDetail}
          />
        );
      case "rejected":
        return <Rejected notifications={notificationItem} />;
      case "pending":
      default:
        return (
          <Pending
            notifications={notificationItem}
            onOpenModal={handleOpenModal}
          />
        );
    }
  };

  const modalLoading = acceptLoading || declineLoading;
  const modalError = acceptError || declineError;

  return (
    <div className="flex flex-col min-h-screen">
      <h1 className="pl-10 pt-5 text-xl font-inria font-medium mb-4">
        <CommonBreadcrumb role={"Parent"} page={"check up"} />
      </h1>
      <div className="p-6 flex flex-col flex-1">
        <h1 className="text-3xl font-bold text-blue-400 ml-5">
          CHECK UP NOTICE
        </h1>
        <p className="pt-5 ml-5 text-blue-400">
          Confirm student checkup information
        </p>
        <div className="flex mt-5 bg-[#F3F3F3] font-kameron w-[500px] h-10 items-center rounded-xl ml-5">
          <div className="m-auto flex gap-5">
            <div className="hover:bg-white p-1 rounded-lg w-50">
              <Link
                to={""}
                className={currentTab === "pending" ? "font-bold" : ""}
              >
                Pending (
                {notificationItem.filter((n) => n.status === "pending").length})
              </Link>
            </div>
            <div className="hover:bg-white p-1 rounded-lg w-50">
              <Link
                to={"completed"}
                className={currentTab === "completed" ? "font-bold" : ""}
              >
                Completed (
                {
                  notificationItem.filter((n) => n.status === "completed")
                    .length
                }
                )
              </Link>
            </div>
            <div className="hover:bg-white p-1 rounded-lg w-50">
              <Link
                to={"rejected"}
                className={currentTab === "rejected" ? "font-bold" : ""}
              >
                Rejected (
                {notificationItem.filter((n) => n.status === "rejected").length}
                )
              </Link>
            </div>
          </div>
        </div>
        <div className="flex-1 overflow-auto mt-5 ml-5 mr-5">
          {renderContent()}
        </div>
        <div className="h-[160px] w-full"></div>
      </div>
      <AppFooter />
      <ModalResponse
        open={isModalOpen}
        notification={selectedNotification}
        response={response}
        setResponse={setResponse}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
        loading={modalLoading}
        error={modalError}
      />
      <DetailModal
        open={isDetailModalOpen}
        onclose={handleCloseDetailModal}
        checkupDetail={checkupDetail}
        loading={detailLoading}
        error={detailError}
      />
    </div>
  );
};

export default CheckUp;

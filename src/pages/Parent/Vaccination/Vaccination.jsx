import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Pending from "./Pending";
import Completed from "./Completed";
import Rejected from "./Rejected";
import ModalResponse from "./ModalResponse";
import { AppFooter } from "../../../components/Footer/AppFooter";
import CommonBreadcrumb from "../../../components/CommonBreadcrumb/CommonBreadcrumb";
import { fetchVaccineParent } from "../../../redux/getVaccineParent/getVaccineParentSlice";
import { fetchAcceptVaccine } from "../../../redux/getVaccineParent/getVaccineParentAcceptSlice";
import { fetchDeclineVaccine } from "../../../redux/getVaccineParent/getVaccineParentDeclineSlice";
import { fetchVaccineParentResult } from "../../../redux/getVaccineParent/getVaccineParentResultSlice";
import { Spin, Alert, message } from "antd";

const Vaccination = () => {
  const dispatch = useDispatch();

  // Main data
  const { vaccine, loading, error } = useSelector(
    (state) => state.vaccineParent
  );
  const {
    vaccine: resultDetail,
    loading: resultLoading,
    error: resultError,
  } = useSelector((state) => state.vaccineParentResult);

  const { loading: acceptLoading, error: acceptError } = useSelector(
    (state) => state.vaccineParentAccept
  );
  const { loading: declineLoading, error: declineError } = useSelector(
    (state) => state.vaccineParentDecline
  );

  const [selectedNotification, setSelectedNotification] = useState(null);
  const [response, setResponse] = useState({ consent: "yes", reason: "" });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false); // ✅

  useEffect(() => {
    dispatch(fetchVaccineParent());
    dispatch(fetchVaccineParentResult());
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
    vaccine?.data?.map((item) => ({
      id: item.id,
      vaccinationEventID: item.vaccinationEventID,
      studentID: item.studentID,
      title: item.vaccinationEvent?.name || "Vaccination Notice",
      description:
        item.vaccinationEvent?.description || "No description available",
      date: item.vaccinationEvent?.scheduledAt
        ? new Date(item.vaccinationEvent.scheduledAt).toLocaleDateString(
            "en-GB"
          )
        : "No date",
      type: "vaccination",
      status: mapStatus(item.status),
      originalStatus: item.status,
      note: item.note,
      respondedAt: item.respondedAt,
      student: item.student,
      vaccinationEvent: item.vaccinationEvent,
    })) || [];

  // ✅ View Detail Handler
  const handleViewDetail = () => {
    dispatch(fetchVaccineParentResult());
    setIsDetailModalOpen(true);
  };

  const handleOpenModal = (notification, consentType = "yes") => {
    setSelectedNotification(notification);
    setResponse({ consent: consentType, reason: "" });
    setIsModalOpen(true);
  };

  const handleConfirm = async () => {
    if (!selectedNotification) return;
    const payload = {
      studentID: selectedNotification.studentID,
      vaccinationEventID: selectedNotification.vaccinationEventID,
    };

    try {
      if (response.consent === "yes") {
        await dispatch(fetchAcceptVaccine(payload));
        message.success("Vaccination accepted successfully!");
      } else {
        if (!response.reason?.trim()) {
          message.error("Please provide a reason for rejection");
          return;
        }
        await dispatch(
          fetchDeclineVaccine({
            ...payload,
            note: response.reason,
          })
        );
        message.success("Vaccination declined successfully!");
      }

      setIsModalOpen(false);
      setSelectedNotification(null);
      setResponse({ consent: "yes", reason: "" });

      setTimeout(() => {
        dispatch(fetchVaccineParent());
      }, 1000);
    } catch (error) {
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
          description={`Failed to load vaccination notifications: ${error}`}
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
            notifications={notificationsItem}
            resultsList={resultDetail?.data || []}
            resultLoading={resultLoading}
            resultError={resultError}
          />
        );
      case "rejected":
        return <Rejected notifications={notificationsItem} />;
      case "pending":
      default:
        return (
          <Pending
            notifications={notificationsItem}
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
        <CommonBreadcrumb role={"Parent"} page={"vaccination"} />
      </h1>
      <div className="p-6 flex flex-col flex-1">
        <h1 className="text-3xl font-bold text-blue-400 ml-5">
          VACCINATION NOTICE
        </h1>
        <p className="pt-5 ml-5 text-blue-400">
          Confirm student immunization information
        </p>
        <div className="flex mt-5 bg-[#F3F3F3] font-kameron w-[500px] h-10 items-center rounded-xl ml-5">
          <div className="m-auto flex gap-5">
            <div className="hover:bg-white p-1 rounded-lg w-50">
              <Link
                to={""}
                className={currentTab === "pending" ? "font-bold" : ""}
              >
                Pending (
                {notificationsItem.filter((n) => n.status === "pending").length}
                )
              </Link>
            </div>
            <div className="hover:bg-white p-1 rounded-lg w-50">
              <Link
                to={"completed"}
                className={currentTab === "completed" ? "font-bold" : ""}
              >
                Completed (
                {
                  notificationsItem.filter((n) => n.status === "completed")
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
                {
                  notificationsItem.filter((n) => n.status === "rejected")
                    .length
                }
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
    </div>
  );
};

export default Vaccination;

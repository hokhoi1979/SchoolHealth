"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMedicineRequest } from "../../../redux/profileParent/medicalRequest/MedicineRequestSlice";
import { fetchDetailRequest } from "../../../redux/profileParent/medicalRequest/getDetailRequestSlice";
import { fetchAcceptBenefitMedicine } from "../../../redux/profileParent/medicalRequest/acceptBenefitMedicineSlice";
import { fetchRejectBenefitMedicine } from "../../../redux/profileParent/medicalRequest/rejectBenefitMedicineSlice";
import { Card, Button, Descriptions, Tag, Modal, message, Alert } from "antd";

const statusColor = {
  PENDING: "orange",
  CONFIRMED_RECEIVED: "blue",
  CONFIRMED_NOT_RECEIVED: "red",
  COMPLETED: "green",
  REJECTED: "volcano",
};

const Notification = () => {
  const dispatch = useDispatch();
  const { medicine, loading, error } = useSelector(
    (state) => state.medicineRequest
  );
  const {
    requestDetail,
    loading: detailLoading,
    error: detailError,
  } = useSelector((state) => state.getDetailRequest);

  const { loading: accepting } = useSelector(
    (state) => state.acceptBenefitMedicine
  );

  const { loading: rejecting } = useSelector(
    (state) => state.rejectBenefitMedicine
  );

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentViewingId, setCurrentViewingId] = useState(null);
  const [hiddenRequestID, setHiddenRequestID] = useState([]);
  const [alertMessage, setAlertMessage] = useState(null);

  useEffect(() => {
    // Fetch medicine requests with status CONFIRMED_RECEIVED and isBenefit true
    dispatch(
      fetchMedicineRequest({ status: "CONFIRMED_RECEIVED", isBenefit: true })
    );
  }, [dispatch]);

  useEffect(() => {
    if (requestDetail && !detailLoading && !detailError) {
      setIsModalVisible(true);
    } else if (detailError) {
      message.error("Failed to fetch medication detail!");
      setIsModalVisible(false);
      setCurrentViewingId(null);
    }
  }, [requestDetail, detailLoading, detailError]);

  const handleAccept = async (requestID) => {
    try {
      await dispatch(fetchAcceptBenefitMedicine(requestID));
      setHiddenRequestID((prev) => [...prev, requestID]);

      setAlertMessage({
        type: "success",
        message: "✅ Medicine request accepted and marked as COMPLETED.",
      });

      setTimeout(() => setAlertMessage(null), 3000);
    } catch (error) {
      setAlertMessage({
        type: "error",
        message: "❌ Failed to accept the medicine request.",
      });

      setTimeout(() => setAlertMessage(null), 3000);
    }
  };

  const handleReject = async (requestID) => {
    try {
      await dispatch(fetchRejectBenefitMedicine(requestID));
      setHiddenRequestID((prev) => [...prev, requestID]);

      setAlertMessage({
        type: "success",
        message: "🚫 Medicine request has been rejected.",
      });

      setTimeout(() => setAlertMessage(null), 3000);
    } catch (error) {
      setAlertMessage({
        type: "error",
        message: "❌ Failed to reject the medicine request.",
      });

      setTimeout(() => setAlertMessage(null), 3000);
    }
  };

  const handleViewDetail = (requestID) => {
    setCurrentViewingId(requestID);
    dispatch(fetchDetailRequest({ requestID: requestID }));
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
    setCurrentViewingId(null);
  };

  if (loading) {
    return <div className="p-6 text-center">Loading notifications...</div>;
  }

  if (error) {
    return (
      <div className="p-6 text-center text-red-500">
        Error loading notifications: {error.message || "Unknown error"}
      </div>
    );
  }

  const notifications = medicine.filter(
    (req) =>
      req.status === "CONFIRMED_RECEIVED" &&
      req.isBenefit === true &&
      !hiddenRequestID.includes(req.id)
  );

  if (notifications.length === 0) {
    return (
      <div className="p-6 text-center text-gray-500">
        No new medicine stop requests from nurses.
      </div>
    );
  }

  return (
    <div className="p-6 grid gap-6">
      <h2 className="text-2xl font-bold text-blue-600 mb-4">
        Medicine Stop Requests
      </h2>
      {alertMessage && (
        <Alert
          message={alertMessage.message}
          type={alertMessage.type}
          showIcon
          closable
          onClose={() => setAlertMessage(null)}
          className="mb-4"
        />
      )}

      {notifications.map((request) => (
        <Card
          key={request.id}
          className="shadow-md rounded-lg"
          title={`Request for ${
            request.studentInfo?.account?.fullname || "N/A"
          }`}
          extra={
            <Tag color={statusColor[request.status] || "default"}>
              {request.status}
            </Tag>
          }
        >
          <Descriptions column={1} bordered size="small">
            <Descriptions.Item label="Student Name">
              {request.studentInfo?.account?.fullname || "N/A"}
            </Descriptions.Item>
            <Descriptions.Item label="Class">
              {request.studentInfo?.lastAcamedicYear?.class?.name || "N/A"}
            </Descriptions.Item>
            <Descriptions.Item label="Nurse's Note">
              {request.note || "No note provided."}
            </Descriptions.Item>
            <Descriptions.Item label="Medicine Detail">
              <Button type="link" onClick={() => handleViewDetail(request.id)}>
                View Detail
              </Button>
            </Descriptions.Item>
          </Descriptions>

          <div className="mt-4 flex justify-end gap-2">
            <Button
              type="primary"
              className="bg-green-500 hover:bg-green-600"
              onClick={() => handleAccept(request.id)}
              loading={accepting}
            >
              Accept
            </Button>
            <Button
              danger
              onClick={() => handleReject(request.id)}
              loading={rejecting}
            >
              Reject
            </Button>
          </div>
        </Card>
      ))}

      {/* Modal for medicine request detail */}
      <Modal
        title="Medication Request Detail"
        open={isModalVisible}
        onCancel={handleModalClose}
        footer={null}
        width={800}
      >
        {detailLoading ? (
          <div>Loading detailed information...</div>
        ) : detailError ? (
          <div style={{ color: "red" }}>
            Error: {detailError.message || "Failed to load details."}
          </div>
        ) : requestDetail ? (
          <Descriptions column={1} bordered>
            <Descriptions.Item label="Request ID">
              {requestDetail.requestID}
            </Descriptions.Item>
            <Descriptions.Item label="Student Name">
              {requestDetail.studentName || "N/A"}
            </Descriptions.Item>
            <Descriptions.Item label="Status">
              <Tag color={statusColor[requestDetail.status] || "default"}>
                {requestDetail.status}
              </Tag>
            </Descriptions.Item>
            <Descriptions.Item label="Medicine Details">
              {requestDetail.items && requestDetail.items.length > 0 ? (
                requestDetail.items.map((item, index) => (
                  <div
                    key={item.medicineItemID || index}
                    style={{
                      marginBottom: "10px",
                      borderBottom: "1px dashed #eee",
                      paddingBottom: "10px",
                    }}
                  >
                    <p>
                      <strong>Medicine Name:</strong> {item.medicineName}
                    </p>
                    <p>
                      <strong>Dosage:</strong> {item.dosage}
                    </p>
                    <p>
                      <strong>Quantity Remaining:</strong>{" "}
                      {item.quantityRemaining}
                    </p>
                    <p>
                      <strong>Usage Times:</strong> {item.usageTimes.join(", ")}
                    </p>
                  </div>
                ))
              ) : (
                <div>No detailed medicine items available.</div>
              )}
            </Descriptions.Item>
          </Descriptions>
        ) : (
          <div>Select an item to view details.</div>
        )}
      </Modal>
    </div>
  );
};

export default Notification;

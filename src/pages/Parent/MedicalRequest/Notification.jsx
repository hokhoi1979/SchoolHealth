"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMedicineRequest } from "../../../redux/profileParent/medicalRequest/MedicineRequestSlice";
import { fetchDetailRequest } from "../../../redux/profileParent/medicalRequest/getDetailRequestSlice";
import { fetchAcceptBenefitMedicine } from "../../../redux/profileParent/medicalRequest/acceptBenefitMedicineSlice";
import { fetchRejectBenefitMedicine } from "../../../redux/profileParent/medicalRequest/rejectBenefitMedicineSlice";
import {
  Modal,
  Tag,
  Spin,
  Alert,
  Card,
  Divider,
  Typography,
  Row,
  Col,
  Descriptions,
  Button,
} from "antd";
import {
  MedicineBoxOutlined,
  ExperimentOutlined,
  UserOutlined,
  NumberOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";

const { Title, Text } = Typography;

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
    (state) => state.medicineRequestParent
  );
  const {
    requestDetail,
    loading: detailLoading,
    error: detailError,
  } = useSelector((state) => state.getDetailRequestParent);

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
  const [shouldOpenModal, setShouldOpenModal] = useState(false);

  useEffect(() => {
    // Fetch medicine requests with status CONFIRMED_RECEIVED and isBenefit true
    dispatch(
      fetchMedicineRequest({ status: "CONFIRMED_RECEIVED", isBenefit: true })
    );
  }, [dispatch]);

  useEffect(() => {
    if (shouldOpenModal && requestDetail && !detailLoading && !detailError) {
      setIsModalVisible(true);
      setShouldOpenModal(false); // reset lại sau khi mở
    } else if (detailError) {
      message.error("Failed to fetch medication detail!");
      setIsModalVisible(false);
      setCurrentViewingId(null);
      setShouldOpenModal(false);
    }
  }, [requestDetail, detailLoading, detailError, shouldOpenModal]);

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
    setShouldOpenModal(true); // đánh dấu: sau khi fetch xong thì mở modal
    setCurrentViewingId(requestID);
    dispatch(fetchDetailRequest({ requestID }));
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
          bordered={false}
          hoverable
          style={{
            borderRadius: 16,
            background: "#ffffff",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
            transition: "all 0.3s ease",
          }}
          bodyStyle={{ padding: 24 }}
        >
          {/* Tiêu đề và trạng thái */}
          <Row
            align="middle"
            justify="space-between"
            style={{ marginBottom: 16 }}
          >
            <Col>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <UserOutlined style={{ color: "#1890ff", fontSize: 18 }} />
                <Text strong style={{ fontSize: 16 }}>
                  {request.studentInfo?.account?.fullname || "Unnamed Student"}
                </Text>
              </div>
            </Col>
            <Col>
              <Tag color={statusColor[request.status] || "default"}>
                {request.status}
              </Tag>
            </Col>
          </Row>

          {/* Nội dung thông tin */}
          <Row gutter={16} style={{ marginBottom: 16 }}>
            <Col span={12}>
              <Text type="secondary">Class</Text>
              <div>
                <Text>
                  {request.studentInfo?.lastAcamedicYear?.class?.name || "N/A"}
                </Text>
              </div>
            </Col>
            <Col span={12}>
              <Text type="secondary">Nurse’s Note</Text>
              <div>
                <Text>{request.note || "No note provided."}</Text>
              </div>
            </Col>
          </Row>

          {/* View detail link */}
          <div style={{ marginBottom: 16 }}>
            <Button
              type="link"
              onClick={() => handleViewDetail(request.id)}
              style={{ padding: 0 }}
            >
              🔍 View Medicine Detail
            </Button>
          </div>

          {/* Nút Accept / Reject */}
          <Row justify="end" gutter={12}>
            <Col>
              <Button
                type="primary"
                onClick={() => handleAccept(request.id)}
                loading={accepting}
                style={{
                  backgroundColor: "#52c41a", // Màu xanh lá cây
                  borderColor: "#389e0d", // Viền xanh đậm hơn
                  color: "#fff", // Màu chữ trắng
                  boxShadow: "0 2px 0 rgba(0,0,0,0.045)", // Nhẹ bóng đổ
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#389e0d";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "#52c41a";
                }}
              >
                ✅ Accept
              </Button>
            </Col>
            <Col>
              <Button
                onClick={() => handleReject(request.id)}
                loading={rejecting}
                style={{
                  backgroundColor: "#ff4d4f", // Đỏ tươi mặc định
                  borderColor: "#d9363e", // Đỏ đậm cho viền
                  color: "#fff", // Màu chữ trắng
                  boxShadow: "0 2px 0 rgba(0,0,0,0.045)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#d9363e";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "#ff4d4f";
                }}
              >
                ❌ Reject
              </Button>
            </Col>
          </Row>
        </Card>
      ))}

      {/* Modal for medicine request detail */}
      <Modal
        title={
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <MedicineBoxOutlined style={{ color: "#52c41a", fontSize: 20 }} />
            <span style={{ fontWeight: 600 }}>Medication Request Detail</span>
          </div>
        }
        open={isModalVisible}
        onCancel={handleModalClose}
        footer={null}
        width={800}
        style={{ borderRadius: 12 }}
        bodyStyle={{ background: "#fff", borderRadius: 12, padding: 24 }}
      >
        {detailLoading ? (
          <Spin tip="Loading detailed information..." size="large" />
        ) : detailError ? (
          <Alert
            message="Error"
            description={detailError.message || "Failed to load details."}
            type="error"
            showIcon
          />
        ) : requestDetail ? (
          <div>
            {/* Info section */}
            <Divider orientation="left">
              <UserOutlined style={{ marginRight: 6, color: "#1890ff" }} />
              <Text strong>Request Information</Text>
            </Divider>

            <Row gutter={16} style={{ marginBottom: 16 }}>
              <Col span={12}>
                <Card bordered>
                  <NumberOutlined
                    style={{ color: "#722ed1", marginRight: 6 }}
                  />
                  <Text strong>Request ID:</Text> {requestDetail.requestID}
                </Card>
              </Col>
              <Col span={12}>
                <Card bordered>
                  <UserOutlined style={{ color: "#1890ff", marginRight: 6 }} />
                  <Text strong>Student Name:</Text>{" "}
                  {requestDetail.studentName || "N/A"}
                </Card>
              </Col>
            </Row>

            <Row gutter={16} style={{ marginBottom: 24 }}>
              <Col span={12}>
                <Card bordered>
                  <CheckCircleOutlined
                    style={{ color: "#13c2c2", marginRight: 6 }}
                  />
                  <Text strong>Status:</Text>{" "}
                  <Tag color={statusColor[requestDetail.status] || "default"}>
                    {requestDetail.status}
                  </Tag>
                </Card>
              </Col>
            </Row>

            {/* Medicine details */}
            <Divider orientation="left">
              <ExperimentOutlined
                style={{ marginRight: 6, color: "#fa8c16" }}
              />
              <Text strong>Medicine Details</Text>
            </Divider>

            {requestDetail.items && requestDetail.items.length > 0 ? (
              requestDetail.items.map((item, index) => (
                <Card
                  key={item.medicineItemID || index}
                  title={
                    <span style={{ color: "#389e0d", fontWeight: 600 }}>
                      <ExperimentOutlined style={{ marginRight: 8 }} />
                      {item.medicineName}
                    </span>
                  }
                  style={{
                    marginBottom: 16,
                    background: "#f6ffed",
                    border: "1px solid #b7eb8f",
                    borderRadius: 10,
                  }}
                >
                  <Row gutter={16}>
                    <Col span={8}>
                      <Text strong>Dosage:</Text> {item.dosage}
                    </Col>
                    <Col span={8}>
                      <Text strong>Quantity Remaining:</Text>{" "}
                      {item.quantityRemaining}
                    </Col>
                    <Col span={8}>
                      <Text strong>Usage Times:</Text>{" "}
                      {item.usageTimes?.join(", ") || "N/A"}
                    </Col>
                  </Row>
                </Card>
              ))
            ) : (
              <div style={{ color: "#999" }}>
                No detailed medicine items available.
              </div>
            )}
          </div>
        ) : (
          <div style={{ color: "#999" }}>Select an item to view details.</div>
        )}
      </Modal>
    </div>
  );
};

export default Notification;

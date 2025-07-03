import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  Table,
  Modal,
  Descriptions,
  Button,
  Tag,
  Popconfirm,
  message,
  Spin,
  Card,
  Typography,
  Divider,
  Row,
  Col,
} from "antd";
import { fetchMedicineRequest } from "../../../redux/profileParent/medicalRequest/MedicineRequestSlice";
import { fetchDetailRequest } from "../../../redux/profileParent/medicalRequest/getDetailRequestSlice";
import { fetchDeleteMedicine } from "../../../redux/profileParent/medicalRequest/deleteMedicineSlice";
import { fetchStopMedicine } from "../../../redux/profileParent/medicalRequest/stopMedicineSlice";
import {
  MedicineBoxOutlined,
  ExperimentOutlined,
  UserOutlined,
  NumberOutlined,
  CheckCircleOutlined,
  EyeOutlined,
  DeleteOutlined,
  StopOutlined,
} from "@ant-design/icons";

const statusColor = {
  PENDING: "orange",
  CONFIRMED_RECEIVED: "blue",
  CONFIRMED_NOT_RECEIVED: "red",
  COMPLETED: "green",
  REJECTED: "volcano",
};

const { Title, Text } = Typography;

const MedicationHistory = () => {
  const dispatch = useDispatch();
  const { medicine, loading } = useSelector(
    (state) => state.medicineRequestParent
  );
  const {
    success: deleteSuccess,
    error: deleteError,
    loading: deleteLoading,
  } = useSelector((state) => state.deleteMedicineRequest);

  const {
    requestDetail,
    loading: detailLoading,
    error: detailError,
  } = useSelector((state) => state.getDetailRequestParent);

  const {
    success: stopSuccess,
    error: stopError,
    loading: stopLoading,
  } = useSelector((state) => state.stopMedicine);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentViewingId, setCurrentViewingId] = useState(null);

  useEffect(() => {
    dispatch(fetchMedicineRequest());
  }, [dispatch]);

  useEffect(() => {
    if (deleteSuccess) {
      message.success("Deleted successfully!");
      dispatch(fetchMedicineRequest());
    } else if (deleteError) {
      message.error("Delete failed!");
    }
  }, [deleteSuccess, deleteError, dispatch]);

  useEffect(() => {
    if (detailError && currentViewingId) {
      message.error("Failed to fetch medication detail!");
      setIsModalVisible(false);
      setCurrentViewingId(null);
    }
  }, [detailError, currentViewingId]);

  useEffect(() => {
    if (stopSuccess) {
      message.success("Medicine stopped successfully!");
      dispatch(fetchMedicineRequest());
    } else if (stopError) {
      message.error("Failed to stop medicine!");
    }
  }, [stopSuccess, stopError, dispatch]);

  const handleDelete = (id) => {
    dispatch(fetchDeleteMedicine(id));
  };

  const handleViewDetail = (requestID) => {
    if (requestID) {
      setCurrentViewingId(requestID);
      dispatch(fetchDetailRequest({ requestID: requestID }));
      setIsModalVisible(true);
    } else {
      message.error("Invalid request ID");
    }
  };

  const handleStopMedicine = (id) => {
    dispatch(fetchStopMedicine(id));
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
    setCurrentViewingId(null);
  };

  const columns = [
    {
      title: "Student Name",
      dataIndex: ["studentInfo", "account", "fullname"],
    },
    {
      title: "Class",
      render: (_, record) =>
        record.studentInfo?.lastAcamedicYear?.class?.name || "N/A",
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (status) => (
        <Tag color={statusColor[status] || "default"}>{status}</Tag>
      ),
    },
    {
      title: "Note",
      dataIndex: "note",
    },
    {
      title: "Actions",
      render: (_, record) => (
        <>
          <Button
            type="link"
            icon={<EyeOutlined />}
            onClick={() => {
              handleViewDetail(record.id);
            }}
            loading={detailLoading && currentViewingId === record.id}
          />
          {record.status === "PENDING" ? (
            <Popconfirm
              title="Are you sure to delete this medicine request?"
              onConfirm={() => handleDelete(record.id)}
              okText="Yes"
              cancelText="No"
            >
              <Button
                type="link"
                danger
                icon={<DeleteOutlined />}
                loading={deleteLoading}
              />
            </Popconfirm>
          ) : (
            <Button
              type="link"
              danger
              icon={<DeleteOutlined />}
              disabled
              title="Cannot delete this request because it is not in PENDING status"
            />
          )}
          {record.status === "CONFIRMED_RECEIVED" && (
            <Popconfirm
              title="Are you sure you want to stop this medicine? This action will mark the request as COMPLETED."
              onConfirm={() => handleStopMedicine(record.id)}
              okText="Yes"
              cancelText="No"
            >
              <Button
                type="link"
                icon={<StopOutlined />}
                loading={stopLoading && currentViewingId === record.id} // Apply loading state
                title="Stop Medicine"
              />
            </Popconfirm>
          )}
        </>
      ),
    },
  ];

  return (
    <>
      <Table
        loading={loading}
        dataSource={medicine}
        columns={columns}
        rowKey="id"
        locale={{ emptyText: "No medicine request history." }}
        pagination={{ pageSize: 10 }} // Add pagination for better UX
        style={{ margin: "20px 0" }} // Add margin for spacing
      />

      <Modal
        open={isModalVisible}
        onCancel={handleModalClose}
        footer={null}
        width={860}
        style={{ borderRadius: 14 }}
        bodyStyle={{ background: "#fefefe", borderRadius: 14, padding: 24 }}
        title={
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <MedicineBoxOutlined style={{ color: "#52c41a", fontSize: 22 }} />
            <Title level={4} style={{ margin: 0 }}>
              Medication Request Detail
            </Title>
          </div>
        }
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
            {/* Thông tin chung */}
            <Divider orientation="left" orientationMargin="0">
              <UserOutlined style={{ marginRight: 6, color: "#1890ff" }} />
              <Text strong style={{ fontSize: 16 }}>
                Student & Request Info
              </Text>
            </Divider>

            <Row gutter={16}>
              <Col span={12}>
                <Card bordered style={{ borderRadius: 10 }}>
                  <p>
                    <NumberOutlined style={{ color: "#722ed1" }} />{" "}
                    <Text strong>Request ID:</Text> {requestDetail.requestID}
                  </p>
                  <p>
                    <UserOutlined style={{ color: "#1890ff" }} />{" "}
                    <Text strong>Student Name:</Text>{" "}
                    {requestDetail.studentName || "N/A"}
                  </p>
                </Card>
              </Col>
              <Col span={12}>
                <Card bordered style={{ borderRadius: 10 }}>
                  <p>
                    <CheckCircleOutlined style={{ color: "#13c2c2" }} />{" "}
                    <Text strong>Status:</Text>{" "}
                    <Tag color={statusColor[requestDetail.status] || "default"}>
                      {requestDetail.status}
                    </Tag>
                  </p>
                </Card>
              </Col>
            </Row>

            {/* Chi tiết thuốc */}
            <Divider orientation="left" orientationMargin="0">
              <ExperimentOutlined
                style={{ marginRight: 6, color: "#fa8c16" }}
              />
              <Text strong style={{ fontSize: 16 }}>
                Medicine Details
              </Text>
            </Divider>

            {requestDetail.items && requestDetail.items.length > 0 ? (
              requestDetail.items.map((item, index) => (
                <Card
                  key={item.medicineItemID || index}
                  style={{
                    marginBottom: 16,
                    borderRadius: 10,
                    background: "#f6ffed",
                    border: "1px solid #b7eb8f",
                  }}
                  title={
                    <span style={{ fontWeight: 600, color: "#389e0d" }}>
                      <ExperimentOutlined style={{ marginRight: 8 }} />
                      {item.medicineName}
                    </span>
                  }
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
                      {item.usageTimes.join(", ")}
                    </Col>
                  </Row>
                </Card>
              ))
            ) : (
              <div style={{ color: "#999", marginTop: 12 }}>
                No detailed medicine items available.
              </div>
            )}
          </div>
        ) : (
          <div style={{ color: "#999" }}>Select an item to view details.</div>
        )}
      </Modal>
    </>
  );
};

export default MedicationHistory;

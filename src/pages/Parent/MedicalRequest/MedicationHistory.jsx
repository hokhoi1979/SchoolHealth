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
} from "antd";
import { fetchMedicineRequest } from "../../../redux/profileParent/medicalRequest/MedicineRequestSlice";
import { fetchDetailRequest } from "../../../redux/profileParent/medicalRequest/getDetailRequestSlice";
import { fetchDeleteMedicine } from "../../../redux/profileParent/medicalRequest/deleteMedicineSlice";
import { fetchStopMedicine } from "../../../redux/profileParent/medicalRequest/stopMedicineSlice";
import { EyeOutlined, DeleteOutlined, StopOutlined } from "@ant-design/icons";

const statusColor = {
  PENDING: "orange",
  CONFIRMED_RECEIVED: "blue",
  CONFIRMED_NOT_RECEIVED: "red",
  COMPLETED: "green",
  REJECTED: "volcano",
};

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
    if (requestDetail && !detailLoading && !detailError) {
      setIsModalVisible(true); // Hiển thị modal khi có thông tin chi tiết
    } else if (detailError) {
      message.error("Failed to fetch medication detail!");
      setIsModalVisible(false); // Đóng modal nếu có lỗi
      setCurrentViewingId(null);
    }
  }, [requestDetail, detailLoading, detailError]);

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
            {/* Display fields from requestDetail, which now contains all necessary info */}
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
    </>
  );
};

export default MedicationHistory;

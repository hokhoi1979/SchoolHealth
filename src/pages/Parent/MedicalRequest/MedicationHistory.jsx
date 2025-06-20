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
import { fetchDeleteMedicine } from "../../../redux/profileParent/medicalRequest/deleteMedicineSlice";
import { EyeOutlined, DeleteOutlined } from "@ant-design/icons";

const statusColor = {
  PENDING: "orange",
  CONFIRMED_RECEIVED: "blue",
  CONFIRMED_NOT_RECEIVED: "red",
  COMPLETED: "green",
  REJECTED: "volcano",
};

const MedicationHistory = () => {
  const dispatch = useDispatch();
  const { medicine, loading } = useSelector((state) => state.medicineRequest);
  const {
    success: deleteSuccess,
    error: deleteError,
    loading: deleteLoading,
  } = useSelector((state) => state.deleteMedicineRequest);

  const [selectedItem, setSelectedItem] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

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

  const handleDelete = (id) => {
    dispatch(fetchDeleteMedicine(id));
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
              setSelectedItem(record);
              setIsModalVisible(true);
            }}
          />
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
      />

      <Modal
        title="Medication Request Detail"
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        {selectedItem && (
          <Descriptions column={1} bordered>
            <Descriptions.Item label="Student Name">
              {selectedItem.studentInfo?.account?.fullname}
            </Descriptions.Item>
            <Descriptions.Item label="Student Code">
              {selectedItem.studentInfo?.student_code}
            </Descriptions.Item>
            <Descriptions.Item label="Date of Birth">
              {new Date(
                selectedItem.studentInfo?.dateOfBirth
              ).toLocaleDateString()}
            </Descriptions.Item>
            <Descriptions.Item label="Gender">
              {selectedItem.studentInfo?.gender}
            </Descriptions.Item>
            <Descriptions.Item label="Class">
              {selectedItem.studentInfo?.lastAcamedicYear?.class?.name}
            </Descriptions.Item>
            <Descriptions.Item label="Academic Year">
              {selectedItem.studentInfo?.lastAcamedicYear?.academicYear?.name}
            </Descriptions.Item>
            <Descriptions.Item label="Parent Name">
              {selectedItem.studentInfo?.ParentInfo?.fullname}
            </Descriptions.Item>
            <Descriptions.Item label="Parent Email">
              {selectedItem.studentInfo?.ParentInfo?.email}
            </Descriptions.Item>
            <Descriptions.Item label="Parent Phone">
              {selectedItem.studentInfo?.ParentInfo?.phone}
            </Descriptions.Item>
            <Descriptions.Item label="Note">
              {selectedItem.note}
            </Descriptions.Item>
            <Descriptions.Item label="Status">
              {selectedItem.status}
            </Descriptions.Item>
            <Descriptions.Item label="Created At">
              {new Date(selectedItem.createdAt).toLocaleString()}
            </Descriptions.Item>
            <Descriptions.Item label="Updated At">
              {new Date(selectedItem.updatedAt).toLocaleString()}
            </Descriptions.Item>
            <Descriptions.Item label="Received At">
              {selectedItem.receivedAt
                ? new Date(selectedItem.receivedAt).toLocaleString()
                : "N/A"}
            </Descriptions.Item>
          </Descriptions>
        )}
      </Modal>
    </>
  );
};
export default MedicationHistory;

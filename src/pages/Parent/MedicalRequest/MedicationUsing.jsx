import {
  Table,
  Button,
  Form,
  Input,
  Modal,
  message,
  DatePicker,
  Row,
  Col,
  Tag,
} from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import { useOutletContext } from "react-router-dom";
import dayjs from "dayjs";
import { useState } from "react";

const { TextArea } = Input;
const { confirm } = Modal;

const statusColor = {
  PENDING: "orange",
  CONFIRMED_RECEIVED: "blue",
  CONFIRMED_NOT_RECEIVED: "red",
  COMPLETED: "green",
  REJECTED: "volcano",
};

const MedicationUsing = () => {
  const { medications, setMedications } = useOutletContext();
  const [form] = Form.useForm();
  const [modalVisible, setModalVisible] = useState(false);
  const [editingMedication, setEditingMedication] = useState(null);

  const openModal = (record) => {
    setEditingMedication(record);
    form.setFieldsValue({
      ...record,
      startDate: dayjs(record.startDate),
      endDate: dayjs(record.endDate),
      usageTimes: Array.isArray(record.usageTimes)
        ? record.usageTimes.join(", ")
        : record.usageTimes,
    });
    setModalVisible(true);
  };

  const handleDelete = (id) => {
    confirm({
      title: "Are you sure you want to delete this medication?",
      icon: <ExclamationCircleOutlined />,
      onOk() {
        setMedications((prev) => prev.filter((med) => med.id !== id));
        message.success("Medication deleted successfully");
      },
    });
  };

  const handleSave = () => {
    form.validateFields().then((values) => {
      setMedications((prev) =>
        prev.map((med) =>
          med.id === editingMedication.id
            ? {
                ...med,
                ...values,
                startDate: values.startDate.format("YYYY-MM-DD"),
                endDate: values.endDate.format("YYYY-MM-DD"),
                usageTimes: values.usageTimes
                  .split(",")
                  .map((time) => time.trim()),
              }
            : med
        )
      );
      message.success("Medication updated successfully");
      setModalVisible(false);
      form.resetFields();
      setEditingMedication(null);
    });
  };

  const columns = [
    { title: "Name", dataIndex: "name" },
    { title: "Dosage", dataIndex: "dosage" },
    { title: "Quantity", dataIndex: "quantity" },
    {
      title: "Usage Times",
      dataIndex: "usageTimes",
      render: (times) =>
        Array.isArray(times) ? times.join(", ") : times || "-",
    },
    {
      title: "Time",
      render: (_, record) =>
        `${dayjs(record.startDate).format("DD/MM/YYYY")} - ${dayjs(
          record.endDate
        ).format("DD/MM/YYYY")}`,
    },
    {
      title: "Note",
      dataIndex: "note",
      render: (text) => text || "-",
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (status) => (
        <Tag color={statusColor[status] || "default"}>{status}</Tag>
      ),
    },
    {
      title: "Actions",
      render: (_, record) => (
        <>
          <Button
            icon={<EditOutlined />}
            type="link"
            disabled={record.status === "COMPLETED"}
            onClick={() => openModal(record)}
          />
          <Button
            icon={<DeleteOutlined />}
            type="link"
            danger
            disabled={record.status === "COMPLETED"}
            onClick={() => handleDelete(record.id)}
          />
        </>
      ),
    },
  ];

  return (
    <>
      <Table
        columns={columns}
        dataSource={medications}
        rowKey="id"
        locale={{ emptyText: "No medications in use." }}
        pagination={{ pageSize: 10 }} // Add pagination for better UX
        style={{ margin: "20px 0" }} // Add margin for spacing
      />
      <Modal
        open={modalVisible}
        onCancel={() => {
          setModalVisible(false);
          form.resetFields();
          setEditingMedication(null);
        }}
        onOk={handleSave}
        footer={null}
        width={650}
        centered
        style={{ top: 40 }}
      >
        <div style={{ padding: 16 }}>
          <Title
            level={4}
            style={{ display: "flex", alignItems: "center", gap: 8 }}
          >
            <EditOutlined style={{ color: "#722ed1" }} />
            Edit Medication
          </Title>

          <Form
            layout="vertical"
            form={form}
            style={{
              background: "#fafafa",
              padding: 24,
              borderRadius: 12,
              boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
            }}
          >
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  label="Name"
                  name="name"
                  rules={[{ required: true }]}
                >
                  <Input placeholder="Enter medicine name" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Dosage"
                  name="dosage"
                  rules={[{ required: true }]}
                >
                  <Input placeholder="E.g. 500mg" />
                </Form.Item>
              </Col>
            </Row>

            <Form.Item
              label="Quantity"
              name="quantity"
              rules={[{ required: true }]}
            >
              <Input placeholder="E.g. 2 tablets/day" />
            </Form.Item>

            <Form.Item
              label="Usage Time"
              name="usageTimes"
              rules={[{ required: true }]}
            >
              <Input placeholder="E.g. Morning, Evening" />
            </Form.Item>

            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  label="Start Date"
                  name="startDate"
                  rules={[{ required: true }]}
                >
                  <DatePicker style={{ width: "100%" }} />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="End Date"
                  name="endDate"
                  rules={[{ required: true }]}
                >
                  <DatePicker style={{ width: "100%" }} />
                </Form.Item>
              </Col>
            </Row>

            <Form.Item label="Note" name="note">
              <TextArea
                rows={2}
                placeholder="Any additional instructions..."
                style={{ backgroundColor: "#fffef6", borderRadius: 8 }}
              />
            </Form.Item>

            <div style={{ textAlign: "right", marginTop: 24 }}>
              <Button
                onClick={() => {
                  setModalVisible(false);
                  form.resetFields();
                  setEditingMedication(null);
                }}
                style={{
                  marginRight: 10,
                  backgroundColor: "#f5222d",
                  color: "#fff",
                  borderRadius: 6,
                  border: "none",
                }}
              >
                Cancel
              </Button>
              <Button
                type="primary"
                onClick={handleSave}
                style={{
                  backgroundImage:
                    "linear-gradient(to right, #722ed1, #9254de)",
                  border: "none",
                  borderRadius: 6,
                  color: "#fff",
                }}
              >
                Save
              </Button>
            </div>
          </Form>
        </div>
      </Modal>
    </>
  );
};

export default MedicationUsing;

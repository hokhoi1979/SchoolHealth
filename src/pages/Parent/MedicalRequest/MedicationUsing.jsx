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

const style = {
  pending: {
    color: "white",
    backgroundColor: "orange",
    border: "1px solid #fbbf24",
    borderRadius: "8px",
    padding: "5px 15px",
    fontWeight: "600",
  },
  completed: {
    color: "white",
    backgroundColor: "green",
    border: "1px solid #34d399",
    borderRadius: "8px",
    padding: "5px 15px",
    fontWeight: "600",
  },
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
    { title: "Frequency", dataIndex: "frequency" },
    {
      title: "Time",
      render: (_, record) =>
        `${dayjs(record.startDate).format("DD/MM/YYYY")} - ${dayjs(
          record.endDate
        ).format("DD/MM/YYYY")}`,
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (status) => {
        const key = status.toLowerCase();
        let text = "";
        if (key === "completed") text = "Completed";
        else if (key === "pending") text = "Pending";

        return <span style={style[key]}>{text}</span>;
      },
    },
    {
      title: "Actions",
      render: (_, record) => (
        <>
          <Button
            icon={<EditOutlined />}
            type="link"
            disabled={record.status === "completed"}
            onClick={() => openModal(record)}
          />
          <Button
            icon={<DeleteOutlined />}
            type="link"
            danger
            disabled={record.status === "completed"}
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
      />
      <Modal
        title="Edit Medication"
        open={modalVisible}
        onCancel={() => {
          setModalVisible(false);
          form.resetFields();
          setEditingMedication(null);
        }}
        onOk={handleSave}
        okText="Save"
      >
        <Form layout="vertical" form={form}>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Name of medicine"
                name="name"
                rules={[
                  { required: true, message: "Please enter medicine name" },
                ]}
              >
                <Input placeholder="Enter name of medicine..." />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Dosage"
                name="dosage"
                rules={[{ required: true, message: "Please enter dosage" }]}
              >
                <Input placeholder="Enter dosage..." />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            label="Frequency"
            name="frequency"
            rules={[{ required: true, message: "Please enter frequency" }]}
          >
            <Input placeholder="Every 8 hours, after meals" />
          </Form.Item>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Start Date"
                name="startDate"
                rules={[
                  { required: true, message: "Please select start date" },
                ]}
              >
                <DatePicker style={{ width: "100%" }} placeholder="dd/mm/yy" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="End Date"
                name="endDate"
                rules={[{ required: true, message: "Please select end date" }]}
              >
                <DatePicker style={{ width: "100%" }} placeholder="dd/mm/yy" />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item label="Instructions" name="instructions">
            <TextArea rows={3} placeholder="Enter your instructions..." />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default MedicationUsing;

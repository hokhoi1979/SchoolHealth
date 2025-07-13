import React from "react";
import {
  Modal,
  Form,
  Input,
  DatePicker,
  Select,
  Divider,
  Row,
  Col,
} from "antd";

const { Option } = Select;

function CreateStudentModal({ visible, onCancel, onCreate, classList = [] }) {
  const [form] = Form.useForm();

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        form.resetFields();
        const formatted = {
          fullname: values.fullname,
          email: values.email,
          dateOfBirth: values.dateOfBirth.format("YYYY-MM-DD"),
          gender: values.gender,
          className: values.className,
          parentName: values.parentName,
          parentEmail: values.parentEmail,
          parentPhone: values.parentPhone,
        };

        onCreate(formatted);
      })
      .catch((info) => {});
  };

  const centeredDivider = (text) => (
    <Divider
      orientation="center"
      style={{ fontWeight: "bold", margin: "32px 0 16px" }}
    >
      {text}
    </Divider>
  );

  return (
    <Modal
      title={
        <div style={{ textAlign: "center", fontWeight: 600, fontSize: "18px" }}>
          Create New Student
        </div>
      }
      open={visible}
      onCancel={onCancel}
      onOk={handleOk}
      centered
      width={640}
    >
      <Form form={form} layout="vertical" style={{ padding: "4px 4px 0" }}>
        {centeredDivider("👦 Student Information")}

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="fullname"
              label="Student Name"
              rules={[
                { required: true, message: "Please input the student name" },
              ]}
            >
              <Input placeholder="Nguyen Van A" />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              name="email"
              label="Student Email"
              rules={[
                {
                  required: true,
                  type: "email",
                  message: "Valid email required",
                },
              ]}
            >
              <Input placeholder="student@example.com" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="dateOfBirth"
              label="Date of Birth"
              rules={[
                { required: true, message: "Please select date of birth" },
              ]}
            >
              <DatePicker format="DD/MM/YYYY" className="w-full" />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              name="gender"
              label="Gender"
              rules={[{ required: true, message: "Please select gender" }]}
            >
              <Select placeholder="Select gender">
                <Option value="Nam">Male</Option>
                <Option value="Nữ">Female</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Form.Item
          name="className"
          label="Class Name"
          rules={[{ required: true, message: "Please select class name" }]}
        >
          <Select placeholder="Select class">
            {Array.isArray(classList) &&
              classList.map((cls) => (
                <Select.Option key={cls.id} value={cls.name}>
                  {cls.name}
                </Select.Option>
              ))}
          </Select>
        </Form.Item>

        {centeredDivider("👨‍👩‍👧 Parent Information")}

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="parentName"
              label="Parent Name"
              rules={[{ required: true, message: "Please input parent name" }]}
            >
              <Input placeholder="Nguyen Van B" />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              name="parentEmail"
              label="Parent Email"
              rules={[
                {
                  required: true,
                  type: "email",
                  message: "Valid email required",
                },
              ]}
            >
              <Input placeholder="parent@example.com" />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item
          name="parentPhone"
          label="Parent Phone"
          rules={[{ required: true, message: "Please input parent phone" }]}
        >
          <Input placeholder="0987xxxxxx" />
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default CreateStudentModal;

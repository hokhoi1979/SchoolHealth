import { useState } from "react";
import {
  Button,
  Modal,
  Form,
  Input,
  DatePicker,
  message,
  Row,
  Col,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import CommonBreadcrumb from "../../../components/CommonBreadcrumb/CommonBreadcrumb";
import { Link, Outlet } from "react-router-dom";
import { AppFooter } from "../../../components/Footer/AppFooter";

const { TextArea } = Input;

const defaultMedications = [
  {
    id: 1,
    name: "Paracetamol",
    dosage: "500mg",
    frequency: "After meal",
    startDate: "2025-05-28",
    endDate: "2025-05-31",
    instructions: "Drink after meal",
    status: "pending",
  },
  {
    id: 2,
    name: "Vitamin C",
    dosage: "500mg",
    frequency: "Before meal",
    startDate: "2025-05-28",
    endDate: "2025-05-31",
    instructions: "If you are tired, take a pill.",
    status: "completed",
  },
];

const MedicalRequest = () => {
  const [medications, setMedications] = useState(defaultMedications);
  const [isAddVisible, setIsAddVisible] = useState(false);
  const [form] = Form.useForm();

  const handleAdd = (values) => {
    const id = Math.max(0, ...medications.map((m) => m.id)) + 1;
    setMedications([...medications, { id, ...values, status: "pending" }]);
    form.resetFields();
    setIsAddVisible(false);
    message.success("Add new medication successfully");
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="p-6 flex flex-col flex-1">
        <div className="flex gap-70">
          <div>
            <h1 className="text-3xl font-bold text-blue-400 ml-5">
              SEND MEDICINE TO STUDENTS
            </h1>
            <p className="pt-5 ml-5 text-blue-400">
              Register medications for students and track medication history.
            </p>
          </div>
          <div>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => setIsAddVisible(true)}
              style={{ marginBottom: 16 }}
            >
              Add new medication
            </Button>
            <Modal
              title="Add new medication"
              open={isAddVisible}
              onCancel={() => setIsAddVisible(false)}
              onOk={() => form.submit()}
            >
              <Form layout="vertical" form={form} onFinish={handleAdd}>
                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item
                      label="Name of medicine"
                      name="name"
                      rules={[{ required: true }]}
                    >
                      <Input placeholder="Enter name of medicine..." />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      label="Dosage"
                      name="dosage"
                      rules={[{ required: true }]}
                    >
                      <Input placeholder="Enter dosage..." />
                    </Form.Item>
                  </Col>
                </Row>

                <Form.Item
                  label="Frequency"
                  name="frequency"
                  rules={[{ required: true }]}
                >
                  <Input placeholder="Every 8 hours, after meals" />
                </Form.Item>
                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item
                      label="Start Date"
                      name="startDate"
                      rules={[{ required: true }]}
                    >
                      <DatePicker
                        style={{ width: "100%" }}
                        placeholder="dd/mm/yy"
                      />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      label="End Date"
                      name="endDate"
                      rules={[{ required: true }]}
                    >
                      <DatePicker
                        style={{ width: "100%" }}
                        placeholder="dd/mm/yy"
                      />
                    </Form.Item>
                  </Col>
                </Row>
                <Form.Item label="Instructions" name="instructions">
                  <TextArea rows={3} placeholder="Enter your instructions..." />
                </Form.Item>
              </Form>
            </Modal>
          </div>
        </div>
        <div className="flex mt-5 bg-[#F3F3F3] font-kameron w-[500px] h-10 items-center rounded-xl ml-5">
          <div className="m-auto flex gap-10">
            <div className="hover:bg-white p-1 rounded-lg w-50">
              <Link to={""}>Medication in use</Link>
            </div>
            <div className="hover:bg-white p-1 rounded-lg w-50">
              <Link to={"medication_history"}>Medication history</Link>
            </div>
          </div>
        </div>
        <div className="flex-1 overflow-auto mt-5 ml-5 mr-5">
          <Outlet context={{ medications, setMedications }} />
        </div>
        <div className="h-[160px] w-full"></div>
      </div>
      <AppFooter />
    </div>
  );
};

export default MedicalRequest;

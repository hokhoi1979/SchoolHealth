import { useEffect, useState } from "react";
import {
  Button,
  Modal,
  Form,
  Input,
  DatePicker,
  message,
  Row,
  Col,
  Select,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import CommonBreadcrumb from "../../../components/CommonBreadcrumb/CommonBreadcrumb";
import { Link, Outlet } from "react-router-dom";
import { AppFooter } from "../../../components/Footer/AppFooter";
import { useDispatch, useSelector } from "react-redux";
import { fetchCreateMedicine } from "../../../redux/profileParent/medicalRequest/createMedicineSlice";
import { fetchStudent } from "../../../redux/profileParent/StudentOfParentSlice";

const { TextArea } = Input;

const MedicalRequest = () => {
  const [medications, setMedications] = useState([]);
  const [isAddVisible, setIsAddVisible] = useState(false);
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const { student, loading } = useSelector((state) => state.studentOfParent);

  useEffect(() => {
    dispatch(fetchStudent()); // gọi API lấy student
  }, [dispatch]);

  const handleAdd = (values) => {
    const id = Math.max(0, ...medications.map((m) => m.id)) + 1;

    const newMedication = {
      id,
      ...values,
      startDate: values.startDate.format("YYYY-MM-DD"),
      endDate: values.endDate.format("YYYY-MM-DD"),
      usageTimes: values.usageTimes.split(",").map((time) => time.trim()),
      status: "PENDING",
    };

    setMedications([...medications, newMedication]);
    form.resetFields();
    setIsAddVisible(false);
    message.success("Add new medication successfully");

    const payload = {
      studentID: values.studentID,
      note: values.note,
      items: [
        {
          medicineName: values.name,
          dosage: values.dosage,
          quantitySent: values.quantitySent,
          usageTimes: values.usageTimes.split(",").map((time) => time.trim()),
          startDate: values.startDate.format("YYYY-MM-DD"),
          endDate: values.endDate.format("YYYY-MM-DD"),
        },
      ],
    };

    dispatch(fetchCreateMedicine(payload));
  };

  return (
    <div className="flex flex-col min-h-screen">
      <h1 className="pl-10 pt-5 text-xl font-inria font-medium mb-4">
        <CommonBreadcrumb role={"Parent"} page={"request"} />
      </h1>
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
                <Form.Item
                  label="Student"
                  name="studentID"
                  rules={[
                    { required: true, message: "Please select a student" },
                  ]}
                >
                  <Select placeholder="Select student" loading={loading}>
                    {student.map((stu) => (
                      <Select.Option key={stu.id} value={stu.id}>
                        {stu.name}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>

                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item
                      label="Name"
                      name="name"
                      rules={[{ required: true }]}
                    >
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      label="Dosage"
                      name="dosage"
                      rules={[{ required: true }]}
                    >
                      <Input />
                    </Form.Item>
                  </Col>
                </Row>

                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item
                      label="Quantity Sent"
                      name="quantitySent"
                      rules={[{ required: true }]}
                    >
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      label="Usage Times"
                      name="usageTimes"
                      rules={[{ required: true }]}
                    >
                      <Input placeholder="e.g. 08:00, 14:00" />
                    </Form.Item>
                  </Col>
                </Row>

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

                <Form.Item label="Instructions" name="instructions">
                  <TextArea rows={2} />
                </Form.Item>

                <Form.Item
                  label="Note"
                  name="note"
                  rules={[{ required: true }]}
                >
                  <TextArea rows={2} />
                </Form.Item>
              </Form>
            </Modal>
          </div>
        </div>

        <div className="flex mt-5 bg-[#F3F3F3] w-[500px] h-10 rounded-xl ml-5">
          <div className="m-auto flex gap-10">
            <Link to={""}>Medication in use</Link>
            <Link to={"medication_history"}>Medication history</Link>
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

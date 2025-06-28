"use client";

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
import { fetchMedicineRequest } from "../../../redux/profileParent/medicalRequest/MedicineRequestSlice";
import { fetchDetailRequest } from "../../../redux/profileParent/medicalRequest/getDetailRequestSlice";

const { TextArea } = Input;

const MedicalRequest = () => {
  const [isAddVisible, setIsAddVisible] = useState(false);
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const { student, loading } = useSelector((state) => state.studentOfParent);
  const [extraMedications, setExtraMedications] = useState([]);
  const [medications, setMedications] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false); // Add loading state

  useEffect(() => {
    dispatch(fetchStudent());
    dispatch(fetchMedicineRequest());
  }, [dispatch]);

  const addExtraMedication = () => {
    setExtraMedications((prev) => [
      ...prev,
      {
        name: "",
        dosage: "",
        quantitySent: "",
        usageTimes: "",
        startDate: null,
        endDate: null,
        note: "",
      },
    ]);
  };

  const updateExtraMedication = (index, field, value) => {
    const newData = [...extraMedications];
    newData[index][field] = value;
    setExtraMedications(newData);
  };

  const removeExtraMedication = (index) => {
    setExtraMedications(extraMedications.filter((_, i) => i !== index));
  };

  const handleAdd = async (values) => {
    if (isSubmitting) return;

    setIsSubmitting(true);
    try {
      const mainItem = {
        medicineName: values.name,
        dosage: values.dosage,
        quantitySent: values.quantitySent,
        usageTimes: values.usageTimes.split(",").map((time) => time.trim()),
        startDate: values.startDate.format("YYYY-MM-DD"),
        endDate: values.endDate.format("YYYY-MM-DD"),
      };

      const additionalItems = extraMedications.map((item) => ({
        medicineName: item.name,
        dosage: item.dosage,
        quantitySent: item.quantitySent,
        usageTimes: item.usageTimes.split(",").map((t) => t.trim()),
        startDate: item.startDate.format("YYYY-MM-DD"),
        endDate: item.endDate.format("YYYY-MM-DD"),
      }));

      const payload = {
        studentID: values.studentID,
        note: values.note,
        items: [mainItem, ...additionalItems],
      };

      const response = await dispatch(fetchCreateMedicine(payload));

      if (response.payload && response.payload.success !== false) {
        const requestID = response.payload.data?.requestID;

        if (requestID) {
          const detailRes = await dispatch(fetchDetailRequest({ requestID }));
          const detailData = detailRes.payload?.data;

          if (detailData && Array.isArray(detailData.items)) {
            const mapped = detailData.items.map((item, idx) => ({
              id: `new-${Date.now()}-${idx}`,
              name: item.medicineName,
              dosage: item.dosage,
              quantity: item.quantityRemaining,
              usageTimes: item.usageTimes,
              startDate: item.startDate || "",
              endDate: item.endDate || "",
              status: detailData.status || "PENDING",
              note: detailData.note || "", // ✅ Thêm dòng này
            }));

            setMedications((prev) => [...prev, ...mapped]);
          }
        }

        form.resetFields();
        setExtraMedications([]);
        setIsAddVisible(false);
        message.success("Add new medication successfully");
      } else {
        message.error(`Error: ${response.payload?.message || "Invalid data"}`);
      }
    } catch (error) {
      message.error("Failed to add medication: " + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    form.resetFields();
    setExtraMedications([]);
    setIsAddVisible(false);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <h1 className="pl-10 pt-5 text-xl font-inria font-medium mb-4">
        <CommonBreadcrumb role={"Parent"} page={"request"} />
      </h1>

      <div className="p-6 flex flex-col flex-1">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h1 className="text-3xl font-bold text-blue-400">
              SEND MEDICINE TO STUDENTS
            </h1>
            <p className="pt-2 text-blue-400">
              Register medications for students and track medication history.
            </p>
          </div>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => setIsAddVisible(true)}
          >
            Add new medication
          </Button>
        </div>

        {/* Modal Add Medication - FIXED */}
        <Modal
          title="Add new medication"
          open={isAddVisible}
          onCancel={handleCancel}
          footer={null} // Remove custom footer to prevent duplicate submission
          width={800}
        >
          <Form
            layout="vertical"
            form={form}
            onFinish={handleAdd} // Only use form's onFinish
          >
            <Form.Item
              label="Student"
              name="studentID"
              rules={[{ required: true, message: "Please select a student" }]}
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

            <Form.Item label="Note" name="note" rules={[{ required: true }]}>
              <TextArea rows={2} />
            </Form.Item>

            <Form.Item>
              <div
                style={{
                  border: "1px solid #d9d9d9",
                  borderRadius: 8,
                  padding: 16,
                  marginTop: 16,
                  backgroundColor: "#fafafa",
                }}
              >
                <h3 className="text-lg font-semibold mb-4">
                  Additional Medications
                </h3>
                {extraMedications.map((item, index) => (
                  <Row
                    gutter={8}
                    key={index}
                    align="middle"
                    style={{ marginBottom: 12 }}
                  >
                    <Col span={4}>
                      <Input
                        placeholder="Name"
                        value={item.name}
                        onChange={(e) =>
                          updateExtraMedication(index, "name", e.target.value)
                        }
                      />
                    </Col>
                    <Col span={3}>
                      <Input
                        placeholder="Dosage"
                        value={item.dosage}
                        onChange={(e) =>
                          updateExtraMedication(index, "dosage", e.target.value)
                        }
                      />
                    </Col>
                    <Col span={3}>
                      <Input
                        placeholder="Qty"
                        value={item.quantitySent}
                        onChange={(e) =>
                          updateExtraMedication(
                            index,
                            "quantitySent",
                            e.target.value
                          )
                        }
                      />
                    </Col>
                    <Col span={4}>
                      <Input
                        placeholder="Times"
                        value={item.usageTimes}
                        onChange={(e) =>
                          updateExtraMedication(
                            index,
                            "usageTimes",
                            e.target.value
                          )
                        }
                      />
                    </Col>
                    <Col span={3}>
                      <DatePicker
                        placeholder="Start"
                        value={item.startDate}
                        onChange={(date) =>
                          updateExtraMedication(index, "startDate", date)
                        }
                        style={{ width: "100%" }}
                      />
                    </Col>
                    <Col span={3}>
                      <DatePicker
                        placeholder="End"
                        value={item.endDate}
                        onChange={(date) =>
                          updateExtraMedication(index, "endDate", date)
                        }
                        style={{ width: "100%" }}
                      />
                    </Col>
                    <Col span={4}>
                      <Input.TextArea
                        placeholder="Note"
                        value={item.note}
                        onChange={(e) =>
                          updateExtraMedication(index, "note", e.target.value)
                        }
                        rows={1}
                      />
                    </Col>
                    <Col span={2}>
                      <Button
                        danger
                        onClick={() => removeExtraMedication(index)}
                        className="mt-3"
                      >
                        Remove
                      </Button>
                    </Col>
                  </Row>
                ))}
                <Button onClick={addExtraMedication} icon={<PlusOutlined />}>
                  Add another medication
                </Button>
              </div>
            </Form.Item>

            {/* Form buttons - moved inside Form */}
            <Form.Item>
              <div className="flex justify-end gap-2">
                <Button onClick={handleCancel} disabled={isSubmitting}>
                  Cancel
                </Button>
                <Button type="primary" htmlType="submit" loading={isSubmitting}>
                  OK
                </Button>
              </div>
            </Form.Item>
          </Form>
        </Modal>

        <div className="flex mt-5 bg-[#F3F3F3] w-full h-10 rounded-xl">
          <div className="m-auto flex gap-10">
            <Link to={""}>Medication in use</Link>
            <Link to={"notification"}>Notification</Link>
            {/* <Link to={"medication_history"}>Medication history</Link> */}
          </div>
        </div>

        <div className="flex-1 overflow-auto mt-5">
          <Outlet context={{ medications, setMedications }} />
        </div>
        <div className="h-[160px] w-full"></div>
      </div>
      <AppFooter />
    </div>
  );
};

export default MedicalRequest;

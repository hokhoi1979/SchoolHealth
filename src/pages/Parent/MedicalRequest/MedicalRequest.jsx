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
import { MedicineBoxOutlined, PlusOutlined } from "@ant-design/icons";
import CommonBreadcrumb from "../../../components/CommonBreadcrumb/CommonBreadcrumb";
import { Link, Outlet } from "react-router-dom";
import { AppFooter } from "../../../components/Footer/AppFooter";
import { useDispatch, useSelector } from "react-redux";
import { fetchCreateMedicine } from "../../../redux/profileParent/medicalRequest/createMedicineSlice";
import { fetchStudent } from "../../../redux/profileParent/StudentOfParentSlice";
import { fetchMedicineRequest } from "../../../redux/profileParent/medicalRequest/MedicineRequestSlice";
import { fetchDetailRequest } from "../../../redux/profileParent/medicalRequest/getDetailRequestSlice";
import { toast } from "react-toastify";

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
          <button
            onClick={() => setIsAddVisible(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white font-semibold shadow transition-all duration-200"
          >
            <PlusOutlined />
            Add new medication
          </button>
        </div>

        {/* Modal Add Medication - FIXED */}
        <Modal
          title={
            <div className="flex items-center">
              <MedicineBoxOutlined
                style={{
                  fontSize: "24px",
                  color: "#1890ff",
                  marginRight: "8px",
                }}
              />
              <span>Add new medication</span>
            </div>
          }
          open={isAddVisible}
          onCancel={handleCancel}
          footer={null} // Remove custom footer to prevent duplicate submission
          width={800}
        >
          <Form layout="vertical" form={form} onFinish={handleAdd}>
            {/* Student */}
            <div className="mb-4">
              <label className="block font-medium text-sm mb-1">Student</label>
              <Form.Item name="studentID" noStyle rules={[{ required: true }]}>
                <Select
                  placeholder="Select student"
                  loading={loading}
                  className="w-full rounded border"
                >
                  {student.map((stu) => (
                    <Option key={stu.id} value={stu.id}>
                      {`${stu.account?.fullname} - ${stu.student_code} (${
                        stu.classAssignments?.[0]?.class?.name || "No Class"
                      })`}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </div>

            {/* Main Medicine Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block font-medium text-sm mb-1">Name</label>
                <Form.Item name="name" noStyle rules={[{ required: true }]}>
                  <Input className="w-full rounded border px-3 py-2" />
                </Form.Item>
              </div>

              <div>
                <label className="block font-medium text-sm mb-1">Dosage</label>
                <Form.Item name="dosage" noStyle rules={[{ required: true }]}>
                  <Input className="w-full rounded border px-3 py-2" />
                </Form.Item>
              </div>

              <div>
                <label className="block font-medium text-sm mb-1">
                  Quantity Sent
                </label>
                <Form.Item
                  name="quantitySent"
                  noStyle
                  rules={[{ required: true }]}
                >
                  <Input className="w-full rounded border px-3 py-2" />
                </Form.Item>
              </div>

              <div>
                <label className="block font-medium text-sm mb-1">
                  Usage Times
                </label>
                <Form.Item
                  name="usageTimes"
                  noStyle
                  rules={[{ required: true }]}
                >
                  <Input
                    placeholder="e.g. 08:00, 14:00"
                    className="w-full rounded border px-3 py-2"
                  />
                </Form.Item>
              </div>

              <div>
                <label className="block font-medium text-sm mb-1">
                  Start Date
                </label>
                <Form.Item
                  name="startDate"
                  noStyle
                  rules={[{ required: true }]}
                >
                  <DatePicker className="w-full rounded border px-2 py-2" />
                </Form.Item>
              </div>

              <div>
                <label className="block font-medium text-sm mb-1">
                  End Date
                </label>
                <Form.Item name="endDate" noStyle rules={[{ required: true }]}>
                  <DatePicker className="w-full rounded border px-2 py-2" />
                </Form.Item>
              </div>
            </div>

            <div className="mt-4">
              <label className="block font-medium text-sm mb-1">Note</label>
              <Form.Item name="note" noStyle rules={[{ required: true }]}>
                <TextArea
                  rows={2}
                  className="w-full rounded border px-3 py-2"
                />
              </Form.Item>
            </div>

            {/* Extra Medications */}
            <div className="mt-8 bg-gray-50 p-4 rounded-lg border">
              <h3 className="text-lg font-semibold text-blue-600 mb-4">
                Additional Medications
              </h3>

              <div className="space-y-4">
                {extraMedications.map((item, index) => (
                  <div
                    key={index}
                    className="flex flex-wrap gap-3 bg-white p-3 rounded-md shadow-sm border"
                  >
                    <Input
                      className="w-[120px] rounded border"
                      placeholder="Name"
                      value={item.name}
                      onChange={(e) =>
                        updateExtraMedication(index, "name", e.target.value)
                      }
                    />
                    <Input
                      className="w-[100px] rounded border"
                      placeholder="Dosage"
                      value={item.dosage}
                      onChange={(e) =>
                        updateExtraMedication(index, "dosage", e.target.value)
                      }
                    />
                    <Input
                      className="w-[80px] rounded border"
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
                    <Input
                      className="w-[140px] rounded border"
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
                    <DatePicker
                      placeholder="Start"
                      value={item.startDate}
                      onChange={(date) =>
                        updateExtraMedication(index, "startDate", date)
                      }
                      className="w-[140px] border rounded"
                    />
                    <DatePicker
                      placeholder="End"
                      value={item.endDate}
                      onChange={(date) =>
                        updateExtraMedication(index, "endDate", date)
                      }
                      className="w-[140px] border rounded"
                    />
                    <TextArea
                      rows={1}
                      placeholder="Note"
                      className="w-[180px] rounded border"
                      value={item.note}
                      onChange={(e) =>
                        updateExtraMedication(index, "note", e.target.value)
                      }
                    />
                    <Button
                      danger
                      onClick={() => removeExtraMedication(index)}
                      className="mt-1"
                    >
                      Remove
                    </Button>
                  </div>
                ))}
              </div>

              <div className="mt-4 text-center">
                <Button
                  type="dashed"
                  onClick={addExtraMedication}
                  icon={<PlusOutlined />}
                >
                  Add another medication
                </Button>
              </div>
            </div>

            {/* Submit + Cancel Buttons */}
            <div className="flex justify-end gap-2 mt-6">
              <Button onClick={handleCancel} disabled={isSubmitting}>
                Cancel
              </Button>
              <Button type="primary" htmlType="submit" loading={isSubmitting}>
                OK
              </Button>
            </div>
          </Form>
        </Modal>

        <div className="flex mt-5 bg-[#F3F3F3] w-[300px] h-10 rounded-xl">
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

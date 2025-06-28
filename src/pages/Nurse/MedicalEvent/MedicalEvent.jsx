import React, { useEffect, useState } from "react";
import { AppFooter } from "../../../components/Footer/AppFooter";
import CommonBreadcrumb from "../../../components/CommonBreadcrumb/CommonBreadcrumb";
import { Link } from "react-router-dom";
import {
  Button,
  Input,
  InputNumber,
  Modal,
  Select,
  Space,
  Table,
  Tag,
  Tooltip,
} from "antd";
import { Option } from "antd/es/mentions";
import TextArea from "antd/es/input/TextArea";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";
import { fetchMedicalEvent } from "../../../redux/medicalEventNurse/medicalEvent/getMedicalEventSlice";
import { fetchMedicalEventDetail } from "../../../redux/medicalEventNurse/medicalDetailEvent/getMedicalEventDetailSlice";
import { postMedicalEvent } from "../../../redux/medicalEventNurse/createMedicalEvent/createMedicalEventSlice";
import { sendMedicalEvent } from "../../../redux/medicalEventNurse/sendMedicalEvent/sendMedicalEventSlice";
import { toast } from "react-toastify";
import { patchHospitalEvent } from "../../../redux/medicalEventNurse/editHospitalEvent/editHospitalEventSlice";
import { fetchAllMedicine } from "../../../redux/materialsNurse/getAllMedicine/getAllMedicineSlice";
import { fetchMedicineSupply } from "../../../redux/materialsNurse/getMedicineSupplies/getMedicineSuppliesSlice";
import { postMedicineEvent } from "../../../redux/medicalEventNurse/createMedicineEvent/createMedicineEventSlice";
import { deleteMedicalEvent } from "../../../redux/medicalEventNurse/deleteMedicalEvent/deleteMedicalEventSlice";

const MedicalEvent = () => {
  const [open, setOpen] = useState(false);
  const [openDetail, setOpenDetail] = useState(false);
  const [openSend, setOpenSend] = useState(false);
  const [openHospital, setOpenHospital] = useState(false);
  const [openNormal, setOpenNormal] = useState(false);
  const [openConfirmNormal, setOpenConfirmNormal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const [store, setStore] = useState([]);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [idStatus, setIdStatus] = useState(null);

  const [studentCode, setStudentCode] = useState("");
  const [type, setType] = useState("");
  const [occurredAt, setOccurredAt] = useState("");
  const [description, setDescription] = useState("");
  const [severity, setSeverity] = useState("");
  const [hospitalName, setHospitalName] = useState("");
  const [transferredAt, setTransferredAt] = useState("");

  const { getMedicalEvent = [] } = useSelector(
    (state) => state.getMedicalEventNurse
  );

  const { getMedicalEventDetail = [] } = useSelector(
    (state) => state.getMedicalEventDetailNurse
  );

  const { createMedicalEvent = [] } = useSelector(
    (state) => state.postMedicalEventNurse
  );

  const { sendMedicalEventParent = [] } = useSelector(
    (state) => state.sendMedicalEnventNurse
  );
  const dispatch = useDispatch();

  const { medicine = [] } = useSelector((state) => state.medicineNurse);
  const { medicineSupply = [] } = useSelector(
    (state) => state.getMedicineSupplyNurse
  );

  const [medicineStore, setMedicineStore] = useState([]);
  const [medicineSupplyStore, setMedicineSupplyStore] = useState([]);
  const [combinedStore, setCombinedStore] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [dosageNote, setDosageNote] = useState("");
  const [idNormal, setIdNormal] = useState(null);

  useEffect(() => {
    dispatch(fetchAllMedicine());
    dispatch(fetchMedicineSupply());
  }, []);

  useEffect(() => {
    if (medicine?.data?.medicines && Array.isArray(medicine.data.medicines)) {
      const format = medicine.data.medicines.map((item) => ({
        id: `${item.id}`,
        name: item.name,
        image: item.image,
      }));
      setMedicineStore(format);
    }
  }, [medicine]);

  useEffect(() => {
    if (medicineSupply?.data && Array.isArray(medicineSupply.data)) {
      const format = medicineSupply.data.map((item) => ({
        id: `supply-${item.id}`,
        name: item.name,
        image: item.image,
      }));
      setMedicineSupplyStore(format);
    }
  }, [medicineSupply]);

  useEffect(() => {
    const combined = [...medicineStore, ...medicineSupplyStore];
    setCombinedStore(combined);
  }, [medicineStore, medicineSupplyStore]);
  console.log("ALL", combinedStore);

  const handleQuantityChange = (index, value) => {
    const updated = [...selectedItems];
    updated[index].quantity = value;
    setSelectedItems(updated);
  };

  const handleDosageChange = (index, value) => {
    const updated = [...selectedItems];
    updated[index].dosage = value;
    setSelectedItems(updated);
  };

  const handleAddItem = (id) => {
    const existing = selectedItems.find((item) => item.id === id);
    if (existing) return;
    const item = combinedStore.find((item) => item.id === id);
    if (item) {
      setSelectedItems([
        ...selectedItems,
        { ...item, quantity: 1, dosage: "" },
      ]);
    }
  };

  const handleSaveImport = async (id) => {
    const payload = {
      items: selectedItems.map((item) => ({
        quantity: item.quantity,
        dosage: item.dosage,
        ...(item.id.startsWith("supply-")
          ? { medicineSupplyID: Number(item.id.replace("supply-", "")) }
          : { medicineID: Number(item.id) }),
      })),
    };
    console.log("IDD", id);

    console.log("PAYLOAD", payload);
    try {
      const response = await dispatch(
        postMedicineEvent({ id: id, body: payload })
      );
      setOpenNormal(false);

      toast.success("Create medicine successful!");
    } catch (error) {
      console.log(error);
    }
  };

  const fetchData = () => {
    dispatch(fetchMedicalEvent());
  };

  useEffect(() => {
    fetchData();
  }, []);

  const formatData = () => {
    if (getMedicalEvent?.data && Array.isArray(getMedicalEvent?.data)) {
      const dataSource = getMedicalEvent?.data?.map((event, index) => ({
        key: index,
        id: event?.id,
        studentID: event?.studentInfo?.student_code || "N/A",
        name: event?.studentInfo?.account?.fullname || "N/A",
        grade: event?.studentInfo?.lastAcamedicYear?.class?.name || "N/A",
        type: event?.type || "N/A",
        description: "Đang cập nhật",
        severity: event?.severity,
        gender: event?.studentInfo?.gender,
        status: event?.status,
        time: dayjs(event?.occurredAt).format("HH:mm DD/MM/YYYY"),
        isSent: event?.isSent || false,
      }));
      setStore(dataSource);
    }
  };

  useEffect(() => {
    formatData();
  }, [getMedicalEvent]);

  const handleDetail = (id) => {
    dispatch(fetchMedicalEventDetail(id));
  };

  const handleSaveEvent = async () => {
    const payload = {
      student_code: studentCode,
      type,
      occurredAt,
      description,
      severity,
      ...(severity === "HOSPITAL" && {
        hospitalName,
        transferredAt,
      }),
    };

    console.log("Payload gửi API: ", payload);
    await dispatch(postMedicalEvent(payload));
    setOpen(false);
  };

  const handleSendEvent = async (id) => {
    if (id) {
      const res = await dispatch(sendMedicalEvent(id));
      if (res?.payload?.success) {
        toast.success("Send successful!");

        // Gọi lại API để cập nhật trạng thái (tốt nhất)
        dispatch(getMedicalEventAgain());

        // Hoặc cập nhật thủ công nếu không gọi lại:
        setStore((prev) =>
          prev.map((item) =>
            item.id === id ? { ...item, isSent: true } : item
          )
        );
      } else {
        // toast.error("Gửi thất bại hoặc đã gửi rồi!");
      }

      setOpenSend(false);
    }
  };

  const handleStatus = () => {
    dispatch(patchHospitalEvent(idStatus));
    setOpenHospital(false);
  };

  const handleDelete = (id) => {
    const confirmed = window.confirm("Do you want to delete?");
    if (confirmed) {
      dispatch(deleteMedicalEvent(id));
    }
  };

  const columns = [
    {
      title: "studentID",
      dataIndex: "studentID",
      key: "studentID",
      align: "center",
    },
    {
      title: "Student",
      dataIndex: "name",
      key: "name",
      align: "center",
    },
    {
      title: "Grade",
      dataIndex: "grade",
      key: "grade",
      align: "center",
    },
    {
      title: "Type Event",
      dataIndex: "type",
      key: "type",
      align: "center",
    },

    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      align: "center",
    },
    {
      title: "Handle Event",
      dataIndex: "severity",
      key: "severity",
      align: "center",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      align: "center",
      render: (_, record) => (
        <>
          {record.status === "PROCESSING" && (
            <>
              <Tag color="yellow">{record.status}</Tag>
            </>
          )}

          {record.status === "PENDING" && (
            <>
              <Tag color="blue">{record.status}</Tag>
            </>
          )}

          {record.status === "COMPLETED" && (
            <>
              <Tag color="green">{record.status}</Tag>
            </>
          )}

          {record.status === "HOSPITALIZED" && (
            <>
              <Tag color="orange">{record.status}</Tag>
            </>
          )}

          {record.status === "HOSPITALDISCHARGE" && (
            <>
              <Tag color="green">{record.status}</Tag>
            </>
          )}
        </>
      ),
    },
    {
      title: "Time",
      dataIndex: "time",
      key: "time",
      align: "center",
    },
    {
      title: "Action",
      key: "action",
      align: "center",
      render: (_, record) => (
        <>
          <Space>
            <div style={{ display: "flex", gap: 2 }}>
              <Tooltip title="Handle">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 16 16"
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    if (record.severity === "HOSPITAL") {
                      setOpenHospital(true);
                      setIdStatus(record?.id);
                      console.log("ID", record?.id);
                    } else {
                      if (record.status === "PENDING") {
                        console.log("ID", record?.id);
                        setOpenNormal(true);
                        setIdNormal(record?.id);
                      } else {
                        setOpenHospital(true);
                        setIdStatus(record?.id);
                        console.log("ID", record?.id);
                      }
                    }
                  }}
                >
                  <path
                    fill="#706768"
                    fill-rule="evenodd"
                    d="M3 13.5a.5.5 0 0 1-.5-.5V3a.5.5 0 0 1 .5-.5h9.25a.75.75 0 0 0 0-1.5H3a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V9.75a.75.75 0 0 0-1.5 0V13a.5.5 0 0 1-.5.5zm12.78-8.82a.75.75 0 0 0-1.06-1.06L9.162 9.177L7.289 7.241a.75.75 0 1 0-1.078 1.043l2.403 2.484a.75.75 0 0 0 1.07.01z"
                    clip-rule="evenodd"
                  />
                </svg>
              </Tooltip>
              <Tooltip title="View">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={20}
                  height={20}
                  viewBox="0 0 24 24"
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    handleDetail(record?.id);
                    setOpenDetail(true);
                  }}
                >
                  <path
                    fill="#555656"
                    d="M12 9a3 3 0 0 0-3 3a3 3 0 0 0 3 3a3 3 0 0 0 3-3a3 3 0 0 0-3-3m0 8a5 5 0 0 1-5-5a5 5 0 0 1 5-5a5 5 0 0 1 5 5a5 5 0 0 1-5 5m0-12.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5"
                  />
                </svg>
              </Tooltip>

              <Tooltip title="Delete">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    console.log("ID", record?.id);
                    handleDelete(record?.id);
                  }}
                >
                  <path
                    fill="#555656"
                    d="M7 21q-.825 0-1.412-.587T5 19V6H4V4h5V3h6v1h5v2h-1v13q0 .825-.587 1.413T17 21zM17 6H7v13h10zM9 17h2V8H9zm4 0h2V8h-2zM7 6v13z"
                  />
                </svg>
              </Tooltip>
            </div>
          </Space>
        </>
      ),
    },

    {
      title: "Send",
      key: "send",
      align: "center",
      render: (_, record) =>
        record?.isSent ? (
          <p className="text-green-600 font-semibold">Đã gửi</p>
        ) : (
          <Space>
            <div
              className="flex gap-2 bg-gray-900 w-30 h-8 m-auto items-center justify-center rounded-md hover:bg-gray-700"
              style={{ cursor: "pointer" }}
              onClick={() => {
                setOpenSend(true);
                setSelectedRecord(record);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
              >
                <path
                  fill="white"
                  d="m4 6.03l7.5 3.22l-7.5-1zm7.5 8.72L4 17.97v-2.22zM2 3v7l15 2l-15 2v7l21-9z"
                />
              </svg>
              <p className="text-white font-serif text-[12px]">
                Send to Parent
              </p>
            </div>
          </Space>
        ),
    },
  ];

  return (
    <>
      {" "}
      <div className="flex flex-col min-h-screen">
        <div className="p-6 flex flex-col flex-1">
          <h1 className="text-xl font-inria font-medium mb-4">
            <CommonBreadcrumb role={"Nurse"} page={"medicalEvent"} />
          </h1>

          <div className="pl-5 mt-5 flex justify-between">
            <div className="flex gap-5">
              {" "}
              <Input
                style={{ borderRadius: "7px", width: "300px" }}
                placeholder="Search for ID, Name student..."
              />
              <Button
                className="!bg-[#90A8B0] !hover:bg-gray-600"
                type="secondary"
              >
                <p className="text-white font-kameron"> Search</p>
              </Button>
            </div>
            <Button
              type="secondary"
              className="!bg-black hover:!bg-gray-600"
              onClick={() => setOpen(true)}
            >
              <p
                className="text-white font-serif p-1"
                onClick={() => setOpen(true)}
              >
                + Add Event
              </p>
            </Button>
          </div>
          <Table
            className="mt-5"
            columns={columns}
            dataSource={store}
            pagination={{ pageSize: 5 }}
            rowKey="id"
          />
        </div>
        <div className="h-30"></div>

        <AppFooter />

        <Modal open={open} onCancel={() => setOpen(false)} footer={null}>
          <div className="font-serif">
            <h1 className="text-3xl flex justify-center mb-1">
              Add New Medical Event
            </h1>
            <p className="flex justify-center text-gray-400 mb-4">
              Enter information about the student's medical event
            </p>

            <div className="space-y-3">
              <div>
                <p>Student Code</p>
                <Input
                  placeholder="Enter Student Code"
                  value={studentCode}
                  onChange={(e) => setStudentCode(e.target.value)}
                />
              </div>

              <div>
                <p>Type</p>
                <Select
                  placeholder="Select type"
                  value={type}
                  onChange={(value) => setType(value)}
                  className="w-full rounded-md"
                >
                  <Option value="Sốt">Sốt</Option>
                  <Option value="Đau bụng">Đau bụng</Option>
                  <Option value="Cảm cúm">Cảm cúm</Option>
                  <Option value="Khác">Khác</Option>
                </Select>
              </div>

              <div>
                <p>Occurred At</p>
                <Input
                  type="datetime-local"
                  value={occurredAt}
                  onChange={(e) => setOccurredAt(e.target.value)}
                />
              </div>

              <div>
                <p>Description</p>
                <TextArea
                  rows={3}
                  placeholder="Enter description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              <div>
                <p>Severity</p>
                <Select
                  placeholder="Select severity"
                  value={severity}
                  onChange={(value) => setSeverity(value)}
                  className="w-full rounded-md"
                >
                  <Option value="NORMAL">Normal</Option>
                  <Option value="HOSPITAL">Hospital Transfer</Option>
                </Select>
              </div>

              {severity === "HOSPITAL" && (
                <>
                  <div>
                    <p>Hospital Name</p>
                    <Input
                      placeholder="Enter hospital name"
                      value={hospitalName}
                      onChange={(e) => setHospitalName(e.target.value)}
                    />
                  </div>

                  <div>
                    <p>Transferred At</p>
                    <Input
                      type="datetime-local"
                      value={transferredAt}
                      onChange={(e) => setTransferredAt(e.target.value)}
                    />
                  </div>
                </>
              )}
            </div>

            <div className="flex mt-5 justify-end gap-3">
              <Button
                type="secondary"
                className="!bg-[#E26666] hover:!bg-[#E53838] w-[100px]"
                onClick={() => setOpen(false)}
              >
                <p className="text-white text-xl font-serif p-1">Cancel</p>
              </Button>

              <Button
                type="secondary"
                className="!bg-[#6CC76F] hover:!bg-[#29CD2F] w-[100px]"
                onClick={handleSaveEvent}
              >
                <p className="text-white text-xl font-serif p-1">Save</p>
              </Button>
            </div>
          </div>
        </Modal>

        <Modal
          open={openDetail}
          onCancel={() => setOpenDetail(false)}
          footer={null}
          width={600}
        >
          <h1 className="text-3xl font-bold text-center font-serif mb-6 ">
            Medical Event Detail
          </h1>

          {getMedicalEventDetail?.data?.medicalEventEntity ? (
            <div className="space-y-6 text-base font-serif text-gray-700">
              <div className="bg-gray-50 border border-blue-100 p-5 rounded-xl shadow-sm">
                <h2 className="text-xl font-semibold  mb-4">
                  Medical Event Info
                </h2>
                <div className="space-y-2">
                  <p>
                    <span className="font-semibold"> ID:</span>{" "}
                    {getMedicalEventDetail.data.medicalEventEntity.id}
                  </p>
                  <p>
                    <span className="font-semibold"> Type:</span>{" "}
                    {getMedicalEventDetail.data.medicalEventEntity.type ||
                      "N/A"}
                  </p>
                  <p>
                    <span className="font-semibold"> Description:</span>{" "}
                    {getMedicalEventDetail.data.medicalEventEntity
                      .description || "N/A"}
                  </p>
                  <p>
                    <span className="font-semibold"> Severity:</span>{" "}
                    {getMedicalEventDetail.data.medicalEventEntity.severity}
                  </p>
                  <p>
                    <span className="font-semibold"> Status:</span>{" "}
                    {getMedicalEventDetail.data.medicalEventEntity.status}
                  </p>
                  <p>
                    <span className="font-semibold">Occurred At:</span>{" "}
                    {dayjs(
                      getMedicalEventDetail.data.medicalEventEntity.occurredAt
                    ).format("HH:mm DD/MM/YYYY")}
                  </p>
                  <p>
                    <span className="font-semibold"> Updated At:</span>{" "}
                    {dayjs(
                      getMedicalEventDetail.data.medicalEventEntity.updatedAt
                    ).format("HH:mm DD/MM/YYYY")}
                  </p>
                </div>
              </div>

              <div className="bg-gray-50 border border-green-100 p-5 rounded-xl shadow-sm">
                <h2 className="text-xl font-semibold  mb-4">Student Info</h2>
                <div className="space-y-2">
                  <p>
                    <span className="font-semibold"> Student Code:</span>{" "}
                    {getMedicalEventDetail.data.studentInfo?.student_code ||
                      "N/A"}
                  </p>
                  <p>
                    <span className="font-semibold"> Student Name:</span>{" "}
                    {getMedicalEventDetail.data.studentInfo?.account
                      ?.fullname || "N/A"}
                  </p>
                  <p>
                    <span className="font-semibold"> Gender:</span>{" "}
                    {getMedicalEventDetail.data.studentInfo?.gender || "N/A"}
                  </p>
                  <p>
                    <span className="font-semibold"> Date of Birth:</span>{" "}
                    {dayjs(
                      getMedicalEventDetail.data.studentInfo?.dateOfBirth
                    ).format("DD/MM/YYYY")}
                  </p>
                  <p>
                    <span className="font-semibold"> Parent Name:</span>{" "}
                    {getMedicalEventDetail.data.studentInfo?.ParentInfo
                      ?.fullname || "N/A"}
                  </p>
                  <p>
                    <span className="font-semibold"> Parent Phone:</span>{" "}
                    {getMedicalEventDetail.data.studentInfo?.ParentInfo
                      ?.phone || "N/A"}
                  </p>
                  <p>
                    <span className="font-semibold"> Grade:</span>{" "}
                    {getMedicalEventDetail.data.studentInfo?.lastAcamedicYear
                      ?.class?.name || "N/A"}
                  </p>
                </div>
              </div>

              {getMedicalEventDetail?.data?.medicalEventEntity?.Treatment
                ?.length > 0 && (
                <div className="bg-gray-50 border border-purple-200 p-5 rounded-xl shadow-sm">
                  <h2 className="text-xl font-semibold mb-4">Treatment Info</h2>
                  <div className="space-y-4">
                    {getMedicalEventDetail.data.medicalEventEntity.Treatment.map(
                      (treatmentItem, index) => (
                        <div
                          key={index}
                          className="border border-gray-200 p-3 rounded-md"
                        >
                          <p>
                            <span className="font-semibold">Name:</span>{" "}
                            {treatmentItem.medicine?.name ||
                              treatmentItem.medicineSupply?.name ||
                              "N/A"}
                          </p>
                          {treatmentItem.medicineSupply?.image && (
                            <div className="my-2">
                              <img
                                src={treatmentItem.medicineSupply.image}
                                alt="medicine"
                                className="w-24 h-24 object-contain rounded shadow"
                              />
                            </div>
                          )}
                          <p>
                            <span className="font-semibold">Quantity:</span>{" "}
                            {treatmentItem.quantity}
                          </p>
                          <p>
                            <span className="font-semibold">Dosage:</span>{" "}
                            {treatmentItem.dosage || "N/A"}
                          </p>
                        </div>
                      )
                    )}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center text-red-500 font-semibold">
              Không có dữ liệu chi tiết sự kiện y tế.
            </div>
          )}
        </Modal>

        <Modal
          open={openSend}
          onCancel={() => setOpenSend(false)}
          sendMedicalEventParent
          footer={
            sendMedicalEventParent.success === false && (
              <>
                <Button
                  key="cancel"
                  className="!bg-[#E26666] w-[100px] !p-2 hover:!bg-[#EE3B3B] !text-white !font-serif"
                  onClick={() => setOpenSend(false)}
                  style={{
                    backgroundColor: "#f87171",
                    color: "white",
                    border: "none",
                  }}
                >
                  Cancel
                </Button>

                <Button
                  key="send"
                  disabled={selectedRecord?.isSent}
                  className="!bg-[#6CC76F] !p-2 w-[120px] hover:!bg-[#3BB32B] !text-white !font-serif"
                  onClick={() => {
                    handleSendEvent(selectedRecord?.id);
                  }}
                >
                  Send to Parent
                </Button>
              </>
            )
          }
        >
          <h1 className="text-2xl font-serif justify-center flex">
            Send Vaccination Results
          </h1>
          <h1 className="text-center text-gray-600 mb-4">
            Send vaccination results to parents
          </h1>

          <Table
            pagination={false}
            columns={[
              {
                title: "ID",
                dataIndex: "studentID",
                key: "studentID",
                align: "center",
              },
              {
                title: "Student",
                dataIndex: "name",
                key: "name",
                align: "center",
              },
              {
                title: "Gender",
                dataIndex: "gender",
                key: "gender",
                align: "center",
              },
              {
                title: "Grade",
                dataIndex: "grade",
                key: "grade",
                align: "center",
              },
              {
                title: "Type Event",
                dataIndex: "type",
                key: "type",
                align: "center",
              },
              {
                title: "Time",
                dataIndex: "time",
                key: "time",
                align: "center",
              },
            ]}
            dataSource={selectedRecord ? [selectedRecord] : []}
            rowKey="studentID"
          />
        </Modal>
        <Modal
          open={openHospital}
          onCancel={() => setOpenHospital(false)}
          footer={[
            <Button
              key="cancel"
              className="!bg-[#E26666] w-[100px] !p-2 hover:!bg-[#EE3B3B] !text-white !font-serif"
              onClick={() => setOpenHospital(false)}
              style={{
                backgroundColor: "#f87171",
                color: "white",
                border: "none",
              }}
            >
              Cancel
            </Button>,
            <Button
              key="send"
              disabled={selectedRecord?.isSent}
              className="!bg-[#6CC76F] !p-2 w-[120px] hover:!bg-[#3BB32B] !text-white !font-serif"
              onClick={() => {
                handleStatus();
              }}
            >
              Confirm status
            </Button>,
          ]}
        >
          <h1 className="text-2xl flex justify-center font-serif">
            Do you want to confirm status
          </h1>
        </Modal>
        <Modal
          open={openNormal}
          onCancel={() => setOpenNormal(false)}
          footer={false}
        >
          <h1 className="font-serif text-2xl flex justify-center">
            Import medicine/medical supplies
          </h1>

          <div className="font-serif mt-3">
            <h1 className="text-[17px] font-medium font-kameron mb-2">
              Choose medicine/medical
            </h1>
            <Select
              placeholder="--Choose medicine/medical--"
              className="w-full"
              onChange={handleAddItem}
            >
              {combinedStore.map((item) => (
                <Select.Option key={item.id} value={item.id}>
                  {item.name}
                </Select.Option>
              ))}
            </Select>
          </div>

          <div className="font-serif mt-4">
            <h1 className="text-[17px] font-medium font-kameron mb-2">
              Dosage note
            </h1>
          </div>

          <Table
            dataSource={selectedItems}
            columns={[
              {
                title: "Name",
                dataIndex: "name",
              },
              {
                title: "Quantity",
                dataIndex: "quantity",
                render: (_, record, index) => (
                  <InputNumber
                    min={1}
                    value={record.quantity}
                    onChange={(value) => handleQuantityChange(index, value)}
                  />
                ),
              },
              {
                title: "Dosage",
                dataIndex: "dosage",
                render: (_, record, index) => (
                  <Input
                    value={record.dosage}
                    onChange={(e) => handleDosageChange(index, e.target.value)}
                  />
                ),
              },
            ]}
            rowKey="id"
            className="mt-4"
            pagination={false}
          />

          <div className="mt-5 flex justify-between font-serif">
            <div></div>
            <div className="flex gap-3">
              <Button
                type="secondary"
                className="!bg-[#E26666] hover:!bg-[#E53838] w-[100px]"
                onClick={() => setOpenNormal(false)}
              >
                <p className="text-white text-xl font-serif p-1">Cancel</p>
              </Button>
              <Button
                type="secondary"
                className="!bg-[#6CC76F] hover:!bg-[#29CD2F] w-[100px]"
                onClick={() => handleSaveImport(idNormal)}
              >
                <p className="text-white text-xl font-serif p-1">Save</p>
              </Button>
            </div>
          </div>
        </Modal>
      </div>
    </>
  );
};

export default MedicalEvent;

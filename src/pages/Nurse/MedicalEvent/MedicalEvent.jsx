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
  const [search, setSearch] = useState(null);
  const [store, setStore] = useState([]);
  const [searchStore, setSearchStore] = useState([]);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [idStatus, setIdStatus] = useState(null);

  const [studentCode, setStudentCode] = useState("");
  const [type, setType] = useState("");
  const [occurredAt, setOccurredAt] = useState("");
  const [description, setDescription] = useState("");
  const [severity, setSeverity] = useState("");
  const [hospitalName, setHospitalName] = useState("");
  const [transferredAt, setTransferredAt] = useState("");

  //error
  const [errors, setErrors] = useState({});

  const { getMedicalEvent = [] } = useSelector(
    (state) => state.getMedicalEventNurse
  );

  const { getMedicalEventDetail = [] } = useSelector(
    (state) => state.getMedicalEventDetailNurse
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

  const resetFields = () => {
    setStudentCode("");
    setType(null);
    setOccurredAt("");
    setDescription("");
    setSeverity(null);
    setHospitalName("");
    setTransferredAt("");
    setErrors({});
    setOpen(false);
  };

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
      setSearchStore(dataSource);
    }
  };

  useEffect(() => {
    formatData();
  }, [getMedicalEvent]);

  const handleDetail = (id) => {
    dispatch(fetchMedicalEventDetail(id));
  };

  const handleSaveEvent = async () => {
    const newErrors = {};

    if (!studentCode.trim()) newErrors.studentCode = "Student code is required";
    if (!type) newErrors.type = "Type is required";
    if (!occurredAt) newErrors.occurredAt = "Occurred At is required";
    if (!description.trim()) newErrors.description = "Description is required";
    if (!severity) newErrors.severity = "Severity is required";

    if (severity === "HOSPITAL") {
      if (!hospitalName.trim())
        newErrors.hospitalName = "Hospital name is required";
      if (!transferredAt)
        newErrors.transferredAt = "Transferred At is required";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return false; // ❗ Trả về false nếu có lỗi
    }

    const payload = {
      student_code: studentCode.trim(),
      type,
      occurredAt,
      description: description.trim(),
      severity,
      ...(severity === "HOSPITAL" && {
        hospitalName: hospitalName.trim(),
        transferredAt,
      }),
    };

    console.log("Payload gửi API: ", payload);
    await dispatch(postMedicalEvent(payload));

    return true; // ✅ Trả về true nếu thành công
  };

  const handleSendEvent = async (id) => {
    if (id) {
      const res = await dispatch(sendMedicalEvent(id));
      if (res?.payload?.success) {
        toast.success("Send successful!");

        setStore((prev) =>
          prev.map((item) =>
            item.id === id ? { ...item, isSent: true } : item
          )
        );
      } else {
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

  const handleSearch = () => {
    const keyword = search.trim().toLowerCase();

    const data = store.filter(
      (item) =>
        item.studentID?.toLowerCase().includes(keyword) ||
        item.severity?.toLowerCase().includes(keyword) ||
        item.name?.toLowerCase().includes(keyword) ||
        item.type?.toLowerCase().includes(keyword)
    );

    setSearchStore(data);
    setSearch("");
    console.log("SEARCH", data);
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
                onChange={(e) => {
                  setSearch(e.target.value);
                  console.log(search);
                }}
                value={search}
              />
              <Button
                className="!bg-[#90A8B0] !hover:bg-gray-600"
                type="secondary"
                onClick={handleSearch}
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
            dataSource={searchStore}
            pagination={{ pageSize: 5 }}
            rowKey="id"
          />
        </div>
        <div className="h-30"></div>

        <AppFooter />

        <Modal
          open={open}
          onCancel={() => {
            resetFields();
            setOpen(false);
          }}
          footer={null}
          className="!w-[500px]"
        >
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
                  onChange={(e) => {
                    setStudentCode(e.target.value);
                    if (errors.studentCode && e.target.value.trim()) {
                      setErrors((prev) => ({ ...prev, studentCode: null }));
                    }
                  }}
                />
                {errors.studentCode && (
                  <p className="text-red-500 text-sm">{errors.studentCode}</p>
                )}
              </div>

              <div>
                <p>Type</p>
                <Select
                  placeholder="Select type"
                  value={type}
                  onChange={(value) => {
                    setType(value);
                    if (errors.type && value) {
                      setErrors((prev) => ({ ...prev, type: null }));
                    }
                  }}
                  className="w-full rounded-md"
                >
                  <Option value="Sốt">Sốt</Option>
                  <Option value="Đau bụng">Đau bụng</Option>
                  <Option value="Cảm cúm">Cảm cúm</Option>
                  <Option value="Khác">Khác</Option>
                </Select>
                {errors.type && (
                  <p className="text-red-500 text-sm">{errors.type}</p>
                )}
              </div>

              <div>
                <p>Occurred At</p>
                <Input
                  type="datetime-local"
                  value={occurredAt}
                  onChange={(e) => {
                    setOccurredAt(e.target.value);
                    if (errors.occurredAt && e.target.value) {
                      setErrors((prev) => ({ ...prev, occurredAt: null }));
                    }
                  }}
                />
                {errors.occurredAt && (
                  <p className="text-red-500 text-sm">{errors.occurredAt}</p>
                )}
              </div>

              <div>
                <p>Description</p>
                <TextArea
                  rows={3}
                  placeholder="Enter description"
                  value={description}
                  onChange={(e) => {
                    setDescription(e.target.value);
                    if (errors.description && e.target.value.trim()) {
                      setErrors((prev) => ({ ...prev, description: null }));
                    }
                  }}
                />
                {errors.description && (
                  <p className="text-red-500 text-sm">{errors.description}</p>
                )}
              </div>

              <div>
                <p>Severity</p>
                <Select
                  placeholder="Select severity"
                  value={severity}
                  onChange={(value) => {
                    setSeverity(value);
                    if (errors.severity && value) {
                      setErrors((prev) => ({ ...prev, severity: null }));
                    }
                  }}
                  className="w-full rounded-md"
                >
                  <Option value="NORMAL">Normal</Option>
                  <Option value="HOSPITAL">Hospital Transfer</Option>
                </Select>
                {errors.severity && (
                  <p className="text-red-500 text-sm">{errors.severity}</p>
                )}
              </div>

              {severity === "HOSPITAL" && (
                <>
                  <div>
                    <p>Hospital Name</p>
                    <Input
                      placeholder="Enter hospital name"
                      value={hospitalName}
                      onChange={(e) => {
                        setHospitalName(e.target.value);
                        if (errors.hospitalName && e.target.value.trim()) {
                          setErrors((prev) => ({
                            ...prev,
                            hospitalName: null,
                          }));
                        }
                      }}
                    />
                    {errors.hospitalName && (
                      <p className="text-red-500 text-sm">
                        {errors.hospitalName}
                      </p>
                    )}
                  </div>

                  <div>
                    <p>Transferred At</p>
                    <Input
                      type="datetime-local"
                      value={transferredAt}
                      onChange={(e) => {
                        setTransferredAt(e.target.value);
                        if (errors.transferredAt && e.target.value) {
                          setErrors((prev) => ({
                            ...prev,
                            transferredAt: null,
                          }));
                        }
                      }}
                    />
                    {errors.transferredAt && (
                      <p className="text-red-500 text-sm">
                        {errors.transferredAt}
                      </p>
                    )}
                  </div>
                </>
              )}
            </div>

            <div className="flex mt-5 justify-end gap-3">
              <Button
                onClick={() => {
                  resetFields();
                  setOpen(false);
                }}
              >
                Cancel
              </Button>

              <Button
                type="secondary"
                className="!bg-[#6CC76F] hover:!bg-[#29CD2F] w-[100px]"
                onClick={async () => {
                  const success = await handleSaveEvent();
                  if (success) {
                    resetFields();
                  }
                }}
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
          width={700}
        >
          <div className="flex justify-center gap-2 m-auto">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="26"
              height="26"
              viewBox="0 0 24 24"
            >
              <path
                fill="#f86455"
                d="m12.1 18.55l-.1.1l-.11-.1C7.14 14.24 4 11.39 4 8.5C4 6.5 5.5 5 7.5 5c1.54 0 3.04 1 3.57 2.36h1.86C13.46 6 14.96 5 16.5 5c2 0 3.5 1.5 3.5 3.5c0 2.89-3.14 5.74-7.9 10.05M16.5 3c-1.74 0-3.41.81-4.5 2.08C10.91 3.81 9.24 3 7.5 3C4.42 3 2 5.41 2 8.5c0 3.77 3.4 6.86 8.55 11.53L12 21.35l1.45-1.32C18.6 15.36 22 12.27 22 8.5C22 5.41 19.58 3 16.5 3"
              />
            </svg>
            <h1 className="text-2xl font-bold font-serif mb-6">
              Medical Event Details
            </h1>
          </div>

          {getMedicalEventDetail?.data?.medicalEventEntity ? (
            <div className="space-y-6 font-serif text-gray-800">
              <div className="border-l-4 border-[#1bd0d8]  rounded-xl p-5 shadow">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                    >
                      <g
                        fill="none"
                        stroke="#1bd0d8"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                      >
                        <path d="M3 3v16a2 2 0 0 0 2 2h16" />
                        <path d="m19 9l-5 5l-4-4l-3 3" />
                      </g>
                    </svg>
                    <h2 className="text-lg font-semibold">
                      Event #{getMedicalEventDetail.data.medicalEventEntity.id}
                    </h2>
                  </div>
                  <span className="text-sm px-3 py-1 bg-black text-white rounded-full">
                    {getMedicalEventDetail.data.medicalEventEntity.severity}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm">
                  <p>
                    <span className="font-semibold">Type:</span>{" "}
                    {getMedicalEventDetail.data.medicalEventEntity.type ||
                      "N/A"}
                  </p>
                  <p>
                    <span className="font-semibold">Status:</span>{" "}
                    {getMedicalEventDetail.data.medicalEventEntity.status}
                  </p>
                  <p className="col-span-2">
                    <span className="font-semibold">Description:</span>{" "}
                    {getMedicalEventDetail.data.medicalEventEntity
                      .description || "N/A"}
                  </p>

                  <p>
                    <span className="font-semibold"> Occurred:</span>{" "}
                    {dayjs(
                      getMedicalEventDetail.data.medicalEventEntity.occurredAt
                    ).format("HH:mm DD/MM/YYYY")}
                  </p>

                  <p>
                    <span className="font-semibold"> Updated:</span>{" "}
                    {dayjs(
                      getMedicalEventDetail.data.medicalEventEntity.updatedAt
                    ).format("HH:mm DD/MM/YYYY")}
                  </p>
                </div>
              </div>

              <div className="border-l-4 border-[#6cc77d]  rounded-xl p-5 shadow">
                <div className="flex gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="26"
                    height="26"
                    viewBox="0 0 256 256"
                  >
                    <path
                      fill="#84d687"
                      d="m227.79 52.62l-96-32a11.85 11.85 0 0 0-7.58 0l-96 32A12 12 0 0 0 20 63.37a6 6 0 0 0 0 .63v80a12 12 0 0 0 24 0V80.65l23.71 7.9a67.92 67.92 0 0 0 18.42 85A100.36 100.36 0 0 0 46 209.44a12 12 0 1 0 20.1 13.11C80.37 200.59 103 188 128 188s47.63 12.59 61.95 34.55a12 12 0 1 0 20.1-13.11a100.36 100.36 0 0 0-40.18-35.92a67.92 67.92 0 0 0 18.42-85l39.5-13.17a12 12 0 0 0 0-22.76Zm-99.79-8L186.05 64L128 83.35L70 64ZM172 120a44 44 0 1 1-81.06-23.71l33.27 11.09a11.9 11.9 0 0 0 7.58 0l33.27-11.09A43.85 43.85 0 0 1 172 120"
                    />
                  </svg>
                  <h2 className="text-lg font-semibold mb-3">
                    {getMedicalEventDetail.data.studentInfo?.account?.fullname}
                  </h2>
                </div>

                <div className="grid grid-cols-4">
                  <div>
                    <span className="font-semibold">Student Code</span>{" "}
                    <p>
                      {getMedicalEventDetail.data.studentInfo?.student_code ||
                        "N/A"}
                    </p>
                  </div>

                  <div>
                    <span className="font-semibold">Grade</span>{" "}
                    <p>
                      {getMedicalEventDetail.data.studentInfo?.lastAcamedicYear
                        ?.class?.name || "N/A"}
                    </p>
                  </div>

                  <div>
                    <span className="font-semibold">Gender</span>{" "}
                    <p>
                      {getMedicalEventDetail.data.studentInfo?.gender || "N/A"}
                    </p>
                  </div>

                  <div>
                    <span className="font-semibold">Date of Birth</span>{" "}
                    <p>
                      {dayjs(
                        getMedicalEventDetail.data.studentInfo?.dateOfBirth
                      ).format("DD/MM/YYYY")}
                    </p>
                  </div>
                </div>
                <div className="h-[1px] w-full bg-gray-200 mt-5 mb-5"></div>

                <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm">
                  <div>
                    <span className="font-semibold">
                      Parent/Guardian Contact
                    </span>{" "}
                    <p className="col-span-2">
                      {getMedicalEventDetail.data.studentInfo?.ParentInfo
                        ?.fullname || "N/A"}
                    </p>
                  </div>

                  <div className="">
                    <span className="font-semibold">Phone</span>
                    <div className="flex gap-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fill="black"
                          d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24c1.12.37 2.33.57 3.57.57c.55 0 1 .45 1 1V20c0 .55-.45 1-1 1c-9.39 0-17-7.61-17-17c0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1c0 1.25.2 2.45.57 3.57c.11.35.03.74-.25 1.02z"
                        />
                      </svg>
                      <p className="col-span-2">
                        {getMedicalEventDetail.data.studentInfo?.ParentInfo
                          ?.phone || "N/A"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-l-4 border-[#8b0fcb]  rounded-xl p-5 shadow">
                <div className="flex gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <g class="medicine-outline">
                      <g
                        fill="#b861e5"
                        fill-rule="evenodd"
                        class="Vector"
                        clip-rule="evenodd"
                      >
                        <path d="m19.873 12.3l-8.033 7.998a5.678 5.678 0 0 1-8.012-8.047l8.033-7.998a5.678 5.678 0 0 1 8.012 8.047m-1.4-6.618a3.68 3.68 0 0 0-5.2-.012l-8.034 7.998a3.678 3.678 0 0 0 5.19 5.213l8.033-7.998a3.68 3.68 0 0 0 .012-5.201Z" />
                        <path d="M8.118 8.524a1 1 0 0 1 1.414 0l6.05 6.05a1 1 0 0 1-1.414 1.414l-6.05-6.05a1 1 0 0 1 0-1.414" />
                      </g>
                    </g>
                  </svg>

                  <h2 className="text-lg font-semibold mb-3">
                    Treatment Detail
                  </h2>
                </div>

                {getMedicalEventDetail.data.medicalEventEntity.Treatment.map(
                  (treatmentItem, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-10 p-4 rounded-lg shadow-md border-gray-50  bg-purple-50 mb-2"
                    >
                      <div className="w-16 h-16 rounded  flex items-center justify-center overflow-hidden ">
                        {treatmentItem.medicineSupply?.image ? (
                          <img
                            src={treatmentItem.medicineSupply.image}
                            alt="medicine"
                            className="object-contain w-full h-full"
                          />
                        ) : null}
                      </div>

                      <div className="flex-1 grid grid-cols-3 gap-2">
                        <div>
                          <p className="text-sm text-gray-500">Medicine Name</p>
                          <p className="font-semibold">
                            {treatmentItem.medicine?.name ||
                              treatmentItem.medicineSupply?.name ||
                              "N/A"}
                          </p>
                        </div>

                        <div>
                          <p className="text-sm text-gray-500">Quantity</p>
                          <p className="font-semibold">
                            {treatmentItem.quantity}
                          </p>
                        </div>

                        <div>
                          <p className="text-sm text-gray-500">Dosage</p>
                          <p className="font-semibold">
                            {treatmentItem.dosage || "N/A"}
                          </p>
                        </div>
                      </div>
                    </div>
                  )
                )}
              </div>
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
          className="!w-[600px]"
          footer={[
            <>
              {" "}
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
              </Button>
              <Button
                key="send"
                disabled={selectedRecord?.isSent}
                className="!bg-[#6CC76F] !p-2 w-[120px] hover:!bg-[#3BB32B] !text-white !font-serif"
                onClick={() => handleStatus()}
              >
                Confirm
              </Button>
            </>,
          ]}
        >
          <div className="text-center mb-5 font-serif">
            <h1 className="text-xl font-bold">Status Confirmation</h1>
            <p className="text-sm">Confirm medical event status</p>
          </div>

          <div className="border border-orange-200 bg-orange-50 p-4 rounded-lg mb-5">
            <div className="flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="orange"
                viewBox="0 0 24 24"
              >
                <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z" />
              </svg>
              <p className="font-semibold text-orange-700">
                Pending Confirmation
                <span className="ml-2 px-2 py-0.5 bg-orange-100 text-orange-800 rounded-full text-xs">
                  Waiting
                </span>
              </p>
            </div>
            <p className="text-sm text-gray-600 mt-1">
              Click confirm to send the medical event status to the hospital
              system.
            </p>
          </div>

          <div className="border border-[#4eccdc] rounded-lg p-4 mb-6 bg-[#effafc]">
            <h2 className="font-semibold text-[#49cfe0] text-md mb-3 flex items-center gap-2">
              Event Details
            </h2>
            <div className="grid grid-cols-2 gap-y-2 text-sm text-gray-700">
              <p>
                <span className="font-semibold">Type:</span> Emergency
              </p>
              <p>
                <span className="font-semibold">Severity:</span>{" "}
                <span className="text-white bg-[#4eccdc] px-2 py-0.5 rounded text-xs ml-1">
                  High
                </span>
              </p>
            </div>
          </div>

          <div className="text-center font-seri">
            <h3 className="text-md f mb-2">
              Do you want to confirm this status?
            </h3>
            <p className="text-sm text-gray-500">
              This action will notify the hospital about the current medical
              event status.
            </p>
          </div>
        </Modal>

        <Modal
          open={openNormal}
          onCancel={() => setOpenNormal(false)}
          footer={false}
          className="!w-[600px]"
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

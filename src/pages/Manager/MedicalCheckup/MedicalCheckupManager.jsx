import {
  Button,
  Card,
  Checkbox,
  Input,
  Modal,
  Popconfirm,
  Radio,
  Select,
  Space,
  Table,
  Tooltip,
} from "antd";
import React, { useEffect, useState } from "react";
import { AppFooter } from "../../../components/Footer/AppFooter";
import CommonBreadcrumb from "../../../components/CommonBreadcrumb/CommonBreadcrumb";
import logo from "../../../img/icon.png";
import CheckupItemsTable from "./CheckupItemsTable";
import { useDispatch, useSelector } from "react-redux";
import { fetchMedicineSupplyManager } from "../../../redux/manager/GetMedicineAndSupplyManager/getMedicineAndSupplyManagerSlice";
import CheckupContentEditor from "./CheckupContentEditor";
import CheckupContentTable from "./CheckupContentEditor";
import { fetchCheckupManager } from "../../../redux/MedicalCheckUpManager/GetAllCheckUpManager/getAllCheckUpManagerSlice";
import { CalendarIcon, ClockIcon } from "lucide-react";
import dayjs from "dayjs";
import { fetchClassManager } from "../../../redux/manager/getClassManagerSlice";
import { toast } from "react-toastify";
import { postManagerCheckup } from "../../../redux/MedicalCheckUpManager/PostCheckUpManager/PostCheckUpManagerSlice";
import { patchManagerConfirmCheckup } from "../../../redux/MedicalCheckUpManager/ConfirmMedicalCheckupManager/confirmMedicalCheckupManagerSlice";
import { patchManagerEndMedicalCheckup } from "../../../redux/MedicalCheckUpManager/EndEventMedicalCheckUpManager/endEventMedicalCheckUpManagerSlice";
import { deleteManagerMedicalCheckup } from "../../../redux/MedicalCheckUpManager/DeleteMedicalCheckupManager/deleteMedicalCheckupManagerSlice";
import UpdateCheckupModal from "./UpdateCheckupModal";
import { putManagerMedicalCheckup } from "../../../redux/MedicalCheckUpManager/UpdateMedicalCheckupManager/updateMedicalCheckupManagerSlice";

function MedicalCheckup() {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [notificationModalOpen, setNotificationModalOpen] = useState(false);
  const [notificationTitle, setNotificationTitle] = useState("");
  const [notificationContent, setNotificationContent] = useState("");
  const [targetType, setTargetType] = useState("school");
  const [selectedClasses, setSelectedClasses] = useState([]);
  const [selectAllClasses, setSelectAllClasses] = useState(false);
  const [showCheckupEditor, setShowCheckupEditor] = useState(false);
  const [checkupTitle, setCheckupTitle] = useState("");
  const [checkupDescription, setCheckupDescription] = useState("");
  const [checkupDate, setCheckupDate] = useState("");
  const [selectedGrades, setSelectedGrades] = useState([]);
  const dispatch = useDispatch();
  const [openUpdateModal, setOpenUpdateModal] = useState(false);

  useEffect(() => {
    dispatch(fetchMedicineSupplyManager());
  }, []);

  useEffect(() => {
    dispatch(fetchClassManager());
  }, []);
  const { classManager } = useSelector((state) => state.getManagerClass);
  const classList = classManager?.data || [];

  const { medicineSupply = [] } = useSelector(
    (state) => state.getMedicineSupplyManager
  );

  const formattedData = {
    medicine: medicineSupply.filter((item) => item.type === "medicine"),
    supply: medicineSupply.filter((item) => item.type === "supply"),
  };
  const formatMedicineAndSupply = () => {
    const medicine = medicineSupply
      .filter((item) => item.type === "medicine")
      .map((item) => ({
        id: item.id,
        name: item.name,
        image: item.image,
        stock: item.stock,
      }));

    const supply = medicineSupply
      .filter((item) => item.type === "supply")
      .map((item) => ({
        id: item.id,
        name: item.name,
        image: item.image,
        stock: item.stock,
      }));

    return { medicine, supply };
  };

  const { checkupManagerList = [] } = useSelector(
    (state) => state.getAllCheckupManager
  );
  const [data, setData] = useState([]);

  useEffect(() => {
    const checkups = checkupManagerList?.data?.checkUpEntities || [];
    const formatted = checkups.map((item) => {
      let scheduledDate = item.scheduledAt
        ? dayjs(item.scheduledAt)
        : dayjs(`${item.date} ${item.time}`, "D/M/YYYY HH:mm:ss");

      const isValid = scheduledDate.isValid();

      return {
        id: item.id,
        title: item.title,
        description: item.description,
        date: isValid ? scheduledDate.format("DD/MM/YYYY") : null,
        time: isValid ? scheduledDate.format("HH:mm") : null,
        status: item.status,
        totalStudent: item.studentResponseCount?.totalStudent || 0,
        participate: item.studentResponseCount?.studentsAcceptCount || 0,
        targets: item.HealthCheckupTarget || [],
      };
    });

    setData(formatted);
  }, [checkupManagerList]);

  useEffect(() => {
    dispatch(fetchCheckupManager());
  }, [dispatch]);

  const resetForm = () => {
    setCheckupTitle("");
    setCheckupContents("");
    setCheckupDescription("");
    setCheckupDate(null);
    setTargetType("school");
    setSelectedClasses([]);
    setSelectedGrades([]);
    setSelectAllClasses(false);
    setShowCheckupEditor(false);

    setCheckupTitle("");
    setCheckupDescription("");
    setCheckupDate(null);
    setItems([]);
    setCheckupContents([
      { name: "", description: "", inputType: "TEXT" }, // reset về mặc định
    ]);

    setNotificationTitle("");
    setNotificationContent("");
    setSelectedEvent(null);
  };

  const handleCreate = async () => {
    const formattedTargetType = targetType.toUpperCase();
    let targetIds = [];

    if (formattedTargetType === "CLASS") {
      targetIds = selectedClasses
        .map((className) => {
          const found = classList.find((cls) => cls.name === className);
          return found?.id;
        })
        .filter((id) => id !== undefined);
    } else if (formattedTargetType === "GRADE") {
      targetIds = selectedGrades.map((g) => parseInt(g));
    }

    const safeCheckupContents = checkupContents.map((item) => ({
      name: item.name || "",
      description: item.description || "",
      inputType: item.inputType || "TEXT",
    }));

    const payload = {
      title: checkupTitle,
      description: checkupDescription,
      scheduledAt: dayjs(checkupDate).toISOString(),
      targetType: formattedTargetType,
      targetIds,
      items,
      checkupContents: safeCheckupContents,
    };

    try {
      console.log(payload);
      dispatch(postManagerCheckup(payload));
      toast.success("Create Success");
      closeModal();
    } catch (error) {
      toast.error("Tạo sự kiện thất bại");
      console.error("API ERROR:", error);
    }
  };
  const [targetTypeState, setTargetTypeState] = useState([]);
  const [checkupContents, setCheckupContents] = useState([]);

  const [items, setItems] = useState([]);

  const addCheckupContent = (newItem = null) => {
    setShowCheckupEditor(true);
    if (newItem) {
      setCheckupContents([...checkupContents, newItem]);
    } else {
      setCheckupContents([
        ...checkupContents,
        { name: "", description: "", inputType: "TEXT" },
      ]);
    }
  };

  const availableGrades = ["10", "11", "12"];

  const handleSendConfirm = async () => {
    const { id } = selectedEvent;
    if (!id) {
      console.error("Event ID is missing");
      return;
    }

    if (!notificationTitle || !notificationContent) {
      console.error("Title or Content is missing");
      return;
    }

    const formattedScheduledAt = dayjs(selectedEvent.scheduledAt).format(
      "YYYY-MM-DD"
    );

    try {
      await dispatch(patchManagerConfirmCheckup({ id }));
      toast.success("Sent confirmation successfully");
      setNotificationModalOpen(false);
    } catch (error) {
      console.error("API Error:", error?.response?.data || error?.message);
      toast.error("Failed to send confirmation");
    }
  };

  const handleViewConfirm = (event) => {
    console.log("event trong handleViewConfirm:", event);
    setSelectedEvent(event);
    setNotificationTitle(`Checkup Notice for ${event?.title}`);

    const targets = event?.targets || [];
    let inferredTargetType = event?.targetType;

    if (!inferredTargetType) {
      if (targets.length === 0) {
        inferredTargetType = "SCHOOL";
      } else if (targets[0]?.grade !== undefined) {
        inferredTargetType = "GRADE";
      } else {
        inferredTargetType = "CLASS";
      }
    }

    let grades = [];
    let classIds = [];
    let isSchool = false;

    if (!Array.isArray(classList)) {
      console.warn("classList chưa sẵn sàng");
      return;
    }

    if (targets.length > 0 && targets[0]?.classID !== undefined) {
      classIds = targets.map((t) => t.classID);
      inferredTargetType = "CLASS";
    } else if (inferredTargetType === "GRADE") {
      grades = event?.targetIds?.length
        ? event.targetIds
        : targets
            .map((t) => t.grade)
            .filter((v, i, arr) => arr.indexOf(v) === i);
    } else if (inferredTargetType === "SCHOOL") {
      isSchool = true;
    }

    let targetText = "Unknown";

    if (classIds.length > 0) {
      const classNames = classIds
        .map((id) => classList.find((c) => c.id === id)?.name || `ID ${id}`)
        .join(", ");
      targetText = `classes ${classNames}`;
    } else if (grades.length > 0) {
      targetText = `grades ${grades.join(", ")}`;
    } else if (isSchool) {
      targetText = "all students";
    }

    const formattedDate = dayjs(event?.scheduledAt).isValid()
      ? dayjs(event.scheduledAt).format("DD/MM/YYYY")
      : "Not scheduled";
    setNotificationContent(
      `Dear Parents,\n\nOur school will organize the ${event?.title.toLowerCase()} for students in ${targetText} on ${formattedDate}.\n\nPlease confirm your participation and support us in ensuring the best preparation.\n\nSincerely,`
    );

    setSelectedGrades(grades);
    setSelectedClasses(classIds);
    setTargetType(inferredTargetType);
    setNotificationModalOpen(true);
  };

  const showModal = () => {
    setOpen(true);
  };
  const closeModal = () => {
    setOpen(false);

    resetForm();
  };
  const handleOk = () => {
    setLoading(true);

    setTimeout(() => {
      setOpen(false);
      setTargetType("school");
      setSelectedClasses([]);
      setSelectedGrades([]);
      setSelectAllClasses(false);
      setLoading(false);
    }, 3000);
  };

  const handleClassSelection = (classID, checked) => {
    if (checked) {
      setSelectedClasses([...selectedClasses, classID]);
    } else {
      setSelectedClasses(selectedClasses.filter((id) => id !== classID));
      setSelectAllClasses(false);
    }
  };

  const handleEndCheckup = (id) => {
    console.log(id);
    dispatch(patchManagerEndMedicalCheckup(id));
  };

  const handleDeleteCheckup = (id) => {
    dispatch(deleteManagerMedicalCheckup(id));
  };
  const handleSelectEvent = (event) => {
    setSelectedEvent(event); // Cập nhật selectedEvent khi chọn sự kiện mới
    setOpen(true); // Mở modal
  };

  const handleUpdateCheckup = (event) => {
    setSelectedEvent(event);
    setOpenUpdateModal(true);
  };
  const availableContents = [
    {
      key: "1",
      name: "Chiều cao",
      description: "Đo chiều cao",
      inputType: "NUMBER",
    },
    {
      key: "2",
      name: "Cân nặng",
      description: "Đo cân nặng",
      inputType: "NUMBER",
    },
    {
      key: "3",
      name: "Huyết áp",
      description: "Kiểm tra huyết áp",
      inputType: "TEXT",
    },
  ];

  const handleGradeSection = (grade, checked) => {
    if (checked) {
      setSelectedGrades([...selectedGrades, grade]);
    } else {
      setSelectedGrades(selectedGrades.filter((g) => g !== grade));
    }
  };

  const renderTargetSelection = () => {
    switch (targetType) {
      case "school":
        return (
          <div className="text-gray-600 italic">Áp dụng cho toàn trường</div>
        );

      case "class":
        return (
          <div className="space-y-3">
            <div className="grid grid-cols-3 gap-2 max-h-32 overflow-y-auto border p-3 rounded">
              {classList.map((cls) => (
                <Checkbox
                  key={cls.id}
                  checked={selectedClasses.includes(cls.name)}
                  onChange={(e) =>
                    handleClassSelection(cls.name, e.target.checked)
                  }
                >
                  Class {cls.name}
                </Checkbox>
              ))}
            </div>
            {selectedClasses.length > 0 && (
              <div className="text-sm text-blue-600">
                Đã chọn: {selectedClasses.join(", ")}
              </div>
            )}
          </div>
        );

      case "grade":
        return (
          <div className="space-y-3">
            <div className="font-medium mb-2">Chọn khối:</div>
            <div className="flex gap-4">
              {availableGrades.map((grade) => (
                <Checkbox
                  key={grade}
                  checked={selectedGrades.includes(grade)}
                  onChange={(e) => handleGradeSection(grade, e.target.checked)}
                >
                  Grade {grade}
                </Checkbox>
              ))}
            </div>
            {selectedGrades.length > 0 && (
              <div className="text-sm text-blue-600">
                Grade {selectedGrades.join(", ")}
              </div>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <>
      {" "}
      <h1 className="text-xl font-inria font-medium mb-4 p-10">
        <CommonBreadcrumb role={"Manager"} page={"Checkup"} />
      </h1>
      <div className="pl-5 mt-5 flex gap-5">
        <div className="">
          <Button className="ml-[1000px]" onClick={showModal}>
            Create a new medical event
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-3 mt-5 pl-5 gap-6 items-stretch">
        {data.map((item) => {
          const percentage =
            item.totalStudent.length > 0
              ? (
                  (item.studentResponseCount.studentsAcceptCount /
                    item.studentResponseCount.totalStudent) *
                  100
                ).toFixed(0)
              : 0;

          return (
            <div
              key={item.id}
              className="bg-white p-6 rounded-2xl flex flex-col justify-between shadow-sm h-[420px]"
            >
              {/* TOP: Trạng thái + icon */}
              <div className="flex justify-between">
                <Button
                  className={`!text-white ${
                    item.status === "SUCCESSED" || item.status === "CONFIRMED"
                      ? "!bg-[#6CC76F]"
                      : "!bg-[#CBD361]"
                  }`}
                >
                  {item.status}
                </Button>

                <div className="flex gap-2">
                  <Tooltip title="Xem chi tiết">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={25}
                      height={25}
                      viewBox="0 0 24 24"
                      onClick={() => handleViewMore(item)}
                      className="cursor-pointer"
                    >
                      <path
                        fill="gray"
                        d="M12 9a3 3 0 0 0-3 3a3 3 0 0 0 3 3a3 3 0 0 0 3-3a3 3 0 0 0-3-3m0 8a5 5 0 0 1-5-5a5 5 0 0 1 5-5a5 5 0 0 1 5 5a5 5 0 0 1-5 5m0-12.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5"
                      ></path>
                    </svg>
                  </Tooltip>

                  <Tooltip title="Gửi xác nhận phụ huynh">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={25}
                      height={25}
                      viewBox="0 0 24 24"
                      fill="gray"
                      onClick={() => handleViewConfirm(item)}
                      className="cursor-pointer"
                    >
                      <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z" />
                    </svg>
                  </Tooltip>
                </div>
              </div>

              <div className="flex-grow">
                <h1 className="mt-2 text-2xl font-semibold">{item.title}</h1>
                {(item?.targets ?? []).length === 0 ? (
                  <span>SCHOOL</span>
                ) : (
                  item.targets.map((target, index) => (
                    <span key={index}>
                      {target.className
                        ? target.className
                        : target.grade !== undefined
                        ? `Khối ${target.grade}`
                        : target.name ?? "?"}
                      ,{" "}
                    </span>
                  ))
                )}

                <div className="flex gap-2.5 mt-3">
                  <CalendarIcon />
                  <p>{item.date || "Chưa có ngày"}</p>
                </div>

                <div className="flex gap-2.5 mt-3">
                  <ClockIcon />
                  <p>{item.time || "Chưa có giờ"}</p>
                </div>
              </div>

              <div className="space-y-3 mt-4">
                {item?.status !== "DRAFT" && (
                  <>
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>Xác nhận tham gia</span>
                      <span>
                        {item?.data?.checkUpEntities?.studentResponseCount
                          ?.studentsAcceptCount ?? 0}
                        /
                        {item?.data?.checkUpEntities?.studentResponseCount
                          ?.totalStudent ?? 0}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div
                        className="bg-teal-500 h-2.5 rounded-full"
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                    <div className="text-right text-sm text-gray-500">
                      {percentage}%
                    </div>
                  </>
                )}

                <div className="flex gap-2.5">
                  {item.status !== "ENDED" && item.status !== "CONFIRMED" && (
                    <>
                      <Button onClick={() => handleUpdateCheckup(item)}>
                        Cập nhật buổi khám
                      </Button>
                      <Popconfirm
                        title="Bạn có chắc muốn xoá buổi khám sức khoẻ này không?"
                        onConfirm={() => handleDeleteCheckup(item.id)}
                        okText="Xoá"
                        cancelText="Hủy"
                      >
                        <Button danger>Xoá</Button>
                      </Popconfirm>
                    </>
                  )}
                  {item.status !== "SUCCESSED" && (
                    <Popconfirm
                      title="Bạn có chắc muốn kết thúc buổi khám này không?"
                      onConfirm={() => handleEndCheckup(item?.id)}
                      okText="Xác nhận"
                      cancelText="Hủy"
                    >
                      <Button>Kết thúc</Button>
                    </Popconfirm>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <AppFooter />
      {/* Modal */}
      <Modal
        open={open}
        onOk={handleOk}
        onCancel={closeModal}
        width={800}
        centered
        footer={[
          <Button
            key="cancel"
            onClick={closeModal}
            style={{
              borderRadius: "6px",
              height: "36px",
              fontWeight: "500",
            }}
          >
            Cancel
          </Button>,
          <Button
            key="submit"
            type="primary"
            loading={loading}
            onClick={handleCreate}
            style={{
              borderRadius: "6px",
              height: "36px",
              fontWeight: "500",
              backgroundColor: "#1890ff",
            }}
          >
            Submit
          </Button>,
        ]}
      >
        <div style={{ fontFamily: "sans-serif" }}>
          {/* Header */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
              marginBottom: "24px",
              padding: "16px",
              backgroundColor: "#f8fafc",
              borderRadius: "8px",
              border: "1px solid #e2e8f0",
            }}
          >
            <img
              src={logo}
              alt="Logo"
              width={50}
              style={{ borderRadius: "6px" }}
            />
            <div style={{ flex: 1 }}>
              <h2
                style={{
                  fontSize: "22px",
                  fontWeight: "bold",
                  textAlign: "center",
                  margin: "0",
                  color: "#1e293b",
                }}
              >
                Create New Checkup
              </h2>
            </div>
          </div>

          {/* Form Grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "20px",
              marginBottom: "20px",
            }}
          >
            {/* Checkup Name */}
            <div>
              <label
                style={{
                  display: "block",
                  fontSize: "14px",
                  fontWeight: "500",
                  color: "#374151",
                  marginBottom: "6px",
                }}
              >
                Checkup Name
              </label>
              <Input
                placeholder="Enter checkup title..."
                value={checkupTitle}
                onChange={(e) => setCheckupTitle(e.target.value)}
                style={{
                  borderRadius: "6px",
                  height: "40px",
                }}
              />
            </div>

            {/* Date */}
            <div>
              <label
                style={{
                  display: "block",
                  fontSize: "14px",
                  fontWeight: "500",
                  color: "#374151",
                  marginBottom: "6px",
                }}
              >
                Date of Implementation
              </label>
              <Input
                type="date"
                value={checkupDate || ""}
                onChange={(e) => setCheckupDate(e.target.value)}
                style={{
                  borderRadius: "6px",
                  height: "40px",
                }}
              />
            </div>
          </div>

          {/* Description */}
          <div style={{ marginBottom: "20px" }}>
            <label
              style={{
                display: "block",
                fontSize: "14px",
                fontWeight: "500",
                color: "#374151",
                marginBottom: "6px",
              }}
            >
              Check up Description
            </label>
            <Input.TextArea
              placeholder="Enter checkup description..."
              value={checkupDescription}
              onChange={(e) => setCheckupDescription(e.target.value)}
              rows={3}
              style={{
                borderRadius: "6px",
                resize: "none",
              }}
            />
          </div>

          {/* Checkup Contents */}
          <div style={{ marginBottom: "20px" }}>
            <label
              style={{
                display: "block",
                fontSize: "14px",
                fontWeight: "500",
                color: "#374151",
                marginBottom: "8px",
              }}
            >
              Checkup Contents
            </label>
            <Button
              type="link"
              onClick={addCheckupContent}
              style={{
                padding: "0",
                marginBottom: "12px",
                color: "#1890ff",
                fontWeight: "500",
              }}
            >
              + Thêm mới
            </Button>
            {showCheckupEditor && (
              <div
                style={{
                  border: "1px solid #d9d9d9",
                  borderRadius: "6px",
                  overflow: "hidden",
                }}
              >
                <CheckupContentTable
                  checkupContents={checkupContents}
                  setCheckupContents={setCheckupContents}
                  availableContents={availableContents}
                />
              </div>
            )}
          </div>

          {/* Target Selection */}
          <div style={{ marginBottom: "20px" }}>
            <label
              style={{
                display: "block",
                fontSize: "14px",
                fontWeight: "500",
                color: "#374151",
                marginBottom: "8px",
              }}
            >
              Target Classes
            </label>
            <Radio.Group
              value={targetType}
              onChange={(e) => {
                setTargetType(e.target.value);
                setSelectedClasses([]);
                setSelectedGrades([]);
                setSelectAllClasses(false);
              }}
              style={{ marginBottom: "16px" }}
            >
              <Space direction="vertical">
                <Radio value="school" style={{ fontSize: "14px" }}>
                  Whole School
                </Radio>
                <Radio value="class" style={{ fontSize: "14px" }}>
                  Specific Classes
                </Radio>
                <Radio value="grade" style={{ fontSize: "14px" }}>
                  By Grade
                </Radio>
              </Space>
            </Radio.Group>

            <div
              style={{
                padding: "16px",
                border: "1px solid #d9d9d9",
                backgroundColor: "#fafafa",
                borderRadius: "6px",
                marginBottom: "16px",
              }}
            >
              {renderTargetSelection()}
            </div>

            <div
              style={{
                border: "1px solid #d9d9d9",
                borderRadius: "6px",
                overflow: "hidden",
              }}
            >
              <CheckupItemsTable
                items={items}
                setItems={setItems}
                medicineSupply={medicineSupply}
                formattedData={formattedData}
              />
            </div>
          </div>
        </div>
      </Modal>
      {/* Modal View More */}
      {/* <Modal
        open={viewModalOpen}
        onCancel={handleCloseViewMore}
        footer={[<Button onClick={handleCloseViewMore}>Close</Button>]}
      >
        {selectedEvent && (
          <div className="font-sans px-4">
            <h2 className="text-xl font-bold">
              Campaign Name - {selectedEvent.title}
            </h2>
            <p className="text-sm text-gray-500 mt-1 mb-4">
              {" "}
              Detailed information about the vaccination campaign
            </p>

            <div className="grid grid-cols-2 gap-y-4 text-sm mb-4">
              <div>
                <p className="text-gray-500"> Campaign Name</p>
                <p className="font-semibold flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="currentColor"
                      d="M22 2.25h-3.25V.75a.75.75 0 0 0-1.5-.001V2.25h-4.5V.75a.75.75 0 0 0-1.5-.001V2.25h-4.5V.75a.75.75 0 0 0-1.5-.001V2.25H2a2 2 0 0 0-2 1.999v17.75a2 2 0 0 0 2 2h20a2 2 0 0 0 2-2V4.249a2 2 0 0 0-2-1.999M22.5 22a.5.5 0 0 1-.499.5H2a.5.5 0 0 1-.5-.5V4.25a.5.5 0 0 1 .5-.499h3.25v1.5a.75.75 0 0 0 1.5.001V3.751h4.5v1.5a.75.75 0 0 0 1.5.001V3.751h4.5v1.5a.75.75 0 0 0 1.5.001V3.751H22a.5.5 0 0 1 .499.499z"
                    />
                    <path
                      fill="currentColor"
                      d="M5.25 9h3v2.25h-3zm0 3.75h3V15h-3zm0 3.75h3v2.25h-3zm5.25 0h3v2.25h-3zm0-3.75h3V15h-3zm0-3.75h3v2.25h-3zm5.25 7.5h3v2.25h-3zm0-3.75h3V15h-3zm0-3.75h3v2.25h-3z"
                    />
                  </svg>
                  {selectedEvent.title}
                </p>
              </div>
              <div className="flex gap-2">
                <p className="text-gray-500">Execution Date</p>
                <p className=" font-semibold flex items-center gap-1 mb-5 ">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 2a10 10 0 1 1 0 20a10 10 0 0 1 0-20m0 2a8 8 0 1 0 0 16a8 8 0 0 0 0-16m1 3v5.586l2.707 2.707a1 1 0 1 1-1.414 1.414l-3-3A1 1 0 0 1 11 12V7a1 1 0 0 1 2 0" />
                  </svg>
                  {selectedEvent.date}
                </p>
              </div>
              <div className="flex gap-2">
                <p className="text-gray-500">Number: </p>
                <p className="font-semibold flex items-center gap-1 mb-5 ">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 2a2 2 0 0 1 2 2a2 2 0 0 1-2 2a2 2 0 0 1-2-2a2 2 0 0 1 2-2m-1.5 5h3a2 2 0 0 1 2 2v5.5H14V22h-4v-7.5H8.5V9a2 2 0 0 1 2-2" />
                  </svg>
                  {selectedEvent.students} students
                </p>
              </div>
              <div className="flex gap-2">
                <p className="text-gray-500">Status</p>
                <span className="inline-block bg-black text-white px-2 py-1 rounded-full text-xs  flex items-center gap-1 mb-5 ">
                  {selectedEvent.status}
                </span>
              </div>
            </div>

            <div className="mt-4 ">
              <p className="text-gray-500 text-sm mb-2">Joined Classes</p>
              <div className="flex flex-wrap gap-2">
                {selectedEvent.classes.map((cls, idx) => (
                  <span
                    key={idx}
                    className="border border-gray-300 rounded-full px-3 py-1 text-sm"
                  >
                    {cls}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
      </Modal> */}
      {/* Modal of Notification */}
      <Modal
        title="Send Confirmation Email to Parents"
        open={notificationModalOpen}
        onCancel={() => setNotificationModalOpen(false)}
        footer={[
          <Button key="cancel" onClick={() => setNotificationModalOpen(false)}>
            Cancel
          </Button>,
          <Button key="send" type="primary" onClick={handleSendConfirm}>
            Send Notification
          </Button>,
        ]}
      >
        <div>
          <label className="font-medium mb-2 block">Notification Title</label>
          <Input
            value={notificationTitle}
            onChange={(e) => setNotificationTitle(e.target.value)}
            placeholder="Enter notification title"
          />
        </div>

        <div className="mt-4">
          <label className="font-medium mb-1 block">Notification Content</label>
          <Input.TextArea
            rows={6}
            value={notificationContent}
            onChange={(e) => setNotificationContent(e.target.value)}
            placeholder="Enter message content"
          />
        </div>
      </Modal>
      {/* Modal for creating or updating a checkup */}
      <UpdateCheckupModal
        visible={openUpdateModal}
        onCancel={() => setOpenUpdateModal(false)}
        id={selectedEvent?.id}
        initialData={selectedEvent} // Truyền selectedEvent vào modal
        classList={classList}
        targetType={selectedEvent?.targetType || "school"}
        selectedClasses={selectedEvent?.selectedClasses || []}
        setSelectedClasses={setSelectedClasses}
        checkupContents={checkupContents}
        setCheckupContents={setCheckupContents}
      />
    </>
  );
}

export default MedicalCheckup;

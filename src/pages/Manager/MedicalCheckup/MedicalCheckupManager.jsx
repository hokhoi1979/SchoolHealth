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

import { patchManagerConfirmCheckup } from "../../../redux/MedicalCheckUpManager/ConfirmMedicalCheckupManager/confirmMedicalCheckupManagerSlice";
import { patchManagerEndMedicalCheckup } from "../../../redux/MedicalCheckUpManager/EndEventMedicalCheckUpManager/endEventMedicalCheckUpManagerSlice";
import { deleteManagerMedicalCheckup } from "../../../redux/MedicalCheckUpManager/DeleteMedicalCheckupManager/deleteMedicalCheckupManagerSlice";
import UpdateCheckupModal from "./UpdateCheckupModal";
import { putManagerMedicalCheckup } from "../../../redux/MedicalCheckUpManager/UpdateMedicalCheckupManager/updateMedicalCheckupManagerSlice";
import CheckupDetailModal from "./CheckupDetailModal";
import { fetchDetailCheckupManager } from "../../../redux/MedicalCheckUpManager/getDetailCheckUpManager/getDetailCheckUpManagerSlice";
import { fetchTotalStudent } from "../../../redux/manager/GetTotalStudent/getTotalStudentSlice";
import { postManagerCheckup } from "../../../redux/MedicalCheckUpManager/postCheckUpManager/postCheckUpManagerSlice";

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

  const [detailEvent, setDetailEvent] = useState(null);
  const { checkupDetail } = useSelector(
    (state) => state.getDetailCheckupManager
  );
  const detail = checkupDetail?.data || {};
  const handleViewMore = (event) => {
    if (!event?.id) return;
    dispatch(fetchDetailCheckupManager(event.id));
    setViewModalOpen(true);
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
        totalStudent: item.studentResponseCount?.totalStudent,
        participate: item.studentResponseCount?.studentsAcceptCount,
        targets: item.HealthCheckupTarget || [],
      };
    });

    setData(formatted);
  }, [checkupManagerList]);
  const avg = (Number(data.participate) / Number(data.totalStudent)) * 100;

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
    setCheckupContents([{ name: "", description: "", inputType: "TEXT" }]);

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
      dispatch(postManagerCheckup(payload));
      closeModal();
    } catch (error) {
      toast.error("Tạo sự kiện thất bại");
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
      // console.error("Event ID is missing");
      return;
    }

    if (!notificationTitle || !notificationContent) {
      // console.error("Title or Content is missing");
      return;
    }

    const formattedScheduledAt = dayjs(selectedEvent.scheduledAt).format(
      "YYYY-MM-DD"
    );

    try {
      await dispatch(patchManagerConfirmCheckup({ id }));

      setNotificationModalOpen(false);
    } catch (error) {
      toast.error("Failed to send confirmation");
    }
  };

  const handleViewConfirm = (event) => {
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
      // console.warn("classList chưa sẵn sàng");
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

    const formattedDate = dayjs(event?.date, "DD/MM/YYYY").isValid()
      ? dayjs(event.date, "DD/MM/YYYY").format("DD/MM/YYYY")
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
    dispatch(patchManagerEndMedicalCheckup(id));
  };

  const handleDeleteCheckup = (id) => {
    dispatch(deleteManagerMedicalCheckup(id));
  };
  const handleSelectEvent = (event) => {
    setSelectedEvent(event);
    setOpen(true);
  };
  const checkups = checkupManagerList?.data?.checkUpEntities || [];

  const handleUpdateCheckup = (event) => {
    setSelectedEvent(event);
    setOpenUpdateModal(true);
  };
  const availableContents = [
    {
      key: "1",
      name: "Height",
      description: "Đo chiều cao",
      inputType: "NUMBER",
    },
    {
      key: "2",
      name: "Weight",
      description: "Đo cân nặng",
      inputType: "NUMBER",
    },
    {
      key: "3",
      name: "Blood Pressure",
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
  const totalStudents = useSelector(
    (state) => state.getTotalStudent?.totalStudents ?? 0
  );

  useEffect(() => {
    if (targetType === "school") {
      dispatch(fetchTotalStudent({ targetType: "SCHOOL", targetIds: [] }));
    } else if (targetType === "class" && selectedClasses.length > 0) {
      const classIds = classList
        .filter((cls) => selectedClasses.includes(cls.name))
        .map((cls) => String(cls.id));

      dispatch(fetchTotalStudent({ targetType: "CLASS", targetIds: classIds }));
    } else if (targetType === "grade" && selectedGrades.length > 0) {
      const gradeIds = selectedGrades.map(String);
      dispatch(fetchTotalStudent({ targetType: "GRADE", targetIds: gradeIds }));
    }
  }, [targetType, selectedClasses, selectedGrades, classList]);

  const renderTargetSelection = () => {
    switch (targetType) {
      case "school":
        return (
          <div className="text-gray-600 italic">
            School
            <div className="text-green-600 text-sm mt-1">
              Total students: {totalStudents}
            </div>
          </div>
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
                Picked: {selectedClasses.join(", ")}
                <div className="text-green-600 text-sm">
                  Total students: {totalStudents}
                </div>
              </div>
            )}
          </div>
        );

      case "grade":
        return (
          <div className="space-y-3">
            <div className="font-medium mb-2">Choose Grade:</div>
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
                <div className="text-green-600 text-sm">
                  Total students: {totalStudents}
                </div>
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
          <Button className="ml-[950px]" onClick={showModal}>
            Create a new medical event
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-3 mt-5 pl-5 gap-6 items-stretch">
        {data.map((item) => {
          const percentage =
            Number(item.totalStudent) > 0
              ? Math.round(
                  (Number(item.participate) / Number(item.totalStudent)) * 100
                )
              : 0;

          return (
            <div
              key={item.id}
              className="flex flex-col justify-between h-[370px] bg-white bg-gradient-to-br from-[#e0f7fa] via-white to-[#fce4ec] rounded-2xl border border-gray-200 shadow-md hover:shadow-lg p-5 transition-all duration-300"
            >
              {/* TOP: Trạng thái + icon */}
              <div className="flex justify-between">
                <Button
                  className={`!text-white ${
                    item.status === "SUCCESSED"
                      ? "!bg-[#6CC76F]"
                      : item.status === "CONFIRMED"
                      ? "!bg-[#62d49f]"
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

                  <Tooltip title="Send To Parent">
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
                  <span>
                    {item.targets
                      .map((target) =>
                        target.className
                          ? target.className
                          : target.grade !== undefined
                          ? ` ${target.grade}`
                          : target.name ?? "?"
                      )
                      .join(", ")}
                  </span>
                )}
                <div className="flex gap-2.5 mt-3 ">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <mask id="lineMdFileDocumentMinus0">
                      <g
                        fill="none"
                        stroke="#fff"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                      >
                        <path
                          stroke-dasharray="64"
                          stroke-dashoffset="64"
                          d="M13.5 3l5.5 5.5v11.5c0 0.55 -0.45 1 -1 1h-12c-0.55 0 -1 -0.45 -1 -1v-16c0 -0.55 0.45 -1 1 -1Z"
                        >
                          <animate
                            fill="freeze"
                            attributeName="stroke-dashoffset"
                            dur="0.6s"
                            values="64;0"
                          />
                        </path>
                        <path d="M14.5 3.5l2.25 2.25l2.25 2.25z" opacity="0">
                          <animate
                            fill="freeze"
                            attributeName="d"
                            begin="0.6s"
                            dur="0.2s"
                            values="M14.5 3.5l2.25 2.25l2.25 2.25z;M14.5 3.5l0 4.5l4.5 0z"
                          />
                          <set
                            fill="freeze"
                            attributeName="opacity"
                            begin="0.6s"
                            to="1"
                          />
                        </path>
                        <path
                          stroke-dasharray="8"
                          stroke-dashoffset="8"
                          d="M9 13h6"
                        >
                          <animate
                            fill="freeze"
                            attributeName="stroke-dashoffset"
                            begin="0.8s"
                            dur="0.2s"
                            values="8;0"
                          />
                        </path>
                        <path
                          stroke-dasharray="4"
                          stroke-dashoffset="4"
                          d="M9 17h3"
                        >
                          <animate
                            fill="freeze"
                            attributeName="stroke-dashoffset"
                            begin="1s"
                            dur="0.2s"
                            values="4;0"
                          />
                        </path>
                        <path
                          fill="#000"
                          fill-opacity="0"
                          stroke="none"
                          d="M19 13c3.31 0 6 2.69 6 6c0 3.31 -2.69 6 -6 6c-3.31 0 -6 -2.69 -6 -6c0 -3.31 2.69 -6 6 -6Z"
                        >
                          <set
                            fill="freeze"
                            attributeName="fill-opacity"
                            begin="1.2s"
                            to="1"
                          />
                        </path>
                        <path
                          stroke-dasharray="8"
                          stroke-dashoffset="8"
                          d="M16 19h6"
                        >
                          <animate
                            fill="freeze"
                            attributeName="stroke-dashoffset"
                            begin="1.2s"
                            dur="0.2s"
                            values="8;0"
                          />
                        </path>
                      </g>
                    </mask>
                    <rect
                      width="24"
                      height="24"
                      fill="currentColor"
                      mask="url(#lineMdFileDocumentMinus0)"
                    />
                  </svg>
                  <p>{item.description}</p>
                </div>
                <div className="flex gap-2.5 mt-3">
                  <CalendarIcon />
                  <p>{item.date || "Chưa có ngày"}</p>
                </div>

                {/* <div className="flex gap-2.5 mt-3">
                  <ClockIcon />
                  <p>{item.time || "Chưa có giờ"}</p>
                </div> */}
                <div className="flex gap-2.5 mt-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="none"
                      stroke="#5B5454"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="m17 3l4 4m-2-2l-4.5 4.5m-3-3l6 6m-1-1L10 18H6v-4l6.5-6.5m-5 5L9 14m1.5-4.5L12 11M3 21l3-3"
                    />
                  </svg>
                  <p>School</p>
                </div>
              </div>

              <div className="mt-3">
                {item?.status !== "DRAFT" && (
                  <div>
                    <div className="flex justify-between mb-1 text-sm text-gray-600">
                      <span>Confirm Participate</span>
                      <span>
                        {item.participate ?? 0}/{item.totalStudent ?? 0}
                      </span>
                    </div>

                    <div className="w-full bg-gray-200 rounded-full h-2.5 mt-3">
                      <div
                        className="bg-teal-500 h-2.5 rounded-full"
                        style={{
                          width: `${
                            item.totalStudent && item.totalStudent > 0
                              ? (
                                  (item.participate / item.totalStudent) *
                                  100
                                ).toFixed(0)
                              : 0
                          }%`,
                        }}
                      ></div>
                    </div>

                    <div className="text-right text-sm text-gray-500 mt-1">
                      {item.totalStudent && item.totalStudent > 0
                        ? Math.round(
                            (item.participate / item.totalStudent) * 100
                          )
                        : 0}
                      %
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-3 ">
                <div className="flex gap-2.5 ">
                  {item.status == "DRAFT" && (
                    <>
                      <Button
                        className="w-full"
                        onClick={() => handleUpdateCheckup(item)}
                      >
                        Update
                      </Button>
                      <Popconfirm
                        title="Are you sure you want to delete this medical checkup?"
                        onConfirm={() => handleDeleteCheckup(item.id)}
                        okText="Delete"
                        cancelText="Cancel"
                      >
                        <Button danger>Delete</Button>
                      </Popconfirm>
                    </>
                  )}
                  <div className="w-full  ">
                    {item.status !== "SUCCESSED" && (
                      <Popconfirm
                        title="Are you sure you want to end this medical checkup?"
                        onConfirm={() => handleEndCheckup(item?.id)}
                        okText="Confirm"
                        cancelText="Cancel"
                      >
                        <Button className="w-full">End Event</Button>
                      </Popconfirm>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="w-full h-30"></div>
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
              + ADD NEW
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
      {/* Modal of Notification */}
      <Modal
        title={
          <div style={{ textAlign: "center" }}>
            <Input
              value={notificationTitle}
              onChange={(e) => setNotificationTitle(e.target.value)}
              placeholder="Enter notification title"
              bordered={false}
              style={{
                fontSize: "20px",
                fontWeight: "bold",
                padding: "4px 0",
                background: "transparent",
                textAlign: "center",
              }}
            />
          </div>
        }
        open={notificationModalOpen}
        onCancel={() => setNotificationModalOpen(false)}
        centered
        width={600}
        mask={false}
        style={{
          backgroundColor: "#fff",
          borderRadius: 12,
          border: "2px solid black",
          boxShadow: "none",
        }}
        bodyStyle={{
          padding: "16px 0 0",
        }}
        footer={[
          <Button key="cancel" onClick={() => setNotificationModalOpen(false)}>
            Cancel
          </Button>,
          <Button key="send" type="primary" onClick={handleSendConfirm}>
            Send Notification
          </Button>,
        ]}
      >
        <div
          style={{
            padding: "12px 16px",
            borderRadius: 8,
            backgroundColor: "#f9f9f9",
            border: "1px solid #e5e5e5",
          }}
        >
          <Input.TextArea
            rows={6}
            value={notificationContent}
            onChange={(e) => setNotificationContent(e.target.value)}
            placeholder="Enter message content"
            bordered={false}
            style={{ resize: "none", background: "transparent" }}
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
        checkupList={checkups}
        totalStudents={totalStudents}
      />
      <CheckupDetailModal
        visible={viewModalOpen}
        onClose={() => setViewModalOpen(false)}
        event={detail} // <-- dùng biến mới đã trích ra
        onUseAsTemplate={(detail) => {
          setCheckupTitle(detail.title);
          setCheckupDescription(detail.description);
          setCheckupDate(dayjs(detail.scheduledAt).format("YYYY-MM-DD"));
          setTargetType(detail.targetType?.toLowerCase());
          setSelectedClasses(detail.targets?.map((t) => t.className));
          setCheckupContents(detail.content || []);
          setItems(detail.vaccineEventStock || []);
          setViewModalOpen(false);
          setOpen(true);
        }}
      />
    </>
  );
}

export default MedicalCheckup;

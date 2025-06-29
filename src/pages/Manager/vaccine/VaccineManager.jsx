import { Button, Checkbox, Input, Modal, Popconfirm, Radio } from "antd";
import React, { use, useEffect, useState } from "react";
import CommonBreadcrumb from "../../../components/CommonBreadcrumb/CommonBreadcrumb";
import logo from "../../../img/icon.png";
import { useDispatch, useSelector } from "react-redux";
import { postManagerVaccine } from "../../../redux/manager/createVaccineManagerSlice";
import { fetchManagerMedical } from "../../../redux/manager/managerSlice";
import { fetchVaccineManager } from "../../../redux/manager/getVaccineManagerSlice";
import dayjs from "dayjs";
import { putManagerMedical } from "../../../redux/manager/updateVaccineManagerSlice";
import { fetchClassManager } from "../../../redux/manager/getClassManagerSlice";
import { patchManagerVaccine } from "../../../redux/manager/successVaccineManagerSlice";
import { ModalDetail } from "./ModalDetail";
import { patchManagerConfirmVaccine } from "../../../redux/manager/ConfirmVaccineManager/ConfirmVaccineManagerSlice";
import { deleteManagerVaccine } from "../../../redux/manager/DeleteVaccineEvent/deleteVaccineEventSlice";
import { fetchMedicineSupplyManager } from "../../../redux/manager/GetMedicineAndSupplyManager/getMedicineAndSupplyManagerSlice";
import "./style.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TextArea from "antd/es/input/TextArea";

const VaccineManager = () => {
  const [open, setOpen] = useState(false);
  const [openDetail, setOpenDetail] = useState(false);
  const [targetType, setTargetType] = useState("school");
  const [selectedClasses, setSelectedClasses] = useState([]);
  const [selectAllClasses, setSelectAllClasses] = useState(false);
  const [selectedGrades, setSelectedGrades] = useState([]);
  const [vaccineName, setVaccineName] = useState("");
  const [vaccineDescription, setVaccineDescription] = useState("");
  const [vaccineDate, setVaccineDate] = useState("");
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [data, setData] = useState([]);
  const [notificationModalOpen, setNotificationModalOpen] = useState(false);
  const [notificationTitle, setNotificationTitle] = useState("");
  const [notificationContent, setNotificationContent] = useState("");
  const [items, setItems] = useState([]);
  const [updateItems, setUpdateItems] = useState([]);

  let targetIds = [];
  const dispatch = useDispatch();

  const {
    vaccine = [],
    loading,
    error,
  } = useSelector((state) => state.managerVaccine);

  const { vaccineDay = [] } = useSelector((state) => state.getmanagerVaccine);

  const { vaccineSuccess = [] } = useSelector(
    (state) => state.patchManagerVaccine
  );
  const { vaccineConfirm = [] } = useSelector(
    (state) => state.patchManagerConfirmVaccine
  );
  const { classManager } = useSelector((state) => state.getManagerClass);
  const classList = classManager?.data || [];

  const { medicineSupply = [] } = useSelector(
    (state) => state.getMedicineSupplyManager
  );

  useEffect(() => {
    fetchVaccine();
  }, []);

  const formatMedicineAndSupply = () => {
    if (Array.isArray(medicineSupply)) {
      const medicine = medicineSupply
        .filter((item) => item.type === "medicine")
        .map((item) => ({
          id: item.id,
          image: item.image,
          name: item.name,
          stock: item.stock,
          type: item.type,
        }));

      const supply = medicineSupply
        .filter((item) => item.type === "supply")
        .map((item) => ({
          id: item.id,
          image: item.image,
          name: item.name,
          stock: item.stock,
          type: item.type,
        }));

      return { medicine, supply };
    }

    return { medicine: [], supply: [] };
  };

  const formattedData = formatMedicineAndSupply();

  useEffect(() => {
    console.log("Formatted Data:", formattedData);
  }, [medicineSupply]);

  const fetchVaccine = () => {
    dispatch(fetchMedicineSupplyManager());
  };

  const formatClassData = () => {
    if (classManager?.data && Array.isArray(classManager?.data)) {
      const format = classManager?.data.map((cls) => {
        return {
          id: cls?.id,
          name: cls?.name,
        };
      });
    }
  };
  useEffect(() => {
    dispatch(fetchClassManager());
  }, []);

  const fetchData = () => {
    dispatch(fetchVaccineManager());
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDeleteVaccine = (id) => {
    dispatch(deleteManagerVaccine({ id }));
  };

  const formatData = () => {
    if (
      vaccineDay?.data?.vaccinationEvents &&
      Array.isArray(vaccineDay?.data?.vaccinationEvents)
    ) {
      const format = vaccineDay?.data?.vaccinationEvents.map((item) => {
        let displayedGrades = "";

        if (item.targetType === "GRADE") {
          const gradesSet = new Set();

          item.targetIds.forEach((targetId) => {
            const classObj = classList.find((cls) => cls.id === targetId);
            if (classObj) {
              const grade = classObj.name.slice(0, 2); // Lấy số khối từ tên lớp (VD: "10A1" → "10")
              gradesSet.add(grade);
            }
          });

          displayedGrades = [...gradesSet].join(", ");
        } else if (item.targetType === "CLASS") {
          displayedGrades = item.targets?.map((t) => t.className).join(", ");
        } else if (item.targetType === "SCHOOL") {
          displayedGrades = "SCHOOL";
        }

        return {
          id: item?.id,
          name: item?.name,
          description: item?.description,
          scheduledAt: item?.scheduledAt
            ? dayjs(item.scheduledAt).format("DD/MM/YYYY HH:mm")
            : "Chưa xác định",
          grade: displayedGrades,
          participate: item?.studentResponseCount?.studentsAcceptCount,
          total: item?.studentResponseCount?.totalStudent,
          status: item?.status,
          targetType: item?.targetType,
          targetIds: item?.targetIds,
          targets: item.targets,
        };
      });

      setData(format);
    }
  };

  useEffect(() => {
    formatData();
  }, [vaccineDay]);

  useEffect(() => {
    console.log("FORMAT", data);
  }, []);
  useEffect(() => {
    console.log("classManager data:", classManager);
  }, [classManager]);

  const handleUpdateSubmit = () => {
    if (!selectedEvent) return;

    const formattedTargetType = targetType.toUpperCase();
    let updatedTargetIds = [];
    if (formattedTargetType === "CLASS") {
      updatedTargetIds = selectedClasses.map((cls) => classIdMap[cls]);
      if (updatedTargetIds.length === 0) {
        alert("Vui lòng chọn ít nhất một lớp.");
        return;
      }
    } else if (formattedTargetType === "GRADE") {
      updatedTargetIds = selectedGrades;
      if (updatedTargetIds.length === 0) {
        alert("Vui lòng chọn ít nhất một khối.");
        return;
      }
    } else if (formattedTargetType === "SCHOOL") {
      updatedTargetIds = []; // Tất cả lớp
    }

    const payload = {
      id: selectedEvent.id,
      name: vaccineName,
      description: vaccineDescription || "Không có mô tả",
      scheduledAt: dayjs(vaccineDate).format("YYYY-MM-DD"),
      targetType: formattedTargetType,
      targetIds: updatedTargetIds,
    };

    console.log("Final PAYLOAD gửi PUT:", payload);
    dispatch(putManagerMedical(payload));
    dispatch(fetchVaccineManager());
    setIsUpdateModalOpen(false);

    if (payload && payload.data) {
      // Reset form after successful creation
      setOpen(false);
      setVaccineName("");
      setVaccineDescription("");
      setVaccineDate("");
      setTargetType("school");
      setSelectedClasses([]);
      setSelectedGrades([]);
      setSelectAllClasses(false);
    }
  };

  if (targetType === "class") {
    targetIds = selectedClasses.map((id) => parseInt(id));
  } else if (targetType === "grade") {
    targetIds = selectedGrades.map((id) => parseInt(id));
  }

  const { vaccineUpdate, loading: updateLoading } = useSelector(
    (state) => state.putManagerVaccine
  );

  const classIdMap = {};
  classList.forEach((cls) => {
    classIdMap[cls.name] = cls.id;
  });

  const gradeIdMap = {};
  classList.forEach((cls) => {
    const grade = cls.name.slice(0, 2);
    if (!gradeIdMap[grade]) {
      gradeIdMap[grade] = [];
    }
    gradeIdMap[grade].push(cls.id);
  });

  const handleCreate = async () => {
    const targetTypeFormatted = targetType.toUpperCase();
    let targetIds = [];

    if (targetTypeFormatted === "SCHOOL") {
      targetIds = [];
    } else if (targetTypeFormatted === "CLASS") {
      targetIds = selectedClasses.map((cls) => classIdMap[cls]);
    } else if (targetTypeFormatted === "GRADE") {
      targetIds = selectedGrades;
    }
    const cleanedItems = items.map((item) => {
      const cleaned = {
        quantityPlanned: item.quantityPlanned,
      };

      if (item.medicineID != null) cleaned.medicineID = item.medicineID;
      if (item.medicineSupplyID != null)
        cleaned.medicineSupplyID = item.medicineSupplyID;
      if (item.notes?.trim()) cleaned.notes = item.notes.trim();

      return cleaned;
    });
    const payload = {
      name: vaccineName,
      description: vaccineDescription,
      scheduledAt: dayjs(vaccineDate).format("YYYY-MM-DD"), // Ensure correct date format
      targetType: targetTypeFormatted,
      targetIds,
      items: cleanedItems,
    };
    console.log(payload);
    try {
      const data = await dispatch(postManagerVaccine(payload));

      console.log("Create Success:", data);

      console.log(payload);

      resetForm();
      handleCloseModal();
    } catch (error) {
      if (error.response) {
        // Lỗi từ API
        console.error("API Error Response:", error.response);
        console.error("API Error Data:", error.response.data);
        console.error("API Error Status:", error.response.status);
        console.error("API Error Headers:", error.response.headers);
      } else if (error.request) {
        console.error("No response from API:", error.request);
      } else {
        console.error("Error in request setup:", error.message);
      }
    }
  };

  useEffect(() => {
    if (!loading && vaccine) {
      setOpen(false);
      setVaccineName("");
      setVaccineDescription("");
      setVaccineDate("");
      setTargetType("school");
      setSelectedClasses([]);
      setSelectedGrades([]);
      setSelectAllClasses(false);
    }
  }, [loading, vaccine, error]);

  const availableGrades = [10, 11, 12];

  const formatScheduledAt = (scheduledAt) => {
    const isValidDate = dayjs(scheduledAt, "DD/MM/YYYY HH:mm", true).isValid();

    if (!isValidDate) {
      console.error("Invalid scheduledAt date:", scheduledAt);
      return null;
    }

    const formattedDate = dayjs(scheduledAt, "DD/MM/YYYY HH:mm").format(
      "YYYY-MM-DD"
    );
    return formattedDate;
  };

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

    const scheduledAt = selectedEvent.scheduledAt;
    const formattedScheduledAt = dayjs(selectedEvent.scheduledAt).format(
      "YYYY-MM-DD"
    );

    if (!formattedScheduledAt) {
      alert("Invalid scheduled date. Please check the date.");
      return;
    }

    // Kiểm tra selectedGrades và classIdMap
    const targetIds = selectedGrades.includes("GRADE")
      ? []
      : selectedGrades.map(Number); // Chỉ dùng số khối, không map class

    const payload = {
      id,
      customMailTitle: notificationTitle,
      customMailBody: notificationContent, // Nội dung email
      scheduledAt: formattedScheduledAt, // Đảm bảo trường này được bao gồm
      targetIds: targetIds, // Đảm bảo trường này được bao gồm
    };

    console.log("Payload to send:", payload); // Log payload để kiểm tra

    // Gửi payload bằng API
    try {
      dispatch(patchManagerConfirmVaccine(payload));
    } catch (error) {
      console.error("API Error:", error?.response?.data || error?.message);
    }
  };

  const handleViewMore = (event) => {
    console.log("event trong handleViewMore:", event);

    setSelectedEvent(event);
    setNotificationTitle(`Checkup Notice for ${event?.name}`);

    const targets = event?.targets || [];
    let targetType = event?.targetType;

    if (!targetType) {
      if (targets.length === 0) {
        targetType = "SCHOOL";
      } else if (targets[0]?.grade !== undefined) {
        targetType = "GRADE";
      } else {
        targetType = "CLASS";
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
      targetType = "CLASS"; // ép targetType về CLASS
    } else if (targetType === "GRADE") {
      grades = event?.targetIds?.length
        ? event.targetIds
        : targets
            .map((t) => t.grade)
            .filter((v, i, arr) => arr.indexOf(v) === i);
    } else if (targetType === "SCHOOL") {
      isSchool = true;
    }

    let gradeList = "Unknown";

    if (classIds.length > 0) {
      const classNames = classIds
        .map((id) => classList.find((c) => c.id === id)?.name || `ID ${id}`)
        .join(", ");
      gradeList = `classes ${classNames}`;
    } else if (grades.length > 0) {
      gradeList = `grades ${grades.join(", ")}`;
    } else if (isSchool) {
      gradeList = "all students";
    }

    const formattedDate = event?.scheduledAt
      ? dayjs(event.scheduledAt, "DD/MM/YYYY HH:mm").format("DD-MM-YYYY")
      : "Invalid Date";

    setNotificationContent(
      `Dear Parents,\n\nOur school will organize the ${event?.name.toLowerCase()} for students in ${gradeList} on ${formattedDate}.\n\nPlease confirm your participation and support us in ensuring the best preparation.\n\nSincerely,`
    );

    // 👉 Lưu classIds & targetType để dùng confirm
    setSelectedGrades(grades);
    setSelectedClasses(classIds);
    setTargetType(targetType);
    setOpenDetail(true);
  };

  const handleCloseViewMore = () => {
    setOpenDetail(false);
    setSelectedEvent(null);
  };

  const handleClassSelection = (classID, checked) => {
    if (checked) {
      setSelectedClasses([...selectedClasses, classID]);
    } else {
      setSelectedClasses(selectedClasses.filter((id) => id !== classID));
      setSelectAllClasses(false);
    }
  };

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
            <div className="flex items-center gap-2 mb-3"></div>
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
                Picked Classes: {selectedClasses.join(", ")}
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
  const handleShowModal = () => {
    resetForm();
    setOpen(true);
  };
  const handleCloseModal = () => {
    setOpen(false);
    resetForm();
  };
  const resetForm = () => {
    console.log("RESET FORM");
    setVaccineName("");
    setVaccineDescription("");
    setVaccineDate("");
    setTargetType("school");
    setSelectedClasses([]);
    setSelectedGrades([]);
    setSelectAllClasses(false);
    setItems([]);
  };

  const handleUpdateEvent = (event) => {
    setSelectedEvent(event);
    setIsUpdateModalOpen(true);

    setVaccineName(event.name);
    setVaccineDescription(event.description || "");
    setVaccineDate(
      dayjs(event.scheduledAt, "DD/MM/YYYY HH:mm").format("YYYY-MM-DD")
    );
    setUpdateItems(event.item || []);
  };

  const handleEndEvent = async (id) => {
    dispatch(patchManagerVaccine(id));
  };

  return (
    <>
      <h1 className="text-xl font-inria font-medium mb-4 p-10">
        <CommonBreadcrumb role={"Manager"} page={"Vaccine"} />
      </h1>

      <div className="pl-5 mt-5 flex gap-5">
        <div className="">
          <Button className="ml-[1000px]" onClick={handleShowModal}>
            Create A New Vaccine
          </Button>
        </div>
      </div>

      <div className="mt-10">
        <div className="grid grid-cols-3 mt-5 pl-5 gap-5.5">
          {data.map((item) => (
            <div className="bg-white p-6 rounded-2xl flex flex-col justify-between h-full">
              <div className="flex justify-between">
                {item.status === "SUCCESSED" ? (
                  <Button className="!bg-[#6CC76F] !text-white">
                    {item.status}
                  </Button>
                ) : item.status === "CONFIRMED" ? (
                  <Button className="!bg-[#62d49f] !text-white">
                    {item.status}
                  </Button>
                ) : (
                  <Button className="!bg-[#CBD361] !text-white">
                    {item.status}
                  </Button>
                )}

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={25}
                  height={25}
                  viewBox="0 0 24 24"
                  fill="gray"
                  onClick={() => handleViewMore(item)}
                  className="cursor-pointer"
                >
                  <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z" />
                </svg>
              </div>
              {openDetail && (
                <ModalDetail
                  open={openDetail}
                  cancel={handleCloseViewMore}
                  ok={handleSendConfirm}
                  title={notificationTitle}
                  content={notificationContent}
                />
              )}
              <h1 className="mt-2 text-2xl">{item.name}</h1>
              <p className="text-gray-700">
                {item.targets.length === 0
                  ? "SCHOOL"
                  : item.targets.map((t) => t.className || t.grade).join(", ")}
              </p>

              {/* <p className="text-gray-500">{item.grade}</p> */}
              <div className="flex gap-2.5 mt-3">
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
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="#5B5454"
                    fill-rule="evenodd"
                    d="M17.297 6.572c-.41 0-.75-.34-.75-.75V4.598c-.774-.026-1.683-.026-2.75-.026h-2c-1.068 0-1.976 0-2.75.026v1.224c0 .41-.34.75-.75.75s-.75-.34-.75-.75V4.706c-.945.123-1.594.36-2.05.816c-.602.602-.822 1.54-.903 3.05H21c-.081-1.51-.302-2.448-.903-3.05c-.456-.456-1.105-.693-2.05-.816v1.116c0 .41-.34.75-.75.75m3.744 3.5q.008.793.006 1.75v1c0 .41.34.75.75.75s.75-.34.75-.75v-1c0-3.98 0-5.97-1.39-7.36c-.772-.772-1.73-1.115-3.11-1.268v-.872c0-.41-.34-.75-.75-.75s-.75.34-.75.75v.775c-.796-.025-1.705-.025-2.75-.025h-2c-1.046 0-1.954 0-2.75.025v-.775c0-.41-.34-.75-.75-.75s-.75.34-.75.75v.872c-1.38.153-2.338.496-3.11 1.268c-1.39 1.39-1.39 3.39-1.39 7.36v2c0 3.98 0 5.97 1.39 7.36s3.38 1.39 7.36 1.39c.41 0 .75-.34.75-.75s-.34-.75-.75-.75c-3.56 0-5.35 0-6.3-.95s-.95-2.74-.95-6.3v-2q-.001-.956.005-1.75zm-3.244 13c-2.62 0-4.75-2.13-4.75-4.75s2.13-4.75 4.75-4.75s4.75 2.13 4.75 4.75s-2.13 4.75-4.75 4.75m0-8c-1.79 0-3.25 1.46-3.25 3.25s1.46 3.25 3.25 3.25s3.25-1.46 3.25-3.25s-1.46-3.25-3.25-3.25m.47 4.78c.15.15.34.22.53.22s.38-.07.53-.22c.29-.29.29-.77 0-1.06l-.78-.78v-1.69c0-.41-.34-.75-.75-.75s-.75.34-.75.75v2c0 .2.08.39.22.53z"
                    color="#5B5454"
                  />
                </svg>
                <p>{item.scheduledAt}</p>
              </div>
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
              <div className="mt-3">
                {item.status !== "DRAFT" && (
                  <div className="mt-3">
                    <div className="flex justify-between mb-1 text-sm text-gray-600">
                      <span>Confirm Paritcipate</span>
                      <span>
                        {item.participate}/{item.total}
                      </span>
                    </div>

                    <div className="w-full bg-gray-200 rounded-full h-2.5 mt-3">
                      <div
                        className="bg-teal-500 h-2.5 rounded-full"
                        style={{
                          width: `${
                            item.total && item.total > 0
                              ? ((item.participate / item.total) * 100).toFixed(
                                  0
                                )
                              : 0
                          }%`,
                        }}
                      ></div>
                    </div>
                  </div>
                )}
              </div>
              <div className="flex gap-2.5 mt-5">
                <div>
                  {item.status === "DRAFT" && (
                    <Button onClick={() => handleUpdateEvent(item)}>
                      Update Schedule
                    </Button>
                  )}
                </div>

                <div>
                  {item.status !== "CONFIRMED" && (
                    <Popconfirm
                      title="Bạn có chắc muốn xoá vaccine này không?"
                      okText="DELETE"
                      cancelText="Hủy"
                      onConfirm={() => handleDeleteVaccine(item?.id)}
                    >
                      <Button danger>DELETE</Button>
                    </Popconfirm>
                  )}
                </div>

                <div className="w-full mr-10 ">
                  {item.status !== "SUCCESSED" && (
                    <Popconfirm
                      title="Bạn có chắc muốn xác nhận vaccine này không?"
                      okText="CONFIRM"
                      cancelText="Hủy"
                      onConfirm={() => handleEndEvent(item?.id)}
                    >
                      <Button className="w-full">End Event</Button>
                    </Popconfirm>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* modal for create new medical checkup */}
      <Modal
        open={open}
        onCancel={handleCloseModal}
        footer={[
          <Button
            key="create"
            onClick={handleCreate}
            style={{
              backgroundColor: "#1890ff",
              color: "white",
              border: "none",
              borderRadius: "6px",
              fontWeight: "500",
              height: "36px",
              paddingLeft: "20px",
              paddingRight: "20px",
            }}
          >
            Create
          </Button>,
        ]}
        width={700}
        destroyOnClose={true}
        centered
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
              src={logo || "/placeholder.svg?height=50&width=50"}
              alt="Logo"
              width={50}
              style={{ borderRadius: "6px" }}
            />
            <div style={{ flex: 1 }}>
              <h1
                style={{
                  fontWeight: "bold",
                  fontSize: "22px",
                  textAlign: "center",
                  margin: "0",
                  color: "#1e293b",
                }}
              >
                New Vaccination
              </h1>
            </div>
          </div>

          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "16px",
                marginBottom: "16px",
              }}
            >
              <p
                style={{
                  fontFamily: "serif",
                  color: "#7F7F7F",
                  width: "160px",
                  margin: "0",
                  fontSize: "14px",
                  fontWeight: "500",
                }}
              >
                Vaccination Name:
              </p>
              <Input
                onChange={(e) => setVaccineName(e.target.value)}
                value={vaccineName}
                style={{
                  flex: 1,
                  borderRadius: "6px",
                  height: "40px",
                }}
              />
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "16px",
                paddingTop: "8px",
                marginBottom: "16px",
              }}
            >
              <p
                style={{
                  fontFamily: "serif",
                  color: "#7F7F7F",
                  width: "160px",
                  margin: "0",
                  fontSize: "14px",
                  fontWeight: "500",
                  paddingTop: "8px",
                }}
              >
                Vaccination Description:
              </p>
              <TextArea
                onChange={(e) => setVaccineDescription(e.target.value)}
                value={vaccineDescription}
                style={{
                  flex: 1,
                  borderRadius: "6px",
                  resize: "none",
                }}
                rows={3}
              />
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "16px",
                paddingTop: "8px",
                marginBottom: "16px",
              }}
            >
              <p
                style={{
                  fontFamily: "serif",
                  color: "#7F7F7F",
                  width: "160px",
                  margin: "0",
                  fontSize: "14px",
                  fontWeight: "500",
                }}
              >
                Implementation Date:
              </p>
              <Input
                type="date"
                style={{
                  borderRadius: "20px",
                  flex: 1,
                  height: "40px",
                }}
                onChange={(e) => setVaccineDate(e.target.value)}
                value={vaccineDate}
              />
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "16px",
                paddingTop: "8px",
                marginBottom: "8px",
              }}
            >
              <p
                style={{
                  fontFamily: "serif",
                  color: "#7F7F7F",
                  width: "160px",
                  margin: "0",
                  fontSize: "14px",
                  fontWeight: "500",
                }}
              >
                Target Class:
              </p>
            </div>

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
              <div
                style={{ display: "flex", flexDirection: "column", gap: "8px" }}
              >
                <Radio value="school" style={{ fontSize: "14px" }}>
                  School
                </Radio>
                <Radio value="class" style={{ fontSize: "14px" }}>
                  Classes
                </Radio>
                <Radio value="grade" style={{ fontSize: "14px" }}>
                  Grades
                </Radio>
              </div>
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
                marginTop: "24px",
                border: "1px solid #d9d9d9",
                borderRadius: "6px",
                padding: "16px",
                backgroundColor: "#f9fafb",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  marginBottom: "12px",
                }}
              >
                <input
                  type="checkbox"
                  checked={items.length > 0}
                  onChange={(e) => {
                    if (!e.target.checked) setItems([]);
                  }}
                  style={{ width: "16px", height: "16px" }}
                />
                <span style={{ fontWeight: "600", fontSize: "14px" }}>
                  Nội dung kiểm tra (thuốc):
                </span>
              </div>

              <Button
                size="small"
                onClick={() =>
                  setItems([
                    ...items,
                    {
                      medicineSupplyID: null,
                      medicineID: null,
                      quantityPlanned: 1,
                      notes: "",
                    },
                  ])
                }
                style={{
                  marginBottom: "12px",
                  borderRadius: "4px",
                  height: "32px",
                  color: "#1890ff",
                  fontWeight: "500",
                }}
              >
                [+] Thêm mục kiểm tra
              </Button>

              {items.length > 0 && (
                <div style={{ overflowX: "auto" }}>
                  <table
                    style={{
                      width: "100%",
                      textAlign: "left",
                      border: "1px solid #d9d9d9",
                      borderCollapse: "collapse",
                      fontSize: "14px",
                      backgroundColor: "white",
                      borderRadius: "6px",
                      overflow: "hidden",
                    }}
                  >
                    <thead>
                      <tr style={{ backgroundColor: "#f5f5f5" }}>
                        <th
                          style={{
                            border: "1px solid #d9d9d9",
                            padding: "12px 8px",
                            fontWeight: "600",
                          }}
                        >
                          STT
                        </th>
                        <th
                          style={{
                            border: "1px solid #d9d9d9",
                            padding: "12px 8px",
                            fontWeight: "600",
                          }}
                        >
                          Tên thuốc
                        </th>
                        <th
                          style={{
                            border: "1px solid #d9d9d9",
                            padding: "12px 8px",
                            fontWeight: "600",
                          }}
                        >
                          Số lượng dự kiến
                        </th>
                        <th
                          style={{
                            border: "1px solid #d9d9d9",
                            padding: "12px 8px",
                            fontWeight: "600",
                          }}
                        >
                          Image
                        </th>
                        <th
                          style={{
                            border: "1px solid #d9d9d9",
                            padding: "12px 8px",
                            fontWeight: "600",
                          }}
                        >
                          Ghi chú
                        </th>
                        <th
                          style={{
                            border: "1px solid #d9d9d9",
                            padding: "12px 8px",
                            fontWeight: "600",
                          }}
                        >
                          Xóa
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {items.map((item, index) => (
                        <tr key={index} style={{ backgroundColor: "white" }}>
                          <td
                            style={{
                              border: "1px solid #d9d9d9",
                              padding: "12px 8px",
                              textAlign: "center",
                            }}
                          >
                            {index + 1}
                          </td>
                          <td
                            style={{
                              border: "1px solid #d9d9d9",
                              padding: "8px",
                            }}
                          >
                            <select
                              value={
                                item.medicineID !== null
                                  ? `med-${item.medicineID}`
                                  : item.medicineSupplyID !== null
                                  ? `sup-${item.medicineSupplyID}`
                                  : ""
                              }
                              onChange={(e) => {
                                const [type, id] = e.target.value.split("-");
                                const selectedId = Number.parseInt(id);
                                const updated = [...items];
                                // Reset trước
                                updated[index].medicineID = null;
                                updated[index].medicineSupplyID = null;
                                if (!selectedId) {
                                  setItems(updated);
                                  return;
                                }
                                if (type === "med") {
                                  updated[index].medicineID = selectedId;
                                } else if (type === "sup") {
                                  updated[index].medicineSupplyID = selectedId;
                                }
                                setItems(updated);
                              }}
                              style={{
                                width: "100%",
                                padding: "6px",
                                borderRadius: "4px",
                                border: "1px solid #d9d9d9",
                                fontSize: "14px",
                              }}
                            >
                              <option value="">Chọn</option>
                              <optgroup label="Thuốc">
                                {medicineSupply
                                  .filter((m) => m.type === "medicine")
                                  .map((m) => (
                                    <option
                                      key={`med-${m.id}`}
                                      value={`med-${m.id}`}
                                    >
                                      {m.name}
                                    </option>
                                  ))}
                              </optgroup>
                              <optgroup label="Vật tư">
                                {medicineSupply
                                  .filter((s) => s.type === "supply")
                                  .map((s) => (
                                    <option
                                      key={`sup-${s.id}`}
                                      value={`sup-${s.id}`}
                                    >
                                      {s.name}
                                    </option>
                                  ))}
                              </optgroup>
                            </select>
                          </td>
                          <td
                            style={{
                              border: "1px solid #d9d9d9",
                              padding: "8px",
                            }}
                          >
                            <Input
                              type="number"
                              value={item.quantityPlanned}
                              min={1}
                              onChange={(e) => {
                                const updated = [...items];
                                updated[index].quantityPlanned =
                                  Number.parseInt(e.target.value) || 1;
                                setItems(updated);
                              }}
                              style={{
                                width: "80px",
                                height: "32px",
                                borderRadius: "4px",
                              }}
                            />
                          </td>
                          <td
                            style={{
                              border: "1px solid #d9d9d9",
                              padding: "8px",
                              textAlign: "center",
                            }}
                          >
                            {(() => {
                              const found = item.medicineID
                                ? formattedData?.medicine?.find(
                                    (med) => med.id === item.medicineID
                                  )
                                : formattedData?.supply?.find(
                                    (sup) => sup.id === item.medicineSupplyID
                                  );
                              return found?.image ? (
                                <img
                                  src={found.image || "/placeholder.svg"}
                                  width={48}
                                  height={48}
                                  alt="medicine"
                                  style={{
                                    width: "48px",
                                    height: "48px",
                                    objectFit: "cover",
                                    borderRadius: "6px",
                                    border: "1px solid #e5e7eb",
                                  }}
                                />
                              ) : (
                                <span style={{ color: "#9ca3af" }}>—</span>
                              );
                            })()}
                          </td>
                          <td
                            style={{
                              border: "1px solid #d9d9d9",
                              padding: "8px",
                            }}
                          >
                            <Input
                              placeholder="Ghi chú"
                              value={item.notes || ""}
                              onChange={(e) => {
                                const updated = [...items];
                                updated[index].notes = e.target.value;
                                setItems(updated);
                              }}
                              style={{ height: "32px", borderRadius: "4px" }}
                            />
                          </td>
                          <td
                            style={{
                              border: "1px solid #d9d9d9",
                              padding: "8px",
                              textAlign: "center",
                            }}
                          >
                            <Button
                              size="small"
                              onClick={() => {
                                const updated = [...items];
                                updated.splice(index, 1);
                                setItems(updated);
                              }}
                              style={{
                                border: "1px solid #ef4444",
                                borderRadius: "4px",
                                height: "32px",
                                width: "32px",
                                padding: "0",
                                color: "#ef4444",
                                backgroundColor: "#fef2f2",
                              }}
                            >
                              🗑️
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </Modal>
      {/* modal for update medical checkup */}
      <Modal
        open={isUpdateModalOpen}
        onCancel={() => setIsUpdateModalOpen(false)}
        footer={[<Button onClick={handleUpdateSubmit}>Update</Button>]}
      >
        <div>
          <h2 className="text-xl font-bold mb-4 text-center">
            Update Vaccination Schedule
          </h2>
          <div className="space-y-3">
            <div>
              <p className="font-medium text-[#7F7F7F]">Vaccination Name</p>
              <Input
                value={vaccineName}
                onChange={(e) => setVaccineName(e.target.value)}
              />
            </div>
            <div>
              <p className="font-medium text-[#7F7F7F]">Description</p>
              <Input
                value={vaccineDescription}
                onChange={(e) => setVaccineDescription(e.target.value)}
              />
            </div>
            <div>
              <p className="font-medium text-[#7F7F7F]">Scheduled At</p>
              <Input
                type="date"
                value={vaccineDate}
                onChange={(e) => setVaccineDate(e.target.value)}
              />
            </div>
          </div>
          <div>
            <p className="font-medium text-[#7F7F7F]">Target Type</p>
            <Radio.Group
              value={targetType}
              onChange={(e) => {
                setTargetType(e.target.value);
                setSelectedClasses([]);
                setSelectedGrades([]);
                setSelectAllClasses(false);
              }}
            >
              <Radio value="school">School</Radio>
              <Radio value="class">Classes</Radio>
              <Radio value="grade">Grades</Radio>
            </Radio.Group>
          </div>

          {renderTargetSelection()}
        </div>
      </Modal>
    </>
  );
};

export default VaccineManager;

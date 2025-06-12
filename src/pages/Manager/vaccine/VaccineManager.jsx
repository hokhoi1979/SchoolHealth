import { Button, Checkbox, Input, Modal, Radio } from "antd";
import React, { useEffect, useState } from "react";
import CommonBreadcrumb from "../../../components/CommonBreadcrumb/CommonBreadcrumb";
import logo from "../../../img/logo.jpg";
import { useDispatch, useSelector } from "react-redux";
import { postManagerVaccine } from "../../../redux/manager/createVaccineManagerSlice";
import { fetchManagerMedical } from "../../../redux/manager/managerSlice";
import { fetchVaccineManager } from "../../../redux/manager/getVaccineManagerSlice";
import dayjs from "dayjs";
import { putManagerMedical } from "../../../redux/manager/updateVaccineManagerSlice";
import { fetchClassManager } from "../../../redux/manager/getClassManagerSlice";
import { patchManagerVaccine } from "../../../redux/manager/successVaccineManagerSlice";
import { ModalDetail } from "./ModalDetail";
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

  const { classManager } = useSelector((state) => state.getManagerClass);
  const classList = classManager?.data || [];

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

  const formatData = () => {
    if (
      vaccineDay?.data?.vaccinationEvents &&
      Array.isArray(vaccineDay?.data?.vaccinationEvents)
    ) {
      const format = vaccineDay?.data?.vaccinationEvents.map((item) => {
        return {
          id: item?.id,
          name: item?.name,
          scheduledAt: item?.scheduledAt
            ? dayjs(item.scheduledAt).format("DD/MM/YYYY HH:mm")
            : "Chưa xác định",
          grade: item?.targets?.map((t) => t.className).join(", ") || "N/A",
          participate: item?.studentResponseCount?.studentsAcceptCount,
          total: item?.studentResponseCount?.totalStudent,
          status: item?.status,
        };
      });
      console.log("FORMAT", format);
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
      updatedTargetIds = selectedGrades.flatMap((gr) => gradeIdMap[gr]);
      if (updatedTargetIds.length === 0) {
        alert("Vui lòng chọn ít nhất một khối.");
        return;
      }
    } else if (formattedTargetType === "SCHOOL") {
      updatedTargetIds = classList.map((cls) => cls.id); // tất cả lớp
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
  };

  if (targetType === "class") {
    targetIds = selectedClasses.map((id) => parseInt(id));
  } else if (targetType === "grade") {
    targetIds = selectedGrades.map((id) => parseInt(id));
  }
  // useEffect(() => {
  //   dispatch(fetchVaccineManager());
  // }, []);

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

  const handleCreate = () => {
    const targetTypeFormatted = targetType.toUpperCase();

    const targetIds =
      targetType === "school"
        ? []
        : targetType === "class"
        ? selectedClasses.map((cls) => classIdMap[cls])
        : selectedGrades.flatMap((gr) => gradeIdMap[gr]);

    const payload = {
      name: vaccineName,
      description: vaccineDescription,
      scheduledAt: vaccineDate,
      targetType: targetTypeFormatted,
      targetIds,
    };
    console.log(payload);
    dispatch(postManagerVaccine(payload));
    if (vaccine) {
      setOpen(false);
    }
    console.log("DUC", vaccine);
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

  const availableGrades = ["10", "11", "12"];

  const handleSendNotification = (event) => {
    setNotificationModalOpen(true);
    setSelectedEvent(event);
    setNotificationTitle(`Checkup Notice for ${event.title}`);
    setNotificationContent(
      `Dear Parents,\n\nOur school will organize the ${event.title.toLowerCase()} for students in class ${event.classes.join(
        ", "
      )} on ${
        event.date
      }.\n\nPlease confirm your participation and support us in ensuring the best preparation.\n\nSincerely,`
    );
  };
  const handleCloseNotification = () => {
    setNotificationModalOpen(false);
  };

  const handleViewMore = (event) => {
    setSelectedEvent(event);
    setViewModalOpen(true);
  };
  const handleCloseViewMore = () => {
    setViewModalOpen(false);
    setSelectedEvent(null);
  };

  const showModal = () => {
    setOpen(true);
  };
  const closeModal = () => {
    setOpen(false);
    setTargetType("school");
    setSelectedClasses([]);
    setSelectedGrades([]);
    setSelectAllClasses(false);
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
  const handleSelectAllClasses = (checked) => {
    setSelectAllClasses(checked);
    if (checked) {
      setSelectedClasses(availableClasses);
    } else {
      setSelectedClasses([]);
    }
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
            <div className="flex items-center gap-2 mb-3">
              <Checkbox
                checked={selectAllClasses}
                onChange={(e) => handleSelectAllClasses(e.target.checked)}
              >
                <span className="font-medium">Choose All Class</span>
              </Checkbox>
            </div>
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
    setOpen(true);
  };
  const handleCloseModal = () => {
    setOpen(false);
  };
  const handleUpdateEvent = (event) => {
    setSelectedEvent(event);
    setIsUpdateModalOpen(true);

    setVaccineName(event.name);
    setVaccineDescription(event.description || "");
    setVaccineDate(
      dayjs(event.scheduledAt, "DD/MM/YYYY HH:mm").format("YYYY-MM-DD")
    );
  };

  const handleEndEvent = async (id) => {
    dispatch(patchManagerVaccine(id));
    // await dispatch(fetchVaccineManager());
  };

  return (
    <>
      <h1 className="text-xl font-inria font-medium mb-4 p-6  ">
        <CommonBreadcrumb role={"Manager"} page={"dashboard"} />
      </h1>
      <div className="grid grid-cols-4 gap-5 mt-5 w-[100%] pl-5 pr-5 font-kameron ">
        <div className="h-[120px] bg-white rounded-2xl">
          <p className="flex justify-center mt-5">Total Event</p>
          <p className="flex justify-center text-[50px]">40</p>
        </div>
        <div className="h-[120px] bg-white rounded-2xl">
          <p className="flex justify-center mt-5">Sick student</p>
          <p className="flex justify-center text-[50px]">12</p>
        </div>
        <div className="h-[120px] bg-white rounded-2xl">
          <p className="flex justify-center mt-5">Injure</p>
          <p className="flex justify-center text-[50px]">7</p>
        </div>
        <div className="h-[120px] bg-white rounded-2xl">
          <p className="flex justify-center mt-5">
            Students needing special attention
          </p>
          <p className="flex justify-center text-[50px]">12</p>
        </div>
      </div>

      {/* ..... */}
      <div className="pl-5 mt-5 flex gap-5">
        <Input
          style={{ borderRadius: "7px", width: "300px" }}
          placeholder="Search for ID, Name student..."
        />
        <Button className="!bg-[#90A8B0] !hover:bg-gray-600" type="secondary">
          <p className="text-white font-kameron"> Search</p>
        </Button>
        <div className="">
          <Button className="ml-[600px]" onClick={handleShowModal}>
            Create a new medical event
          </Button>
        </div>
      </div>

      <div className="mt-10">
        <div className="grid grid-cols-3 mt-5 pl-5 gap-5.5">
          {data.map((item) => (
            <div className="bg-white p-6 rounded-2xl">
              <div className="flex justify-between">
                {item.status === "Scheduled" ? (
                  <>
                    {" "}
                    <Button className="!bg-[#6CC76F] !text-white">
                      {item.status}
                    </Button>
                  </>
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
                  onClick={() => setOpenDetail(true)}
                >
                  <path
                    fill="gray"
                    d="M12 9a3 3 0 0 0-3 3a3 3 0 0 0 3 3a3 3 0 0 0 3-3a3 3 0 0 0-3-3m0 8a5 5 0 0 1-5-5a5 5 0 0 1 5-5a5 5 0 0 1 5 5a5 5 0 0 1-5 5m0-12.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5"
                  ></path>
                </svg>
              </div>

              {openDetail && (
                <>
                  <ModalDetail
                    open={openDetail}
                    canncel={() => setOpenDetail(false)}
                  />
                </>
              )}

              <h1 className="mt-2 text-2xl">{item.name}</h1>
              <p className="text-gray-500">{item.grade}</p>

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
                <div className="flex justify-between mb-1 text-sm text-gray-600">
                  <span>Conform Paritcipate</span>
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
                          ? ((item.participate / item.total) * 100).toFixed(0)
                          : 0
                      }%`,
                    }}
                  ></div>
                </div>

                <div className="text-right text-sm text-gray-500 mt-1">
                  {item.total && item.total > 0
                    ? `${((item.participate / item.total) * 100).toFixed(0)}%`
                    : "0%"}
                </div>
              </div>
              <div className="flex gap-2.5">
                <div>
                  <Button onClick={() => handleUpdateEvent(item)}>
                    Update Schedule
                  </Button>
                </div>
                <div>
                  <Button
                    onClick={() => {
                      handleEndEvent(item?.id);
                      console.log("IDDDD", item?.id);
                    }}
                  >
                    End Event
                  </Button>
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
        footer={[<Button onClick={handleCreate}>Create</Button>]}
      >
        <div>
          <div>
            <div className="flex justify items-center gap-4 mb-[10px] pt-2">
              <div>
                {" "}
                <img src={logo} alt="Logo" width={100} />
                <p className="font-bold text-xl ml-[10px]">Health Care</p>
              </div>
              <div>
                <h1 className="font-bold text-2xl ml-[10px]">
                  New Vaccination
                </h1>
              </div>
            </div>
            <div className="flex justify items-center gap-4">
              <div>
                <p className="font-serif text-[#7F7F7F] ">Vaccination Name:</p>
              </div>
              <div>
                <Input
                  onChange={(e) => setVaccineName(e.target.value)}
                  value={vaccineName}
                ></Input>
              </div>
            </div>

            <div className="flex items-start gap-2 pt-2 ">
              <p className="font-serif text-[#7F7F7F] w-30 ml-1 ">
                Vaccination Description:{" "}
              </p>
              <div>
                <Input
                  onChange={(e) => setVaccineDescription(e.target.value)}
                  value={vaccineDescription}
                ></Input>
              </div>
            </div>
            <div className="flex items-center gap-4 pt-2">
              <p className="font-serif text-[#7F7F7F] w-40">
                Implementation Date:
              </p>
              <Input
                type="date"
                className="rounded-full"
                onChange={(e) => setVaccineDate(e.target.value)}
                value={vaccineDate}
              />
            </div>

            <div className="flex items-center gap-4 pt-2">
              <p className="font-serif text-[#7F7F7F] w-40">Target Class:</p>
            </div>

            <Radio.Group
              value={targetType}
              onChange={(e) => {
                setTargetType(e.target.value);
                setSelectedClasses([]);
                setSelectedGrades([]);
                setSelectAllClasses(false);
              }}
              className="mb-4"
            >
              <div className="flex flex-col gap-2">
                <Radio value="school">School</Radio>
                <Radio value="class">Classes</Radio>
                <Radio value="grade">Grades</Radio>
              </div>
            </Radio.Group>

            {renderTargetSelection()}
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
          <h2 className="text-xl font-bold mb-4">
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

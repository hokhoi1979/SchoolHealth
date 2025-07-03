import React, { useEffect, useState } from "react";
import { Modal } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { fetchManagerMedicalEvent } from "../../../redux/manager/ManagerMedicalEvent/managerMedicalEventSlice";
import { fetchManagerMedicalEventDetail } from "../../../redux/manager/ManagerMedicalEvent/managerMedicalEventDetailSlice";
import CommonBreadcrumb from "../../../components/CommonBreadcrumb/CommonBreadcrumb";
import { AppFooter } from "../../../components/Footer/AppFooter";
import dayjs from "dayjs";

const MedicalEventList = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState([]);
  const [treatMent, setTreatMent] = useState([]);
  const {
    managerMedicalEvent = [],
    loading,
    error,
  } = useSelector((state) => state.getManagerMedicalEvent);

  const dispatch = useDispatch();
  const [data, setData] = useState([]);

  useEffect(() => {
    const list = managerMedicalEvent?.data?.list || [];
    const formatted = list.map((item) => ({
      id: item.id,
      studentID: item.studentID,
      type: item.type,
      occurredAt: item.occurredAt,
      status: item.status,
      severity: item.severity,
      raw: item,
    }));
    console.log(formatted);
    setData(formatted);
  }, [managerMedicalEvent]);

  useEffect(() => {
    dispatch(fetchManagerMedicalEvent());
  }, [dispatch]);

  const detail = useSelector((state) => state.getManagerMedicalEventDetail);

  const handleViewDetail = (item) => {
    console.log(item?.id);
    dispatch(fetchManagerMedicalEventDetail(item.id));
    setSelectedItem(item.raw);
    setShowModal(true);
  };

  const formatData = () => {
    const treatmentList =
      detail?.detail?.data?.medicalEventEntity?.Treatment || [];
    const data = treatmentList.map((item) => ({
      image: item?.medicine?.image || item?.medicineSupply?.image || "Unknown",
      name: item?.medicine?.name || item?.medicineSupply?.name || "Unknown",
      quantity: item?.quantity,
      dosage: item?.dosage || "N/A",
    }));

    setTreatMent(data);
  };

  useEffect(() => {
    formatData();
  }, [detail]);

  useEffect(() => {
    if (selectedItem) {
      console.log("Updated selectedItem", selectedItem);
    }
  }, [selectedItem]);
  return (
    <>
      <h1 className="text-xl font-inria font-medium mb-4 p-10">
        <CommonBreadcrumb role={"Manager"} page={"Event"} />
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6 font-kameron">
        {data.map((item) => (
          <div
            key={item.id}
            className="relative bg-white  bg-gradient-to-br from-[#e0f7fa] via-white to-[#fce4ec]  border border-gray-200    shadow-md rounded-2xl p-5 h-full min-h-[370px] max-w-[420px] hover:shadow-lg transition"
          >
            {/* Tiêu đề */}
            <h2 className="text-2xl font-bold mb-4 text-black text-center">
              Medical Event
            </h2>

            {/* Nội dung chi tiết */}
            <div className="mb-3 flex gap-2 text-[17px]">
              <p className="font-semibold">ID:</p>
              <p>{item.id}</p>
            </div>
            <div className="mb-3 flex gap-2 text-[17px]">
              <p className="font-semibold">Type:</p>
              <p>{item.type}</p>
            </div>
            <div className="mb-3 flex gap-2 text-[17px]">
              <p className="font-semibold">Occurred At:</p>
              <p>{dayjs(item.occurredAt).format("DD/MM/YYYY HH:mm:ss")}</p>
            </div>
            <div className="mb-3 text-[17px]">
              <p className="font-semibold">Status:</p>
              <p
                className={`  font-bold ${
                  item.status === "PENDING"
                    ? "text-blue-400"
                    : item.status === "PROCESSING"
                    ? "text-yellow-500"
                    : "text-green-400"
                }`}
              >
                {item.status}
              </p>
            </div>
            <div className="mb-3 text-[17px]">
              <p className="font-semibold">Severity:</p>
              <p
                className={`${
                  item.severity === "HOSPITAL" ? "text-red-500" : "text-black"
                }`}
              >
                {item.severity}
              </p>
            </div>

            {/* Nút icon xem chi tiết */}
            <button
              className="absolute top-4 right-4 text-gray-600 hover:text-blue-600"
              onClick={() => handleViewDetail(item)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="26"
                height="26"
                viewBox="0 0 24 24"
              >
                <g
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                >
                  <path d="M21.544 11.045c.304.426.456.64.456.955 0 .316-.152.529-.456.955C20.178 14.871 16.689 19 12 19c-4.69 0-8.178-4.13-9.544-6.045C2.152 12.529 2 12.315 2 12c0-.316.152-.529.456-.955C3.822 9.129 7.311 5 12 5c4.69 0 8.178 4.13 9.544 6.045" />
                  <path d="M15 12a3 3 0 1 0-6 0 3 3 0 0 0 6 0" />
                </g>
              </svg>
            </button>
          </div>
        ))}
      </div>

      <div className="w-full h-30 mt-13"></div>
      <AppFooter />
      {/* Modal Detail */}
      <Modal
        open={showModal}
        onCancel={() => setShowModal(false)}
        footer={null}
        width={900}
        centered
        title={
          <div className="flex justify-center items-center">
            <span className="text-2xl font-bold text-black-600 flex items-center gap-x-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path
                  fill="#e11717"
                  d="m12.1 18.55l-.1.1l-.11-.1C7.14 14.24 4 11.39 4 8.5C4 6.5 5.5 5 7.5 5c1.54 0 3.04 1 3.57 2.36h1.86C13.46 6 14.96 5 16.5 5c2 0 3.5 1.5 3.5 3.5c0 2.89-3.14 5.74-7.9 10.05M16.5 3c-1.74 0-3.41.81-4.5 2.08C10.91 3.81 9.24 3 7.5 3C4.42 3 2 5.41 2 8.5c0 3.77 3.4 6.86 8.55 11.53L12 21.35l1.45-1.32C18.6 15.36 22 12.27 22 8.5C22 5.41 19.58 3 16.5 3"
                />
              </svg>
              Medical Event Details
            </span>
          </div>
        }
      >
        {selectedItem ? (
          <div className="space-y-6 text-[16px] font-kameron">
            {/* Medical Event Info */}
            <div className="rounded-xl border p-4 bg-orange-50 shadow">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="font-bold text-lg text-gray-800">
                    📉 Event #{selectedItem.id}
                  </h2>
                  <p>
                    <span className="font-semibold">Type:</span>{" "}
                    {selectedItem.type}
                  </p>
                  <p>
                    <span className="font-semibold">Description:</span>{" "}
                    {selectedItem.description}
                  </p>
                  <p>
                    <span className="font-semibold">Occurred:</span>{" "}
                    {dayjs(selectedItem.occurredAt).format("HH:mm DD/MM/YYYY")}
                  </p>
                </div>
                <div className="text-right space-y-1">
                  <span
                    className={`inline-block px-3 py-1 bg-white rounded-full ${
                      selectedItem.severity === "HOSPITAL"
                        ? "text-red-500"
                        : "text-black"
                    }`}
                  >
                    {selectedItem.severity || "NORMAL"}
                  </span>
                  <p>
                    <span className="font-semibold">Status:</span>{" "}
                    {selectedItem.status}
                  </p>
                  <p>
                    <span className="font-semibold">Updated:</span>{" "}
                    {dayjs(selectedItem.updatedAt || new Date()).format(
                      "HH:mm DD/MM/YYYY"
                    )}
                  </p>
                </div>
              </div>
            </div>

            {/* Student Info */}
            <div className="rounded-xl border p-4 bg-green-50 shadow">
              <h2 className="text-xl font-bold text-green-800 mb-2">
                🎓 {selectedItem.studentInfo?.account?.fullname}
              </h2>
              <div className="grid grid-cols-2 gap-4 text-gray-800">
                <p>
                  <strong>Student Code:</strong>{" "}
                  {selectedItem.studentInfo?.student_code}
                </p>
                <p>
                  <strong>Grade:</strong>{" "}
                  {selectedItem.studentInfo?.lastAcamedicYear?.class?.name}
                </p>
                <p>
                  <strong>Gender:</strong> {selectedItem.studentInfo?.gender}
                </p>
                <p>
                  <strong>Date of Birth:</strong>{" "}
                  {dayjs(selectedItem.studentInfo?.dateOfBirth).format(
                    "DD/MM/YYYY"
                  )}
                </p>
                <p>
                  <strong>Parent/Guardian Contact:</strong>{" "}
                  {selectedItem.studentInfo?.ParentInfo?.fullname}
                </p>
                <p>
                  <strong>Phone:</strong>{" "}
                  {selectedItem.studentInfo?.ParentInfo?.phone}
                </p>
              </div>
            </div>

            {/* Treatment Info */}
            <div className="rounded-xl border p-4 bg-purple-50 shadow">
              <h2 className="text-xl font-bold text-purple-800 mb-4">
                💊 Treatment Detail
              </h2>

              {treatMent.length > 0 ? (
                <div className="space-y-2">
                  {/* Header row */}
                  <div className="grid grid-cols-4 bg-purple-100 px-4 py-2 rounded-md font-semibold text-gray-700">
                    <div className="col-span-1">Image</div>
                    <div className="col-span-1">Medicine Name</div>
                    <div className="col-span-1">Quantity</div>
                    <div className="col-span-1">Dosage</div>
                  </div>

                  {/* Data rows */}
                  {treatMent.map((item, idx) => (
                    <div
                      key={idx}
                      className="grid grid-cols-4 items-center bg-purple-50 hover:bg-purple-100 px-4 py-3 rounded-lg shadow-sm transition"
                    >
                      <div className="col-span-1">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-12 h-12 object-cover rounded-md"
                        />
                      </div>
                      <div className="col-span-1 font-medium">{item.name}</div>
                      <div className="col-span-1">{item.quantity}</div>
                      <div className="col-span-1">{item.dosage}</div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 italic">
                  No treatment detail provided.
                </p>
              )}
            </div>
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500 text-lg">No detail data available</p>
          </div>
        )}
      </Modal>
    </>
  );
};

export default MedicalEventList;

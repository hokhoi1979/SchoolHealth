import React, { useEffect, useState } from "react";
import { Modal } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { fetchManagerMedicalEvent } from "../../../redux/manager/ManagerMedicalEvent/managerMedicalEventSlice";
import { fetchManagerMedicalEventDetail } from "../../../redux/manager/ManagerMedicalEvent/managerMedicalEventDetailSlice";
import CommonBreadcrumb from "../../../components/CommonBreadcrumb/CommonBreadcrumb";

const MedicalEventList = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
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

  const handleViewDetail = (item) => {
    console.log(item?.id);
    dispatch(fetchManagerMedicalEventDetail(item.id));
    setSelectedItem(item.raw);
    setShowModal(true);
  };
  const detail = useSelector((state) => state.getManagerMedicalEventDetail);

  return (
    <>
      <h1 className="text-xl font-inria font-medium mb-4 p-10">
        <CommonBreadcrumb role={"Manager"} page={"Event"} />
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6 font-kameron">
        {data.map((item) => (
          <div
            key={item.id}
            className="relative bg-white shadow-md rounded-2xl p-5 hover:shadow-lg transition"
          >
            <h2 className="text-xl font-bold mb-3 text-blue-700">
              Medical Event
            </h2>

            <div className="mb-2 flex gap-2">
              <p className="font-semibold">ID:</p>
              <p>{item.id}</p>
            </div>
            <div className="mb-2  flex gap-2">
              <p className="font-semibold">Type:</p>
              <p>{item.type}</p>
            </div>
            <div className="mb-2  flex gap-2">
              <p className="font-semibold">Occurred At:</p>
              <p>{new Date(item.occurredAt).toLocaleString()}</p>
            </div>
            <div className="mb-2">
              <p className="font-semibold">Status:</p>
              <p className="font-bold text-yellow-600">{item.status}</p>
            </div>
            <div className="mb-4">
              <p className="font-semibold">Severity:</p>
              <p>{item.severity}</p>
            </div>

            {/* Eye icon */}
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

      {/* Modal Detail */}
      <Modal
        title={
          <div className="text-center">
            <span className="text-xl font-semibold text-gray-800">
              Chi tiết học sinh & y tế
            </span>
          </div>
        }
        open={showModal}
        onCancel={() => setShowModal(false)}
        footer={null}
        width={800}
        centered
      >
        {selectedItem ? (
          <div className="space-y-6 font-kameron grid grid-cols-2 gap-8">
            {/* Medical Event Info */}
            <div className="space-y-4">
              <div className="border-l-4 border-blue-500 pl-4">
                <h2 className="text-lg font-bold text-blue-700 mb-3">
                  Sự kiện y tế
                </h2>
                <div className="space-y-2">
                  <p className="text-gray-700">
                    <span className="font-medium">ID:</span>{" "}
                    {selectedItem.medicalEventEntity?.id}
                  </p>
                  <p className="text-gray-700">
                    <span className="font-medium">Loại:</span>{" "}
                    {selectedItem.medicalEventEntity?.type}
                  </p>
                  <p className="text-gray-700">
                    <span className="font-medium">Thời gian:</span>{" "}
                    {new Date(
                      selectedItem.medicalEventEntity?.occurredAt
                    ).toLocaleString()}
                  </p>
                  <p className="text-gray-700">
                    <span className="font-medium">Trạng thái:</span>{" "}
                    {selectedItem.medicalEventEntity?.status}
                  </p>
                  <p className="text-gray-700">
                    <span className="font-medium">Mức độ:</span>{" "}
                    {selectedItem.medicalEventEntity?.severity}
                  </p>
                  <p className="text-gray-700">
                    <span className="font-medium">Mô tả:</span>{" "}
                    {selectedItem.medicalEventEntity?.description}
                  </p>
                </div>
              </div>

              {/* Nurse Info */}
              <div className="border-l-4 border-pink-500 pl-4">
                <h2 className="text-lg font-bold text-pink-700 mb-3">Y tá</h2>
                <p className="text-gray-700">
                  <span className="font-medium">Họ tên:</span>{" "}
                  {selectedItem.nurseInfo?.fullname}
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {/* Student Info */}
              <div className="border-l-4 border-green-500 pl-4">
                <h2 className="text-lg font-bold text-green-700 mb-3">
                  Học sinh
                </h2>
                <div className="space-y-2">
                  <p className="text-gray-700">
                    <span className="font-medium">Mã HS:</span>{" "}
                    {selectedItem.studentInfo?.student_code}
                  </p>
                  <p className="text-gray-700">
                    <span className="font-medium">Họ tên:</span>{" "}
                    {selectedItem.studentInfo?.account?.fullname}
                  </p>
                  <p className="text-gray-700">
                    <span className="font-medium">Ngày sinh:</span>{" "}
                    {new Date(
                      selectedItem.studentInfo?.dateOfBirth
                    ).toLocaleDateString()}
                  </p>
                  <p className="text-gray-700">
                    <span className="font-medium">Giới tính:</span>{" "}
                    {selectedItem.studentInfo?.gender}
                  </p>
                  <p className="text-gray-700">
                    <span className="font-medium">Lớp:</span>{" "}
                    {selectedItem.studentInfo?.lastAcamedicYear?.class?.name}
                  </p>
                  <p className="text-gray-700">
                    <span className="font-medium">Năm học:</span>{" "}
                    {
                      selectedItem.studentInfo?.lastAcamedicYear?.academicYear
                        ?.name
                    }
                  </p>
                </div>
              </div>

              {/* Parent Info */}
              <div className="border-l-4 border-purple-500 pl-4">
                <h2 className="text-lg font-bold text-purple-700 mb-3">
                  Phụ huynh
                </h2>
                <div className="space-y-2">
                  <p className="text-gray-700">
                    <span className="font-medium">Họ tên:</span>{" "}
                    {selectedItem.studentInfo?.ParentInfo?.fullname}
                  </p>
                  <p className="text-gray-700">
                    <span className="font-medium">Email:</span>{" "}
                    {selectedItem.studentInfo?.ParentInfo?.email}
                  </p>
                  <p className="text-gray-700">
                    <span className="font-medium">Phone:</span>{" "}
                    {selectedItem.studentInfo?.ParentInfo?.phone}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500 text-lg">Không có dữ liệu chi tiết</p>
          </div>
        )}
      </Modal>
    </>
  );
};

export default MedicalEventList;

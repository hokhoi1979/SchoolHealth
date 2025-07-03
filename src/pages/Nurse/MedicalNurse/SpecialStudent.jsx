import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { studentMeeting } from "../../../redux/checkupNurse/listStudentMeeting/listStudentMeetingSlice";
import { Alert, Button, Input, Modal, Space, Table, Tag, Tooltip } from "antd";
import TextArea from "antd/es/input/TextArea";
import { checkTime } from "../../../redux/checkupNurse/checkTime/checkTimeSlice";
import { createMeeting } from "../../../redux/checkupNurse/createMeeting/createMeetingSlice";
import { fetchMeeted } from "../../../redux/checkupNurse/meeted/meetedSlice";
import { deleteMeeting } from "../../../redux/checkupNurse/deleteMeeting/deleteMeetingSlice";
import { deleteStudent } from "../../../redux/checkupNurse/deleteStudent/deleteStudentSlice";

function SpecialStudent() {
  const [data, setData] = useState([]);
  const [dataMeeted, setDataMeeted] = useState([]);

  const dispatch = useDispatch();
  const [select, setSelect] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reason, setReason] = useState("");
  const [schedule, setSchedule] = useState("");

  const { meeting = [] } = useSelector((state) => state.studentMeeting);
  const { meetedParent = [] } = useSelector((state) => state.meeted);

  const fetchData = () => {
    dispatch(studentMeeting());
  };

  const fetchDataMeeted = () => {
    dispatch(fetchMeeted());
  };

  useEffect(() => {
    fetchData();
    fetchDataMeeted();
  }, [dispatch]);

  const handleSubmitConcern = () => {
    const payload = {
      healthCheckUpID: select.healthCheckUpID,
      studentID: select.studentID,
      scheduledAt: new Date(schedule).toISOString().split(".")[0],
      reason,
    };

    console.log("POST payload", payload);
    dispatch(createMeeting(payload));
    setReason("");
    setSchedule("");
    setSelect(null);
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (meeting?.data) {
      const formatted = meeting.data.map((item, index) => ({
        key: index,
        id: item?.id,
        healthCheckUpID: item?.healthCheckUpID,
        studentID: item.studentID,
        studentCode: item.formatStudentInfo.student_code,
        fullName: item.formatStudentInfo.fullname,
        className: item.formatStudentInfo.class,
        parentName: item.formatStudentInfo.parentName,
        parentPhone: item.formatStudentInfo.parentPhone,
        checkupTitle: item.healthCheckup.title,
        scheduledAt: item.healthCheckup.scheduledAt,
      }));
      setData(formatted);
    }
  }, [meeting]);

  useEffect(() => {
    if (meetedParent?.data) {
      const formattedMeetings = meetedParent.data.map((item, index) => ({
        key: `m-${index}`,
        id: item.id,
        healthCheckUpID: item.healthCheckUpID,
        studentID: item.studentID,
        scheduledAt: item.scheduledAt,
        reason: item.reason || "(Không có lý do)",
        status: item.status,
        createdAt: item.createdAt,
      }));
      setDataMeeted(formattedMeetings);
    }
  }, [meetedParent]);

  useEffect(() => {
    if (schedule && select?.healthCheckUpID) {
      dispatch(
        checkTime({
          scheduledAt: schedule,
          healthCheckUpID: select.healthCheckUpID,
        })
      );
    }
  }, [schedule]);

  const handleDeleteMeeting = (values) => {
    const isConfirmed = window.confirm("Do you want to delete?");
    if (isConfirmed) {
      dispatch(deleteMeeting(values?.id));
    }
  };

  const handleDeleteStudent = (values) => {
    const isConfirmed = window.confirm("Do you want to delete?");
    if (isConfirmed) {
      dispatch(deleteStudent(values?.id));
      fetchData();
    }
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    // {
    //   title: "healthCheckUpID",
    //   dataIndex: "healthCheckUpID",
    //   key: "healthCheckUpID",
    // },
    {
      title: "StudentCode",
      dataIndex: "studentCode",
      key: "studentCode",
    },
    {
      title: "Full Name",
      dataIndex: "fullName",
      key: "fullName",
    },
    {
      title: "Class",
      dataIndex: "className",
      key: "className",
    },
    {
      title: "Parent",
      dataIndex: "parentName",
      key: "parentName",
    },
    {
      title: "Phone",
      dataIndex: "parentPhone",
      key: "parentPhone",
    },
    {
      title: "Name of checkup",
      dataIndex: "checkupTitle",
      key: "checkupTitle",
    },
    {
      title: "Date",
      dataIndex: "scheduledAt",
      key: "scheduledAt",
      render: (text) => new Date(text).toLocaleString("vi-VN"),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space>
          <Tooltip title="View">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={20}
              height={20}
              viewBox="0 0 24 24"
              style={{ cursor: "pointer" }}
              onClick={() => {
                setSelect(record);
                setIsModalOpen(true);
                setSchedule(
                  record.scheduledAt
                    ? new Date(record.scheduledAt).toISOString().slice(0, 16)
                    : ""
                );

                setReason("");
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
              width="24"
              height="24"
              viewBox="0 0 24 24"
              style={{ cursor: "pointer" }}
              onClick={() => {
                console.log(record);

                handleDeleteStudent(record);
              }}
            >
              <path
                fill="#555656"
                d="M16 9v10H8V9zm-1.5-6h-5l-1 1H5v2h14V4h-3.5zM18 7H6v12c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2z"
              />
            </svg>
          </Tooltip>
        </Space>
      ),
    },
  ];

  const meetingColumns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    // {
    //   title: "Checkup ID",
    //   dataIndex: "healthCheckUpID",
    //   key: "healthCheckUpID",
    // },
    {
      title: "Student ID",
      dataIndex: "studentID",
      key: "studentID",
    },
    {
      title: "Scheduled At",
      dataIndex: "scheduledAt",
      key: "scheduledAt",
      render: (text) => new Date(text).toLocaleString("vi-VN"),
    },
    {
      title: "Reason",
      dataIndex: "reason",
      key: "reason",
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text) => new Date(text).toLocaleString("vi-VN"),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        const color =
          status === "PENDING"
            ? "orange"
            : status === "CONFIRMED_RECEIVED"
            ? "green"
            : status === "CONFIRMED_NOT_RECEIVED"
            ? "red"
            : "blue";
        return <Tag color={color}>{status}</Tag>;
      },
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space>
          <Tooltip title="Delete">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              style={{ cursor: "pointer" }}
              onClick={() => {
                handleDeleteMeeting(record);
              }}
            >
              <path
                fill="#555656"
                d="M16 9v10H8V9zm-1.5-6h-5l-1 1H5v2h14V4h-3.5zM18 7H6v12c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2z"
              />
            </svg>
          </Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <div className="w-full">
      <h1 className="font-serif text-2xl">Student Special</h1>
      <Table
        className="mt-5 w-full"
        columns={columns}
        dataSource={data}
        pagination={{ pageSize: 5 }}
      />

      <h1 className="font-serif text-2xl mt-5">Appointment scheduled</h1>

      <Table
        className="mt-5 w-full"
        columns={meetingColumns}
        dataSource={dataMeeted}
        pagination={{ pageSize: 5 }}
      />
      <Modal
        open={isModalOpen}
        footer={null}
        onCancel={() => setIsModalOpen(false)}
        className="!rounded-xl"
      >
        <div className="bg-gradient-to-r from-purple-500 to-indigo-500 p-6 text-white text-center rounded-2xl">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="60"
            height="60"
            viewBox="0 0 128 128"
            style={{ margin: "auto" }}
          >
            <path
              fill="#f2a600"
              d="m57.16 8.42l-52 104c-1.94 4.02-.26 8.85 3.75 10.79c1.08.52 2.25.8 3.45.81h104c4.46-.04 8.05-3.69 8.01-8.15a8.1 8.1 0 0 0-.81-3.45l-52-104a8.067 8.067 0 0 0-14.4 0"
            />
            <path
              fill="#ffcc32"
              d="m53.56 15.72l-48.8 97.4c-1.83 3.77-.25 8.31 3.52 10.14c.99.48 2.08.74 3.18.76h97.5a7.55 7.55 0 0 0 7.48-7.62a7.6 7.6 0 0 0-.78-3.28l-48.7-97.4a7.443 7.443 0 0 0-9.93-3.47a7.5 7.5 0 0 0-3.47 3.47"
            />
            <path
              fill="#424242"
              d="M64.36 34.02c4.6 0 8.3 3.7 8 8l-3.4 48c-.38 2.54-2.74 4.3-5.28 3.92a4.65 4.65 0 0 1-3.92-3.92l-3.4-48c-.3-4.3 3.4-8 8-8m0 64c3.31 0 6 2.69 6 6s-2.69 6-6 6s-6-2.69-6-6s2.69-6 6-6"
              opacity="0.2"
            />
            <linearGradient
              id="notoWarning0"
              x1="68"
              x2="68"
              y1="-1808.36"
              y2="-1887.05"
              gradientTransform="matrix(1 0 0 -1 -3.64 -1776.09)"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0" stop-color="#424242" />
              <stop offset="1" stop-color="#212121" />
            </linearGradient>
            <path
              fill="url(#notoWarning0)"
              d="M64.36 34.02c4.6 0 8.3 3.7 8 8l-3.4 48c-.38 2.54-2.74 4.3-5.28 3.92a4.65 4.65 0 0 1-3.92-3.92l-3.4-48c-.3-4.3 3.4-8 8-8"
            />
            <linearGradient
              id="notoWarning1"
              x1="64.36"
              x2="64.36"
              y1="-1808.36"
              y2="-1887.05"
              gradientTransform="matrix(1 0 0 -1 0 -1772.11)"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0" stop-color="#424242" />
              <stop offset="1" stop-color="#212121" />
            </linearGradient>
            <circle cx="64.36" cy="104.02" r="6" fill="url(#notoWarning1)" />
            <path
              fill="#fff170"
              d="M53.56 23.02c-1.2 1.5-21.4 41-21.4 41s-1.8 3 .7 4.7c2.3 1.6 4.4-.3 5.3-1.8s19.2-36.9 19.9-38.6c.6-1.87.18-3.91-1.1-5.4c-1.3-1.2-2.6-1-3.4.1"
            />
            <circle cx="31.36" cy="75.33" r="3.3" fill="#fff170" />
          </svg>

          <h2 className="text-2xl font-bold">Special Health Concern</h2>
          <p className="text-sm">Submit concern about student health</p>
        </div>

        <div className="bg-white p-4 rounded-b-xl">
          <div className="border-l-4 border-[#1bd0d8]  rounded-xl p-5 shadow mb-5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              viewBox="0 0 256 256"
            >
              <path
                fill="#434343"
                d="m226.53 56.41l-96-32a8 8 0 0 0-5.06 0l-96 32A8 8 0 0 0 24 64v80a8 8 0 0 0 16 0V75.1l33.59 11.19a64 64 0 0 0 20.65 88.05c-18 7.06-33.56 19.83-44.94 37.29a8 8 0 1 0 13.4 8.74C77.77 197.25 101.57 184 128 184s50.23 13.25 65.3 36.37a8 8 0 0 0 13.4-8.74c-11.38-17.46-27-30.23-44.94-37.29a64 64 0 0 0 20.65-88l44.12-14.7a8 8 0 0 0 0-15.18ZM176 120a48 48 0 1 1-86.65-28.45l36.12 12a8 8 0 0 0 5.06 0l36.12-12A47.9 47.9 0 0 1 176 120m-48-32.43L57.3 64L128 40.43L198.7 64Z"
              />
            </svg>

            <div>
              <h3 className="font-semibold text-lg">{select?.studentName}</h3>
              <p className="text-sm text-gray-600">
                <strong>{select?.fullName}</strong> - Code:{" "}
                <strong>{select?.studentCode}</strong> - Class:{" "}
                <b>{select?.className}</b>
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-3">
            <div className="bg-blue-50 p-3 rounded-xl">
              <h3 className="font-semibold mb-1">Parent Info</h3>
              <p>Name: {select?.parentName}</p>
              <p>Phone: {select?.parentPhone}</p>
            </div>
            <div className="bg-orange-50 p-3 rounded-xl">
              <h3 className="font-semibold mb-1">Checkup Info</h3>
              <p>Title: {select?.checkupTitle}</p>
              <p>
                Date:{" "}
                {new Date(select?.scheduledAt).toLocaleDateString("vi-VN")}
              </p>
            </div>
          </div>

          <div className="mb-3">
            <label className="font-semibold block mb-1">Schedule</label>
            <Input
              type="datetime-local"
              value={schedule}
              onChange={(e) => setSchedule(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label className="font-semibold block mb-1">Reason</label>
            <TextArea
              rows={3}
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Lý do đánh dấu học sinh bất thường"
            />
          </div>

          <div className="flex justify-end mt-4 gap-3">
            <Button
              onClick={() => setIsModalOpen(false)}
              className="!bg-gray-400 !text-white hover:!bg-gray-500"
            >
              Cancel
            </Button>
            <Button
              className="!bg-purple-500 !text-white hover:!bg-purple-600"
              onClick={handleSubmitConcern}
            >
              Submit
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default SpecialStudent;

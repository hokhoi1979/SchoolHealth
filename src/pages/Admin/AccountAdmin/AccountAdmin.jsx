import React, { useEffect, useState } from "react";
import { Button, message, Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import CommonBreadcrumb from "../../../components/CommonBreadcrumb/CommonBreadcrumb";
import moment from "moment";
import { fetchStudentAdmin } from "../../../redux/ADMIN/GetAllStudent/getAllStudentSlice";
import CreateStudentModal from "./CreateStudentModal";
import { createStudentAdmin } from "../../../redux/ADMIN/GetAllStudent/CreateInformationStudentAdmin/createInformationStudentAdminSlice";
import { fetchClassManager } from "../../../redux/manager/getClassManagerSlice";

function AccountAdmin() {
  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = useState(false);
  useEffect(() => {
    dispatch(fetchClassManager());
  }, []);

  const { classManager } = useSelector((state) => state.getManagerClass);
  const classList = classManager?.data || [];

  const handleCreateStudent = (studentData) => {
    console.log("Created student data:", studentData);

    dispatch(createStudentAdmin(studentData));

    message.success("Student created successfully!");
    setModalVisible(false);
  };
  useEffect(() => {
    console.log("Class list:", classList);
  }, [classList]);

  useEffect(() => {
    dispatch(fetchClassManager());
    dispatch(fetchStudentAdmin());
  }, [dispatch]);

  const { studentAdminList, loading, error } = useSelector(
    (state) => state.getAllStudentAdmin
  );

  const data = Array.isArray(studentAdminList?.result)
    ? studentAdminList.result
    : [];
  const handleOpenModal = () => {
    setModalVisible(true);
  };

  const columns = [
    {
      title: "Student Code",
      dataIndex: "student_code",
      key: "student_code",
    },
    {
      title: "Full Name",
      dataIndex: ["account", "fullname"],
      key: "student_name",
    },
    {
      title: "Student Email",
      dataIndex: ["account", "email"],
      key: "student_email",
    },
    {
      title: "Date of Birth",
      dataIndex: "dateOfBirth",
      key: "dateOfBirth",
      render: (date) => moment(date).format("DD/MM/YYYY"),
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
    },
    {
      title: "Class - Grade",
      key: "classInfo",
      render: (_, record) =>
        `${record.lastAcamedicYear?.class?.name || "?"} - Grade ${
          record.lastAcamedicYear?.class?.grade || "?"
        }`,
    },
    {
      title: "Academic Year",
      dataIndex: ["lastAcamedicYear", "academicYear", "name"],
      key: "academic_year",
    },
    {
      title: "Parent Information",
      key: "parent",
      render: (_, record) => (
        <div>
          <div>
            <strong>{record.ParentInfo?.fullname}</strong>
          </div>
          <div>{record.ParentInfo?.email}</div>
          <div>{record.ParentInfo?.phone}</div>
        </div>
      ),
    },
  ];

  return (
    <div className="p-5">
      <CommonBreadcrumb role="Admin" page="account" />

      <h2 className="text-xl font-semibold my-4">
        List of Students (Not Yet Graduated)
      </h2>

      <Button type="primary" onClick={handleOpenModal} className="mb-4">
        + Add New Student
      </Button>

      {error && (
        <p className="text-red-500">
          Error: {error.message || "Unable to load student list."}
        </p>
      )}

      <Table
        columns={columns}
        dataSource={data}
        rowKey="id"
        loading={loading}
        bordered
        pagination={{
          pageSize: 10,
          total: studentAdminList?.pagination?.total || data.length,
          current: studentAdminList?.pagination?.page || 1,
        }}
      />

      <CreateStudentModal
        visible={modalVisible}
        onCancel={() => setModalVisible(false)}
        onCreate={handleCreateStudent}
        classList={classList}
      />
    </div>
  );
}

export default AccountAdmin;

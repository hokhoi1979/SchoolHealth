import React, { useEffect, useState } from "react";
import { AppFooter } from "../../../components/Footer/AppFooter";
import CommonBreadcrumb from "../../../components/CommonBreadcrumb/CommonBreadcrumb";
import { Link } from "react-router-dom";
import { Button, Input, Space, Table, Tooltip } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { fetchProfile } from "../../../redux/profileNurse/profileSlice";
const StudentProfile = () => {
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const {
    student = [],
    loading,
    error,
  } = useSelector((state) => state.profile);

  const fetchData = () => {
    dispatch(fetchProfile());
  };
  useEffect(() => {
    fetchData();
  }, []);

  console.log(student);

  const formatData = () => {
    if (
      student?.listHealthProfiles &&
      Array.isArray(student.listHealthProfiles)
    ) {
      const formatted = student.listHealthProfiles.map((item) => {
        const save = item.student;
        return {
          id: save?.student_code,
          name: save?.account?.fullname,
          grade: save?.classAssignments?.[0]?.class?.name ?? "Chưa rõ",
          gender: save?.gender,
          date: save?.dateOfBirth?.split("T")[0],
          parent: save?.ParentInfo?.fullname,
          phone: save?.ParentInfo?.phone,
          email: save?.ParentInfo?.email,
        };
      });

      console.log("✅ Đã format:", formatted);
      setData(formatted);
    } else {
      console.log("❌ Không có listHealthProfiles:", student);
    }
  };

  useEffect(() => {
    formatData();
  }, [student]);

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
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
      title: "Date of Birth",
      dataIndex: "date",
      key: "date",
      align: "center",
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
      align: "center",
    },

    {
      title: "Parent",
      dataIndex: "parent",
      key: "parent",
      align: "center",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
      align: "center",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      align: "center",
    },
    {
      title: "Action",
      key: "action",
      align: "center",
      render: (_, record) => (
        <Space>
          <Tooltip
            placement="bottom"
            title="View"
            styles={{
              fontFamily: "Poppins, sans-serif",
              fontSize: "12px",
            }}
          >
            <div style={{ cursor: "pointer" }}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={20}
                height={20}
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M12 9a3 3 0 0 0-3 3a3 3 0 0 0 3 3a3 3 0 0 0 3-3a3 3 0 0 0-3-3m0 8a5 5 0 0 1-5-5a5 5 0 0 1 5-5a5 5 0 0 1 5 5a5 5 0 0 1-5 5m0-12.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5"
                ></path>
              </svg>
            </div>
          </Tooltip>
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
            <CommonBreadcrumb role={"Nurse"} page={"student"} />
          </h1>

          <div className="grid grid-cols-4 gap-5 mt-5 w-[100%] pl-5 pr-5 font-kameron ">
            <div className="h-[120px] bg-white rounded-2xl">
              <p className="flex justify-center mt-5">Total Student</p>
              <p className="flex justify-center text-[50px]">800</p>
            </div>
            <div className="h-[120px] bg-white rounded-2xl">
              <p className="flex justify-center mt-5">Sick student</p>
              <p className="flex justify-center text-[50px]">12</p>
            </div>
            <div className="h-[120px] bg-white rounded-2xl">
              <p className="flex justify-center mt-5">
                Students needing special attention
              </p>
              <p className="flex justify-center text-[50px]">7</p>
            </div>
            <div className="h-[120px] bg-white rounded-2xl">
              <p className="flex justify-center mt-5">Out of Stock</p>
              <p className="flex justify-center text-[50px]">12</p>
            </div>
          </div>
          <div className="pl-5 mt-5 flex gap-5">
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
          <Table className="mt-5" columns={columns} dataSource={data} />
        </div>
        <div className="h-30"></div>
        {/* Footer nằm dưới cùng */}
        <AppFooter />
      </div>
    </>
  );
};

export default StudentProfile;

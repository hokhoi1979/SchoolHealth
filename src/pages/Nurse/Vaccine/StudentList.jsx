import { Button, Input, Select, Space, Table, Tooltip } from "antd";
import React, { useEffect, useState } from "react";
import VaccineResult from "./VaccineResult";
import SentParents from "./SentParents";
import { useLocation, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { fetchVaccineStudent } from "../../../redux/vaccineNurse/vaccineById/vaccineByIdSlice";

function StudentList() {
  // const location = useLocation();
  // const id = location.state?.item?.id;
  const { id } = useParams();
  const [selectedOption, setSelectedOption] = useState("student");
  const [data, setData] = useState([]);
  const dispatch = useDispatch();
  const [healthId, setHealthId] = useState(null);
  const {
    student = [],
    loading,
    error,
  } = useSelector((state) => state.vaccineStudent);

  const { profileStudent = [] } = useSelector(
    (state) => state.fetchProfileDetail
  );

  const fetchData = () => {
    dispatch(fetchVaccineStudent(id));
    console.log("STUDENT", student);
  };

  useEffect(() => {
    console.log("ID", id);
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  const formatData = () => {
    if (
      student?.data?.studentResponseEntity &&
      Array.isArray(student?.data?.studentResponseEntity)
    ) {
      const format = student?.data?.studentResponseEntity.map((item) => {
        return {
          id: item?.student?.student_code,
          student: item?.student?.account?.fullname,
          parent: item?.student?.ParentInfo?.fullname,
          phone: item?.student?.ParentInfo?.phone,
          status: item?.status,
          note: item?.note || "No comment",
          grade: item?.student?.classAssignments?.[0]?.class?.name || "N/A",
        };
      });
      setData(format);
      console.log("FORMAT", data);
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
      dataIndex: "student",
      key: "student",
      align: "center",
    },
    {
      title: "Grade",
      dataIndex: "grade",
      key: "grade",
      align: "center",
    },
    {
      title: "Parents",
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
      title: "Status",
      dataIndex: "status",
      key: "status",
      align: "center",
      render: (_, record) => (
        <Space>
          {record.status?.toLowerCase() === "confirm" ? (
            <p
              type="secondary"
              className="rounded-2xl w-[80px] text-[#6CC76F] font-medium "
            >
              Confirm
            </p>
          ) : (
            <p
              type="secondary"
              className="rounded-2xl w-[80px] text-[#E26666] font-medium"
            >
              Refuse
            </p>
          )}
        </Space>
      ),
    },
    {
      title: "Note",
      dataIndex: "note",
      key: "note",
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
            overlayInnerStyle={{
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
    <div>
      {" "}
      <div className="flex justify-between">
        {selectedOption === "student" ? (
          <div className="flex gap-5 pl-5">
            <Input
              style={{ borderRadius: "7px", width: "300px" }}
              placeholder="Search vaccination"
            />
            <Button
              className="!bg-[#90A8B0] !hover:bg-gray-600"
              type="secondary"
            >
              <p className="text-white font-kameron"> Search</p>
            </Button>
          </div>
        ) : (
          <>
            <div></div>
          </>
        )}

        <div className="">
          <Select
            placeholder="Select action"
            style={{ width: 250 }}
            value={selectedOption}
            onChange={(value) => setSelectedOption(value)}
            className="!w-[255px]"
          >
            <Option value="student">Student List</Option>
            <Option value="record">Recording Vaccination Results</Option>
            <Option value="send">Send to Vaccination Results</Option>
          </Select>
        </div>
      </div>
      {selectedOption === "student" && (
        <>
          <Table className="mt-5" columns={columns} dataSource={data} />
        </>
      )}
      {selectedOption === "record" && (
        <div className="flex gap-5 pl-5">
          <VaccineResult />
        </div>
      )}
      {selectedOption === "send" && (
        <div className="flex gap-5 pl-5">
          <SentParents />
        </div>
      )}
      <div className="h-20"></div>
    </div>
  );
}

export default StudentList;

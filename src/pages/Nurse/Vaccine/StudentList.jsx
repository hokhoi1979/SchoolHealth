import { Button, Input, Select, Space, Table, Tag, Tooltip } from "antd";
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
  };

  useEffect(() => {
    console.log("ID", id);
  }, []);

  useEffect(() => {
    fetchData();
  }, []);
  console.log("STUDENT", student);

  const formatData = () => {
    if (
      student?.data?.studentResponseEntity &&
      Array.isArray(student?.data?.studentResponseEntity)
    ) {
      const idVaccine = student?.data?.id;
      const format = student?.data?.studentResponseEntity.map((item) => {
        return {
          idVaccine,
          id: item?.student?.id,
          studentId: item?.student?.student_code,
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
      dataIndex: "studentId",
      key: "studentId",
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
          {record.status?.toLowerCase() === "accepted" && (
            <Tag color="green">ACCEPT</Tag>
          )}
          {record.status?.toLowerCase() === "pending" && (
            <Tag color="orange">PENDING</Tag>
          )}

          {record.status?.toLowerCase() === "declined" && (
            <Tag color="red">ACCEPT</Tag>
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
          {student?.data?.vaccineEventStock?.length > 0 && (
            <div className="bg-white shadow-md rounded-xl p-6 mt-6 mx-5 w-[50%] ">
              <h2 className="text-xl font-bold text-[#2f4454] font-serif mb-4 flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="none"
                    stroke="#45dbdc"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.5"
                    d="M9.068 2h5.864c.92 0 1.382 0 1.668.293c.533.546.533 2.868 0 3.414C16.313 6 15.853 6 14.932 6H9.068c-.92 0-1.381 0-1.668-.293c-.533-.546-.533-2.868 0-3.414C7.686 2 8.147 2 9.068 2M8 6a7 7 0 0 1 .306.656a3 3 0 0 1-.23 2.542a7 7 0 0 1-.418.59l-.403.539c-.45.6-.675.9-.838 1.229a4 4 0 0 0-.35 1.05C6 12.965 6 13.34 6 14.092V16c0 2.828 0 4.243.879 5.121C7.757 22 9.172 22 12 22s4.243 0 5.121-.879C18 20.243 18 18.828 18 16v-1.908c0-.75 0-1.126-.067-1.487a4 4 0 0 0-.35-1.05c-.163-.328-.388-.628-.838-1.228l-.403-.538a7 7 0 0 1-.419-.59a3 3 0 0 1-.23-2.543c.06-.161.142-.326.307-.656m-4 7v5m-2.5-2.5h5"
                    color="#45dbdc"
                  />
                </svg>
                Medicine Usage
              </h2>

              <div className="space-y-4">
                {student.data.vaccineEventStock.map((item, index) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between  rounded-xl px-4 py-3 shadow-sm bg-[#f9f9f9]"
                  >
                    <div className="flex items-center gap-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-12 h-12 object-cover rounded border"
                      />
                      <div>
                        <p className="font-semibold text-[16px]">{item.name}</p>
                        <p className="text-sm text-gray-600">
                          Planned: {item.quantityPlanned} | Used:{" "}
                          {item.quantityUsed}
                        </p>
                        {item.notes && (
                          <p className="italic text-sm text-gray-500">
                            {item.notes}
                          </p>
                        )}
                      </div>
                    </div>
                    <span
                      className={`text-sm font-semibold px-3 py-1 rounded-full ${
                        item.type === "medicine"
                          ? "bg-blue-100 text-blue-600"
                          : "bg-orange-100 text-orange-600"
                      }`}
                    >
                      {item.type === "medicine" ? "Medicine" : "Supply"}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
          <div className="p-5 mx-5 bg-white rounded-2xl mt-5">
            <div className="flex gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                viewBox="0 0 48 48"
              >
                <path
                  fill="#656769"
                  stroke="#45413c"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="m23.55 17.33l-15-7.64a.5.5 0 0 1 0-.89l15-7.69a1 1 0 0 1 .92 0l15 7.69a.5.5 0 0 1 0 .89l-15 7.64a1 1 0 0 1-.92 0"
                  stroke-width="1"
                />
                <path
                  fill="none"
                  stroke="#45413c"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M8.31 9.24v7.95"
                  stroke-width="1"
                />
                <path
                  fill="#ffe500"
                  stroke="#45413c"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M9.27 17.18a1 1 0 0 0-1-1.07a1 1 0 0 0-1 1.07l-.19 3.69h2.38Z"
                  stroke-width="1"
                />
                <path
                  fill="#656769"
                  d="M31.54 34.09L24 31.22l-7.54 2.87a6.76 6.76 0 0 0-4.35 6.31V45h23.78v-4.6a6.76 6.76 0 0 0-4.35-6.31"
                />
                <path
                  fill="#525252"
                  d="M31.54 34.09L24 31.22l-7.54 2.87a6.76 6.76 0 0 0-4.35 6.31v3a6.76 6.76 0 0 1 4.35-6.31L24 34.21l7.54 2.87a6.76 6.76 0 0 1 4.35 6.31v-3a6.76 6.76 0 0 0-4.35-6.3"
                />
                <path
                  fill="none"
                  stroke="#45413c"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M31.54 34.09L24 31.22l-7.54 2.87a6.76 6.76 0 0 0-4.35 6.31V45h23.78v-4.6a6.76 6.76 0 0 0-4.35-6.31"
                  stroke-width="1"
                />
                <path
                  fill="#ffcebf"
                  d="M24 35.11s-2.54-1.11-2.54-2.54v-2.85A2.54 2.54 0 0 1 24 27.17a2.54 2.54 0 0 1 2.54 2.55v2.85c0 1.43-2.54 2.54-2.54 2.54"
                />
                <path
                  fill="#ffb59e"
                  d="M24 27.17a2.54 2.54 0 0 0-2.54 2.54v.6a2.54 2.54 0 0 0 5.08 0v-.59A2.54 2.54 0 0 0 24 27.17"
                />
                <path
                  fill="none"
                  stroke="#45413c"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M24 35.11s-2.54-1.11-2.54-2.54v-2.85A2.54 2.54 0 0 1 24 27.17h0a2.54 2.54 0 0 1 2.54 2.55v2.85c0 1.43-2.54 2.54-2.54 2.54m-10.55 1.24L17.06 45m17.49-8.65L30.94 45m-10.4-4.52l.73 4.52m6.19-4.52L26.73 45"
                  stroke-width="1"
                />
                <path
                  fill="#45413c"
                  d="M9 45.5a15 1.5 0 1 0 30 0a15 1.5 0 1 0-30 0"
                  opacity="0.15"
                />
                <path
                  fill="#a86c4d"
                  stroke="#45413c"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M24 6.91a9.82 9.82 0 0 1 9.82 9.82v5.14h0h-19.64h0v-5.14A9.82 9.82 0 0 1 24 6.91"
                  stroke-width="1"
                />
                <path
                  fill="#ffcebf"
                  stroke="#45413c"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M34.87 21.12a1.83 1.83 0 0 0-1.39-1.54l-.59-.16a2.06 2.06 0 0 1-1.5-2v-2.04A1.88 1.88 0 0 0 30 13.57a15.3 15.3 0 0 1-6 1.09a15.3 15.3 0 0 1-6-1.09a1.88 1.88 0 0 0-1.4 1.81v2.06a2.06 2.06 0 0 1-1.5 2l-.59.16a1.83 1.83 0 0 0-1.39 1.54a1.81 1.81 0 0 0 1.81 2h.11a9 9 0 0 0 17.9 0h.11a1.81 1.81 0 0 0 1.82-2.02"
                  stroke-width="1"
                />
                <path
                  fill="#45413c"
                  stroke="#45413c"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M18.57 20.91a.77.77 0 1 0 .77-.77a.76.76 0 0 0-.77.77m10.86 0a.77.77 0 1 1-.77-.77a.76.76 0 0 1 .77.77"
                  stroke-width="1"
                />
                <path
                  fill="#ff6242"
                  d="M21.16 25.6a.44.44 0 0 0-.33.16a.42.42 0 0 0-.1.35a3.32 3.32 0 0 0 6.54 0a.42.42 0 0 0-.1-.35a.44.44 0 0 0-.33-.16Z"
                />
                <path
                  fill="#ffa694"
                  d="M24 27a4 4 0 0 0-2.52.77a3.36 3.36 0 0 0 5 0A4 4 0 0 0 24 27"
                />
                <path
                  fill="none"
                  stroke="#45413c"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M21.16 25.6a.44.44 0 0 0-.33.16a.42.42 0 0 0-.1.35a3.32 3.32 0 0 0 6.54 0a.42.42 0 0 0-.1-.35a.44.44 0 0 0-.33-.16Z"
                  stroke-width="1"
                />
                <path
                  fill="#ffb59e"
                  d="M17.06 24.19a1 .6 0 1 0 2 0a1 .6 0 1 0-2 0m11.88 0a1 .6 0 1 0 2 0a1 .6 0 1 0-2 0"
                />
                <path
                  fill="#656769"
                  d="M14.68 9c0-1.22 3.9-2.21 9.32-2.21s9.32 1 9.32 2.21l1 8.59c0-1.28-4.61-2.32-10.3-2.32s-10.3 1-10.3 2.32Z"
                />
                <path
                  fill="#525252"
                  d="M24 10.07c4.62 0 8.22.6 9.61 1.43L33.32 9c0-1.22-3.9-2.21-9.32-2.21s-9.32 1-9.32 2.21l-.29 2.53c1.39-.86 4.99-1.46 9.61-1.46"
                />
                <path
                  fill="none"
                  stroke="#45413c"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M14.68 9c0-1.22 3.9-2.21 9.32-2.21s9.32 1 9.32 2.21l1 8.59c0-1.28-4.61-2.32-10.3-2.32s-10.3 1-10.3 2.32Z"
                  stroke-width="1"
                />
              </svg>

              <h3 className="text-xl font-bold text-gray-800">List Student</h3>
            </div>
            <Table className="mt-5" columns={columns} dataSource={data} />
          </div>
        </>
      )}
      {selectedOption === "record" && (
        <div className="flex gap-5 pl-5">
          <VaccineResult studentList={data} />
        </div>
      )}
      {selectedOption === "send" && (
        <div className="flex gap-5 pl-5">
          <SentParents studentList={data} id={id} />
        </div>
      )}
      <div className="h-20"></div>
    </div>
  );
}

export default StudentList;

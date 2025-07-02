import { Button, Input, Select, Space, Table, Tag, Tooltip } from "antd";
import React, { useEffect, useState } from "react";
import MedicalResult from "./MedicalResult";
import SentMedicalToParents from "./SentMedicalToParents";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { fetchStudentCheckup } from "../../../redux/checkupNurse/listStudentCheckup/listStudentCheckupSlice";

function StudentListMedical() {
  const { id } = useParams();
  const [medicine, setMedicine] = useState([]);
  const [student, setStudent] = useState([]);
  const [content, setContent] = useState([]);
  const [selectedOption, setSelectedOption] = useState("student");
  const dispatch = useDispatch();
  const { listStudentCheckup = [] } = useSelector(
    (state) => state.studentCheckup
  );

  const fetchData = () => {
    dispatch(fetchStudentCheckup(id));
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchContentTest = () => {
    if (Array.isArray(listStudentCheckup.data?.content)) {
      const data = listStudentCheckup.data?.content.map((item, index) => {
        return {
          key: index + 1,
          createdAt: item?.createdAt,
          description: item?.description,
          id: item?.id,
          name: item?.name,
        };
      });
      setContent(data);
    }
  };

  const fetchStudent = () => {
    if (Array.isArray(listStudentCheckup.data?.studentResponseEntity)) {
      const data = listStudentCheckup.data?.studentResponseEntity.map(
        (item, index) => ({
          key: index + 1,
          fullName: item?.student?.account?.fullname || "N/A",
          class: item?.student?.classAssignments?.[0].class?.name || "N/A",
          status: item?.status,
          parent: item?.student?.ParentInfo?.fullname || "N/A",
          phone: item?.student?.ParentInfo?.phone || "N/A",
        })
      );
      setStudent(data);
    }
  };

  const fetchMedicine = () => {
    if (Array.isArray(listStudentCheckup.data.vaccineEventStock)) {
      const data = listStudentCheckup.data.vaccineEventStock.map(
        (item, index) => {
          return {
            key: index,
            id: item?.id,
            image: item?.image,
            name: item?.name,
            notes: item?.notes,
            quantityPlanned: item?.quantityPlanned,
            quantityUsed: item?.quantityUsed,
            type: item?.type,
          };
        }
      );
      setMedicine(data);
    }
  };

  useEffect(() => {
    if (
      listStudentCheckup.data &&
      listStudentCheckup.data.studentResponseEntity &&
      Array.isArray(listStudentCheckup.data.studentResponseEntity)
    ) {
      fetchStudent();
      fetchMedicine();
      fetchContentTest();
    }
  }, [listStudentCheckup]);

  const columnStudent = [
    {
      title: "Number",
      dataIndex: "key",
      key: "key",
      align: "center",
    },
    {
      title: "Student",
      dataIndex: "fullName",
      key: "fullName",
      align: "center",
    },
    {
      title: "Grade",
      dataIndex: "class",
      key: "class",
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
          {record.status === "ACCEPTED" && <Tag color="green">ACCEPTED</Tag>}
          {record.status === "PENDING" && <Tag color="blue">PENDING</Tag>}
          {record.status === "DECLINED" && <Tag color="red">DECLINED</Tag>}
        </Space>
      ),
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
        <div></div>

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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-5 mt-8">
            <div className="bg-white shadow-lg rounded-2xl p-6 border border-gray-100 flex flex-col">
              <div className="flex items-center gap-2 mb-4">
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

                <h3 className="text-xl font-bold text-gray-800">
                  Medicine Usage
                </h3>
              </div>
              <div
                className="overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 space-y-4"
                style={{ maxHeight: "360px" }}
              >
                {medicine.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-start gap-4 bg-gradient-to-br from-cyan-50 to-pink-50 hover:bg-gray-100 transition duration-200 p-4 rounded-xl shadow-sm border border-gray-200"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-md border"
                    />
                    <div className="flex-1">
                      <div className="flex justify-between items-center">
                        <h4 className="text-lg font-semibold text-gray-700">
                          {item.name}
                        </h4>
                        <Tag
                          color={item.type === "medicine" ? "blue" : "orange"}
                          className="capitalize text-sm"
                        >
                          {item.type}
                        </Tag>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">
                        Planned:{" "}
                        <span className="font-medium">
                          {item.quantityPlanned}
                        </span>{" "}
                        | Used:{" "}
                        <span className="font-medium">{item.quantityUsed}</span>
                      </p>
                      {item.notes && (
                        <div className="flex">
                          <p className="text-sm text-gray-600 mt-1">
                            Number:
                            <span className="font-medium">{item.notes}</span>
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white shadow-lg rounded-2xl p-6 border border-gray-100 flex flex-col">
              <div className="flex items-center gap-2 mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="#b5c159"
                    d="M5 3c-1.11 0-2 .89-2 2v14c0 1.11.89 2 2 2h14c1.11 0 2-.89 2-2V5c0-1.11-.89-2-2-2zm0 2h14v14H5zm2 2v2h10V7zm0 4v2h10v-2zm0 4v2h7v-2z"
                  />
                </svg>

                <h3 className="text-xl font-bold text-gray-800">
                  Checkup Content
                </h3>
              </div>
              <div
                className="overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 space-y-4"
                style={{ maxHeight: "360px" }}
              >
                {content.map((item) => (
                  <div
                    key={item.id}
                    className="bg-gradient-to-br from-cyan-50 to-pink-50 hover:bg-gray-100 transition duration-200 p-4 rounded-xl shadow-sm border border-gray-200"
                  >
                    <h4 className="text-lg font-semibold text-gray-700">
                      {item.name}
                    </h4>
                    <p className="text-sm text-gray-600 mt-1 line-clamp-3">
                      {item.description || "No description available."}
                    </p>
                    <p className="text-xs text-gray-400 mt-2">
                      ⏱ {new Date(item.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

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
            <Table
              className="mt-5"
              columns={columnStudent}
              dataSource={student}
            />
          </div>
        </>
      )}
      {selectedOption === "record" && (
        <div className="flex gap-5 pl-5">
          <MedicalResult id={id} />
        </div>
      )}
      {selectedOption === "send" && (
        <div className="flex gap-5 pl-5">
          <SentMedicalToParents id={id} />
        </div>
      )}
      <div className="h-20"></div>
    </div>
  );
}

export default StudentListMedical;

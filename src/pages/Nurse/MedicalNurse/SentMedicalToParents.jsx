import { Button, Modal, Space, Table, Tag, Tooltip } from "antd";
import TextArea from "antd/es/input/TextArea";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCheckupResult } from "../../../redux/checkupNurse/resultCheckup/resultCheckupSlice";
import { useParams } from "react-router";
import { sendCheckupParent } from "../../../redux/checkupNurse/sendCheckupToParent/sendCheckupParentSlice";

function SentMedicalToParents({ id }) {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const { sendCheckup = [] } = useSelector((state) => state.sendCheckupParent);
  const { resultCheckup = [] } = useSelector((state) => state.checkupResult);
  const [student, setStudent] = useState([]);
  const [result, setResult] = useState([]);
  const [isSent, setIsSent] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);

  const fetchData = () => {
    dispatch(fetchCheckupResult(id));
  };

  useEffect(() => {
    fetchData();
  }, []);

  const formatData = () => {
    if (Array.isArray(resultCheckup?.data)) {
      const data = resultCheckup?.data.map((item) => {
        return {
          studentID: item?.studentID,
          fullname: item?.fullname,
          className: item?.className,
          overallNotes: item?.overallNotes,
          status: item?.status,
          student_code: item?.student_code,
        };
      });
      setStudent(data);
    }
  };

  useEffect(() => {
    formatData();
  }, [resultCheckup]);

  const handleDetail = () => {
    if (Array.isArray(resultCheckup?.data)) {
      const data = resultCheckup?.data.map((item) => {
        return {
          studentID: item?.studentID,
          fullname: item?.fullname,
          className: item?.className,
          overallNotes: item?.overallNotes,
          status: item?.status,
          student_code: item?.student_code,
          results: item?.results || [],
        };
      });

      setResult(data);
    }
  };

  const handleSend = () => {
    if (id) {
      dispatch(sendCheckupParent(id));
    }
    setOpen(false);
  };

  const column = [
    {
      title: "ID",
      dataIndex: "studentID",
      key: "studentID",
      align: "center",
    },
    {
      title: "student_code",
      dataIndex: "student_code",
      key: "student_code",
      align: "center",
    },
    {
      title: "Student",
      dataIndex: "fullname",
      key: "fullname",
      align: "center",
    },
    {
      title: "Class",
      dataIndex: "className",
      key: "className",
      align: "center",
    },
    {
      title: "overallNotes",
      dataIndex: "overallNotes",
      key: "overallNotes",
      align: "center",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      align: "center",
      render: (_, record) => (
        <Space>
          {record.status?.toLowerCase() === "success" ? (
            <Tag color="green">Attended</Tag>
          ) : (
            <Tag color="red">Absent</Tag>
          )}
        </Space>
      ),
    },
    {
      title: "Send",
      align: "center",
      render: (_) => (
        <Space>
          {sendCheckup.success === true ? (
            <Tag color="green">Sent</Tag>
          ) : (
            <Tag color="red">Not sent</Tag>
          )}
        </Space>
      ),
    },
  ];

  const columnsResultDetail = [
    {
      title: "ID",
      dataIndex: "studentID",
      key: "studentID",
      align: "center",
    },
    {
      title: "Student Code",
      dataIndex: "student_code",
      key: "student_code",
      align: "center",
    },
    {
      title: "Full Name",
      dataIndex: "fullname",
      key: "fullname",
      align: "center",
    },
    {
      title: "Class",
      dataIndex: "className",
      key: "className",
      align: "center",
    },
    {
      title: "Overall Notes",
      dataIndex: "overallNotes",
      key: "overallNotes",
      align: "center",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      align: "center",
      render: (text) =>
        text?.toLowerCase() === "success" ? (
          <Tag color="green">Attended</Tag>
        ) : (
          <Tag color="red">Absent</Tag>
        ),
    },
    {
      title: "Result Details",
      dataIndex: "results",
      key: "results",
      align: "left",
      render: (results) => (
        <div className="space-y-1">
          {results.map((item, idx) => (
            <div key={idx} className="text-sm text-gray-700 leading-tight">
              <span className="font-medium">{item.contentTitle}:</span>{" "}
              {item.value}{" "}
              {/* <span className="italic text-gray-500">({item.note})</span> */}
            </div>
          ))}
        </div>
      ),
    },
  ];

  return (
    <>
      <div className="w-full">
        <div className="flex justify-between mt-3 ">
          <div></div>
          <div className="">
            <Button
              type="secondary"
              className="!bg-black hover:!bg-gray-600 w-[255px]"
              onClick={() => {
                handleDetail();
                setOpen(true);
              }}
            >
              {" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
              >
                <path
                  fill="#fff"
                  d="M1.946 9.315c-.522-.174-.527-.455.01-.634L21.044 2.32c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8l-8 6z"
                />
              </svg>
              <p className="text-white font-serif">
                Send student's result to parent
              </p>
            </Button>
          </div>
        </div>
        <Table className="mt-5 w-full" columns={column} dataSource={student} />
      </div>

      <Modal
        open={open}
        onCancel={() => setOpen(false)}
        footer={null}
        width={1000}
      >
        <h1 className="text-2xl font-serif flex justify-center">
          Send Medical Results
        </h1>
        <p className="mb-3 font-serif flex justify-center">
          Send medical results to students' parents
        </p>

        <Table
          columns={columnsResultDetail}
          dataSource={result}
          pagination={false}
          rowKey="studentID"
          className="mb-6"
        />

        <div className="flex justify-between mt-5">
          <div></div>
          <div className="flex gap-5">
            {/* {sendCheckup.success === false && ( */}
            <>
              {" "}
              <Button
                className="!bg-[#E26666] w-[100px] !p-2 hover:!bg-[#EE3B3B] !text-white !font-serif"
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>
              <Button
                className="!bg-[#6CC76F] !p-2 w-[100px] hover:!bg-[#3BB32B] !text-white !font-serif"
                onClick={() => {
                  handleSend();
                }}
              >
                Send Result
              </Button>
            </>
            {/* )} */}
          </div>
        </div>
      </Modal>
    </>
  );
}

export default SentMedicalToParents;

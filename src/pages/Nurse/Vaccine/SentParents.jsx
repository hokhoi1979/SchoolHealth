import { Button, Modal, Space, Table } from "antd";
import TextArea from "antd/es/input/TextArea";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchVaccineResult } from "../../../redux/vaccineNurse/vaccineResult/vaccineResultSlice";
import { postResultVaccine } from "../../../redux/vaccineNurse/sendResult/sendResultSlice";

function SentParents() {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);
  const dispatch = useDispatch();

  const {
    result = [],
    loading,
    error,
  } = useSelector((state) => state.vaccineResult);

  const { resultVaccine = [] } = useSelector(
    (state) => state.sendVaccineResult
  );

  useEffect(() => {
    dispatch(fetchVaccineResult(1));
  }, [dispatch]);

  useEffect(() => {
    if (result?.data && Array.isArray(result.data)) {
      const formatted = result.data.map((item) => ({
        id: item?.studentID,
        student: item?.student?.account?.fullname,
        parent: item?.student?.ParentInfo?.fullname,
        grade: item?.student?.classAssignments?.[0]?.class?.name,
        status: item?.status,
        kq: item?.result,
        updatedAt: item?.updatedAt,
        note: item?.note,
      }));
      setData(formatted);
    }
  }, [result]);

  const handleSendResult = () => {
    dispatch(postResultVaccine(1));
    console.log("POST", resultVaccine);
  };

  const columnStudent = [
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
      title: "Status",
      dataIndex: "status",
      key: "status",
      align: "center",
      render: (_, record) => (
        <Space>
          {record.status?.toLowerCase() === "attended" ? (
            <p className="rounded-xl w-[80px] p-1 bg-[#6CC76F] text-white">
              Attended
            </p>
          ) : (
            <p className="rounded-xl w-[80px] p-1 bg-[#E26666] text-white">
              Absent
            </p>
          )}
        </Space>
      ),
    },
  ];

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
      title: "Parent",
      dataIndex: "parent",
      key: "parent",
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
            <p className="rounded-2xl w-[80px] text-[#0CC912] font-bold">
              Attended
            </p>
          ) : (
            <p className="rounded-2xl w-[80px] text-[#EE3B3B] font-bold">
              Absented
            </p>
          )}
        </Space>
      ),
    },
    {
      title: "React",
      dataIndex: "kq",
      key: "kq",
      align: "center",
    },
    {
      title: "Note",
      dataIndex: "note",
      key: "note",
      align: "center",
    },
    {
      title: "Send result",
      dataIndex: "send",
      key: "send",
      align: "center",
      render: () => (
        <Space>
          <p className="rounded-2xl w-[80px] p-1 bg-[#E26666] text-white">
            Not sent
          </p>
        </Space>
      ),
    },
  ];

  return (
    <>
      <div className="w-full">
        <div className="flex justify-between mt-3">
          <div></div>
          <Button
            type="secondary"
            className="!bg-black hover:!bg-gray-600 w-[255px]"
            onClick={() => setOpen(true)}
          >
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

        <Table
          className="mt-5 w-full"
          columns={columns}
          dataSource={data}
          loading={loading}
        />
      </div>

      <Modal
        open={open}
        onCancel={() => setOpen(false)}
        footer={null}
        width="60%"
      >
        <h1 className="text-2xl font-serif flex justify-center">
          Send Vaccination Results
        </h1>
        <p className="mb-3 font-serif flex justify-center">
          Send vaccination results to parents
        </p>

        <Table dataSource={data} columns={columnStudent} pagination={false} />

        <div className="flex justify-between mt-5">
          <div></div>
          <div className="flex gap-5">
            <Button
              className="!bg-[#E26666] w-[100px] !p-2 hover:!bg-[#EE3B3B] !text-white !font-serif"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button
              className="!bg-[#6CC76F] !p-2 w-[100px] hover:!bg-[#3BB32B] !text-white !font-serif"
              onClick={handleSendResult}
            >
              Send Result
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default SentParents;

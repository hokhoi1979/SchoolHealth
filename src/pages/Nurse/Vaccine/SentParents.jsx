import { Button, Modal, Space, Table } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchVaccineResult } from "../../../redux/vaccineNurse/vaccineResult/vaccineResultSlice";
import { postResultVaccine } from "../../../redux/vaccineNurse/sendResult/sendResultSlice";

function SentParents({ studentList }) {
  const [idVaccine, setIdVaccine] = useState(null);
  const [open, setOpen] = useState(false);
  const [mainData, setMainData] = useState([]); // Dữ liệu bảng chính
  const [modalData, setModalData] = useState([]); // Dữ liệu trong modal
  const [sending, setSending] = useState(false); // loading gửi
  const dispatch = useDispatch();

  useEffect(() => {
    if (studentList && studentList.length > 0) {
      setIdVaccine(studentList[0].idVaccine);
    }
  }, [studentList]);

  const {
    result = [],
    loading,
    error,
  } = useSelector((state) => state.vaccineResult);

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
        sent: item?.status?.toLowerCase() === "success", // hoặc nếu có field "sent" từ backend thì dùng item.sent
      }));
      setMainData(formatted);
    }
  }, [result]);

  const handleOpenModal = () => {
    setModalData(mainData);
    setOpen(true);
  };

  const handleSendResult = async () => {
    if (!idVaccine) return;
    setSending(true);
    try {
      await dispatch(postResultVaccine(idVaccine));
      await dispatch(fetchVaccineResult(1));
      setOpen(false); // đóng modal sau khi gửi xong
    } catch (error) {
      console.error("Send failed", error);
    } finally {
      setSending(false);
    }
  };

  const handleCancel = () => {
    setOpen(false);
    setModalData([]);
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
      dataIndex: "sent",
      key: "sent",
      align: "center",
      render: (sent) => (
        <Space>
          {sent ? (
            <p className="rounded-2xl w-[80px] p-1 bg-[#6CC76F] text-white">
              Sent
            </p>
          ) : (
            <p className="rounded-2xl w-[80px] p-1 bg-[#E26666] text-white">
              Not sent
            </p>
          )}
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
            onClick={handleOpenModal}
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
          dataSource={mainData}
          loading={loading}
          rowKey="id"
        />
      </div>

      <Modal open={open} onCancel={handleCancel} footer={null} width="60%">
        <h1 className="text-2xl font-serif flex justify-center">
          Send Vaccination Results
        </h1>
        <p className="mb-3 font-serif flex justify-center">
          Send vaccination results to parents
        </p>

        <Table
          dataSource={modalData}
          columns={columnStudent}
          pagination={false}
          rowKey="id"
        />

        <div className="flex justify-between mt-5">
          <div></div>
          <div className="flex gap-5">
            <Button
              className="!bg-[#E26666] w-[100px] !p-2 hover:!bg-[#EE3B3B] !text-white !font-serif"
              onClick={handleCancel}
            >
              Cancel
            </Button>
            <Button
              className="!bg-[#6CC76F] !p-2 w-[120px] hover:!bg-[#3BB32B] !text-white !font-serif"
              onClick={handleSendResult}
              loading={sending}
              disabled={sending}
            >
              {sending ? "Sending..." : "Send Result"}
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default SentParents;

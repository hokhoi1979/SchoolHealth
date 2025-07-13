import { Button, message, Modal, Space, Table, Tag } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchVaccineResult } from "../../../redux/vaccineNurse/vaccineResult/vaccineResultSlice";
import { postResultVaccine } from "../../../redux/vaccineNurse/sendResult/sendResultSlice";
import { toast } from "react-toastify";
function SentParents({ studentList, id }) {
  const [idVaccine, setIdVaccine] = useState(null);
  const [open, setOpen] = useState(false);
  const [mainData, setMainData] = useState([]);
  const [modalData, setModalData] = useState([]);
  const [sending, setSending] = useState(false);

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

  const { sent = [] } = useSelector((state) => state.sendVaccineResult);

  const { resultVaccine = [] } = useSelector(
    (state) => state.sendVaccineResult
  );

  useEffect(() => {
    dispatch(fetchVaccineResult(id));
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
        sent: item?.status?.toLowerCase() === "success",
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
      const response = await dispatch(fetchVaccineResult(idVaccine));

      const resultData = response?.payload?.data;
      if (Array.isArray(resultData)) {
        const formatted = resultData.map((item) => ({
          id: item?.studentID,
          student: item?.student?.account?.fullname,
          parent: item?.student?.ParentInfo?.fullname,
          grade: item?.student?.classAssignments?.[0]?.class?.name,
          status: item?.status,
          kq: item?.result,
          updatedAt: item?.updatedAt,
          note: item?.note,
          sent: item?.status?.toLowerCase() === "success",
        }));
        setMainData(formatted);
      }

      setOpen(false);
      toast.success("Send successful!");
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
          {record.status?.toLowerCase() === "success" ? (
            <Tag color="green">Attended</Tag>
          ) : (
            <Tag color="red">Absent</Tag>
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
      key: "status",
      align: "center",
      render: (_, record) => (
        <Space>
          {resultVaccine.success === true ? (
            <Tag color="green">Sent</Tag>
          ) : (
            <Tag color="red">Not sent</Tag>
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
              // disabled={sending || modalData.every((item) => item.sent)}
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

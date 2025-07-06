import {
  Button,
  Checkbox,
  Input,
  Modal,
  Select,
  Table,
  Tag,
  Tooltip,
} from "antd";
import TextArea from "antd/es/input/TextArea";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCheckupJoin } from "../../../redux/checkupNurse/checkupJoin/checkupJoinSlice";
import { fetchCheckupDetailResult } from "../../../redux/checkupNurse/checkupDetailResult/checkupDetailResultSlice";
import { postCheckupDetailResult } from "../../../redux/checkupNurse/sendCheckupDetailResult/sendCheckupDetailResultSlice";

function MedicalResult({ id }) {
  const dispatch = useDispatch();
  const [dataRecord, setDataRecord] = useState([]);
  const [open, setOpen] = useState(false);
  const [detail, setDetail] = useState([]);
  const [inputValues, setInputValues] = useState({});
  const [inputErrors, setInputErrors] = useState({});
  const [overallResult, setOverallResult] = useState("");
  const [overallNotes, setOverallNotes] = useState("");
  const [selectedStudentID, setSelectedStudentID] = useState(null);
  const [submittedStudents, setSubmittedStudents] = useState([]);
  const [isMeeting, setIsMeeting] = useState(false);

  const { studentJoin = [] } = useSelector((state) => state.checkupJoin);
  const { checkDetail = [] } = useSelector(
    (state) => state.fetchCheckupDetailResult
  );

  const fetchData = () => {
    dispatch(fetchCheckupJoin(id));
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (studentJoin.data && Array.isArray(studentJoin.data)) {
      const formatted = studentJoin.data.map((item, index) => ({
        key: index,
        studentID: item.studentID,
        student_code: item.student_code,
        name: item.fullName,
        gender: item.gender,
        hasResult: item.hasResult || false,
        className: item.className,
      }));
      setDataRecord(formatted);
    }
  }, [studentJoin]);

  const handleDetail = () => {
    if (id) {
      dispatch(fetchCheckupDetailResult(id));
    }
    setDetail(checkDetail);
  };

  useEffect(() => {
    if (checkDetail?.data?.length > 0) {
      const initialInputs = {};
      checkDetail.data.forEach((item) => {
        initialInputs[item.id] = "";
      });
      setInputValues(initialInputs);
      setDetail(checkDetail);
    }
  }, [checkDetail]);

  const handleInputChange = (id, value) => {
    setInputValues((prev) => ({
      ...prev,
      [id]: value,
    }));

    setInputErrors((prev) => ({
      ...prev,
      [id]: null,
    }));
  };

  const handleSendResult = () => {
    const newErrors = {};
    let hasError = false;

    detail.data.forEach((item) => {
      const value = inputValues[item.id];

      if (item.name.toLowerCase().includes("height")) {
        const height = parseFloat(value);
        if (isNaN(height) || height <= 0 || height > 250) {
          newErrors[item.id] = "Chiều cao không hợp lệ (0 - 250 cm)";
          hasError = true;
        }
      }

      if (item.name.toLowerCase().includes("weight")) {
        const weight = parseFloat(value);
        if (isNaN(weight) || weight <= 0 || weight > 601) {
          newErrors[item.id] = "Cân nặng không hợp lệ (0 - 600 kg)";
          hasError = true;
        }
      }
    });

    if (hasError) {
      setInputErrors(newErrors);
      return;
    }

    const resultsArray = Object.entries(inputValues).map(
      ([contentID, value]) => ({
        contentID: Number(contentID),
        value: value,
        note: "Không có ghi chú",
      })
    );

    const payload = {
      studentID: Number(selectedStudentID),
      results: resultsArray,
      isMeeting: isMeeting,
      status: "SUCCESS",
      overallNotes: overallNotes || "Không có phản ứng phụ",
      overallResult: overallResult || "GOOD",
    };

    dispatch(postCheckupDetailResult({ id, body: payload }));
    setSubmittedStudents((prev) => [...prev, selectedStudentID]);
    setIsMeeting(false);
    setOpen(false);
  };

  const columnsRecord = [
    {
      title: "StudentID",
      dataIndex: "studentID",
      render: (text) => <p className="font-semibold">{text}</p>,
    },
    {
      title: "Student code",
      dataIndex: "student_code",
      render: (text) => <p className="font-semibold">{text}</p>,
    },
    {
      title: "Student Name",
      dataIndex: "name",
    },
    {
      title: "ClassName",
      dataIndex: "className",
    },
    {
      title: "Gender",
      dataIndex: "gender",
    },
    {
      title: "HasResult",
      dataIndex: "hasResult",
      render: (text) => (
        <Tag color={text ? "green" : "blue"}>{text ? "Đã có" : "Chưa có"}</Tag>
      ),
    },
    {
      title: "Action",
      key: "action",
      align: "center",
      render: (_, record) => {
        const isSubmitted =
          submittedStudents.includes(record.studentID) || record.hasResult;

        return (
          <Tooltip title={isSubmitted ? "Đã gửi kết quả" : "Xem chi tiết"}>
            <div
              style={{
                cursor: isSubmitted ? "not-allowed" : "pointer",
                opacity: isSubmitted ? 0.5 : 1,
              }}
              onClick={() => {
                if (!isSubmitted) {
                  setSelectedStudentID(record.studentID);
                  handleDetail();
                  setOpen(true);
                }
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={20}
                height={20}
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M12 9a3 3 0 0 0-3 3a3 3 0 0 0 3 3a3 3 0 0 0 3-3a3 3 0 0 0-3-3m0 8a5 5 0 0 1-5-5a5 5 0 0 1 5-5a5 5 0 0 1 5 5a5 5 0 0 1-5 5m0-12.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5"
                />
              </svg>
            </div>
          </Tooltip>
        );
      },
    },
  ];

  return (
    <div className="w-full">
      <div className="w-full bg-white rounded-xl p-5 mt-5">
        <h1 className="font-serif text-2xl">Recording Medical Results</h1>
        <p className="font-serif text-sm text-gray-500">
          Update checkup results and monitor health
        </p>

        <div className="mt-5">
          <Table
            columns={columnsRecord}
            dataSource={dataRecord}
            pagination={false}
            className="mt-2"
          />
        </div>
      </div>

      <Modal
        open={open}
        onCancel={() => setOpen(false)}
        footer={null}
        className="!w-[500px]"
      >
        {detail?.data?.length > 0 ? (
          <>
            {detail.data.map((item) => (
              <div key={item.id} className="mb-4">
                <p className="font-semibold">{item.name}</p>
                {item.description && (
                  <p className="text-gray-500 text-sm mb-1">
                    {item.description}
                  </p>
                )}
                {item.inputType === "TEXT" ? (
                  <TextArea
                    placeholder="Nhập kết quả văn bản"
                    value={inputValues[item.id] || ""}
                    onChange={(e) => handleInputChange(item.id, e.target.value)}
                  />
                ) : (
                  <Input
                    type={item.inputType === "NUMBER" ? "number" : "text"}
                    placeholder="Nhập dữ liệu"
                    value={inputValues[item.id] || ""}
                    onChange={(e) => handleInputChange(item.id, e.target.value)}
                  />
                )}
                {inputErrors[item.id] && (
                  <p className="text-red-500 text-sm mt-1">
                    {inputErrors[item.id]}
                  </p>
                )}
              </div>
            ))}

            <div className="mt-4">
              <p className="font-semibold">Kết luận</p>
              <Select
                className="w-full"
                value={overallResult}
                onChange={setOverallResult}
                placeholder="Chọn kết luận"
                options={[
                  { label: "GOOD", value: "GOOD" },
                  { label: "BAD", value: "BAD" },
                ]}
              />
            </div>

            <div className="mt-4">
              <p className="font-semibold">Ghi chú tổng quát</p>
              <TextArea
                rows={3}
                value={overallNotes}
                onChange={(e) => setOverallNotes(e.target.value)}
                placeholder="Ghi chú về phản ứng phụ hoặc lưu ý"
              />
            </div>

            <div className="mt-4">
              <p className="font-semibold mb-1">Trường hợp đặc biệt?</p>
              <Checkbox
                checked={isMeeting}
                onChange={(e) => setIsMeeting(e.target.checked)}
              >
                Có
              </Checkbox>
            </div>

            <div className="flex justify-end mt-5 gap-4">
              <Button
                onClick={() => setOpen(false)}
                className="!bg-[#E26666] w-[100px] !p-2 hover:!bg-[#EE3B3B] !text-white"
              >
                Cancel
              </Button>
              <Button
                onClick={handleSendResult}
                className="!bg-[#6CC76F] !p-2 w-[100px] hover:!bg-[#3BB32B] !text-white"
              >
                Send Result
              </Button>
            </div>
          </>
        ) : (
          <p className="text-gray-400 text-sm">Không có nội dung khám</p>
        )}
      </Modal>
    </div>
  );
}

export default MedicalResult;

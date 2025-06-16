import { Button, Checkbox, Input, Select, Table } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateVaccineResult } from "../../../redux/vaccineNurse/updateVaccineResult/updateResultSlice";

const { Option } = Select;

function VaccineResult({ studentList }) {
  const [start, setStart] = useState(true);
  const [dataRecord, setDataRecord] = useState([]);
  const dispatch = useDispatch();
  const { updateVaccine = [], error } = useSelector(
    (state) => state.updateVaccineResult
  );

  useEffect(() => {
    if (studentList && Array.isArray(studentList)) {
      const filtered = studentList.filter(
        (item) => item.status?.toUpperCase() === "ACCEPTED"
      );

      const formatted = filtered.map((item, index) => ({
        key: index.toString(),
        idStudent: item.studentId,
        idVaccine: item?.idVaccine,
        id: item?.id,
        name: item.student,
        grade: item.grade,
        vaccinated: false,
        result: "GOOD",
        note: "",
      }));

      setDataRecord(formatted);
    }
  }, [studentList]);
  console.log("DATA", dataRecord);
  const handleCheckboxChange = (key, checked) => {
    setDataRecord((prev) =>
      prev.map((item) =>
        item.key === key ? { ...item, vaccinated: checked } : item
      )
    );
  };

  const handleNoteChange = (key, value) => {
    setDataRecord((prev) =>
      prev.map((item) => (item.key === key ? { ...item, note: value } : item))
    );
  };

  const handleResultChange = (key, value) => {
    setDataRecord((prev) =>
      prev.map((item) => (item.key === key ? { ...item, result: value } : item))
    );
  };

  const handleSendResult = () => {
    if (dataRecord.length === 0) {
      console.error("Không có dữ liệu để gửi");
      return;
    }

    const idVaccine = dataRecord[0]?.idVaccine;

    if (!idVaccine) {
      console.error("Không tìm thấy idVaccine");
      return;
    }

    const format = dataRecord.map((item) => ({
      studentID: item.id,
      status: item.vaccinated ? "SUCCESS" : "SKIPPED",
      note: item.note,
      result: item.result,
    }));
    const total = {
      result: format,
    };
    console.log("Gửi dữ liệu POST:", total);
    console.log("ID Vaccine:", idVaccine);

    dispatch(updateVaccineResult({ IdVaccine: idVaccine, bodyVaccine: total }));
  };

  const columnsRecord = [
    {
      title: "Student ID",
      dataIndex: "idStudent",
      render: (text) => <p className="font-semibold">{text}</p>,
    },
    {
      title: "Student Name",
      dataIndex: "name",
      render: (text) => <p>{text}</p>,
    },
    {
      title: "Grade",
      dataIndex: "grade",
      render: (text) => <p>{text}</p>,
    },
    {
      title: "Status",
      dataIndex: "vaccinated",
      render: (text, record) => (
        <Checkbox
          checked={record.vaccinated}
          onChange={(e) => handleCheckboxChange(record.key, e.target.checked)}
        >
          Đã tiêm
        </Checkbox>
      ),
    },
    {
      title: "Result",
      dataIndex: "result",
      render: (text, record) => (
        <Select
          value={record.result}
          className="w-full"
          onChange={(value) => handleResultChange(record.key, value)}
        >
          <Option value="GOOD">Tốt</Option>
          <Option value="BAD">Nặng</Option>
        </Select>
      ),
    },
    {
      title: "Note",
      dataIndex: "note",
      render: (text, record) => (
        <Input
          placeholder="Nhập ghi chú"
          value={record.note}
          onChange={(e) => handleNoteChange(record.key, e.target.value)}
        />
      ),
    },
  ];

  return (
    <div className="w-full">
      <div className="flex justify-between mt-2">
        <div></div>
        <div>
          <Button
            type="secondary"
            className="!bg-black hover:!bg-gray-600 !text-white"
            onClick={() => setStart(true)}
          >
            Start Vaccination
          </Button>
        </div>
      </div>

      {error && <p className="text-red-500">{error}</p>}

      <div className="w-full bg-white rounded-xl p-5 mt-5">
        <h1 className="font-serif text-2xl">Recording Vaccination Results</h1>
        <p className="font-serif text-sm text-gray-500">
          Update vaccination results and monitor post-vaccination reactions
        </p>

        {start ? (
          <>
            <div className="mt-5 space-y-4">
              <div className="flex gap-2">
                <p className="font-serif text-sm">Vaccination day:</p>
                <p className="text-gray-500 text-sm">
                  Flu vaccination (15/06/2025)
                </p>
              </div>

              <Table
                columns={columnsRecord}
                dataSource={dataRecord}
                pagination={false}
                className="mt-2"
              />
            </div>

            <div className="flex justify-end mt-5 gap-5">
              <Button
                className="!bg-[#E26666] w-[100px] !p-2 hover:!bg-[#EE3B3B] !text-white !font-serif"
                type="secondary"
              >
                Cancel
              </Button>
              <Button
                className="!bg-[#6CC76F] w-[100px] !p-2 hover:!bg-[#3BB32B] !text-white !font-serif"
                type="secondary"
                onClick={handleSendResult}
              >
                Send Result
              </Button>
            </div>
          </>
        ) : (
          <div className="flex justify-center mt-10">
            <p className="text-3xl text-gray-500">No Data</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default VaccineResult;

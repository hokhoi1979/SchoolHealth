import { Button, Checkbox, Input, Select, Table } from "antd";
import TextArea from "antd/es/input/TextArea";
import { Option } from "antd/es/mentions";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateVaccineResult } from "../../../redux/vaccineNurse/updateVaccineResult/updateResultSlice";

function VaccineResult() {
  const [start, setStart] = useState(true);
  const dispatch = useDispatch();
  const { updateVaccine = [], error } = useSelector(
    (state) => state.updateVaccineResult
  );

  const [dataRecord, setDataRecord] = useState([
    {
      id: "102",
      key: "1",
      note: "Tiêm bình thường",
      result: "Không có",
      status: true,
    },
    {
      id: "103",
      key: "2",
      note: "Sốt nhẹ sau tiêm, đã hạ sốt",
      result: "Nhẹ",
      status: true,
    },
  ]);

  const handleCheckboxChange = (key, checked) => {
    setDataRecord((prev) =>
      prev.map((item) =>
        item.key === key ? { ...item, vaccinated: checked } : item
      )
    );
  };

  const columnsRecord = [
    {
      title: "studentID",
      dataIndex: "id",
      render: (text, record) => <p className="font-semibold">{record.id}</p>,
    },
    // {
    //   title: "Student",
    //   dataIndex: "name",
    //   render: (text, record) => (
    //     <div>
    //       <p className="font-semibold">{record.name}</p>
    //       <p className="text-xs text-gray-500">{record.class}</p>
    //     </div>
    //   ),
    // },
    {
      title: "Status",
      dataIndex: "status",
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
          <Option value="Không có">Không có</Option>
          <Option value="Nhẹ">Nhẹ</Option>
          <Option value="Nặng">Nặng</Option>
        </Select>
      ),
    },
    {
      title: "Note",
      dataIndex: "note",
      render: (text, record) => (
        <Input
          defaultValue={text}
          placeholder="Nhập ghi chú"
          value={record.note}
          onChange={(e) => handleNoteChange(record.key, e.target.value)}
        />
      ),
    },
  ];

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
    const format = dataRecord.map((item) => {
      return {
        studentID: item.id,
        status: item.status,
        note: item.note,
        result: item.result,
      };
    });
    dispatch(updateVaccineResult({ IdVaccine: 1, bodyVaccine: format }));
    console.log("HOHO", format);
  };

  useEffect(() => {
    console.log("KHOIIOIO", updateVaccine);
  }, []);

  return (
    <div className="w-full">
      <div className="flex justify-between mt-2">
        <div></div>
        <div className="">
          <Button
            type="secondary"
            className="!bg-black hover:!bg-gray-600  !text-white"
            onClick={() => setStart(true)}
          >
            Start Vaccination
          </Button>
        </div>
      </div>
      {error && (
        <>
          <p className="text-red-500">{error}</p>
        </>
      )}
      <div className="w-full bg-white rounded-xl p-5 mt-5">
        <div>
          <h1 className="font-serif text-2xl">Recording Vaccination Results</h1>
          <p className="font-serif text-[12px] text-gray-500">
            Update vaccination results and monitor post-vaccination reactions
          </p>
        </div>

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
            <div className="flex justify-between mt-5">
              <div></div>
              <div className="flex gap-5">
                <Button
                  className="!bg-[#E26666] w-[100px] !p-2 hover:!bg-[#EE3B3B] !text-white !font-serif "
                  type="secondary"
                >
                  Cancel
                </Button>
                <Button
                  className="!bg-[#6CC76F] !p-2 w-[100px] hover:!bg-[#3BB32B] !text-white !font-serif "
                  type="secondary"
                  onClick={handleSendResult}
                >
                  Send Result
                </Button>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="flex justify-center">
              <p className="text-3xl text-gray-500">No Data</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default VaccineResult;

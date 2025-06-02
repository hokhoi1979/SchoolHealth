import {
  Button,
  Checkbox,
  Input,
  Modal,
  Select,
  Space,
  Table,
  Tooltip,
} from "antd";
import TextArea from "antd/es/input/TextArea";
import { Option } from "antd/es/mentions";
import Rect, { useState } from "react";

function VaccineResult() {
  const [open, setOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("result");
  const [selectedRecord, setSelectedRecord] = useState(null);

  const columnStudent = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      align: "center",
    },
    {
      title: "Student",
      dataIndex: "name",
      key: "name",
      align: "center",
    },
    {
      title: "Grade",
      dataIndex: "grade",
      key: "grade",
      align: "center",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      align: "center",
      render: (_, record) => (
        <Space>
          {record.status?.toLowerCase() === "injected" ? (
            <p
              type="secondary"
              className="rounded-xl w-[80px] p-1  bg-[#6CC76F] text-white "
            >
              Injured
            </p>
          ) : (
            <p
              type="secondary"
              className="rounded-xl w-[80px] p-1  bg-[#E26666] text-white "
            >
              Not injure
            </p>
          )}
        </Space>
      ),
    },
  ];

  const dataStudent = [
    {
      id: "SE182629",
      name: "Ho Khoi",
      grade: "12A3",
      status: "injected",
    },
  ];

  const columns = [
    {
      title: "Vaccination",
      dataIndex: "vaccination",
      key: "vaccination ",
      align: "center",
    },
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      align: "center",
    },
    {
      title: "Student",
      dataIndex: "name",
      key: "name",
      align: "center",
    },
    {
      title: "Grade",
      dataIndex: "grade",
      key: "grade",
      align: "center",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      align: "center",
      render: (_, record) => (
        <Space>
          {record.status?.toLowerCase() === "participate" ? (
            <p
              type="secondary"
              className="rounded-2xl w-[80px] text-[#0CC912] font-bold "
            >
              Participate
            </p>
          ) : (
            <p
              type="secondary"
              className="rounded-2xl w-[80px] text-[#EE3B3B] font-bold"
            >
              Don't Participate
            </p>
          )}
        </Space>
      ),
    },
    {
      title: "React",
      dataIndex: "react",
      key: "react",
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
      render: (_, record) => (
        <Space>
          {record.send?.toLowerCase() === "sended" ? (
            <p
              type="secondary"
              className="rounded-2xl w-[80px] p-1  bg-[#6CC76F] text-white "
            >
              Sended
            </p>
          ) : (
            <p
              type="secondary"
              className="rounded-2xl w-[80px] p-1  bg-[#E26666] text-white "
            >
              Not send
            </p>
          )}
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
            <div
              style={{ cursor: "pointer" }}
              onClick={() => {
                setSelectedRecord(record);
                setOpen(true);
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
                ></path>
              </svg>
            </div>
          </Tooltip>
        </Space>
      ),
    },
  ];

  const dataSource = [
    {
      vaccination: "Flu Vaccination",
      id: "SE182629",
      name: "Ho Khoi",
      grade: "12A3",
      parent: "Elon Musk",
      phone: "0997899689",
      status: "Participate",
      react: "Không",
      note: "Tiêm bình thường",
      send: "Not send",
    },
    {
      vaccination: "Flu Vaccination",
      id: "SE182629",
      name: "Ho Khoi",
      grade: "12A3",
      parent: "Elon Musk",
      phone: "0997899689",
      status: "Participate",
      react: "Không",
      note: "Tiêm bình thường",
      send: "Not send",
    },
    {
      vaccination: "Flu Vaccination",
      id: "SE182629",
      name: "Ho Khoi",
      grade: "12A3",
      parent: "Elon Musk",
      phone: "0997899689",
      status: "Participate",
      react: "Không",
      note: "Tiêm bình thường",
      send: "Not send",
    },
    {
      vaccination: "Flu Vaccination",
      id: "SE182629",
      name: "Ho Khoi",
      grade: "12A3",
      parent: "Elon Musk",
      phone: "0997899689",
      status: "Special tracking",
      react: "Không",
      note: "--",
      send: "Sended",
    },
    {
      vaccination: "Flu Vaccination",
      id: "SE182629",
      name: "Ho Khoi",
      grade: "12A3",
      parent: "Elon Musk",
      phone: "0997899689",
      status: "Participate",
      react: "Không",
      note: "Tiêm bình thường",
      send: "Not send",
    },
  ];

  const columnsRecord = [
    {
      title: <Checkbox />,
      dataIndex: "selected",
      render: (_, record) => <Checkbox />,
      width: 50,
    },
    {
      title: "Student",
      dataIndex: "name",
      render: (text, record) => (
        <div>
          <p className="font-semibold">{record.name}</p>
          <p className="text-xs text-gray-500">{record.class}</p>
        </div>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      render: () => (
        <Select defaultValue="Đã tiêm" className="w-full">
          <Option value="Đã tiêm">Đã tiêm</Option>
          <Option value="Chưa tiêm">Chưa tiêm</Option>
        </Select>
      ),
    },
    {
      title: "React",
      dataIndex: "reaction",
      render: () => (
        <Select defaultValue="Không có" className="w-full">
          <Option value="Không có">Không có</Option>
          <Option value="Nhẹ">Nhẹ</Option>
          <Option value="Nặng">Nặng</Option>
        </Select>
      ),
    },
    {
      title: "Note",
      dataIndex: "note",
      render: (text) => (
        <Input defaultValue={text} placeholder="Nhập ghi chú" />
      ),
    },
  ];

  const dataRecord = [
    {
      key: "1",
      name: "Nguyễn Văn An",
      class: "Lớp 1A",
      note: "Tiêm bình thường",
    },
    {
      key: "2",
      name: "Trần Thị Bình",
      class: "Lớp 1A",
      note: "Sốt nhẹ sau tiêm, đã hạ sốt",
    },
  ];
  return (
    <div>
      {" "}
      <div className="pl-5">
        <Select
          placeholder="Select action"
          style={{ width: 250 }}
          value={selectedOption}
          onChange={(value) => setSelectedOption(value)}
        >
          <Option value="result">Vaccine Result</Option>
          <Option value="record">Recording Vaccination Results</Option>
        </Select>
      </div>
      {selectedOption === "result" ? (
        <>
          {" "}
          <Table className="mt-5" columns={columns} dataSource={dataSource} />
        </>
      ) : (
        <>
          {" "}
          <div className="w-full bg-white rounded-xl p-5 mt-5">
            <div>
              <h1 className="font-serif text-2xl">
                Recording Vaccination Results
              </h1>
              <p className="font-serif text-[12px] text-gray-500">
                Update vaccination results and monitor post-vaccination
                reactions
              </p>
            </div>

            <div className="mt-5 space-y-4">
              <div>
                <p className="font-serif text-sm">Vaccination day</p>
                <Select placeholder="Chọn đợt" className="w-full">
                  <Option value="flu">Flu vaccination (15/06/2025)</Option>
                  <Option value="hiv">HIV (15/06/2025)</Option>
                </Select>
              </div>

              <div>
                <p className="font-serif text-sm">Grade</p>
                <Select placeholder="Chọn lớp" className="w-full">
                  <Option value="1A">Grade 1A</Option>
                  <Option value="1B">Grade 1B</Option>
                </Select>
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
                >
                  Send Result
                </Button>
              </div>
            </div>
          </div>
        </>
      )}
      <div className="h-25"></div>
      <Modal open={open} onCancel={() => setOpen(false)} footer={null}>
        <h1 className="text-2xl font-serif flex justify-center">
          Send Vaccination Results
        </h1>
        <p className="mb-3 font-serif flex justify-center">
          Send vaccination results to {selectedRecord?.name}'s parents
        </p>

        <Table
          dataSource={
            selectedRecord
              ? [
                  {
                    id: selectedRecord.id,
                    name: selectedRecord.name,
                    grade: selectedRecord.grade,
                    status:
                      selectedRecord.status === "Participate"
                        ? "injected"
                        : "not injected",
                  },
                ]
              : []
          }
          columns={columnStudent}
          pagination={false}
        />

        <div className="mt-5 font-serif">
          <div className="flex gap-5 w-[50%]">
            <div className="w-[70px]">
              <p className="font-bold">React:</p>
            </div>
            <p>{selectedRecord?.react || "None"}</p>
          </div>
          <div className="flex gap-5 w-full">
            <div className="w-[70px]">
              <p className="font-bold">Note:</p>
            </div>
            <p>{selectedRecord?.note || "--"}</p>
          </div>
          <div className="flex gap-5 w-full">
            <div className="w-[70px]">
              <p className="font-bold">Message:</p>
            </div>
            <TextArea placeholder="Enter message" />
          </div>
        </div>

        <div className="flex justify-between mt-5">
          <div></div>
          <div className="flex gap-5">
            <Button className="!bg-[#E26666] w-[100px] !p-2 hover:!bg-[#EE3B3B] !text-white !font-serif">
              Cancel
            </Button>
            <Button className="!bg-[#6CC76F] !p-2 w-[100px] hover:!bg-[#3BB32B] !text-white !font-serif">
              Send Result
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default VaccineResult;

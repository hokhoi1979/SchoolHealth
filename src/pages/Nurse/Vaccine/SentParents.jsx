import { Button, Modal, Space, Table } from "antd";
import TextArea from "antd/es/input/TextArea";
import React, { useState } from "react";

function SentParents() {
  const [open, setOpen] = useState(false);
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
          {record.status?.toLowerCase() === "attended" ? (
            <p
              type="secondary"
              className="rounded-xl w-[80px] p-1  bg-[#6CC76F] text-white "
            >
              Attended
            </p>
          ) : (
            <p
              type="secondary"
              className="rounded-xl w-[80px] p-1  bg-[#E26666] text-white "
            >
              Absent
            </p>
          )}
        </Space>
      ),
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
          {record.status?.toLowerCase() === "attended" ? (
            <p
              type="secondary"
              className="rounded-2xl w-[80px] text-[#0CC912] font-bold "
            >
              Attended
            </p>
          ) : (
            <p
              type="secondary"
              className="rounded-2xl w-[80px] text-[#EE3B3B] font-bold"
            >
              Absented
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
          <p
            type="secondary"
            className="rounded-2xl w-[80px] p-1  bg-[#E26666] text-white "
          >
            Not send
          </p>
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
      status: "Attended",
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
      status: "Attended",
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
      status: "Attended",
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
      status: "Attended",
      react: "Không",
      note: "Tiêm bình thường",
      send: "Not send",
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
              onClick={() => setOpen(true)}
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
        <Table
          className="mt-5 w-full"
          columns={columns}
          dataSource={dataSource}
        />
      </div>

      <Modal open={open} onCancel={() => setOpen(false)} footer={null}>
        <h1 className="text-2xl font-serif flex justify-center">
          Send Vaccination Results
        </h1>
        <p className="mb-3 font-serif flex justify-center">
          Send vaccination results to 's parents
        </p>

        <Table
          dataSource={dataSource}
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
    </>
  );
}

export default SentParents;

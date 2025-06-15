import { Button, Input, Modal, Select, Space, Table, Tooltip } from "antd";
import TextArea from "antd/es/input/TextArea";
import React, { useState } from "react";

function MedicineForStudent() {
  const [open, setOpen] = useState(false);

  const columns = [
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
      title: "Name of medicine/supplies",
      dataIndex: "nameMedicine",
      key: "nameMedicine",
      align: "center",
    },
    {
      title: "Dosage",
      dataIndex: "dosage",
      key: "dosage",
      align: "center",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      align: "center",
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

  const dataSource = [
    {
      id: "SE182629",
      name: "Ho Khoi",
      grade: "12A3",
      nameMedicine: "Paracetamol",
      dosage: "1 tablet 500mg",
      status: "Headetch",
    },
    {
      id: "SE182629",
      name: "Ho Khoi",
      grade: "12A3",
      nameMedicine: "Amoxicillin",
      dosage: "1 tablet 500mg",
      status: "Headetch",
    },
    {
      id: "SE182629",
      name: "Ho Khoi",
      grade: "12A3",
      nameMedicine: "Syringe 5ml",
      dosage: "1 tablet 500mg",
      status: "Headache",
    },
    {
      id: "SE182629",
      name: "Ho Khoi",
      grade: "12A3",
      nameMedicine: "Vitamin C",
      dosage: "1 tablet 500mg",
      status: "Headetch",
    },
    {
      id: "SE182629",
      name: "Ho Khoi",
      grade: "12A3",
      nameMedicine: "Syringe 5ml",
      dosage: "1 tablet 500mg",
      status: "Headetch",
    },
  ];
  return (
    <div>
      <div className="flex justify-between">
        <div></div>{" "}
        <Button
          type="secondary"
          className="!bg-black hover:!bg-gray-600"
          onClick={() => setOpen(true)}
        >
          <p className="text-white font-serif p-1">
            + Add medicine for student
          </p>
        </Button>
      </div>
      <Table className="mt-5" columns={columns} dataSource={dataSource} />{" "}
      <Modal
        open={open}
        style={{ marginTop: 110 }}
        onCancel={() => setOpen(false)}
        footer={false}
      >
        <h1 className="font-serif text-2xl flex justify-center">
          Add medicine for student
        </h1>

        <div className="grid grid-cols-2 gap-3 font-serif">
          <div>
            <h1 className="text-[17px] font-medium font-kameron mt-3">
              Enter ID student
              <Input type="text" placeholder="Enter ID" />
            </h1>
          </div>
          <div>
            <h1 className="text-[17px] font-medium font-kameron mt-3">
              Enter Name student
              <Input type="text" placeholder="Enter Name" />
            </h1>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 font-serif">
          <div>
            <h1 className="text-[17px] font-medium font-kameron mt-3">
              Enter grade
              <Input type="text" placeholder="Enter Grade" />
            </h1>
          </div>
          <div className="font-serif">
            <h1 className="text-[17px] font-medium font-kameron mt-3">
              Choose medicine/ medical
            </h1>
            <Select
              placeholder="--Choose medicine/medical--"
              className="w-full"
            >
              <Select.Option value="Paracetamol 250mg">
                Paracetamol 250mg
              </Select.Option>
              <Select.Option value="Betadine 100ml">
                Betadine 100ml
              </Select.Option>
              <Select.Option value="Band-Aid">Band-Aid</Select.Option>
              <Select.Option value="Cough medicine">
                Cough medicine
              </Select.Option>
              <Select.Option value="Medical cotton">
                Medical cotton
              </Select.Option>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 font-serif">
          <div>
            <h1 className="text-[17px] font-medium font-kameron mt-3">
              Quantity imported
              <Input type="number" placeholder="Enter number" />
            </h1>
          </div>
          <div>
            <h1 className="text-[17px] font-medium font-kameron mt-3">
              Dosage
              <Input type="text" placeholder="Enter dosage" />
            </h1>
          </div>
        </div>

        <div>
          <h1 className="text-[17px] font-medium font-kameron mt-3 font-serif">
            Status
            <TextArea placeholder="Note if you have" />
          </h1>
        </div>

        <div className="mt-5 flex justify-between font-serif">
          <div></div>
          <div className="flex gap-3">
            <Button
              type="secondary"
              className="!bg-[#E26666] hover:!bg-[#E53838] w-[100px]"
              onClick={() => setOpen(false)}
            >
              <p className="text-white text-xl font-serif p-1">Cancel</p>
            </Button>
            <Button
              type="secondary"
              className="!bg-[#6CC76F] hover:!bg-[#29CD2F] w-[100px]"
              onClick={() => setOpen(true)}
            >
              <p className="text-white text-xl font-serif p-1">Save</p>
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default MedicineForStudent;

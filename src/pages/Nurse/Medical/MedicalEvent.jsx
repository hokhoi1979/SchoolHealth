<<<<<<< HEAD
import { Button, Input, Modal, Space, Table, Tooltip } from "antd";
import React, { useState } from "react";
=======
import { Button, Input, Space, Table, Tooltip } from "antd";
import React from "react";
>>>>>>> 9b84723843da697e903b71fa5b4a96b30dd5c000
import { AppFooter } from "../../../components/Footer/AppFooter";
import CommonBreadcrumb from "../../../components/CommonBreadcrumb/CommonBreadcrumb";

const MedicalEvent = () => {
<<<<<<< HEAD
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const showModal = () => {
    setOpen(true);
  };
  const closeModal = () => {
    setOpen(false);
  };
  const handleOK = () => {
    setLoading(true);

    setTimeout(() => {
      setOpen(false);
      setLoading(false);
    }, 3000);
  };
=======
>>>>>>> 9b84723843da697e903b71fa5b4a96b30dd5c000
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
      title: "Accident",
      dataIndex: "accident",
      key: "accident",
      align: "center",
    },

    {
      title: "Disease",
      dataIndex: "disease",
      key: "disease",
      align: "center",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      align: "center",
    },
    {
      title: "Time",
      dataIndex: "time",
      key: "time",
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
      accident: "Fall",
      disease: "Fever",
      nameMedicine: "Paracetamol",
      dosage: "1 tablet 500mg",
      description: "Bị té lầu",
      time: "10:20 - 04/10/2004",
    },
    {
      id: "SE182629",
      name: "Ho Khoi",
      grade: "12A3",
      accident: "Fall",
      disease: "Fever",
      nameMedicine: "Amoxicillin",
      dosage: "1 tablet 500mg",
      description: "	Sốt 38.5°C, đau đầu",
      time: "10:20 - 04/10/2004",
    },
    {
      id: "SE182629",
      name: "Ho Khoi",
      grade: "12A3",
      accident: "Fall",
      disease: "Fever",
      nameMedicine: "Syringe 5ml",
      dosage: "1 tablet 500mg",
      description: "	Đau bụng sau giờ ăn trưa",
      time: "10:20 - 04/10/2004",
    },
    {
      id: "SE182629",
      name: "Ho Khoi",
      grade: "12A3",
      accident: "Fall",
      disease: "Fever",
      nameMedicine: "Vitamin C",
      dosage: "1 tablet 500mg",
      description: "	Sốt nhẹ 37.8°C, mệt mỏi",
      time: "10:20 - 04/10/2004",
    },
    {
      id: "SE182629",
      name: "Ho Khoi",
      grade: "12A3",
      accident: "Fall",
      disease: "Fever",
      nameMedicine: "Syringe 5ml",
      dosage: "1 tablet 500mg",
      description: "	Sốt nhẹ 37.8°C, mệt mỏi",
      time: "10:20 - 04/10/2004",
    },
  ];
  return (
    <>
      {" "}
      <div className="flex flex-col min-h-screen">
        <div className="p-6 flex flex-col flex-1">
          <h1 className="text-xl font-inria font-medium mb-4">
            <CommonBreadcrumb role={"Nurse"} page={"medicalEvent"} />
          </h1>

          <div className="grid grid-cols-4 gap-5 mt-5 w-[100%] pl-5 pr-5 font-kameron ">
            <div className="h-[120px] bg-white rounded-2xl">
              <p className="flex justify-center mt-5">Total Event</p>
              <p className="flex justify-center text-[50px]">40</p>
            </div>
            <div className="h-[120px] bg-white rounded-2xl">
              <p className="flex justify-center mt-5">Sick student</p>
              <p className="flex justify-center text-[50px]">12</p>
            </div>
            <div className="h-[120px] bg-white rounded-2xl">
              <p className="flex justify-center mt-5">Injure</p>
              <p className="flex justify-center text-[50px]">7</p>
            </div>
            <div className="h-[120px] bg-white rounded-2xl">
              <p className="flex justify-center mt-5">
                Students needing special attention
              </p>
              <p className="flex justify-center text-[50px]">12</p>
            </div>
          </div>
<<<<<<< HEAD

=======
>>>>>>> 9b84723843da697e903b71fa5b4a96b30dd5c000
          <div className="pl-5 mt-5 flex gap-5">
            <Input
              style={{ borderRadius: "7px", width: "300px" }}
              placeholder="Search for ID, Name student..."
            />
            <Button
              className="!bg-[#90A8B0] !hover:bg-gray-600"
              type="secondary"
            >
              <p className="text-white font-kameron"> Search</p>
            </Button>
<<<<<<< HEAD
            <div className="">
              <Button className="ml-[600px]">Create a new medical event</Button>
            </div>
=======
>>>>>>> 9b84723843da697e903b71fa5b4a96b30dd5c000
          </div>
          <Table className="mt-5" columns={columns} dataSource={dataSource} />
        </div>

        {/* Footer nằm dưới cùng */}
        <AppFooter />
      </div>
<<<<<<< HEAD
      {/* Modal */}
      <Modal
        open={open}
        title="New Medical Event"
        onOk={handleOK}
        onCancel={closeModal}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Return
          </Button>,
          <Button
            key="submit"
            type="primary"
            loading={loading}
            onClick={handleOk}
          >
            Submit
          </Button>,
        ]}
      >


        
      </Modal>
=======
>>>>>>> 9b84723843da697e903b71fa5b4a96b30dd5c000
    </>
  );
};

export default MedicalEvent;

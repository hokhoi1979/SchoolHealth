import { Button, Checkbox, Input, Modal } from "antd";
import React, { useState } from "react";
import CommonBreadcrumb from "../../../components/CommonBreadcrumb/CommonBreadcrumb";
import logo from "../../../img/logo.jpg";

const VaccineManager = () => {
  const [open, setOpen] = useState(false);

  const handleShowModal = () => {
    setOpen(true);
  };
  const handleCloseModal = () => {
    setOpen(false);
  };
  let vaccineDate = [
    {
      status: "Scheduled",
      name: "Flu Vaccination",
      grade: "12A3, 12A5, 12A6, 12T1",
      date: "15//6/2025",
      place: "District 1 Medical Center",
      participate: "62/80",
    },
    {
      status: "Waiting for confirm",
      name: "Flu Vaccination",
      grade: "12A3, 12A5, 12A6, 12T1",
      date: "15//6/2025",
      place: "District 1 Medical Center",
      participate: "50/80",
    },
    {
      status: "Scheduled",
      name: "Flu Vaccination",
      grade: "12A3, 12A5, 12A6, 12T1",
      date: "15//6/2025",
      place: "District 1 Medical Center",
      participate: "62/80",
    },
  ];
  return (
    <>
      <h1 className="text-xl font-inria font-medium mb-4 p-6  ">
        <CommonBreadcrumb role={"Manager"} page={"dashboard"} />
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

      {/* ..... */}
      <div className="pl-5 mt-5 flex gap-5">
        <Input
          style={{ borderRadius: "7px", width: "300px" }}
          placeholder="Search for ID, Name student..."
        />
        <Button className="!bg-[#90A8B0] !hover:bg-gray-600" type="secondary">
          <p className="text-white font-kameron"> Search</p>
        </Button>
        <div className="">
          <Button className="ml-[600px]" onClick={handleShowModal}>
            Create a new medical event
          </Button>
        </div>
      </div>

      <div className="mt-10">
        <div className="grid grid-cols-3 mt-5 pl-5 gap-5.5">
          {vaccineDate.map((item) => (
            <div className="bg-white p-6 rounded-2xl">
              <div className="flex justify-between">
                {item.status === "Scheduled" ? (
                  <>
                    {" "}
                    <Button className="!bg-[#6CC76F] !text-white">
                      {item.status}
                    </Button>
                  </>
                ) : (
                  <Button className="!bg-[#CBD361] !text-white">
                    {item.status}
                  </Button>
                )}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={25}
                  height={25}
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="gray"
                    d="M12 9a3 3 0 0 0-3 3a3 3 0 0 0 3 3a3 3 0 0 0 3-3a3 3 0 0 0-3-3m0 8a5 5 0 0 1-5-5a5 5 0 0 1 5-5a5 5 0 0 1 5 5a5 5 0 0 1-5 5m0-12.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5"
                  ></path>
                </svg>
              </div>
              <h1 className="mt-2 text-2xl">{item.name}</h1>
              <p className="text-gray-500">{item.participate}</p>

              <div className="flex gap-2.5 mt-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="#5B5454"
                    fill-rule="evenodd"
                    d="M17.297 6.572c-.41 0-.75-.34-.75-.75V4.598c-.774-.026-1.683-.026-2.75-.026h-2c-1.068 0-1.976 0-2.75.026v1.224c0 .41-.34.75-.75.75s-.75-.34-.75-.75V4.706c-.945.123-1.594.36-2.05.816c-.602.602-.822 1.54-.903 3.05H21c-.081-1.51-.302-2.448-.903-3.05c-.456-.456-1.105-.693-2.05-.816v1.116c0 .41-.34.75-.75.75m3.744 3.5q.008.793.006 1.75v1c0 .41.34.75.75.75s.75-.34.75-.75v-1c0-3.98 0-5.97-1.39-7.36c-.772-.772-1.73-1.115-3.11-1.268v-.872c0-.41-.34-.75-.75-.75s-.75.34-.75.75v.775c-.796-.025-1.705-.025-2.75-.025h-2c-1.046 0-1.954 0-2.75.025v-.775c0-.41-.34-.75-.75-.75s-.75.34-.75.75v.872c-1.38.153-2.338.496-3.11 1.268c-1.39 1.39-1.39 3.39-1.39 7.36v2c0 3.98 0 5.97 1.39 7.36s3.38 1.39 7.36 1.39c.41 0 .75-.34.75-.75s-.34-.75-.75-.75c-3.56 0-5.35 0-6.3-.95s-.95-2.74-.95-6.3v-2q-.001-.956.005-1.75zm-3.244 13c-2.62 0-4.75-2.13-4.75-4.75s2.13-4.75 4.75-4.75s4.75 2.13 4.75 4.75s-2.13 4.75-4.75 4.75m0-8c-1.79 0-3.25 1.46-3.25 3.25s1.46 3.25 3.25 3.25s3.25-1.46 3.25-3.25s-1.46-3.25-3.25-3.25m.47 4.78c.15.15.34.22.53.22s.38-.07.53-.22c.29-.29.29-.77 0-1.06l-.78-.78v-1.69c0-.41-.34-.75-.75-.75s-.75.34-.75.75v2c0 .2.08.39.22.53z"
                    color="#5B5454"
                  />
                </svg>
                <p>{item.date}</p>
              </div>

              <div className="flex gap-2.5 mt-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="none"
                    stroke="#5B5454"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m17 3l4 4m-2-2l-4.5 4.5m-3-3l6 6m-1-1L10 18H6v-4l6.5-6.5m-5 5L9 14m1.5-4.5L12 11M3 21l3-3"
                  />
                </svg>
                <p>{item.place}</p>
              </div>
              <div className="mt-3">
                <div className="flex justify-between mb-1 text-sm text-gray-600">
                  <span>Xác nhận tham gia:</span>
                  <span>{item.status}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5 mt-3">
                  <div
                    className="bg-teal-500 h-2.5 rounded-full"
                    style={{ width: `${(62 / 80) * 100}%` }}
                  ></div>
                </div>
                <div className="text-right text-sm text-gray-500 mt-1">
                  {((62 / 80) * 100).toFixed(0)}%
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* modal for create new medical checkup */}
      <Modal
        open={open}
        onCancel={handleCloseModal}
        footer={[
      <Button>
        Create 
      </Button>

        ]}
      >
   <div>
          <div>
            <div className="flex justify items-center gap-4 mb-[10px] pt-2">
              <div>
                {" "}
                <img src={logo} alt="Logo" width={100} />
                <p className="font-bold text-xl ml-[10px]">Health Care</p>
              </div>
              <div>
                <h1 className="font-bold text-2xl ml-[10px]">New Check Up</h1>
              </div>
            </div>
            <div className="flex justify items-center gap-4">
              <div>
                <p className="font-serif text-[#7F7F7F]">Checkup Name:</p>
              </div>
              <div>
                <Input></Input>
              </div>
            </div>

            <div className="flex items-start gap-2 pt-2">
              <p className="font-serif text-[#7F7F7F] w-30">Checkup Items:</p>
              <div className="flex flex-col gap-2">
                <Checkbox defaultChecked>Height and Weight</Checkbox>
                <Checkbox>Dental</Checkbox>
                <Checkbox>Vision</Checkbox> 
                <Checkbox>General Examination</Checkbox>
              </div>
            </div>
            <div className="flex items-center gap-4 pt-2">
              <p className="font-serif text-[#7F7F7F] w-40">
                Implementation Date:
              </p>
              <Input type="date" className="rounded-full" />
            </div>

            <div className="flex items-center gap-4 pt-2">
              <p className="font-serif text-[#7F7F7F] w-40">Target Class:</p>
              <Input className="rounded-full" />
            </div>

            <div className="flex items-center gap-4 pt-2">
              <p className="font-serif text-[#7F7F7F] w-29">Checkup Time:</p>
              <div className="flex gap-4">
                <Input
                  type="time"
                  className="rounded-full"
                  placeholder="From"
                />
                <Input type="time" className="rounded-full" placeholder="To" />
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default VaccineManager;

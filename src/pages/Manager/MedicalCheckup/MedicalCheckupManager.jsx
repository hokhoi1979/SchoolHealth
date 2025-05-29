import {
  Button,
  Card,
  Checkbox,
  Input,
  Modal,
  Space,
  Table,
  Tooltip,
} from "antd";
import React, { useState } from "react";
import { AppFooter } from "../../../components/Footer/AppFooter";
import CommonBreadcrumb from "../../../components/CommonBreadcrumb/CommonBreadcrumb";
import logo from "../../../img/logo.png";

function MedicalCheckup() {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [notificationModalOpen, setNotificationModalOpen] = useState(false);
  const [notificationTitle, setNotificationTitle] = useState("");
  const [notificationContent, setNotificationContent] = useState("");

  const handleSendNotification = (event) => {
    setNotificationModalOpen(true);
    setSelectedEvent(event);
    setNotificationTitle(`Checkup Notice for ${event.title}`);
    setNotificationContent(
      `Dear Parents,\n\nOur school will organize the ${event.title.toLowerCase()} for students in class ${event.classes.join(
        ", "
      )} on ${
        event.date
      }.\n\nPlease confirm your participation and support us in ensuring the best preparation.\n\nSincerely,`
    );
   
  };
  const handleCloseNotification = () => {
    setNotificationModalOpen(false);
  };

  const handleViewMore = (event) => {
    setSelectedEvent(event);
    setViewModalOpen(true);
  };
  const handleCloseViewMore = () => {
    setViewModalOpen(false);
    setSelectedEvent(null);
  };

  const showModal = () => {
    setOpen(true);
  };
  const closeModal = () => {
    setOpen(false);
  };
  const handleOk = () => {
    setLoading(true);

    setTimeout(() => {
      setOpen(false);
      setLoading(false);
    }, 3000);
  };
  const schedules = [
    {
      status: "Đã lên lịch",
      title: "Kiểm tra sức khỏe định kỳ",
      classes: ["3A", "3B"],
      date: "28/05/2025",
      time: "08:00 - 11:30",
      students: 58,
    },
    {
      status: "Đã lên lịch",
      title: "Khám mắt học sinh",
      classes: ["4A"],
      date: "29/05/2025",
      time: "13:00 - 15:00",
      students: 32,
    },
    {
      status: "Đã lên lịch",
      title: "Tư vấn tâm lý",
      classes: ["5B", "5C"],
      date: "30/05/2025",
      time: "09:00 - 11:00",
      students: 41,
    },
    {
      status: "Đã lên lịch",
      title: "Khám nha khoa",
      classes: ["2A", "2B", "2C"],
      date: "01/06/2025",
      time: "08:30 - 11:30",
      students: 75,
    },
    {
      status: "Đã lên lịch",
      title: "Kiểm tra thị lực",
      classes: ["1A"],
      date: "03/06/2025",
      time: "10:00 - 12:00",
      students: 28,

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

  return (
    <>
      {" "}
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
      <div className="pl-5 mt-5 flex gap-5">
        <Input
          style={{ borderRadius: "7px", width: "300px" }}
          placeholder="Search for ID, Name student..."
        />
        <Button className="!bg-[#90A8B0] !hover:bg-gray-600" type="secondary">
          <p className="text-white font-kameron"> Search</p>
        </Button>
        <div className="">
          <Button className="ml-[600px]" onClick={showModal}>
            Create a new medical event
          </Button>
        </div>
      </div>
      <div className="mb-40 mt-20">
        <div className="flex flex-wrap  gap-4 px-4">
          {schedules.map((schedule, index) => {
            return (
              <Card
                title={schedule.title}
                key={index}
                className="basis-[30%] min-w-[280px"
              >
                <p>
                  <strong>Class: </strong> {schedule.classes.join(", ")}
                </p>
                <p className="flex items-center gap-2 mt-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="currentColor"
                      d="M22 2.25h-3.25V.75a.75.75 0 0 0-1.5-.001V2.25h-4.5V.75a.75.75 0 0 0-1.5-.001V2.25h-4.5V.75a.75.75 0 0 0-1.5-.001V2.25H2a2 2 0 0 0-2 1.999v17.75a2 2 0 0 0 2 2h20a2 2 0 0 0 2-2V4.249a2 2 0 0 0-2-1.999M22.5 22a.5.5 0 0 1-.499.5H2a.5.5 0 0 1-.5-.5V4.25a.5.5 0 0 1 .5-.499h3.25v1.5a.75.75 0 0 0 1.5.001V3.751h4.5v1.5a.75.75 0 0 0 1.5.001V3.751h4.5v1.5a.75.75 0 0 0 1.5.001V3.751H22a.5.5 0 0 1 .499.499z"
                    />
                    <path
                      fill="currentColor"
                      d="M5.25 9h3v2.25h-3zm0 3.75h3V15h-3zm0 3.75h3v2.25h-3zm5.25 0h3v2.25h-3zm0-3.75h3V15h-3zm0-3.75h3v2.25h-3zm5.25 7.5h3v2.25h-3zm0-3.75h3V15h-3zm0-3.75h3v2.25h-3z"
                    />
                  </svg>
                  <strong>{schedule.date}</strong>
                </p>
                <p className="flex items-center gap-2 mt-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <g fill="none">
                      <path d="m12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z" />
                      <path
                        fill="currentColor"
                        d="M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12S6.477 2 12 2m0 2a8 8 0 1 0 0 16a8 8 0 0 0 0-16m0 2a1 1 0 0 1 .993.883L13 7v4.586l2.707 2.707a1 1 0 0 1-1.32 1.497l-.094-.083l-3-3a1 1 0 0 1-.284-.576L11 12V7a1 1 0 0 1 1-1"
                      />
                    </g>
                  </svg>
                  <strong>{schedule.time}</strong>
                </p>
                <p className="flex items-center gap-2 mt-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    className="text-gray-600"
                  >
                    <path
                      fill="currentColor"
                      d="M12 2a2 2 0 0 1 2 2a2 2 0 0 1-2 2a2 2 0 0 1-2-2a2 2 0 0 1 2-2m-1.5 5h3a2 2 0 0 1 2 2v5.5H14V22h-4v-7.5H8.5V9a2 2 0 0 1 2-2"
                    />
                  </svg>
                  <strong>{schedule.students}</strong>
                  <span>students</span>
                </p>
                <div className="flex mt-5 gap-10  h-full w-full ">
                  <div className="w-1/3">
                    <button
                      className="bg-[#34A0B5] hover:bg-[#2b8b9e] transition duration-300 font-serif text-white rounded-xl w-full h-full"
                      onClick={() => handleViewMore(schedule)}
                    >
                      View More
                    </button>
                  </div>
                  <div>
                    <button
                     onClick={
                      ()=> handleSendNotification(schedule)
                     }
                      className="bg-[#34A0B5] hover:bg-[#2b8b9e] transition duration-300 font-serif text-white rounded-xl w-[150px] h-full "
                    >
                      Send notification
                    </button>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Footer nằm dưới cùng */}
      </div>
      <AppFooter />
      {/* Modal */}
      <Modal
        open={open}
        onOk={handleOk}
        onCancel={closeModal}
        footer={[
          <Button key="back" onClick={closeModal}>
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
      {/* Modal View More */}
      <Modal
        open={viewModalOpen}
        onCancel={handleCloseViewMore}
        footer={[<Button onClick={handleCloseViewMore}>Close</Button>]}
      >
        {selectedEvent && (
          <div className="font-sans px-4">
            <h2 className="text-xl font-bold">
              Campaign Name - {selectedEvent.title}
            </h2>
            <p className="text-sm text-gray-500 mt-1 mb-4">
              {" "}
              Detailed information about the vaccination campaign
            </p>

            <div className="grid grid-cols-2 gap-y-4 text-sm mb-4">
              <div>
                <p className="text-gray-500"> Campaign Name</p>
                <p className="font-semibold flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="currentColor"
                      d="M22 2.25h-3.25V.75a.75.75 0 0 0-1.5-.001V2.25h-4.5V.75a.75.75 0 0 0-1.5-.001V2.25h-4.5V.75a.75.75 0 0 0-1.5-.001V2.25H2a2 2 0 0 0-2 1.999v17.75a2 2 0 0 0 2 2h20a2 2 0 0 0 2-2V4.249a2 2 0 0 0-2-1.999M22.5 22a.5.5 0 0 1-.499.5H2a.5.5 0 0 1-.5-.5V4.25a.5.5 0 0 1 .5-.499h3.25v1.5a.75.75 0 0 0 1.5.001V3.751h4.5v1.5a.75.75 0 0 0 1.5.001V3.751h4.5v1.5a.75.75 0 0 0 1.5.001V3.751H22a.5.5 0 0 1 .499.499z"
                    />
                    <path
                      fill="currentColor"
                      d="M5.25 9h3v2.25h-3zm0 3.75h3V15h-3zm0 3.75h3v2.25h-3zm5.25 0h3v2.25h-3zm0-3.75h3V15h-3zm0-3.75h3v2.25h-3zm5.25 7.5h3v2.25h-3zm0-3.75h3V15h-3zm0-3.75h3v2.25h-3z"
                    />
                  </svg>
                  {selectedEvent.title}
                </p>
              </div>
              <div className="flex gap-2">
                <p className="text-gray-500">Execution Date</p>
                <p className=" font-semibold flex items-center gap-1 mb-5 ">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 2a10 10 0 1 1 0 20a10 10 0 0 1 0-20m0 2a8 8 0 1 0 0 16a8 8 0 0 0 0-16m1 3v5.586l2.707 2.707a1 1 0 1 1-1.414 1.414l-3-3A1 1 0 0 1 11 12V7a1 1 0 0 1 2 0" />
                  </svg>
                  {selectedEvent.date}
                </p>
              </div>
              <div className="flex gap-2">
                <p className="text-gray-500">Number: </p>
                <p className="font-semibold flex items-center gap-1 mb-5 ">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 2a2 2 0 0 1 2 2a2 2 0 0 1-2 2a2 2 0 0 1-2-2a2 2 0 0 1 2-2m-1.5 5h3a2 2 0 0 1 2 2v5.5H14V22h-4v-7.5H8.5V9a2 2 0 0 1 2-2" />
                  </svg>
                  {selectedEvent.students} students
                </p>
              </div>
              <div className="flex gap-2">
                <p className="text-gray-500">Status</p>
                <span className="inline-block bg-black text-white px-2 py-1 rounded-full text-xs  flex items-center gap-1 mb-5 ">
                  {selectedEvent.status}
                </span>
              </div>
            </div>

            <div className="mt-4 ">
              <p className="text-gray-500 text-sm mb-2">Joined Classes</p>
              <div className="flex flex-wrap gap-2">
                {selectedEvent.classes.map((cls, idx) => (
                  <span
                    key={idx}
                    className="border border-gray-300 rounded-full px-3 py-1 text-sm"
                  >
                    {cls}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
      </Modal>
      {/* Modal of Notification */}
      <Modal
        open={notificationModalOpen}
        onCancel={handleCloseNotification}
        footer={[
          <Button
            key="send"
            type="primary"
            className="!bg-black"
            onClick={() => {
              setNotificationModalOpen(false);
            }}
          >
            Send Notification
          </Button>,
        ]}
      >
        <p>
          Compose a message to parents to confirm their consent for vaccination
        </p>
        <div>
          <label className="font-medium mb-2 block">Notification Title</label>

          <Input
            value={notificationTitle}
            onChange={(e) => setNotificationTitle(e.target.value)}
            placeholder="Enter notification title"
          />
        </div>
        <div>
          <label className="font-medium mb-1 block">Notification Content</label>
          <Input.TextArea
            rows={6}
            value={notificationContent}
            onChange={(e) => setNotificationContent(e.target.value)}
            placeholder="Enter message content"
          />
        </div>
      </Modal>
    </>
  );
}

export default MedicalCheckup;

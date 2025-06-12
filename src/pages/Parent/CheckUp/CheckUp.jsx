import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Pending from "./Pending";
import Completed from "./Completed";
import Rejected from "./Rejected";
import ModalResponse from "./ModalResponse";
import { AppFooter } from "../../../components/Footer/AppFooter";
import CommonBreadcrumb from "../../../components/CommonBreadcrumb/CommonBreadcrumb";

const initialNotifications = [
  {
    id: 1,
    title: "Periodic Health Checkup - Vision and Hearing",
    description:
      "The school will conduct a vision and hearing screening for all students. This includes testing for nearsightedness, farsightedness, and hearing impairments to ensure early detection.",
    date: "15/03/2025",
    type: "checkup",
    status: "pending",
  },
  {
    id: 2,
    title: "Periodic Health Checkup - General Examination",
    description:
      "A general health examination will be organized, including measurements of height, weight, and basic physical assessment to monitor overall student health.",
    date: "20/06/2025",
    type: "checkup",
    status: "pending",
  },
  {
    id: 3,
    title: "Dental Checkup",
    description:
      "The school dental team will conduct a dental checkup for students, focusing on oral hygiene, cavities, and dental health education.",
    date: "10/09/2025",
    type: "checkup",
    status: "pending",
  },
  {
    id: 4,
    title: "Vaccination Reminder",
    description:
      "Reminder for students to complete their vaccination schedule. The school will arrange vaccination sessions in cooperation with the local health department.",
    date: "05/11/2025",
    type: "checkup",
    status: "pending",
  },
  {
    id: 5,
    title: "Skin Health Screening",
    description:
      "Students will be screened for common skin conditions such as eczema, rashes, or signs of infections. Early identification and advice will be provided.",
    date: "15/12/2025",
    type: "checkup",
    status: "pending",
  },
  {
    id: 6,
    title: "Posture and Spine Check",
    description:
      "A posture and spine assessment will be conducted to identify any early signs of scoliosis or posture-related issues among students.",
    date: "20/01/2026",
    type: "checkup",
    status: "pending",
  },
  {
    id: 7,
    title: "Nutrition and BMI Assessment",
    description:
      "The school health team will assess students' nutritional status and BMI to promote healthy eating habits and physical well-being.",
    date: "15/02/2026",
    type: "checkup",
    status: "pending",
  },
  {
    id: 8,
    title: "Mental Health Awareness Screening",
    description:
      "An introductory mental health screening will be organized, focusing on identifying stress, anxiety, and emotional well-being. Support resources will be provided if needed.",
    date: "10/03/2026",
    type: "checkup",
    status: "pending",
  },
];

const Vaccination = () => {
  const [notifications, setNotifications] = useState(initialNotifications);
  const [selectNotification, setSelectNotification] = useState(null);
  const [response, setResponse] = useState({ consent: "yes", reason: "" });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = (notification) => {
    setSelectNotification(notification);
    setResponse({ consent: "yes", reason: "" });
    setIsModalOpen(true);
  };

  const handleConfirm = () => {
    setNotifications((prev) =>
      prev.map((n) =>
        n.id === selectNotification.id
          ? {
              ...n,
              status: response.consent === "yes" ? "completed" : "rejected",
            }
          : n
      )
    );
    setIsModalOpen(false);
  };

  const location = useLocation();
  const currentTab = location.pathname.split("/").pop() || "pending";

  const renderContent = () => {
    switch (currentTab) {
      case "completed":
        return <Completed notifications={notifications} />;
      case "rejected":
        return <Rejected notifications={notifications} />;
      case "pending":
      default:
        return (
          <Pending
            notifications={notifications}
            onOpenModal={handleOpenModal}
          />
        );
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <h1 className="pl-10 pt-5 text-xl font-inria font-medium mb-4">
        <CommonBreadcrumb role={"Parent"} page={"check up"} />
      </h1>
      <div className="p-6 flex flex-col flex-1">
        <h1 className="text-3xl font-bold text-blue-400 ml-5">
          CHECK UP NOTICE
        </h1>
        <p className="pt-5 ml-5 text-blue-400">
          Confirm student check up information
        </p>
        <div className="flex mt-5 bg-[#F3F3F3] font-kameron w-[500px] h-10 items-center rounded-xl ml-5">
          <div className="m-auto flex gap-5">
            <div className="hover:bg-white p-1 rounded-lg w-50">
              <Link
                to={""}
                className={currentTab === "pending" ? "font-bold" : ""}
              >
                Pending
              </Link>
            </div>
            <div className="hover:bg-white p-1 rounded-lg w-50">
              <Link
                to={"completed"}
                className={currentTab === "completed" ? "font-bold" : ""}
              >
                Completed
              </Link>
            </div>
            <div className="hover:bg-white p-1 rounded-lg w-50">
              <Link
                to={"rejected"}
                className={currentTab === "rejected" ? "font-bold" : ""}
              >
                Rejected
              </Link>
            </div>
          </div>
        </div>
        <div className="flex-1 overflow-auto mt-5 ml-5 mr-5">
          {renderContent()}
        </div>
        <div className="h-[160px] w-full"></div>
      </div>
      <AppFooter />
      <ModalResponse
        open={isModalOpen}
        notification={selectNotification}
        response={response}
        setResponse={setResponse}
        onConfirm={handleConfirm}
        onCancel={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default Vaccination;

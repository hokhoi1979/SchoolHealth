import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Pending from "./Pending";
import Completed from "./Completed";
import Rejected from "./Rejected";
import ModalResponse from "./ModalResponse";
import { AppFooter } from "../../../components/Footer/AppFooter";

const initialNotifications = [
  {
    id: 1,
    title: "Vaccination Notice",
    description:
      "The school organizes influenza vaccination for students. Please confirm your agreement or refusal.",
    date: "06/15/2025",
    type: "vaccination",
    status: "pending",
  },
  {
    id: 2,
    title: "Varicella (Chickenpox) Vaccination Notice",
    description:
      "The school is facilitating varicella vaccinations to protect students against chickenpox. Please confirm your agreement or refusal.",
    date: "08/15/2025",
    type: "vaccination",
    status: "pending",
  },
  {
    id: 3,
    title: "HPV Vaccination Notice",
    description:
      "The school coordinates with the Medical Center to organize HPV vaccination for students. Please confirm your agreement or refusal.",
    date: "07/10/2025",
    type: "vaccination",
    status: "pending",
  },
  {
    id: 4,
    title: "Measles, Mumps, and Rubella (MMR) Vaccination Notice",
    description:
      "The school is arranging MMR vaccinations to protect students against measles, mumps, and rubella. Please confirm your agreement or refusal.",
    date: "07/15/2025",
    type: "vaccination",
    status: "pending",
  },
  {
    id: 5,
    title: "Tetanus and Diphtheria (Td) Vaccination Notice",
    description:
      "The school, in collaboration with the local health department, is offering Td vaccinations for students. Please confirm your agreement or refusal.",
    date: "07/20/2025",
    type: "vaccination",
    status: "pending",
  },
  {
    id: 6,
    title: "Hepatitis B Vaccination Notice",
    description:
      "The school is organizing Hepatitis B vaccinations for students. Please confirm your agreement or refusal.",
    date: "08/05/2025",
    type: "vaccination",
    status: "pending",
  },
  {
    id: 7,
    title: "Meningococcal Vaccination Notice",
    description:
      "In partnership with the local health authority, the school is offering meningococcal vaccinations to prevent meningitis. Please confirm your agreement or refusal.",
    date: "08/20/2025",
    type: "vaccination",
    status: "pending",
  },
  {
    id: 8,
    title: "Pneumococcal Vaccination Notice",
    description:
      "The school is organizing pneumococcal vaccinations to protect students against pneumococcal diseases. Please confirm your agreement or refusal.",
    date: "09/01/2025",
    type: "vaccination",
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
      <div className="p-6 flex flex-col flex-1">
        <h1 className="text-3xl font-bold text-blue-400 ml-5">
          VACCINATION NOTICE
        </h1>
        <p className="pt-5 ml-5 text-blue-400">
          Confirm student immunization information
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

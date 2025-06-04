import { createBrowserRouter, Navigate } from "react-router-dom";
import Home from "../pages/Home/Home";

import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import SideBar from "../components/SideBar/SideBarNurse";
import Materials from "../pages/Nurse/Materials/Materials";
import NurseLayout from "../pages/Nurse/NurseLayout";
import MedicineForStudent from "../pages/Nurse/Materials/MedicineForStudent";
import Export from "../pages/Nurse/Materials/Export";
import Import from "../pages/Nurse/Materials/Import";
import Inventory from "../pages/Nurse/Materials/Inventory";
import RootLayout from "../layout/RootLayout";
import Dashboard from "../pages/Nurse/Dashboard/dashboard";

import Vaccination from "../pages/Nurse/Dashboard/Vaccination";
import Checkup from "../pages/Nurse/Dashboard/Checkup";
import Trend from "../pages/Nurse/Dashboard/Trend";
import StudentProfile from "../pages/Nurse/StudentProfile/StudentProfile";
import Medical from "../pages/Nurse/Dashboard/Medical";
import MedicalEvent from "../pages/Nurse/Medical/MedicalEvent";

import ParentLayout from "../pages/Parent/ParentLayout";

import StudentHealth from "../pages/Parent/StudentHealth/StudentHealth";
import GeneralInformation from "../pages/Parent/StudentHealth/Information";
import Allergies from "../pages/Parent/StudentHealth/Allergies";
import Chronic from "../pages/Parent/StudentHealth/Chronic";
import VisionHearing from "../pages/Parent/StudentHealth/VisionHearing";
import VaccinationParent from "../pages/Parent/StudentHealth/Vacciation";

import MedicalRequest from "../pages/Parent/MedicalRequest/MedicalRequest";
import MedicalUsing from "../pages/Parent/MedicalRequest/MedicationUsing";
import MedicalHistory from "../pages/Parent/MedicalRequest/MedicationHistory";

import VaccinationParentFunction from "../pages/Parent/Vaccination/Vaccination";
import VaccinationPending from "../pages/Parent/Vaccination/Pending";
import VaccinationCompleted from "../pages/Parent/Vaccination/Completed";
import VaccinationRejected from "../pages/Parent/Vaccination/Rejected";

import CheckUpParentFunction from "../pages/Parent/CheckUp/CheckUp";
import CheckUpPending from "../pages/Parent/CheckUp/Pending";
import CheckUpCompleted from "../pages/Parent/CheckUp/CheckUp";
import CheckUpRejected from "../pages/Parent/CheckUp/Rejected";

import HistoryParent from "../pages/Parent/StudentHistory/History";
import AllRecord from "../pages/Parent/StudentHistory/AllRecord";
import HealthInfor from "../pages/Parent/StudentHistory/HealthInfor";
import SendResult from "../pages/Parent/StudentHistory/SendResult";
import Notification from "../pages/Parent/StudentHistory/Notification";
const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { path: "", element: <Login /> },
      { path: "/register", element: <Register /> },
      { path: "/sidebar", element: <SideBar /> },
      {
        path: "nurse",
        element: <NurseLayout />,
        children: [
          { path: "", element: <Navigate to="dashboard" /> },
          {
            path: "dashboard",
            element: <Dashboard />,
            children: [
              { path: "", element: <Medical /> },
              { path: "vaccination", element: <Vaccination /> },
              { path: "checkup", element: <Checkup /> },
              { path: "trend", element: <Trend /> },
            ],
          },
          {
            path: "materials",
            element: <Materials />,
            children: [
              { path: "", element: <Inventory /> },
              { path: "import", element: <Import /> },
              { path: "export", element: <Export /> },
              { path: "medicine", element: <MedicineForStudent /> },
            ],
          },
          {
            path: "student",
            element: <StudentProfile />,
          },
          {
            path: "medical",
            element: <MedicalEvent />,
          },
        ],
      },
      {
        path: "parent",
        element: <ParentLayout />,
        children: [
          { path: "", element: <Navigate to="student_health" /> },
          {
            path: "student_health",
            element: <StudentHealth />,
            children: [
              { path: "", element: <GeneralInformation /> },
              { path: "allergies", element: <Allergies /> },
              { path: "chronic", element: <Chronic /> },
              { path: "vision_hearing", element: <VisionHearing /> },
              { path: "vaccination", element: <VaccinationParent /> },
            ],
          },
          {
            path: "medical_request",
            element: <MedicalRequest />,
            children: [
              { path: "", element: <MedicalUsing /> },
              { path: "medication_history", element: <MedicalHistory /> },
            ],
          },
          {
            path: "vaccination",
            element: <VaccinationParentFunction />,
            children: [
              { path: "", element: <VaccinationPending /> },
              { path: "completed", element: <VaccinationCompleted /> },
              { path: "rejected", element: <VaccinationRejected /> },
            ],
          },
          {
            path: "check_up",
            element: <CheckUpParentFunction />,
            children: [
              { path: "", element: <CheckUpPending /> },
              { path: "completed", element: <CheckUpCompleted /> },
              { path: "rejected", element: <CheckUpRejected /> },
            ],
          },
          {
            path: "history",
            element: <HistoryParent />,
            children: [
              {
                path: "",
                element: <AllRecord />,
              },
              { path: "health_infor", element: <HealthInfor /> },
              { path: "send_result", element: <SendResult /> },
              { path: "notification", element: <Notification /> },
            ],
          },
        ],
      },
    ],
  },
]);

export default router;

import { createBrowserRouter, Navigate } from "react-router-dom";
import NurseLayout from "../pages/Nurse/NurseLayout";
import RootLayout from "../layout/RootLayout";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import StudentProfile from "../pages/Nurse/StudentProfile/StudentProfile";

// Nurse imports

import DashboardNurse from "../pages/Nurse/Dashboard/DashboardNurse";
import Vaccination from "../pages/Nurse/Dashboard/Vaccination";
import Checkup from "../pages/Nurse/Dashboard/Checkup";
import Trend from "../pages/Nurse/Dashboard/Trend";
import Materials from "../pages/Nurse/Materials/Materials";
import Inventory from "../pages/Nurse/Materials/Inventory";
import Import from "../pages/Nurse/Materials/Import";
import Export from "../pages/Nurse/Materials/Export";
import MedicineForStudent from "../pages/Nurse/Materials/MedicineForStudent";

// Manager imports
import Home from "../pages/Home/Home";
import ManagerLayout from "../pages/Manager/ManagerLayout";
import Dashboard from "../pages/Nurse/Dashboard/DashboardNurse"; // Nếu bạn có Dashboard riêng cho Manager, nên thay lại path cho đúng
import MedicalCheckup from "../pages/Manager/MedicalCheckup/MedicalCheckupManager";
import VaccineManager from "../pages/Manager/vaccine/VaccineManager";
import MedicalManager from "../pages/Manager/Dashboard/MedicalManager";
import DashboardManager from "../pages/Manager/Dashboard/dashboardManager";
import VaccinationManager from "../pages/Manager/Dashboard/VaccinationManager";
import MedicalEvent from "../pages/Nurse/MedicalEvent/MedicalEvent";
import VaccineNurse from "../pages/Nurse/Vaccine/VaccineNurse";
import VaccineDay from "../pages/Nurse/Vaccine/VaccineDay";
import VaccineHistory from "../pages/Nurse/Vaccine/VaccineHistory";
import VaccineResult from "../pages/Nurse/Vaccine/VaccineResult";
import Medical from "../pages/Nurse/Dashboard/Medical";
import StudentList from "../pages/Nurse/Vaccine/StudentList";
import MedicalNurse from "../pages/Nurse/MedicalNurse/MedicalNurse";
import MedicalDay from "../pages/Nurse/MedicalNurse/MedicalDay";
import StudentListMedical from "../pages/Nurse/MedicalNurse/StudentListMedical";
import MedicalHistory from "../pages/Nurse/MedicalNurse/MedicalHistory";
import MedicalResult from "../pages/Nurse/MedicalNurse/MedicalResult";

// Parents import
import ParentLayout from "../pages/Parent/ParentLayout";
import StudentHealth from "../pages/Parent/StudentHealth/StudentHealth";
import MedicalRequest from "../pages/Parent/MedicalRequest/MedicalRequest";
import MedicalUsing from "../pages/Parent/MedicalRequest/MedicationUsing";
import MedicalHistoryParent from "../pages/Parent/MedicalRequest/MedicationHistory";
import VaccinationConfirm from "../pages/Parent/Vaccination/Vaccination";
import PendingVaccination from "../pages/Parent/Vaccination/Pending";
import CompletedVaccination from "../pages/Parent/Vaccination/Completed";
import RejectedVaccination from "../pages/Parent/Vaccination/Rejected";
import CheckUpConfirm from "../pages/Parent/CheckUp/CheckUp";
import PendingCheckUp from "../pages/Parent/CheckUp/Pending";
import CompletedCheckUp from "../pages/Parent/CheckUp/Completed";
import RejectedCheckUp from "../pages/Parent/CheckUp/Rejected";
import StudentHistory from "../pages/Parent/StudentHistory/History";
import AllRecord from "../pages/Parent/StudentHistory/AllRecord";
import HealthInfor from "../pages/Parent/StudentHistory/HealthInfor";
import SendResult from "../pages/Parent/StudentHistory/SendResult";
import Notification from "../pages/Parent/StudentHistory/Notification";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { path: "", element: <Home /> },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },

      // Nurse routes
      {
        path: "nurse",
        element: <NurseLayout />,
        children: [
          { path: "", element: <Navigate to="dashboard" /> },
          {
            path: "dashboard",
            element: <DashboardNurse />,
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
            path: "vaccine",
            element: <VaccineNurse />,
            children: [
              { path: "", element: <VaccineDay /> },
              { path: "studentList/:id", element: <StudentList /> },
              { path: "vaccineHistory", element: <VaccineHistory /> },
              { path: "vaccineResult", element: <VaccineResult /> },
            ],
          },
          {
            path: "medical",
            element: <MedicalNurse />,
            children: [
              { path: "", element: <MedicalDay /> },
              { path: "studentList", element: <StudentListMedical /> },
              { path: "medicalHistory", element: <MedicalHistory /> },
              { path: "medicalResult", element: <MedicalResult /> },
            ],
          },
          {
            path: "medicalEvent",
            element: <MedicalEvent />,
          },
        ],
      },

      // Manager routes
      {
        path: "/manager",
        element: <ManagerLayout />,
        children: [
          { path: "", element: <Navigate to="dashboard" /> },
          {
            path: "dashboard",
            element: <DashboardManager />,
            children: [
              { path: "", element: <MedicalManager /> },
              { path: "vaccinationManager", element: <VaccinationManager /> },
              { path: "checkupManager", element: <Checkup /> },
              { path: "trendManager", element: <Trend /> },
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
            path: "medicalcheckup",
            element: <MedicalCheckup />,
          },
          {
            path: "vaccine",
            element: <VaccineManager />,
            children: [
              { path: "", element: <MedicalManager /> },
              { path: "vaccination", element: <Vaccination /> },
              { path: "checkup", element: <Checkup /> },
              { path: "trend", element: <Trend /> },
            ],
          },
        ],
      },
      //Parents route
      {
        path: "parent",
        element: <ParentLayout />,
        children: [
          { path: "", element: <Navigate to="student_health" /> },
          {
            path: "student_health",
            element: <StudentHealth />,
          },
          {
            path: "medical_request",
            element: <MedicalRequest />,
            children: [
              { path: "", element: <MedicalUsing /> },
              { path: "medication_history", element: <MedicalHistoryParent /> },
            ],
          },
          {
            path: "vaccination_confirm",
            element: <VaccinationConfirm />,
            children: [
              { path: "", element: <PendingVaccination /> },
              { path: "completed", element: <CompletedVaccination /> },
              { path: "rejected", element: <RejectedVaccination /> },
            ],
          },
          {
            path: "check_up_confirm",
            element: <CheckUpConfirm />,
            children: [
              { path: "", element: <PendingCheckUp /> },
              { path: "completed", element: <CompletedCheckUp /> },
              { path: "rejected", element: <RejectedCheckUp /> },
            ],
          },
          {
            path: "history",
            element: <StudentHistory />,
            children: [
              { path: "", element: <AllRecord /> },
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

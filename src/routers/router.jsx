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
import MedicineForStudent from "../pages/Nurse/Materials/MedicineForStudent";
import NurseInfor from "../pages/Nurse/NurseInformation/NurseInformation";
import ChangePasswordNurse from "../pages/Nurse/ChangePassword/ChangePassword";

// Manager imports
import Home from "../pages/Home/Home";
import ManagerLayout from "../pages/Manager/ManagerLayout";
import MedicalCheckup from "../pages/Manager/MedicalCheckup/MedicalCheckupManager";
import VaccineManager from "../pages/Manager/vaccine/VaccineManager";
import ImportManager from "../pages/Manager/MaterialManagement/ImportManager";
import MaterialManage from "../pages/Manager/MaterialManagement/MaterialManage";
import InventoryManager from "../pages/Manager/MaterialManagement/InventoryManager";
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
import ManagerInfor from "../pages/Manager/ManagerInformation/ManagerInformation";
import ChangePasswordManager from "../pages/Manager/ChangePassword/ChangePassword";

// Parents import
import ParentLayout from "../pages/Parent/ParentLayout";
import StudentHealth from "../pages/Parent/StudentHealth/StudentHealth";
import MedicalRequest from "../pages/Parent/MedicalRequest/MedicalRequest";
import MedicalUsing from "../pages/Parent/MedicalRequest/MedicationUsing";
import MedicalHistoryParent from "../pages/Parent/MedicalRequest/MedicationHistory";
import NotificationRequest from "../pages/Parent/MedicalRequest/Notification";
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
import MedicineSchedule from "../pages/Nurse/Materials/MedicineSchedule";
import RequestManager from "../pages/Manager/Request/RequestManager";
import ManagerMedicalEvent from "../pages/Manager/MedicalEventMedical/managerMedicalEvent";
import ParentInfor from "../pages/Parent/ParentInformation/ParentInformation";
import ChangePasswordParent from "../pages/Parent/ChangePassword/ChangePassword";

//Students import
import StudentLayout from "../pages/Student/StudentLayout";
import StudentInformation from "../pages/Student/StudentInformation/StudentInformation";
import ChangePassword from "../pages/Student/ChangePassword/ChangePassword";
import PrivateRoute from "./privateRoute";
import News from "../pages/News/news";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { path: "", element: <Home /> },
      { path: "/news", element: <News /> },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },

      // Nurse routes
      {
        path: "nurse",
        // chỉ kiểm tra ở đây
        element: <PrivateRoute allowedRoles={[3]} />,
        children: [
          {
            path: "",
            element: <NurseLayout />,
            children: [
              { path: "", element: <Navigate to="materials" /> },

              {
                path: "materials",
                element: <Materials />,
                children: [
                  { path: "", element: <Inventory /> },
                  { path: "import", element: <Import /> },
                  { path: "medicine", element: <MedicineForStudent /> },
                  { path: "schedule", element: <MedicineSchedule /> },
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
                  {
                    path: "studentListCheckup/:id",
                    element: <StudentListMedical />,
                  },
                  { path: "medicalHistory", element: <MedicalHistory /> },
                  { path: "medicalResult", element: <MedicalResult /> },
                ],
              },
              {
                path: "medicalEvent",
                element: <MedicalEvent />,
              },
              { path: "information", element: <NurseInfor /> },
              { path: "change_password", element: <ChangePasswordNurse /> },
            ],
          },
        ],
      },

      // Manager routes
      {
        path: "manager",
        children: [
          {
            path: "",
            element: <ManagerLayout />,
            children: [
              {
                path: "",
                element: <Navigate to="materials" />,
              },
              {
                path: "materials",
                element: <MaterialManage />,
                children: [
                  { path: "", element: <InventoryManager /> },
                  { path: "importManager", element: <ImportManager /> },
                  // { path: "exportManager", element: <VaccinationManager /> },

                  { path: "medicineManager", element: <Trend /> },
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
                  { path: "vaccination", element: <Vaccination /> },
                  { path: "checkup", element: <Checkup /> },
                  { path: "trend", element: <Trend /> },
                ],
              },
              {
                path: "requestManager",
                element: <RequestManager />,
                // children: [
                //   { path: "vaccination", element: <Vaccination /> },
                //   { path: "checkup", element: <Checkup /> },
                //   { path: "trend", element: <Trend /> },
                // ],
              },
              {
                path: "managerMedicalEvent",
                element: <ManagerMedicalEvent />,
              },
              { path: "information", element: <ManagerInfor /> },
              { path: "change_password", element: <ChangePasswordManager /> },
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
              { path: "", element: <MedicalHistoryParent /> },
              // { path: "medication_history", element: <MedicalHistoryParent /> },
              { path: "notification", element: <NotificationRequest /> },
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
          {
            path: "information",
            element: <ParentInfor />,
          },
          { path: "change_password", element: <ChangePasswordParent /> },
        ],
      },
      //Student route
      {
        path: "student",
        element: <StudentLayout />,
        children: [
          { path: "", element: <Navigate to="student_information" /> },
          { path: "student_information", element: <StudentInformation /> },
          { path: "change_password", element: <ChangePassword /> },
        ],
      },
    ],
  },
]);

export default router;

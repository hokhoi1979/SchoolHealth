import { createBrowserRouter, Navigate } from "react-router-dom";
import MedicalEvent from "../pages/Nurse/Medical/MedicalEvent";
import NurseLayout from "../pages/Nurse/NurseLayout";
import RootLayout from "../layout/RootLayout";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import StudentProfile from "../pages/Nurse/StudentProfile/StudentProfile";

// Nurse imports
import VaccineDay from "../pages/Nurse/Medical/VaccineDay";
import StudentList from "../pages/Nurse/Medical/StudentList";
import VaccineHistory from "../pages/Nurse/Medical/VaccineHistory";
import DashboardNurse from "../pages/Nurse/Dashboard/DashboardNurse";
import Medical from "../pages/Nurse/Dashboard/Medical";
import Vaccination from "../pages/Nurse/Dashboard/Vaccination";
import Checkup from "../pages/Nurse/Dashboard/Checkup";
import Trend from "../pages/Nurse/Dashboard/Trend";
import Materials from "../pages/Nurse/Materials/Materials";
import Inventory from "../pages/Nurse/Materials/Inventory";
import Import from "../pages/Nurse/Materials/Import";
import Export from "../pages/Nurse/Materials/Export";
import MedicineForStudent from "../pages/Nurse/Materials/MedicineForStudent";

import VaccineResult from "../pages/Nurse/Medical/VaccineResult";

// Manager imports
import Home from "../pages/Home/Home";
import ManagerLayout from "../pages/Manager/ManagerLayout";
import Dashboard from "../pages/Nurse/Dashboard/DashboardNurse";
import MedicalCheckup from "../pages/Manager/MedicalCheckup/MedicalCheckupManager";
import VaccineManager from "../pages/Manager/vaccine/VaccineManager";
import MedicalManager from "../pages/Manager/Dashboard/MedicalManager";
import DashboardManager from "../pages/Manager/Dashboard/dashboardManager";
import VaccinationManager from "../pages/Manager/Dashboard/VaccinationManager";
import ImportManager from "../pages/Manager/MaterialManagement/ImportManager";

import MaterialManage from "../pages/Manager/MaterialManagement/MaterialManage";
import InventoryManager from "../pages/Manager/MaterialManagement/InventoryManager";

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
            path: "medical",
            element: <MedicalEvent />,
            children: [
              { path: "", element: <VaccineDay /> },
              { path: "studentList", element: <StudentList /> },
              { path: "vaccineHistory", element: <VaccineHistory /> },
              { path: "vaccineResult", element: <VaccineResult /> },
            ],
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
            element: <MaterialManage />,
            children: [
              { path: "inventoryManager", element: <InventoryManager /> },
              { path: "importManager", element: <ImportManager /> },
              { path: "exportManager", element: <VaccinationManager /> },

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
              { path: "", element: <MedicalManager /> },
              { path: "vaccination", element: <Vaccination /> },
              { path: "checkup", element: <Checkup /> },
              { path: "trend", element: <Trend /> },
            ],
          },
        ],
      },
    ],
  },
]);

export default router;

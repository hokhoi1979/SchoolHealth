import { createBrowserRouter, Navigate } from "react-router-dom";


import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import SideBar from "../components/SideBar/SideBarNurse";
import Materials from "../pages/Manager/Materials/Materials";
import NurseLayout from "../pages/Nurse/NurseLayout";
import MedicineForStudent from "../pages/Manager/Materials/MedicineForStudent";
import Export from "../pages/Manager/Materials/Export";
import Import from "../pages/Manager/Materials/Import";
import Inventory from "../pages/Manager/Materials/Inventory";
import RootLayout from "../layout/RootLayout";
import Dashboard from "../pages/Manager/Dashboard/dashboard";

import Vaccination from "../pages/Manager/Dashboard/Vaccination";
import Checkup from "../pages/Manager/Dashboard/Checkup";
import Trend from "../pages/Manager/Dashboard/Trend";
import StudentProfile from "../pages/Nurse/StudentProfile/StudentProfile";
import Medical from "../pages/Manager/Dashboard/Medical";
import MedicalEvent from "../pages/Nurse/Medical/MedicalEvent";
import Home from "../pages/Home/Home";
import ManagerLayout from "../pages/Manager/ManagerLayout";
import MedicalCheckup from "../pages/Manager/MedicalCheckup/MedicalCheckup";


const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { path: "", element: <Home /> },
      {path: "/login",element:<Login/>},
      {path: "/register",element:<Register/>},
      {
        path: "nurse",
        element: <NurseLayout />,
        children: [
          { path: "", element: <Navigate to="dashboard" /> }, // chuyển hướng mặc định
          {
            path: "dashboard",
            element: <Dashboard />,
            children: [
              { path: "", element: <Medical /> }, // index
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
      //
      {
        path: "/manager",
        element: <ManagerLayout/>,
        children: [
          { path: "", element: <Navigate to="dashboard" /> }, // chuyển hướng mặc định
          {
            path: "dashboard",
            element: <Dashboard />,
            children: [
              { path: "", element: <Medical /> }, // index
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
            path: "medicalcheckup",
            element: <MedicalCheckup/>,
          },
          
        ],
      },
    ],
  },
]);

export default router;

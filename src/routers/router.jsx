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
    ],
  },
]);

export default router;

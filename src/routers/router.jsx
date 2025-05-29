import { createBrowserRouter, Navigate } from "react-router-dom";
import MedicalEvent from "../pages/Nurse/Medical/MedicalEvent";
import NurseLayout from "../pages/Nurse/NurseLayout";
import RootLayout from "../layout/RootLayout";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import StudentProfile from "../pages/Nurse/StudentProfile/StudentProfile";
import Home from "../pages/Home/Home";
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
const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { path: "", element: <Home /> },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },

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
    ],
  },
]);

export default router;

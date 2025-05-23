import { createBrowserRouter } from "react-router-dom";

import RootLayout from "../layout/RootLayout";
import NurseLayout from "../pages/Nurse/NurseLayout";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import Dashboard from "../pages/Nurse/Dashboard/Dashboard";
import Materials from "../pages/Nurse/Materials/Materials";
import StudentProfile from "../pages/Nurse/StudentProfile/StudentProfile";
import MedicalEvent from "../pages/Nurse/Medical/MedicalEvent";
import Vaccine from "../pages/Nurse/Vaccine/Vaccine";
import MedicalCheckup from "../pages/Nurse/Medical/MedicalCheckup";
import History from "../pages/Nurse/Medical/History";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { path: "", element: <Login /> },
      { path: "/register", element: <Register /> },
      {
        path: "nurse",
        element: <NurseLayout />,
        children: [
          { path: "", element: <Dashboard /> },
          { path: "materials", element: <Materials /> },
          { path: "student-profile", element: <StudentProfile /> },
          { path: "medical-event", element: <MedicalEvent /> },
          { path: "vaccine", element: <Vaccine /> },
          { path: "medical-checkup", element: <MedicalCheckup /> },
          { path: "history", element: <History /> },
        ],
      },
    ],
  },
]);

export default router;

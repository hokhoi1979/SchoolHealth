import { createBrowserRouter, Navigate } from "react-router-dom";
<<<<<<< HEAD

=======
import Home from "../pages/Home/Home";
>>>>>>> 9b84723843da697e903b71fa5b4a96b30dd5c000

import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import SideBar from "../components/SideBar/SideBarNurse";
<<<<<<< HEAD
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

=======
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
>>>>>>> 9b84723843da697e903b71fa5b4a96b30dd5c000

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
<<<<<<< HEAD
      { path: "", element: <Home /> },
      {path: "/login",element:<Login/>},
      {path: "/register",element:<Register/>},
=======
      { path: "", element: <Login /> },
      { path: "/register", element: <Register /> },
      { path: "/sidebar", element: <SideBar /> },
>>>>>>> 9b84723843da697e903b71fa5b4a96b30dd5c000
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
<<<<<<< HEAD
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
          
=======
>>>>>>> 9b84723843da697e903b71fa5b4a96b30dd5c000
        ],
      },
    ],
  },
]);

export default router;

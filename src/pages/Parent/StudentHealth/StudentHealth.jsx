import React from "react";
import CommonBreadcrumb from "../../../components/CommonBreadcrumb/CommonBreadcrumb";
import { Link, Outlet } from "react-router-dom";
import { AppFooter } from "../../../components/Footer/AppFooter";

const StudentHealth = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="p-6 flex flex-col flex-1">
        <h1 className="text-3xl font-bold text-blue-400 ml-5">
          STUDENT HEALTH RECORD
        </h1>
        <p className="pt-5 ml-5 text-blue-400">
          Declare student health information so the school can provide the best
          care.
        </p>
        <div className="flex mt-5 bg-[#F3F3F3] font-kameron w-[500px] h-10 items-center rounded-xl ml-5 font-kameron">
          <div className="m-auto flex gap-5">
            <div className="hover:bg-white p-1 rounded-lg w-50">
              <Link to={""}>General Information</Link>
            </div>
            <div className="hover:bg-white p-1 rounded-lg w-50">
              <Link to={"allergies"}>Allergies</Link>
            </div>
            <div className="hover:bg-white p-1 rounded-lg w-50">
              <Link to={"chronic"}>Chronic</Link>
            </div>
            <div className="hover:bg-white p-1 rounded-lg w-50">
              <Link to={"vision_hearing"}>Vision and Hearing</Link>
            </div>
            <div className="hover:bg-white p-1 rounded-lg w-50">
              <Link to={"vaccination"}>Vaccination</Link>
            </div>
          </div>
        </div>
        <div className="flex-1 overflow-auto mt-5 ml-5 mr-5">
          <Outlet />
        </div>
        <div className="h-[160px] w-full"></div>
      </div>
      <AppFooter />
    </div>
  );
};

export default StudentHealth;

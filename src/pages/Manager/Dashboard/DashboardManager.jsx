import React, { useEffect, useState } from "react";
import CommonBreadcrumb from "../../../components/CommonBreadcrumb/CommonBreadcrumb";
import { Link, Outlet } from "react-router-dom";
import { AppFooter } from "../../../components/Footer/AppFooter";

const DashboardManager = () => {
  const [click, setClick] = useState("event");

  return (
    <>
      <div className="flex flex-col min-h-screen">
        <div className="p-6 flex flex-col flex-1">
          <h1 className="text-xl font-inria font-medium mb-4">
            <CommonBreadcrumb role={"Manager"} page={"dashboard"} />
          </h1>

          <div className="grid grid-cols-4 gap-5 mt-5 w-[100%] pl-5 pr-5 font-kameron ">
            <div className="h-[120px] bg-white rounded-2xl">
              <p className="flex justify-center mt-5">Today's Medical Events</p>
              <p className="flex justify-center text-[50px]">7</p>
            </div>
            <div className="h-[120px] bg-white rounded-2xl">
              <p className="flex justify-center mt-5">Vaccination Rate</p>
              <p className="flex justify-center text-[50px]">72%</p>
            </div>
            <div className="h-[120px] bg-white rounded-2xl">
              <p className="flex justify-center mt-5">Health Check</p>
              <p className="flex justify-center text-[50px]">28/6</p>
            </div>
            <div className="h-[120px] bg-white rounded-2xl">
              <p className="flex justify-center mt-5">
                Examination Participation Rate
              </p>
              <p className="flex justify-center text-[50px]">95%</p>
            </div>
          </div>

          <div className="flex mt-5 bg-[#F3F3F3] font-kameron w-[500px] h-10 items-center rounded-xl ml-5">
            <div className=" m-auto flex gap-5">
              <div
                className={`hover:bg-white p-1 rounded-lg ${
                  click === "event" ? "bg-white rounded-md text-black" : ""
                }`}
              >
                <Link to={""} onClick={() => setClick("event")}>
                  Medical Events
                </Link>
              </div>
              <div
                className={`hover:bg-white p-1 rounded-lg ${
                  click === "vaccine" ? "bg-white rounded-md text-black" : ""
                }`}
              >
                <Link
                  to={"vaccinationManager"}
                  onClick={() => setClick("vaccine")}
                >
                  Vaccination
                </Link>
              </div>
              <div
                className={`hover:bg-white p-1 rounded-lg ${
                  click === "checkup" ? "bg-white rounded-md text-black" : ""
                }`}
              >
                <Link to={"checkupManager"} onClick={() => setClick("checkup")}>
                  Medical Checkup
                </Link>
              </div>
              <div
                className={`hover:bg-white p-1 rounded-lg ${
                  click === "trend" ? "bg-white rounded-md text-black" : ""
                }`}
              >
                <Link to={"trendManager"} onClick={() => setClick("trend")}>
                  Trend
                </Link>
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
    </>
  );
};

export default DashboardManager;

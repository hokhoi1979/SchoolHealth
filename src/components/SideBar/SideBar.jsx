import React from "react";
import logo from "../../img/logo.png";
import { Link, useLocation } from "react-router-dom";

const SideBar = () => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <>
      <div className="w-[19%] h-full bg-white pt-2 pb-2 font-inria">
        <div className="flex items-center pt-2 pb-2  pl-1 pr-1 gap-3">
          <div className="flex items-center">
            <div className="w-[80px] ">
              <img
                src={logo}
                className="flex text-center justify-center"
                width="120%"
                alt=""
              />
              <p className="font-inria text-center justify-center text-[13px] font-bold text-[#040404] ">
                Heath Care
              </p>
            </div>
            <h1 className="font-inria text-xl font-bold text-center justify-center items-center">
              School Health Care
            </h1>
          </div>
          <div style={{ cursor: "pointer" }}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              viewBox="0 0 24 24"
            >
              <path
                fill="#040404"
                d="m7.825 13l5.6 5.6L12 20l-8-8l8-8l1.425 1.4l-5.6 5.6H20v2z"
              />
            </svg>
          </div>
        </div>

        <div className="w-full h-[2px] bg-black"></div>

        <div className="pl-3 pr-3 pt-5">
          <div
            className={`flex items-center gap-4 ${
              isActive("/nurse") ? "text-blue-600" : ""
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              viewBox="0 0 24 24"
            >
              <path
                fill={isActive("/nurse") ? "#2563eb" : "#040404"}
                d="M2 13h6v8H2zm14-5h6v13h-6zM9 3h6v18H9zM4 15v4h2v-4zm7-10v14h2V5zm7 5v9h2v-9z"
              />
            </svg>
            <Link to="/nurse" className="text-[18px]">
              Dash Board
            </Link>
          </div>

          <div
            className={`flex items-center gap-4 pt-5 ${
              isActive("/nurse/materials") ? "text-blue-600" : ""
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              viewBox="0 0 24 24"
            >
              <path
                fill={isActive("/nurse/materials") ? "#2563eb" : "#040404"}
                stroke={isActive("/nurse/materials") ? "#2563eb" : "#040404"}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m12 3l8 4.5v9L12 21l-8-4.5v-9zm0 9l8-4.5M12 12v9m0-9L4 7.5"
              />
            </svg>
            <Link to="/nurse/materials" className="text-[18px]">
              Materials
            </Link>
          </div>

          <div
            className={`flex items-center gap-4 pt-5 ${
              isActive("/nurse/student-profile") ? "text-blue-600" : ""
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              viewBox="0 0 24 24"
            >
              <path
                fill={
                  isActive("/nurse/student-profile") ? "#2563eb" : "#040404"
                }
                d="M20 22h-2v-2a3 3 0 0 0-3-3H9a3 3 0 0 0-3 3v2H4v-2a5 5 0 0 1 5-5h6a5 5 0 0 1 5 5zm-8-9a6 6 0 1 1 0-12a6 6 0 0 1 0 12m0-2a4 4 0 1 0 0-8a4 4 0 0 0 0 8"
              />
            </svg>
            <Link to="/nurse/student-profile" className="text-[18px]">
              Student Profile
            </Link>
          </div>

          <div
            className={`flex items-center gap-4 pt-5 ${
              isActive("/nurse/medical-event") ? "text-blue-600" : ""
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              viewBox="0 0 24 24"
            >
              <path
                fill={isActive("/nurse/medical-event") ? "#2563eb" : "#040404"}
                d="M5 3v16h16v2H3V3zm14.94 2.94l2.12 2.12L16 14.122l-3-3l-3.94 3.94l-2.12-2.122L13 6.88l3 3z"
              />
            </svg>
            <Link to="/nurse/medical-event" className="text-[18px]">
              Medical Event
            </Link>
          </div>

          <div
            className={`flex items-center gap-4 pt-5 ${
              isActive("/nurse/vaccine") ? "text-blue-600" : ""
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              viewBox="0 0 24 24"
            >
              <path
                fill={isActive("/nurse/vaccine") ? "#2563eb" : "#040404"}
                stroke={isActive("/nurse/vaccine") ? "#2563eb" : "#040404"}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m17 3l4 4m-2-2l-4.5 4.5m-3-3l6 6m-1-1L10 18H6v-4l6.5-6.5m-5 5L9 14m1.5-4.5L12 11M3 21l3-3"
              />
            </svg>
            <Link to="/nurse/vaccine" className="text-[18px]">
              Vaccine Management
            </Link>
          </div>

          <div
            className={`flex items-center gap-4 pt-5 ${
              isActive("/nurse/medical-checkup") ? "text-blue-600" : ""
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              viewBox="0 0 24 24"
            >
              <path
                fill={
                  isActive("/nurse/medical-checkup") ? "#2563eb" : "#040404"
                }
                d="M5 22q-.825 0-1.412-.587T3 20V6q0-.825.588-1.412T5 4h1V3q0-.425.288-.712T7 2t.713.288T8 3v1h8V3q0-.425.288-.712T17 2t.713.288T18 3v1h1q.825 0 1.413.588T21 6v14q0 .825-.587 1.413T19 22zm0-2h14V10H5zM5 8h14V6H5zm0 0V6zm3 6q-.425 0-.712-.288T7 13t.288-.712T8 12h8q.425 0 .713.288T17 13t-.288.713T16 14zm0 4q-.425 0-.712-.288T7 17t.288-.712T8 16h5q.425 0 .713.288T14 17t-.288.713T13 18z"
              />
            </svg>
            <Link to="/nurse/medical-checkup" className="text-[18px]">
              Medical Checkup
            </Link>
          </div>

          <div
            className={`flex items-center gap-4 pt-5 ${
              isActive("/nurse/history") ? "text-blue-600" : ""
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              viewBox="0 0 24 24"
            >
              <path
                fill={isActive("/nurse/history") ? "#2563eb" : "#040404"}
                d="M12 22q-3.55 0-6.262-2.175t-3.488-5.55q-.1-.425.15-.763t.675-.387t.75.2t.45.675q.675 2.625 2.813 4.313T12 20q3.35 0 5.675-2.325T20 12t-2.325-5.675T12 4Q9.85 4 8.012 5.062T5.1 8H7q.425 0 .713.288T8 9t-.288.713T7 10H3.6q-.55 0-.875-.437t-.15-.938q1.05-2.95 3.625-4.788T12 2q2.075 0 3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22m1-10.4l2.5 2.5q.275.275.275.7t-.275.7t-.7.275t-.7-.275l-2.8-2.8q-.15-.15-.225-.337T11 11.975V8q0-.425.288-.712T12 7t.713.288T13 8z"
              />
            </svg>
            <Link to="/nurse/history" className="text-[18px]">
              History & Report
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default SideBar;

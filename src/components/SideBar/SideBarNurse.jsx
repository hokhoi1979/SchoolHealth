import React, { useEffect, useState } from "react";
import logo from "../../img/icon.png";
import { Link, useNavigate } from "react-router";
import bs from "../../img/bs.png";
import { useDispatch, useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";
import { fetchSuccess, logout } from "../../redux/auth/authSlice";
const SideBar = () => {
  const [click, setClick] = useState("");
  const [toggle, setToggle] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { token } = useSelector((state) => state.account);

  const handleToggle = () => {
    setToggle((pre) => !pre);
  };

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    dispatch(logout());
    navigate("/login");
  };

  useEffect(() => {
    if (token) {
      const decode = jwtDecode(token);
      dispatch(fetchSuccess({ user: decode, token: token }));
    }
  }, [dispatch]);
  return (
    <>
      <div
        className={` h-full bg-white pt-2 pb-2 font-inria flex flex-col ${
          toggle ? "w-[8%] " : "w-[18%]"
        }  transition-all duration-400 ease-in-out overflow-hidden`}
      >
        <div className="flex items-center pt-2 pb-2  pl-1 pr-1 gap-3">
          <div className="flex items-center">
            <div className="w-[70px]">
              <img src={logo} className="flex m-auto" width="60%" alt="" />
              <p className="font-inria text-center justify-center text-[10px] font-medium text-[#040404] font-kameron">
                Heath Care
              </p>
            </div>
            {!toggle && (
              <div className="w-[127px]">
                {" "}
                <h1 className="font-inria text-[16px] pl-6 font-medium text-center justify-center items-center">
                  School Health
                </h1>
              </div>
            )}
          </div>
          {!toggle && (
            <div
              style={{ cursor: "pointer", marginLeft: 10 }}
              onClick={handleToggle}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                viewBox="0 0 24 24"
              >
                <path
                  fill="#040404"
                  d="M11.46 8.29a1 1 0 0 0-1.42 0l-3 3a1 1 0 0 0 0 1.42l3 3a1 1 0 0 0 1.42 0a1 1 0 0 0 0-1.42L9.16 12l2.3-2.29a1 1 0 0 0 0-1.42m3.2 3.71L17 9.71a1 1 0 0 0-1.42-1.42l-3 3a1 1 0 0 0 0 1.42l3 3a1 1 0 0 0 1.42 0a1 1 0 0 0 0-1.42Z"
                />
              </svg>
            </div>
          )}
          {toggle && (
            <div style={{ cursor: "pointer" }} onClick={handleToggle}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                viewBox="0 0 24 24"
              >
                <path
                  fill="#040404"
                  d="M8.46 8.29A1 1 0 1 0 7 9.71L9.34 12L7 14.29a1 1 0 0 0 0 1.42a1 1 0 0 0 1.42 0l3-3a1 1 0 0 0 0-1.42Zm8.5 3l-3-3a1 1 0 0 0-1.42 1.42l2.3 2.29l-2.3 2.29a1 1 0 0 0 0 1.42a1 1 0 0 0 1.42 0l3-3a1 1 0 0 0 .04-1.42Z"
                />
              </svg>
            </div>
          )}
        </div>

        <div className="w-full h-[2px] bg-[#5B5454]"></div>

        <div className="pl-3 pr-3 pt-5 text-[#5B5454]">
          <div
            className={`flex items-center gap-4  hover:bg-[#EFEEEE] p-2 rounded-xl ${
              click === "dashboard"
                ? "bg-[#EFEEEE] p-2 rounded-xl text-black"
                : ""
            } ${toggle && "justify-center"} `}
            style={{ cursor: "pointer" }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              viewBox="0 0 24 24"
              className="text-[#5B5454]"
            >
              <path
                fill="#5B5454"
                d="M2 13h6v8H2zm14-5h6v13h-6zM9 3h6v18H9zM4 15v4h2v-4zm7-10v14h2V5zm7 5v9h2v-9z"
              />
            </svg>
            {!toggle && (
              <Link
                onClick={() => setClick("dashboard")}
                to={"/nurse"}
                className="text-[18px]"
              >
                Dash Board
              </Link>
            )}
          </div>

          <div
            className={`flex items-center gap-4 mt-1 hover:bg-[#EFEEEE] p-2 rounded-xl ${
              click === "materials"
                ? "bg-[#EFEEEE] p-2 rounded-xl text-black"
                : ""
            } ${toggle && "justify-center"}`}
            style={{ cursor: "pointer" }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              viewBox="0 0 24 24"
            >
              <path
                fill="none"
                stroke="#5B5454"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m12 3l8 4.5v9L12 21l-8-4.5v-9zm0 9l8-4.5M12 12v9m0-9L4 7.5"
              />
            </svg>
            {!toggle && (
              <Link
                onClick={() => setClick("materials")}
                to={"/nurse/materials"}
                className="text-[18px]"
              >
                Materials
              </Link>
            )}
          </div>

          <div
            className={`flex items-center gap-4 mt-1 hover:bg-[#EFEEEE] p-2 rounded-xl ${
              click === "profile"
                ? "bg-[#EFEEEE] p-2 rounded-xl text-black"
                : ""
            } ${toggle && "justify-center"}`}
            style={{ cursor: "pointer" }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              viewBox="0 0 24 24"
            >
              <path
                fill="#5B5454"
                d="M20 22h-2v-2a3 3 0 0 0-3-3H9a3 3 0 0 0-3 3v2H4v-2a5 5 0 0 1 5-5h6a5 5 0 0 1 5 5zm-8-9a6 6 0 1 1 0-12a6 6 0 0 1 0 12m0-2a4 4 0 1 0 0-8a4 4 0 0 0 0 8"
              />
            </svg>
            {!toggle && (
              <Link
                onClick={() => setClick("profile")}
                to={"/nurse/student"}
                className="text-[18px]"
              >
                Student Profile
              </Link>
            )}
          </div>

          <div
            className={`flex items-center gap-4 mt-1 hover:bg-[#EFEEEE] p-2 rounded-xl ${
              click === "medical"
                ? "bg-[#EFEEEE] p-2 rounded-xl text-black"
                : ""
            } ${toggle && "justify-center"}`}
            style={{ cursor: "pointer" }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              viewBox="0 0 24 24"
            >
              <path
                fill="#5B5454"
                d="M5 3v16h16v2H3V3zm14.94 2.94l2.12 2.12L16 14.122l-3-3l-3.94 3.94l-2.12-2.122L13 6.88l3 3z"
              />
            </svg>
            {!toggle && (
              <Link
                onClick={() => setClick("medical")}
                to={"/nurse/medicalEvent"}
                className="text-[18px]"
              >
                Medical Event
              </Link>
            )}
          </div>

          <div
            className={`flex items-center gap-4 mt-1 hover:bg-[#EFEEEE] p-2 rounded-xl ${
              click === "vaccine"
                ? "bg-[#EFEEEE] p-2 rounded-xl text-black"
                : ""
            } ${toggle && "justify-center"}`}
            style={{ cursor: "pointer" }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              viewBox="0 0 24 24"
            >
              <path
                fill="none"
                stroke="#5B5454"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m17 3l4 4m-2-2l-4.5 4.5m-3-3l6 6m-1-1L10 18H6v-4l6.5-6.5m-5 5L9 14m1.5-4.5L12 11M3 21l3-3"
              />
            </svg>
            {!toggle && (
              <Link
                onClick={() => setClick("vaccine")}
                to={"/nurse/vaccine"}
                className="text-[18px]"
              >
                Vaccine Management
              </Link>
            )}
          </div>

          <div
            className={`flex items-center gap-4 mt-1 hover:bg-[#EFEEEE] p-2 rounded-xl ${
              click === "checkup"
                ? "bg-[#EFEEEE] p-2 rounded-xl text-black"
                : ""
            } ${toggle && "justify-center"}`}
            style={{ cursor: "pointer" }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              viewBox="0 0 24 24"
            >
              <path
                fill="#5B5454"
                d="M5 22q-.825 0-1.412-.587T3 20V6q0-.825.588-1.412T5 4h1V3q0-.425.288-.712T7 2t.713.288T8 3v1h8V3q0-.425.288-.712T17 2t.713.288T18 3v1h1q.825 0 1.413.588T21 6v14q0 .825-.587 1.413T19 22zm0-2h14V10H5zM5 8h14V6H5zm0 0V6zm3 6q-.425 0-.712-.288T7 13t.288-.712T8 12h8q.425 0 .713.288T17 13t-.288.713T16 14zm0 4q-.425 0-.712-.288T7 17t.288-.712T8 16h5q.425 0 .713.288T14 17t-.288.713T13 18z"
              />
            </svg>
            {!toggle && (
              <Link
                onClick={() => setClick("checkup")}
                to={"/nurse/medical"}
                className="text-[18px]"
              >
                Medical Checkup
              </Link>
            )}
          </div>

          <div
            className={`flex items-center gap-4 mt-1 hover:bg-[#EFEEEE] p-2 rounded-xl ${
              click === "history"
                ? "bg-[#EFEEEE] p-2 rounded-xl text-black"
                : ""
            } ${toggle && "justify-center"}`}
            style={{ cursor: "pointer" }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              viewBox="0 0 24 24"
            >
              <path
                fill="#5B5454"
                d="M12 22q-3.55 0-6.262-2.175t-3.488-5.55q-.1-.425.15-.763t.675-.387t.75.2t.45.675q.675 2.625 2.813 4.313T12 20q3.35 0 5.675-2.325T20 12t-2.325-5.675T12 4Q9.85 4 8.012 5.062T5.1 8H7q.425 0 .713.288T8 9t-.288.713T7 10H3.6q-.55 0-.875-.437t-.15-.938q1.05-2.95 3.625-4.788T12 2q2.075 0 3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22m1-10.4l2.5 2.5q.275.275.275.7t-.275.7t-.7.275t-.7-.275l-2.8-2.8q-.15-.15-.225-.337T11 11.975V8q0-.425.288-.712T12 7t.713.288T13 8z"
              />
            </svg>
            {!toggle && (
              <Link
                onClick={() => setClick("history")}
                to={"/nurse"}
                className="text-[18px]"
              >
                History & Report
              </Link>
            )}
          </div>
        </div>

        <div className="w-full h-[2px] bg-[#5B5454] mt-auto"></div>

        <div className="flex pl-2 pt-2 justify-between pr-6 ">
          {!toggle && (
            <div className="flex gap-3">
              <div className="w-[60px] h-[60px] bg-gray-600 rounded-[50%] flex justify-center items-center ">
                <img src={bs} className="" width={50} alt="" />
              </div>
              <div>
                <h1 className="text-2xl">Ho Khoi</h1>
                <p className="text-[12px]">School Nurse</p>
              </div>
            </div>
          )}

          <div
            className={`flex items-center  p-2 rounded-xl ${
              toggle && "justify-center w-full"
            } hover:bg-[#EFEEEE] `}
            style={{ cursor: "pointer" }}
            onClick={() => {
              const confirmed = window.confirm("Do you want to logout?");
              if (confirmed) {
                handleLogout();
              }
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="35"
              height="35"
              viewBox="0 0 24 24"
            >
              <path
                fill="#040404"
                d="M5 21q-.825 0-1.412-.587T3 19V5q0-.825.588-1.412T5 3h7v2H5v14h7v2zm11-4l-1.375-1.45l2.55-2.55H9v-2h8.175l-2.55-2.55L16 7l5 5z"
              />
            </svg>
          </div>
        </div>
      </div>
    </>
  );
};

export default SideBar;
import React, { useEffect, useState } from "react";
import logo from "../../img/icon.png";
import { Link, useNavigate } from "react-router";
import hs from "../../img/hs.jpg";
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
              click === "student_health"
                ? "bg-[#EFEEEE] p-2 rounded-xl text-black"
                : ""
            } ${toggle && "justify-center"} `}
            onClick={() => {
              setClick("student_information");
              navigate("/student/student_information");
            }}
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
              <Link to={"/student/student_information"} className="text-[18px]">
                Student Information
              </Link>
            )}
          </div>

          <div
            className={`flex items-center gap-4 mt-1 hover:bg-[#EFEEEE] p-2 rounded-xl ${
              click === "medical_request"
                ? "bg-[#EFEEEE] p-2 rounded-xl text-black"
                : ""
            } ${toggle && "justify-center"}`}
            onClick={() => {
              setClick("change_password");
              navigate("/student/change_password");
            }}
            style={{ cursor: "pointer" }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M12 17a2 2 0 0 0 2-2a2 2 0 0 0-2-2a2 2 0 0 0-2 2a2 2 0 0 0 2 2m6-9a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V10a2 2 0 0 1 2-2h1V6a5 5 0 0 1 5-5a5 5 0 0 1 5 5v2zm-6-5a3 3 0 0 0-3 3v2h6V6a3 3 0 0 0-3-3"
              />
            </svg>
            {!toggle && (
              <Link to={"/student/change_password"} className="text-[18px]">
                Change Password
              </Link>
            )}
          </div>
        </div>

        <div className="w-full h-[2px] bg-[#5B5454] mt-auto"></div>

        <div className="flex pl-2 pt-2 justify-between pr-6 ">
          {!toggle && (
            <div className="flex gap-3">
              <div className="w-[60px] h-[60px] bg-gray-600 rounded-full overflow-hidden flex justify-center items-center">
                <img src={hs} className="w-full h-full object-cover" alt="" />
              </div>
              <div>
                <h1 className="text-2xl">Gia Khanh</h1>
                <p className="text-[12px]">Student</p>
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

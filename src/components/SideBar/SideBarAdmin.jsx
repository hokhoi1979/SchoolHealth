import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";
import logo from "../../img/icon.png";
import bs from "../../img/bs.png";
import { fetchSuccess, logout } from "../../redux/auth/authSlice";

const SideBarAdmin = () => {
  const [click, setClick] = useState("");
  const [toggle, setToggle] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const { token } = useSelector((state) => state.account);

  useEffect(() => {
    if (token) {
      const decode = jwtDecode(token);
      dispatch(fetchSuccess({ user: decode, token }));
    }
  }, [dispatch]);

  useEffect(() => {
    if (location.pathname.includes("studentAdmin")) setClick("student");
    else if (location.pathname.includes("accountAdmin")) setClick("account");
    else setClick("dashboard");
  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    dispatch(logout());
    navigate("/login");
  };

  const menuItems = [
    {
      key: "dashboard",
      label: "Dashboard",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="30"
          height="30"
          viewBox="0 0 24 24"
        >
          <path
            fill={click === "dashboard" ? "black" : "white"}
            d="m16 11.78l4.24-7.33l1.73 1l-5.23 9.05l-6.51-3.75L5.46 19H22v2H2V3h2v14.54L9.5 8z"
          />
        </svg>
      ),
      path: "/admin",
    },
    {
      key: "student",
      label: "Student",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="30"
          height="30"
          viewBox="0 0 256 256"
        >
          <path
            fill={click === "student" ? "black" : "white"}
            d="m226.53 56.41-96-32a8 8 0 0 0-5.06 0l-96 32A8 8 0 0 0 24 64v80a8 8 0 0 0 16 0V75.1l33.59 11.19a64 64 0 0 0 20.65 88.05c-18 7.06-33.56 19.83-44.94 37.29a8 8 0 1 0 13.4 8.74C77.77 197.25 101.57 184 128 184s50.23 13.25 65.3 36.37a8 8 0 0 0 13.4-8.74c-11.38-17.46-27-30.23-44.94-37.29a64 64 0 0 0 20.65-88l44.12-14.7a8 8 0 0 0 0-15.18ZM176 120a48 48 0 1 1-86.65-28.45l36.12 12a8 8 0 0 0 5.06 0l36.12-12A47.9 47.9 0 0 1 176 120m-48-32.43L57.3 64L128 40.43L198.7 64Z"
          />
        </svg>
      ),
      path: "/admin/studentAdmin",
    },
    {
      key: "account",
      label: "Account",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="30"
          height="30"
          viewBox="0 0 24 24"
        >
          <path
            fill={click === "account" ? "black" : "white"}
            d="M20 22h-2v-2a3 3 0 0 0-3-3H9a3 3 0 0 0-3 3v2H4v-2a5 5 0 0 1 5-5h6a5 5 0 0 1 5 5zm-8-9a6 6 0 1 1 0-12a6 6 0 0 1 0 12m0-2a4 4 0 1 0 0-8a4 4 0 0 0 0 8"
          />
        </svg>
      ),
      path: "/admin/accountAdmin",
    },
  ];

  return (
    <div
      className={`h-full bg-[#434343] pt-2 pb-2 font-inria flex flex-col text-white ${
        toggle ? "w-[8%]" : "w-[18%]"
      } transition-all duration-400 ease-in-out overflow-hidden`}
    >
      {/* Logo + Toggle */}
      <div className="flex items-center pt-2 pb-2 pl-1 pr-1 gap-3">
        <div className="flex items-center">
          <div className="w-[70px]">
            <img src={logo} className="flex m-auto" width="60%" alt="logo" />
            <p className="text-center text-[10px] font-medium">Health Care</p>
          </div>
          {!toggle && (
            <div className="w-[127px]">
              <h1 className="text-[16px] pl-6 font-medium text-center">
                School Health
              </h1>
            </div>
          )}
        </div>
        <div
          style={{ cursor: "pointer", marginLeft: 10 }}
          onClick={() => setToggle((pre) => !pre)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            viewBox="0 0 24 24"
          >
            <path
              fill="white"
              d={
                toggle
                  ? "M8.46 8.29A1 1 0 1 0 7 9.71L9.34 12L7 14.29a1 1 0 0 0 0 1.42a1 1 0 0 0 1.42 0l3-3a1 1 0 0 0 0-1.42Zm8.5 3l-3-3a1 1 0 0 0-1.42 1.42l2.3 2.29l-2.3 2.29a1 1 0 0 0 0 1.42a1 1 0 0 0 1.42 0l3-3a1 1 0 0 0 .04-1.42Z"
                  : "M11.46 8.29a1 1 0 0 0-1.42 0l-3 3a1 1 0 0 0 0 1.42l3 3a1 1 0 0 0 1.42 0a1 1 0 0 0 0-1.42L9.16 12l2.3-2.29a1 1 0 0 0 0-1.42m3.2 3.71L17 9.71a1 1 0 0 0-1.42-1.42l-3 3a1 1 0 0 0 0 1.42l3 3a1 1 0 0 0 1.42 0a1 1 0 0 0 0-1.42Z"
              }
            />
          </svg>
        </div>
      </div>

      <div className="w-full h-[2px] bg-white"></div>

      {/* Menu Items */}
      <div className="pl-3 pr-3 pt-5">
        {menuItems.map((item) => (
          <div
            key={item.key}
            className={`flex items-center gap-4 mt-1 hover:bg-[#817e7e] p-2 rounded-xl ${
              click === item.key ? "bg-[#EFEEEE] text-black" : ""
            } ${toggle && "justify-center"}`}
            style={{ cursor: "pointer" }}
            onClick={() => {
              navigate(item.path);
              setClick(item.key);
            }}
          >
            {item.icon}
            {!toggle && <span className="text-[18px]">{item.label}</span>}
          </div>
        ))}
      </div>

      <div className="w-full h-[2px] bg-[#5B5454] mt-auto"></div>

      {/* User Info + Logout */}
      <div className="flex pl-2 pt-2 justify-between pr-6">
        {!toggle && (
          <div className="flex gap-3">
            <div className="w-[60px] h-[60px] bg-gray-600 rounded-full flex justify-center items-center">
              <img src={bs} width={50} alt="avatar" />
            </div>
            <div>
              <h1 className="text-2xl">Pham Khoa</h1>
              <p className="text-[12px]">School Admin</p>
            </div>
          </div>
        )}
        <div
          className={`flex items-center p-2 rounded-xl ${
            toggle && "justify-center w-full"
          } hover:bg-[#5B5454]`}
          style={{ cursor: "pointer" }}
          onClick={() => {
            const confirmed = window.confirm("Do you want to logout?");
            if (confirmed) handleLogout();
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="35"
            height="35"
            viewBox="0 0 24 24"
          >
            <path
              fill="white"
              d="M5 21q-.825 0-1.412-.587T3 19V5q0-.825.588-1.412T5 3h7v2H5v14h7v2zm11-4l-1.375-1.45l2.55-2.55H9v-2h8.175l-2.55-2.55L16 7l5 5z"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default SideBarAdmin;

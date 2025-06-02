import React, { useEffect, useState } from "react";
import {
  MailOutlined,
  LockOutlined,
  EyeOutlined,
  EyeInvisibleOutlined,
} from "@ant-design/icons";
import bg from "../../img/background.jpg";
import { Button, Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { AppFooter } from "../../components/Footer/AppFooter";
import { useForm } from "antd/es/form/Form";
import { useDispatch, useSelector } from "react-redux";
import { fetchLogin } from "../../redux/auth/authSlice";

function Login() {
  const [form] = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, error } = useSelector((state) => state.account);
  const [message, setMessage] = useState("");
  const handleLogin = async () => {
    try {
      const values = await form.validateFields();
      dispatch(fetchLogin(values));
    } catch (err) {
      console.log("Validation failed:", err);
    }
  };

  useEffect(() => {
    if (user) {
      if (user?.roleID === 3) {
        navigate("/nurse");
      } else if (user?.roleID === 1) {
        navigate("/manager");
      }
    }
  }, [user]);

  useEffect(() => {
    if (error) {
      console.log(error);

      setMessage(error);
    }
  }, [error]);

  return (
    <div className="flex flex-col min-h-screen relative">
      <div
        className="flex flex-1 bg-cover bg-center w-full bg-opacity-45 pl-[10%] pr-[10%]"
        style={{ backgroundImage: `url(${bg})` }}
      >
        <div
          className="mt-5 hover:bg-[#f9f9f9] hover:bg-opacity-50 w-[50px] h-[50px] rounded-[50%] flex items-center justify-center text-center transition duration-200"
          onClick={() => navigate("/")}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 24 24"
            style={{ cursor: "pointer" }}
          >
            <path
              fill="#131313"
              d="M8 7v4L2 6l6-5v4h5a8 8 0 1 1 0 16H4v-2h9a6 6 0 0 0 0-12z"
            />
          </svg>
        </div>

        <div className="w-[35%] bg-white h-auto m-auto justify-center text-center rounded-[15px] pl-5 pr-5 shadow-lg shadow-black/60">
          <h1 className="text-3xl mt-5 font-serif">Login Page</h1>
          <p className="font-serif text-[#777777] mt-3 text-[15px]">
            School health is the care, prevention and health promotion of
            students in schools.
          </p>

          <div className="pl-7 pr-7 p-3">
            <Form form={form}>
              <Form.Item
                name="email"
                rules={[
                  { required: true, message: "Email is not empty!" },
                  {
                    type: "email",
                    message: "Please enter a valid email address.",
                  },
                ]}
              >
                <Input
                  style={{ height: "40px", fontWeight: 600 }}
                  placeholder="Enter your email"
                  prefix={<MailOutlined style={{ color: "#767676" }} />}
                />
              </Form.Item>

              <Form.Item
                name="password"
                rules={[
                  { required: true, message: "Password is not empty!" },
                  {
                    min: 6,
                    message: "Password must be at least 6 characters.",
                  },
                ]}
              >
                <Input.Password
                  style={{ height: "40px", fontWeight: 600 }}
                  placeholder="Enter your password"
                  prefix={<LockOutlined style={{ color: "#767676" }} />}
                  iconRender={(visible) =>
                    visible ? <EyeOutlined /> : <EyeInvisibleOutlined />
                  }
                  onChange={() => setMessage("")}
                />
              </Form.Item>

              {error === "Tài khoản không tồn tại" && (
                <>
                  <p className="text-red-500 font-serif relative bottom-3">
                    Account has not exised!
                  </p>
                </>
              )}
              {message === "Mật khẩu không đúng " &&
                form.getFieldError("password").length === 0 && (
                  <p className="text-red-500 font-serif relative bottom-3">
                    Password is not correct!
                  </p>
                )}

              <Button
                style={{ height: "40px", fontWeight: 300 }}
                className="!w-full !bg-[#34A0B5] !text-white !text-2xl !font-serif hover:!bg-[#1c606d]"
                type="secondary"
                onClick={handleLogin}
              >
                Login
              </Button>
            </Form>

            <Link
              to="/register"
              className="font-serif text-[13px] underline flex text-left mt-3 text-[#113d59]"
            >
              You don’t have account? Register now!
            </Link>
          </div>
        </div>

        <div className="w-[45%] h-auto items-center justify-center text-left text-[#252424] m-auto mt-[12%]">
          <h1 className="font-serif text-[30px]">
            School health team – Accompanying students' health
          </h1>
          <p className="font-serif italic mt-3">
            It contributes to early detection, disease prevention and creates
            conditions for students to develop comprehensively both physically
            and mentally.
          </p>
          <Button
            style={{ height: "40px", fontWeight: 300 }}
            className="!w-[150px] !bg-[#34A0B5] !text-white !text-xl !font-serif hover:!bg-[#1c606d] !mt-3"
            type="secondary"
          >
            Read more
          </Button>
        </div>
      </div>

      <AppFooter />
    </div>
  );
}

export default Login;

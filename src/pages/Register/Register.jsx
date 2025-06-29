import React, { useEffect, useState } from "react";
import {
  MailOutlined,
  LockOutlined,
  EyeOutlined,
  EyeInvisibleOutlined,
  UserOutlined,
} from "@ant-design/icons";
import bg from "../../img/background.jpg";
import { Button, Form, Input } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { AppFooter } from "../../components/Footer/AppFooter";
import { useDispatch, useSelector } from "react-redux";
import { postRegister } from "../../redux/register/registerSlice";

function Register() {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { accountRegister = [], error } = useSelector(
    (state) => state.accountRegister
  );

  const [localError, setLocalError] = useState(null);

  useEffect(() => {
    if (accountRegister) {
      navigate("/login");
    }
  }, [accountRegister]);

  useEffect(() => {
    setLocalError(error);
  }, [error]);

  const handleRegister = async () => {
    try {
      const values = await form.validateFields();
      dispatch(
        postRegister({
          fullname: values.fullname,
          email: values.email,
          password: values.password,
        })
      );
    } catch (error) {
      console.log("Validation failed:", error);
    }
  };

  useEffect(() => {
    if (error?.message?.includes("Email")) {
      form.setFields([{ name: "email", errors: [error.message] }]);
    } else if (error?.message?.includes("Fullname")) {
      form.setFields([{ name: "fullname", errors: [error.message] }]);
    } else if (error?.message?.includes("Password")) {
      form.setFields([{ name: "password", errors: [error.message] }]);
    }
  }, [error]);

  return (
    <div className="flex flex-col min-h-screen relative">
      <div
        className="flex flex-1 bg-cover bg-center w-full bg-opacity-45 pl-[10%] pr-[10%]"
        style={{ backgroundImage: `url(${bg})` }}
      >
        {/* Back Home Icon */}
        <div
          className="mt-5 hover:bg-[#f9f9f9] hover:bg-opacity-50 w-[50px] h-[50px] rounded-full flex items-center justify-center transition duration-200"
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

        {/* Register Form */}
        <div className="w-[35%] bg-white m-auto rounded-[15px] p-5 shadow-lg shadow-black/60 text-center">
          <h1 className="text-3xl mt-3 font-serif">Register Page</h1>
          <p className="font-serif text-[#777] mt-3 text-[15px]">
            School health is the care, prevention and health promotion of
            students in schools.
          </p>

          <div className="px-7 pt-3">
            <Form form={form} layout="vertical">
              <Form.Item
                name="fullname"
                rules={[{ required: true, message: "Full Name is not empty!" }]}
              >
                <Input
                  onChange={() => setLocalError(null)}
                  style={{ height: "40px", fontWeight: 600 }}
                  placeholder="Enter your Full Name"
                  prefix={<UserOutlined style={{ color: "#767676" }} />}
                />
              </Form.Item>

              <Form.Item
                name="email"
                rules={[
                  { required: true, message: "Email is not empty!" },
                  { type: "email", message: "Email is not valid!" },
                ]}
              >
                <Input
                  onChange={() => setLocalError(null)}
                  style={{ height: "40px", fontWeight: 600 }}
                  placeholder="Enter your email"
                  prefix={<MailOutlined style={{ color: "#767676" }} />}
                />
              </Form.Item>

              <Form.Item
                name="password"
                rules={[{ required: true, message: "Password is not empty!" }]}
              >
                <Input.Password
                  onChange={() => setLocalError(null)}
                  style={{ height: "40px", fontWeight: 600 }}
                  placeholder="Enter your password"
                  prefix={<LockOutlined style={{ color: "#767676" }} />}
                  iconRender={(visible) =>
                    visible ? <EyeOutlined /> : <EyeInvisibleOutlined />
                  }
                />
              </Form.Item>

              <Form.Item
                name="confirm"
                dependencies={["password"]}
                rules={[
                  { required: true, message: "Confirm password is required!" },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("password") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject("Passwords do not match!");
                    },
                  }),
                ]}
              >
                <Input.Password
                  onChange={() => setLocalError(null)}
                  style={{ height: "40px", fontWeight: 600 }}
                  placeholder="Confirm your password"
                  prefix={<LockOutlined style={{ color: "#767676" }} />}
                  iconRender={(visible) =>
                    visible ? <EyeOutlined /> : <EyeInvisibleOutlined />
                  }
                />
              </Form.Item>

              {localError &&
                form.getFieldsError().every((f) => f.errors.length === 0) && (
                  <p className="text-red-500 relative bottom-3">
                    Account already exists or is incorrect
                  </p>
                )}

              <Button
                style={{ height: "40px", fontWeight: 300 }}
                className="!w-full !bg-[#34A0B5] !text-white !text-2xl !font-serif hover:!bg-[#1c606d]"
                onClick={handleRegister}
                type="primary"
              >
                Register
              </Button>
            </Form>

            <Link
              to="/login"
              className="font-serif text-[13px] underline flex text-left mt-3 text-[#113d59] mb-3"
            >
              You have an account? Login now!
            </Link>
          </div>
        </div>

        {/* Right Text Section */}
        <div className="w-[45%] m-auto mt-[12%] text-left text-[#252424]">
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
            type="primary"
          >
            Read more
          </Button>
        </div>
      </div>

      <AppFooter />
    </div>
  );
}

export default Register;

import React, { useState } from "react";
import {
  MailOutlined,
  LockOutlined,
  EyeOutlined,
  EyeInvisibleOutlined,
  UserOutlined,
  PhoneOutlined,
} from "@ant-design/icons";
import bg from "../../img/background.jpg";
import { Button, Form, Input } from "antd";
import { Link, useNavigate } from "react-router";
import { AppFooter } from "../../components/Footer/AppFooter";
import bs from "../../img/bs.png";
function Register() {
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const navigate = useNavigate();
  return (
    <div className="flex flex-col min-h-screen relative">
      <div
        className="flex flex-1 bg-cover bg-center w-full bg-opacity-45 pl-[10%] pr-[10%]"
        style={{ backgroundImage: `url(${bg})` }}
      >
        <div className="w-[35%] bg-white h-auto m-auto justify-center text-center rounded-[15px] pl-5 pr-5 shadow-lg shadow-black/60">
          <h1 className="text-5xl mt-5 font-serif">Register Page</h1>
          <p className="font-serif text-[#777777] mt-3 text-[19px]">
            School health is the care, prevention and health promotion of
            students in schools.
          </p>

          <div className="pl-7 pr-7 p-3">
            <Form>
              <Form.Item
                name="fullname"
                rules={[{ required: true, message: "Full Name is not empty!" }]}
              >
                <Input
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  style={{ height: "40px", fontWeight: 600 }}
                  placeholder={fullName ? "" : "Enter your Full Name"}
                  prefix={
                    !fullName && <UserOutlined style={{ color: "#767676" }} />
                  }
                />
              </Form.Item>

              <Form.Item
                name="phone"
                rules={[{ required: true, message: "Phone is not empty!" }]}
              >
                <Input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  style={{ height: "40px", fontWeight: 600 }}
                  placeholder={phone ? "" : "Enter your phone number"}
                  prefix={
                    !phone && <PhoneOutlined style={{ color: "#767676" }} />
                  }
                />
              </Form.Item>

              <Form.Item
                name="email"
                rules={[{ required: true, message: "Email is not empty!" }]}
              >
                <Input
                  value={email}
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                  style={{ height: "40px", fontWeight: 600 }}
                  placeholder={email ? "" : "Enter your email"}
                  prefix={
                    !email && <MailOutlined style={{ color: "#767676" }} />
                  }
                />
              </Form.Item>

              <Form.Item
                name="password"
                rules={[{ required: true, message: "Password is not empty!" }]}
              >
                <Input.Password
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{ height: "40px", fontWeight: 600 }}
                  placeholder={password ? "" : "Enter your password"}
                  prefix={
                    !password && <LockOutlined style={{ color: "#767676" }} />
                  }
                  iconRender={(visible) =>
                    visible ? <EyeOutlined /> : <EyeInvisibleOutlined />
                  }
                />
              </Form.Item>

              <Form.Item
                name="confirm"
                rules={[{ required: true, message: "Confirm is not empty!" }]}
              >
                <Input.Password
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  style={{ height: "40px", fontWeight: 600 }}
                  placeholder={confirm ? "" : "Enter confirm password"}
                  prefix={
                    !confirm && <LockOutlined style={{ color: "#767676" }} />
                  }
                  iconRender={(visible) =>
                    visible ? <EyeOutlined /> : <EyeInvisibleOutlined />
                  }
                />
              </Form.Item>

              <Button
                style={{ height: "40px", fontWeight: 300 }}
                className="!w-full !bg-[#34A0B5] !text-white !text-2xl !font-serif hover:!bg-[#1c606d]"
                type="secondary"
              >
                Register
              </Button>
            </Form>

            <Link
              to="/"
              className="font-serif text-[13px] underline flex text-left mt-3 text-[#113d59] mb-3"
            >
              You have account? Login now!
            </Link>
          </div>
        </div>

        <div className="w-[45%] h-auto items-center justify-center text-left text-[#252424]  m-auto mt-[12%]">
          <h1 className="font-serif text-[40px]">
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
      <img
        src={bs}
        width={400}
        className="absolute bottom-0 left-[67%]  z-10"
      />
      <AppFooter />
    </div>
  );
}

export default Register;

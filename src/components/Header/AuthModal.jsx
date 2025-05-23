/* eslint-disable react/prop-types */
import { Input, Modal } from "antd";
import logo from "@/assets/images/logo.png";
import text from "@/mocks/index.json";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { fetchLogin } from "@/redux/auth/authSlice";
import { useLocation } from "react-router";

function AuthModal({ isOpen, onClose }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ email: "", password: "" });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const { user, loading, error } = useSelector((state) => state.account);

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validatePassword = (password) => {
    return password.length >= 6;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    let formErrors = {};

    if (!validateEmail(email)) {
      formErrors.email = "Please enter a valid email address.";
    }
    if (!validatePassword(password)) {
      formErrors.password = "Password must be at least 6 characters.";
    }
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    dispatch(fetchLogin({ email, password }));
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value.trim());
    setErrors((prev) => ({ ...prev, email: "" }));
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value.trim());
    setErrors((prev) => ({ ...prev, password: "" }));
  };

  useEffect(() => {
    if (user) {
      if (user?.status === 0) {
        setErrors({ email: "", password: "" });
      } else {
        if (user?.role === 0 && !location.pathname.includes("claimer")) {
          navigate("/claimer");
        } else if (
          user?.role === 1 &&
          !location.pathname.includes("approval")
        ) {
          navigate("/approval");
        } else if (user?.role === 2 && !location.pathname.includes("finance")) {
          navigate("/finance");
        } else if (user?.role === 3) {
          navigate("/admin");
        }
      }
      onClose();
    }
  }, [user, navigate, location, onClose]);

  return (
    <Modal
      open={isOpen}
      onCancel={onClose}
      footer={null}
      closable={false}
      width={410}
      className="bg-[#F1F5F9] rounded-[24px]"
      centered
    >
      <div className="relative flex flex-col items-center gap-4 px-3">
        <img className="w-10 h-10" src={logo} width={40} alt="Logo" />
        <h2 className="titleText text-2xl font-bold text-center">
          {text.welcomeBack}
        </h2>

        <div className="w-[95%] flex m-auto h-[1px] bg-gray-600"></div>

        <form onSubmit={handleSubmit} className="flex flex-col w-full gap-4">
          <Input
            onChange={handleEmailChange}
            value={email}
            type="email"
            placeholder="Your email"
            className="normalText !rounded-[24px]"
            style={{ height: "40px" }}
            disabled={loading}
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email}</p>
          )}

          <Input.Password
            onChange={handlePasswordChange}
            value={password}
            type="password"
            placeholder="Your Password"
            className="normalText !rounded-[24px]"
            style={{ height: "40px" }}
            disabled={loading}
            iconRender={(visible) =>
              visible ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="M12 9a3 3 0 0 1 3 3a3 3 0 0 1-3 3a3 3 0 0 1-3-3a3 3 0 0 1 3-3m0-4.5c5 0 9.27 3.11 11 7.5c-1.73 4.39-6 7.5-11 7.5S2.73 16.39 1 12c1.73-4.39 6-7.5 11-7.5M3.18 12a9.821 9.821 0 0 0 17.64 0a9.821 9.821 0 0 0-17.64 0"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="M2 5.27L3.28 4L20 20.72L18.73 22l-3.08-3.08c-1.15.38-2.37.58-3.65.58c-5 0-9.27-3.11-11-7.5c.69-1.76 1.79-3.31 3.19-4.54zM12 9a3 3 0 0 1 3 3a3 3 0 0 1-.17 1L11 9.17A3 3 0 0 1 12 9m0-4.5c5 0 9.27 3.11 11 7.5a11.8 11.8 0 0 1-4 5.19l-1.42-1.43A9.86 9.86 0 0 0 20.82 12A9.82 9.82 0 0 0 12 6.5c-1.09 0-2.16.18-3.16.5L7.3 5.47c1.44-.62 3.03-.97 4.7-.97M3.18 12A9.82 9.82 0 0 0 12 17.5c.69 0 1.37-.07 2-.21L11.72 15A3.064 3.064 0 0 1 9 12.28L5.6 8.87c-.99.85-1.82 1.91-2.42 3.13"
                  />
                </svg>
              )
            }
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className={`normalText mx-auto cursor-pointer w-[240px] flex items-center justify-center font-semibold rounded-[24px] py-2 px-4 ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-[#DAE5EB] text-[#233241]"
            }`}
          >
            {loading ? "Processing..." : text.email}
          </button>
        </form>

        <div className="text-red-500 normalText text-center text-sm mt-2">
          {error === "banned" ? (
            <>
              <p>{text.accountSuspended}</p>
              <p>{text.contactAssistance}</p>
            </>
          ) : error && !errors.password && !errors.email ? (
            <p>{text.inCorrectEmailPass}</p>
          ) : null}
        </div>
      </div>
    </Modal>
  );
}

export default AuthModal;

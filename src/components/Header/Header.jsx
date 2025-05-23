import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import logo from "@/assets/images/logo.png";
import text from "@/mocks/index.json";
import "@/assets/fonts/Font.scss";
import AuthModal from "@/components/Header/AuthModal";
import { useDispatch, useSelector } from "react-redux";
import { fetchSuccess, logout } from "../../redux/auth/authSlice";
import { jwtDecode } from "jwt-decode";
import { Icon } from "@iconify/react"; // Import Iconify

const Header = ({ object }) => {
  const [openModal, setOpenModal] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.account);

  const handleOpenLogin = () => {
    setOpenModal(true);
  };

  const handleClose = () => {
    setOpenModal(false);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  useEffect(() => {
    const storedToken = localStorage.getItem("accessToken");
    if (storedToken) {
      const decodedUser = jwtDecode(storedToken);
      dispatch(fetchSuccess({ user: decodedUser, token: storedToken }));
    }
  }, [dispatch]);

  return (
    <>
      {/* Header Mobile */}
      <div className="flex items-center justify-between px-5 py-4 md:hidden relative">
        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? (
            <Icon icon="mdi:close" width="32" height="32" />
          ) : (
            <Icon icon="mdi:menu" width="32" height="32" />
          )}
        </button>

        {token ? (
          <button
            className="normalText px-3 py-1 bg-btn-primary text-[15px] text-btn-primary rounded-[35px]"
            onClick={handleLogout}
          >
            {text.logout}
          </button>
        ) : (
          <button
            className="normalText px-3 py-1 bg-btn-primary text-[15px] text-btn-primary rounded-[35px]"
            onClick={handleOpenLogin}
          >
            {text.login}
          </button>
        )}
      </div>

      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-40"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      <div
        className={`fixed top-0 left-0 h-full w-[60%] bg-white shadow-lg z-50 transform transition-transform duration-300 md:hidden ${
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        } flex flex-col`}
      >
        <div className="px-3 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link to="/">
              <img src={logo} width={40} alt="Logo" />
            </Link>
            <h2 className="webText font-bold text-xl">{text.claimx}</h2>
          </div>
          <button onClick={() => setMobileMenuOpen(false)}>
            <Icon icon="mdi:close" width="32" height="32" />
          </button>
        </div>
        <div className="w-full h-[1px] bg-gray-200"></div>

        <nav className="flex flex-col mt-4">
          <Link
            to="/"
            className="normalText py-2 px-5 text-lg"
            onClick={() => setMobileMenuOpen(false)}
          >
            {text.home}
          </Link>
          <Link
            to="/about"
            className="normalText py-2 px-5 text-lg"
            onClick={() => setMobileMenuOpen(false)}
          >
            {text.aboutus}
          </Link>
          <Link
            to="/privacy"
            className="normalText py-2 px-5 text-lg"
            onClick={() => setMobileMenuOpen(false)}
          >
            {text.privacy}
          </Link>
        </nav>
      </div>

      {/* Header Desktop */}
      <div className="hidden md:grid w-full h-[5rem] px-10 py-5 md:grid-cols-3 items-center relative">
        <div className="flex items-center gap-3">
          <Link to="/">
            <img className="self-start" src={logo} width={40} alt="" />
          </Link>
          <h2 className="webText font-bold text-xl">{text.claimx}</h2>
        </div>

        <div className="normalText flex justify-center gap-10 text-[18px] !text-black">
          <Link to="/">{text.home}</Link>
          <Link to="/about">{text.aboutus}</Link>
          <Link to="/privacy">{text.privacy}</Link>
        </div>

        <div className="relative flex justify-end">
          {token ? (
            <button
              className="normalText flex items-center px-5 py-2 bg-btn-primary text-btn-primary rounded-[35px] gap-2"
              onClick={handleLogout}
              style={{ cursor: "pointer" }}
            >
              {text.logout}
            </button>
          ) : (
            <button
              className="normalText flex items-center px-5 py-2 bg-btn-primary text-btn-primary rounded-[35px] gap-2"
              onClick={handleOpenLogin}
              style={{ cursor: "pointer" }}
            >
              {text.login}
            </button>
          )}

          <AuthModal isOpen={openModal} onClose={handleClose} />
        </div>
      </div>

      <div className="w-[95%] flex m-auto h-[1px] bg-gray-600"></div>
    </>
  );
};

export { Header };

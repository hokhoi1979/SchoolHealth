import logo from "../../img/logocatnen.png";
import { Link } from "react-router";
import bs3 from "../../img/bs3.jpg";
import user from "../../img/user.png";
import logout from "../../img/logout.png";
import contact from "../../img/contact.png";
import news from "../../img/news.png";
import home1 from "../../img/home1.jpeg";
const Header = ({ object }) => {
  return (
    <>
      <div className="container w-full  p-4 mt-2 mb-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center flex-col gap-4">
            <img src={logo} alt="Logo" width={100} />
            <p className="font-bold text-xl ml-[10px]">Health Care</p>
          </div>

          <div className="flex items-center gap-7 font-bold text-lg">
            <Link to="/" className="flex items-center gap-2">
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <g
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                  >
                    <path
                      stroke-dasharray="16"
                      stroke-dashoffset="16"
                      d="M4.5 21.5h15"
                    >
                      <animate
                        fill="freeze"
                        attributeName="stroke-dashoffset"
                        dur="0.2s"
                        values="16;0"
                      />
                    </path>
                    <path
                      stroke-dasharray="16"
                      stroke-dashoffset="16"
                      d="M4.5 21.5v-13.5M19.5 21.5v-13.5"
                    >
                      <animate
                        fill="freeze"
                        attributeName="stroke-dashoffset"
                        begin="0.2s"
                        dur="0.2s"
                        values="16;0"
                      />
                    </path>
                    <path
                      stroke-dasharray="28"
                      stroke-dashoffset="28"
                      d="M2 10l10 -8l10 8"
                    >
                      <animate
                        fill="freeze"
                        attributeName="stroke-dashoffset"
                        begin="0.4s"
                        dur="0.4s"
                        values="28;0"
                      />
                    </path>
                    <path
                      stroke-dasharray="24"
                      stroke-dashoffset="24"
                      d="M9.5 21.5v-9h5v9"
                    >
                      <animate
                        fill="freeze"
                        attributeName="stroke-dashoffset"
                        begin="0.7s"
                        dur="0.4s"
                        values="24;0"
                      />
                    </path>
                  </g>
                </svg>
              </span>
              Home
            </Link>
            <Link to="/news" className="flex items-center gap-2">
              <img src={news} alt="News" className="w-8 h-8" />
              News
            </Link>
            <Link to="/medicines">Medicines</Link>
            <Link to="/contact" className="flex items-center gap-2">
              <img src={contact} alt="Contact" className="w-8 h-8" />
              Contact
            </Link>
          </div>

          <div className="flex items-center gap-5 font-bold text-lg">
            <Link to="/login" className="flex items-center gap-2">
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <g
                    fill="none"
                    stroke="currentColor"
                    stroke-dasharray="28"
                    stroke-dashoffset="28"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                  >
                    <path d="M4 21v-1c0 -3.31 2.69 -6 6 -6h4c3.31 0 6 2.69 6 6v1">
                      <animate
                        fill="freeze"
                        attributeName="stroke-dashoffset"
                        dur="0.4s"
                        values="28;0"
                      />
                    </path>
                    <path d="M12 11c-2.21 0 -4 -1.79 -4 -4c0 -2.21 1.79 -4 4 -4c2.21 0 4 1.79 4 4c0 2.21 -1.79 4 -4 4Z">
                      <animate
                        fill="freeze"
                        attributeName="stroke-dashoffset"
                        begin="0.4s"
                        dur="0.4s"
                        values="28;0"
                      />
                    </path>
                  </g>
                </svg>
              </span>
              User
            </Link>
            <Link to="/logout">
              <img src={logout} alt="Logout" className="w-8 h-8" />
            </Link>
          </div>
        </div>
      </div>

      <div className="relative w-full h-[600px]">
        <img
          src={bs3}
          alt="Health Care Background"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4">
          <h1 className="text-5xl font-serif mb-2">Health Care</h1>
          <p className="text-lg mb-4">
            School health team - Accompanying students’ health
          </p>
          <button className="bg-white text-black py-1 px-3 text-sm rounded hover:bg-gray-200 transition">
            <p className="font-serif">Click here</p>
          </button>
        </div>
      </div>
    </>
  );
};

export { Header };

import "./SideBar.css";
import { FaUserAlt } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { useState } from "react";

function SideBar(props) {
  // State open And Close Side Bar
  const [sidebarOpen, setSidebarOpen] = useState(false);
  // State open And Close Side Bar
  return (
    <>
      {/* <div
        className={` user-account-sideBar full-height bg-white py-5 d-flex flex-column gap-2 side-bar-position  `}
      ></div> */}
      <div
        className={`user-account-sideBar pt-5 pt-lg-0 company-side-bar bg-white full-height side-bar-position ${
          sidebarOpen && "side-bar-0"
        }`}
      >
        {/* open sidebar */}
        <div className="icon-open d-lg-none position-relative">
          <div
            style={{ borderRadius: "6px" }}
            className="flex-c position-absolute bg-main text-white p-2 pointer"
            onClick={() => {
              setSidebarOpen(!sidebarOpen);
            }}
          >
            <FaUserAlt style={{ fontSize: "29px" }} />
          </div>
        </div>
        {/* open sidebar */}
        <ul className="d-flex flex-column gap-2 p-0 m-0 p-4">
          {props.Data.map((item, idx) => (
            <li key={idx}>
              <NavLink
                to={item.link}
                className={({ isActive }) =>
                  isActive ? "side-bar-link active" : "side-bar-link"
                }
              >
                <span className="icon">{item.icon}</span>
                <span className="text">{item.text}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default SideBar;

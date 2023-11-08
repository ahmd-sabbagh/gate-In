import { ReactComponent as Home } from "./Assets/home-hashtag.svg";
import { RiArrowDownSLine } from "react-icons/ri";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import "../../Components/SideBarCss/SideBarCss.css";
import { FaUserAlt, FaUserGraduate } from "react-icons/fa";
import { MdOutlineWork } from "react-icons/md";
import { BsPlayCircleFill } from "react-icons/bs";
import { trans } from "../../Components/Navbar/Navbar";

function SideBar() {
  // State open And Close Side Bar
  const [sidebarOpen, setSidebarOpen] = useState(false);
  // State open And Close Side Bar
  // Stats
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);
  const [open4, setOpen4] = useState(false);
  // Stats
  return (
    <div
      className={`user-account-sideBar full-height bg-white py-5 d-flex flex-column gap-2 side-bar-position  ${
        sidebarOpen && "side-bar-0"
      }`}
    >
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

      <div className="px-3 persone d-flex flex-column gap-2">
        {/* My Account */}
        <div className="my-acount">
          {/* control */}
          <div
            className={`control pointer r-10 px-3 py-2 d-flex justify-content-between align-items-center ${
              open1 && "control-color"
            }`}
            onClick={() => {
              setOpen1(!open1);
              setOpen2(false);
              setOpen3(false);
              setOpen4(false);
            }}
          >
            <div className="text d-flex gap-3 align-items-center">
              <div className="icon flex-c">
                <Home />
              </div>
              <h4 className=" fs-16-700">{trans("user_profile.my_account")}</h4>
            </div>
            <div className={`icon flex-c ${open1 && "icon-rotate"}`}>
              <RiArrowDownSLine />
            </div>
          </div>
          {/* menue */}
          <div className={`menue ${open1 && "control-menue-heigh-one"}`}>
            <div className="py-4 pt-3 d-flex flex-column gap-1">
              <NavLink
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link"
                }
                to="my-data/"
              >
                {trans("user_profile.My_personal_data")}
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link"
                }
                to="cv"
              >
                {trans("user_profile.cv")}
              </NavLink>
            </div>
          </div>
        </div>
        {/* Single Rehabilitation course */}
        <div className="my-acount">
          {/* control */}
          <div
            className={`control pointer r-10 px-3 py-2 d-flex justify-content-between align-items-center ${
              open4 && "control-color"
            }`}
            onClick={() => {
              setOpen4(!open4);
              setOpen1(false);
              setOpen2(false);
              setOpen3(false);
            }}
          >
            <div className="text d-flex gap-3 align-items-center">
              <div className="icon flex-c">
                <FaUserGraduate />
              </div>
              <h4 className=" fs-16-700">
                {trans("user_profile.Qualification")}
              </h4>
            </div>
            <div className={`icon flex-c ${open4 && "icon-rotate"}`}>
              <RiArrowDownSLine />
            </div>
          </div>
          {/* menue */}
          <div className={`menue ${open4 && "control-menue-heigh-three"}`}>
            <div className="py-4 pt-3 d-flex flex-column gap-1">
              <NavLink
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link"
                }
                to="prog"
              >
                {trans("user_profile.prog")}
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link"
                }
                to={`certificate`}
              >
                {trans("user_profile.cirteficate")}
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link"
                }
                to={`recommendations`}
              >
                {trans("user_profile.Consultants")}
              </NavLink>
            </div>
          </div>
        </div>
        {/* Jobs */}
        <div className="my-acount">
          {/* control */}
          <div
            className={`control pointer r-10 px-3 py-2 d-flex justify-content-between align-items-center ${
              open2 && "control-color"
            }`}
            onClick={() => {
              setOpen2(!open2);
              setOpen1(false);
              setOpen3(false);
              setOpen4(false);
            }}
          >
            <div className="text d-flex gap-3 align-items-center">
              <div className="icon flex-c">
                <MdOutlineWork />
              </div>
              <h4 className=" fs-16-700">{trans("user_profile.jobs")}</h4>
            </div>
            <div className={`icon flex-c ${open2 && "icon-rotate"}`}>
              <RiArrowDownSLine />
            </div>
          </div>
          {/* menue */}
          <div className={`menue ${open2 && "control-menue-heigh-two"}`}>
            <div className="py-4 pt-3 d-flex flex-column gap-1">
              <NavLink
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link"
                }
                to="job-application"
              >
                {trans("user_profile.order_jobs")}
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link"
                }
                to="all-jobs"
              >
                {trans("user_profile.all_jobs")}
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link"
                }
                to="favorite-jobs"
              >
                {trans("user_profile.Favorite_jobs")}
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link"
                }
                to="my-requestes"
              >
                {trans("user_profile.my_order")}
              </NavLink>
            </div>
          </div>
        </div>
        {/* Courses */}
        <div className="my-acount">
          {/* control */}
          <div
            className={`control pointer r-10 px-3 py-2 d-flex justify-content-between align-items-center ${
              open3 && "control-color"
            }`}
            onClick={() => {
              setOpen3(!open3);
              setOpen1(false);
              setOpen2(false);
              setOpen4(false);
            }}
          >
            <div className="text d-flex gap-3 align-items-center">
              <div className="icon flex-c">
                <BsPlayCircleFill />
              </div>
              <h4 className=" fs-16-700">{trans("user_profile.courses")}</h4>
            </div>
            <div className={`icon flex-c ${open3 && "icon-rotate"}`}>
              <RiArrowDownSLine />
            </div>
          </div>
          {/* menue */}
          <div className={`menue ${open3 && "control-menue-heigh-three"}`}>
            <div className="py-4 pt-3 d-flex flex-column gap-1">
              <NavLink
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link"
                }
                to="all-courses"
              >
                {trans("user_profile.all_courses")}
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link"
                }
                to="favorite-courses"
              >
                {trans("user_profile.favorite_courses")}
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SideBar;

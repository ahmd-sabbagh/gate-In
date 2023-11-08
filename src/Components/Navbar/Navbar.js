import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { IoIosArrowDown } from "react-icons/io";
import { IoExit } from "react-icons/io5";
import Logo from "../../Assets/Images/Logo.png";
import { ReactComponent as ArabicFlag } from "./Assets/iraq-flag-icon.svg";
import { ReactComponent as EnglishFlag } from "./Assets/kingdomFlag.svg";
import "./Navbar.css";
import { useTranslation } from "react-i18next";
import { t } from "i18next";
import { useEffect } from "react";
import { FaUser } from "react-icons/fa";
import { useRecoilState, useRecoilValue } from "recoil";
import { codeVerfy } from "../../RecoilState/Verification";
import { useRef } from "react";
import Notification from "./Notification";
import axios from "axios";
import { basedUrl } from "../../Api/Apis";
import { ErrorComponent } from "../../Others/Error";
import { checkJobSeekerData } from "./GlopalStateRecoil/AllData";

function Navbar() {
  const token = localStorage.getItem("token");
  const navigat = useNavigate();
  const menuUser = useRef();
  const menuUserClick = useRef();
  const menuLanguage = useRef();
  const menuLanguageClic = useRef();
  // State Route
  const [rout, setRout] = useState();
  // State Route
  // State Open User Window
  const [windowOpen, setWindoOpen] = useState(true);
  const [Open, setOpen] = useState(false);
  // State Open User Window
  // State login
  const [login, setLogin] = useRecoilState(codeVerfy);
  // State login
  // State UserName
  const [name, setName] = useState("");
  // State UserName
  const [profile, setProfile] = useState();
  // Local Storage
  const userAccount = JSON.parse(localStorage.getItem("user"));
  // Job Seeker Check Data
  const jobSeekerDataChange = useRecoilValue(checkJobSeekerData);
  const [experiences, setExperiences] = useState(false);
  const [learning_data, setLearning_data] = useState(false);
  const [personal_data, setPersonal_data] = useState(false);
  const jobSeekerCheckData = () => {
    axios
      .get(`${basedUrl}/job-seeker/main-data`, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((data) => {
        if (data.data.data.experiences !== null) {
          setExperiences(true);
        }
        if (data.data.data.learning_data !== null) {
          setLearning_data(true);
        }
        if (data.data.data.personal_data !== null) {
          setPersonal_data(true);
        }
      })
      .catch((error) => {
        ErrorComponent(error, navigat);
      });
  };
  // Job Seeker Check Data
  // All user check Data
  const [allCheckData, setCheckAllData] = useState(false);
  const businessPioneerCheckData = () => {
    axios
      .get(
        `${basedUrl}/${
          userAccount?.type === "business_pioneer"
            ? "business-pioneer/personal-data"
            : userAccount?.type === "company"
            ? "companies/data"
            : "institutes/data"
        }`,
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((data) => {
        if (data.data.data !== null) {
          setCheckAllData(true);
        }
      })
      .catch((error) => {
        ErrorComponent(error, navigat);
      });
  };
  // All user check Da
  useEffect(() => {
    if (userAccount?.type === "job_seeker") {
      jobSeekerCheckData();
    } else {
      businessPioneerCheckData();
    }
    if (userAccount) {
      setName(`${userAccount.first_name}`);
      setRout(userAccount.type);
      setLogin(true);
      setProfile(userAccount.image);
    } else {
      setLogin(false);
    }
    // MenueUser
    const menuUserHandler = (e) => {
      if (
        !menuUser?.current?.contains(e.target) &&
        !menuUserClick?.current?.contains(e.target)
      ) {
        setWindoOpen(true);
      }
    };
    const menuLanguageHandler = (e) => {
      if (
        !menuLanguage?.current?.contains(e.target) &&
        !menuLanguageClic?.current?.contains(e.target)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", menuUserHandler);
    document.addEventListener("mousedown", menuLanguageHandler);
    return () => {
      document.removeEventListener("mousedown", menuUserHandler);
      document.removeEventListener("mousedown", menuLanguageHandler);
    };
  }, [name, jobSeekerDataChange]);
  // Local Storage
  var { t, i18n } = useTranslation();
  const lang = localStorage.getItem("i18nextLng");
  return (
    <div className="navbar-main bg-white position-relative">
      <div className="nav-position flex-c">
        <div className="container">
          <nav className="navbar navbar-expand-lg bg-body-tertiary flex-row-reverse flex-lg-row">
            {/* Logo Brand */}
            <Link className="navbar-brand p-0 m-0" to={"/"}>
              <div className="logo-image">
                <img src={Logo} alt="Logo" />
              </div>
              <p className="mt-1">Graduates, Admin, Trainers & Employers</p>
            </Link>
            {/* Button */}
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNavDropdown"
              aria-controls="navbarNavDropdown"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavDropdown">
              {/* Links */}
              <ul className="navbar-nav mx-auto py-3 py-lg-0 align-items-center gap-3 gap-lg-0">
                <li className="nav-item">
                  <NavLink
                    className={({ isActive }) =>
                      isActive ? "nav-link active" : "nav-link"
                    }
                    aria-current="page"
                    to={"/"}
                  >
                    {t("home.nav.home")}
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    className={({ isActive }) =>
                      isActive ? "nav-link active" : "nav-link"
                    }
                    to={"whoUs"}
                  >
                    {t("home.nav.whoUs")}
                  </NavLink>
                </li>
                {/* job seeker */}
                {userAccount?.type === "job_seeker" && (
                  <li className="nav-item">
                    <NavLink
                      className={({ isActive }) =>
                        isActive ? "nav-link active" : "nav-link"
                      }
                      to={"program"}
                    >
                      {t("home.nav.qualification")}
                    </NavLink>
                  </li>
                )}
                {userAccount?.type !== "business_pioneer" &&
                  userAccount?.type !== "institute" && (
                    <li className="nav-item">
                      <NavLink
                        className={({ isActive }) =>
                          isActive ? "nav-link active" : "nav-link"
                        }
                        to={!userAccount ? "/register/login" : "jobs"}
                      >
                        {t("home.nav.jobs")}
                      </NavLink>
                    </li>
                  )}

                <li className="nav-item">
                  <NavLink
                    className={({ isActive }) =>
                      isActive ? "nav-link active" : "nav-link"
                    }
                    to={!userAccount ? "/register/login" : "courses"}
                  >
                    {t("home.nav.training-institutes")}
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    className={({ isActive }) =>
                      isActive ? "nav-link active" : "nav-link"
                    }
                    to={"all-article"}
                  >
                    {t("home.nav.flyers")}
                  </NavLink>
                </li>
              </ul>
              {/* Login And Language and Notification */}
              <div className="login-language d-flex align-items-center gap-4 justify-content-center">
                {/* Notification */}
                {userAccount && <Notification />}
                {/* log in */}
                {login ? (
                  <div
                    className="userAccount d-flex gap-2 align-items-center position-relative pointer"
                    onClick={() => {
                      setWindoOpen(!windowOpen);
                    }}
                    ref={menuUserClick}
                  >
                    <div className="image overflow-hidden">
                      <img src={profile} alt="" />
                    </div>

                    <span className="name">{name}</span>
                    <div
                      className={`icon transion-5 flex-c ${
                        !windowOpen && "icon-rotate"
                      }`}
                    >
                      <IoIosArrowDown />
                    </div>
                    {/* window */}
                    <div
                      className={`position-absolute useraccount-window r-10 p-2 text-white ${
                        windowOpen && "d-none"
                      }`}
                      ref={menuUser}
                    >
                      <Link
                        to={
                          userAccount?.is_register_data
                            ? `${rout}${
                                userAccount?.type !== "job_seeker"
                                  ? `/dashboard/`
                                  : ""
                              }`
                            : userAccount?.type !== "job_seeker"
                            ? allCheckData ? `${rout}/dashboard/` : rout
                            : !personal_data
                            ? "/employ-data"
                            : !learning_data
                            ? "/employ-data/learn"
                            : !experiences
                            ? "/employ-data/experience"
                            : "/job_seeker"
                        }
                        className="d-flex align-items-center gap-2 pointer py-1 px-2 text-black"
                      >
                        <FaUser />
                        {t("home.nav.windowUser.my_account")}
                      </Link>
                      <div
                        className="logout mt-2 d-flex align-items-center gap-2 pointer py-1 px-2 text-black"
                        onClick={() => {
                          localStorage.removeItem("user");
                          localStorage.removeItem("token");
                          setName(!name);
                          navigat("/");
                        }}
                      >
                        <IoExit />
                        {t("home.nav.windowUser.logOut")}
                      </div>
                    </div>
                  </div>
                ) : (
                  <Link to={"/register/login"} className="login flex-c">
                    {t("home.nav.login")}
                  </Link>
                )}

                {/* Language */}
                <div
                  className="language-cont d-flex align-items-center gap-2 pointer position-relative"
                  onClick={() => {
                    setOpen(!Open);
                  }}
                  ref={menuLanguageClic}
                >
                  <div className="language flex-c overflow-hidden">
                    {lang === "ar" ? (
                      <ArabicFlag />
                    ) : (
                      <EnglishFlag style={{ transform: "scale(1.5)" }} />
                    )}
                  </div>
                  <div
                    className={`arrow-icon transion-5 flex-c ${
                      Open && "icon-rotate"
                    }`}
                  >
                    <IoIosArrowDown />
                  </div>
                  {/* Language Menu */}
                  <div
                    className={`menu position-absolute bg-white r-10 py-2 ${
                      Open ? "d-blok" : "d-none"
                    }`}
                    ref={menuLanguage}
                  >
                    <div
                      className="en d-flex align-items-center gap-2 px-4 py-2"
                      onClick={() => {
                        setOpen(!Open);
                        window.localStorage.i18nextLng = "en";
                        window.location.reload(false);
                      }}
                    >
                      <span className="icon">
                        <EnglishFlag />
                      </span>
                      {t("home.nav.english")}
                    </div>
                    <div
                      className="ar d-flex align-items-center gap-2 px-4 py-2"
                      onClick={() => {
                        setOpen(!Open);
                        window.localStorage.i18nextLng = "ar";
                        window.location.reload(false);
                      }}
                    >
                      <span className="icon">
                        <ArabicFlag />
                      </span>
                      {t("home.nav.arabic")}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
}

export const trans = t;

export default Navbar;

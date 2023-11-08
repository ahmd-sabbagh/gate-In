import axios from "axios";
import React from "react";
import { useRef } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ReactSelect from "react-select";
import { useRecoilState } from "recoil";
import { apiHeaders, basedUrl } from "../../../Api/Apis";
import {
  colorStyles,
  colorStylesMulti,
} from "../../../Others/ColorStyleReactSlick";
import { ErrorComponent } from "../../../Others/Error";
import {
  repeatCoins,
  repeatCountries,
  repeatMajors,
  repeatPersonalSiklss,
} from "../../../RecoilState/RepeatFormData";
import { ReactComponent as FormData } from "./Assets/FormData.svg";
import { PopubSendData } from "../../../RecoilState/PopubSendData";
import SendDataDone from "../../../Components/SendDataDone/SendDataDone";
import { trans } from "../../../Components/Navbar/Navbar";

function JobApplication({ type, route }) {
  const navigat = useNavigate();
  const token = localStorage.getItem("token");
  // Popub Data
  const popubData = {
    icon: <FormData />,
    title: trans("popubData.title"),
    desc: trans("popubData.desc"),
    btn1To:
      type === "company"
        ? "/company/dashboard"
        : type === "seeker"
        ? "/job_seeker"
        : "/institute/dashboard/",
    btn1: trans("popubData.btn1"),
  };
  const [done, setDone] = useRecoilState(PopubSendData);
  // Popup Data
  // Validation State
  const [errorValidation, setErrorValidation] = useState({});
  // Validation State
  // Start Date
  const [start_date, setStart_date] = useState();
  // States Languages Inputs
  // Arabic
  const [title_ar, setTitle] = useState();
  const [description_ar, setDescription] = useState();
  const [requirements_ar, setRequirements] = useState();
  // English
  const [title_en, setTitleEn] = useState();
  const [description_en, setDescriptionEn] = useState();
  const [requirements_en, setRequirementsEn] = useState();
  // Urdo
  const [title_kur, setTitleKur] = useState();
  const [description_kur, setDescriptionKur] = useState();
  const [requirements_kur, setRequirementsKur] = useState();
  // States Languages Inputs
  // Type of the Job Or Course
  // Job
  const [full_time, setFull_time] = useState(false);
  const [part_time, setPart_time] = useState(false);
  const [remotely, setRemotely] = useState(false);
  // Course
  const [practical, setPractical] = useState(false);
  const [theoretical, setTheoretical] = useState(false);
  const [price, setCoursePrice] = useState();
  // Type of the Job Or Course
  // Currency
  const [coins, setCoins] = useRecoilState(repeatCoins);
  const [coinSelect, setCoinsSelect] = useState();
  function selectCoins(data) {
    setCoinsSelect(data.value);
  }
  // Currency
  // Job Level
  const [advanced_level, setAdvanced_level] = useState(false);
  const [average_level, setAverage_level] = useState(false);
  const [fresh_graduate, setFresh_graduate] = useState(false);
  const [high_experience, setHigh_experience] = useState(false);
  const [boss, setBoss] = useState(false);
  // Job Level
  // Years of Experience
  const [min_years_experience, setMin_years_experience] = useState();
  const [max_years_experience, setMax_years_experience] = useState();
  // Years of Experience
  // State Majors
  const [majors, setMajores] = useRecoilState(repeatMajors);
  const [majorsValue, setMajorsValue] = useState();
  function majorSelect(data) {
    setMajorsValue(data);
    getTechnicalSkills(data.value);
  }
  // State Majors
  // State of City
  const [city, setCity] = useState();
  const [citySelect, setCitySelect] = useState();
  function selectCity(data) {
    setCitySelect(data);
  }
  // State of City
  // State of goverment
  const [goverment, setGoverment] = useState();
  const [govermentSelect, setGovermentSelect] = useState();
  function selectGoverment(data) {
    setGovermentSelect(data);
    setCitySelect(null);
    axios
      .get(`${basedUrl}/public/data/cities/${data.value}`, apiHeaders)
      .then(({ data }) => {
        setCity(data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  // State of goverment
  // State of countries
  const [countriesState, setCountriesState] = useRecoilState(repeatCountries);
  const [countries, setCountries] = useState();
  function selectCountries(data) {
    setCountries(data);
    setGovermentSelect(null);
    setCitySelect(null);
    axios
      .get(`${basedUrl}/public/data/provinces/${data.value}`, apiHeaders)
      .then(({ data }) => {
        setGoverment(data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  // State of countries
  // Salary
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [check, setCheck] = useState(false);
  const myRef = useRef(null);
  const toRef = useRef(null);
  const handleClick = () => {
    myRef.current.value = "";
    toRef.current.value = "";
  };
  // Salary
  // Get Technical Skills
  const [technicalSkillsOption, setTechnicalSkillsOption] = useState();
  const [tSkills, setTskills] = useState([]);
  function selectTechnicalSkills(data) {
    setTskills(data);
  }
  const technicalSkillsArray = tSkills.map((item) => item.value);
  function getTechnicalSkills(id) {
    axios
      .get(`${basedUrl}/public/data/technical-skills/${id}`, apiHeaders)
      .then(({ data }) => {
        setTechnicalSkillsOption(data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  // Get Technical Skills
  // Personal Skills
  const [personalSkills, setPersonalSkills] =
    useRecoilState(repeatPersonalSiklss);
  const [pSkills, setPskills] = useState([]);
  function selectPersonalSkills(data) {
    setPskills(data);
  }
  const personalSkillsArray = pSkills.map((item) => item.value);
  // Personal Skills
  // Function Submit
  async function onSubmit(e) {
    e.preventDefault();
    const FormData = {
      // main data
      major_id: majorsValue?.value,
      country_id: countries?.value,
      province_id: govermentSelect?.value,
      city_id: citySelect?.value,
      // Start Date
      start_date,
      // Job Level
      advanced_level,
      average_level,
      fresh_graduate,
      high_experience,
      boss,
      // Job Tybe
      full_time,
      part_time,
      remotely,
      // Experiens Years
      min_years_experience,
      max_years_experience,
      // Salary
      from_salary: from,
      to_salary: to,
      not_write_salary: check,
      // Technical
      technical_skills: technicalSkillsArray,
      // Personal
      personal_skills: personalSkillsArray,
      // Description
      // ar
      title_ar,
      description_ar,
      requirements_ar,
      // en
      title_en,
      description_en,
      requirements_en,
      // kur
      title_kur,
      description_kur,
      requirements_kur,
      //Course
      practical,
      theoretical,
      price,
      currency: coinSelect,
    };
    try {
      const { data } = await axios.post(`${basedUrl}${route}`, FormData, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      setDone(true);
    } catch (error) {
      ErrorComponent(error, navigat, setErrorValidation);
    }
  }
  // Function Submit
  return (
    <>
      {done && <SendDataDone {...popubData} />}
      <div
        className={`JobApplication bg-white py-4 p-md-4 r-10 ${
          (type === "seeker" || type === "institute") && "px-3"
        }`}
      >
        <h3 className="fs-32-700 mb-4 mb-md-5">
          {type === "company"
            ? trans("my_personal_data_user.add_jobs")
            : type === "seeker"
            ? trans("user_profile.order_jobs")
            : trans("center_company.add_course")}
        </h3>
        <form onSubmit={onSubmit}>
          {/* Taps */}
          <div
            className="p-3 p-md-4 mb-4 r-10"
            style={{ backgroundColor: " #0185430f" }}
          >
            {/* Bar */}
            <ul
              className="nav nav-pills mb-3 border-bottom pb-3"
              id="pills-tab"
              role="tablist"
            >
              <li className="nav-item" role="presentation">
                <button
                  className="nav-link active"
                  id="pills-home-tab"
                  data-bs-toggle="pill"
                  data-bs-target="#pills-home"
                  type="button"
                  role="tab"
                  aria-controls="pills-home"
                  aria-selected="true"
                >
                  {trans("company_profile.company_data.arabic")}
                </button>
              </li>
              <li className="nav-item" role="presentation">
                <button
                  className="nav-link"
                  id="pills-profile-tab"
                  data-bs-toggle="pill"
                  data-bs-target="#pills-profile"
                  type="button"
                  role="tab"
                  aria-controls="pills-profile"
                  aria-selected="false"
                >
                  {trans("company_profile.company_data.english")}
                </button>
              </li>
              <li className="nav-item" role="presentation">
                <button
                  className="nav-link"
                  id="pills-contact-tab"
                  data-bs-toggle="pill"
                  data-bs-target="#pills-contact"
                  type="button"
                  role="tab"
                  aria-controls="pills-contact"
                  aria-selected="false"
                >
                  {trans("company_profile.company_data.urdu")}
                </button>
              </li>
            </ul>
            {/* Content */}
            <div className="tab-content" id="pills-tabContent">
              {/* Arabic */}
              <div
                className="tab-pane fade show active"
                id="pills-home"
                role="tabpanel"
                aria-labelledby="pills-home-tab"
              >
                <div className="row g-4">
                  {/* عنوان الوظيف */}
                  <div className="col-12">
                    <div className="d-flex flex-column gap-2">
                      <label className="input-lable" htmlFor="job-adress">
                        {type === "company" || type === "seeker"
                          ? trans("job_edit.job_title")
                          : trans("center_company.course_title")}
                      </label>
                      <input
                        className={`input-data border r-10 p-3 ${
                          errorValidation.hasOwnProperty("title_ar") &&
                          "border-red"
                        }`}
                        type="text"
                        id="job-adress"
                        value={title_ar}
                        onChange={(e) => {
                          setTitle(e.target.value);
                        }}
                        placeholder={
                          type === "company" || type === "seeker"
                            ? trans("center_company.write_job_title")
                            : trans("center_company.write_course_title")
                        }
                      />
                      <span className="text-error fs-14-400">
                        {errorValidation.hasOwnProperty("title_ar")
                          ? errorValidation.title_ar[0]
                          : null}
                      </span>
                    </div>
                  </div>
                  {/* وصف الوظيفة */}
                  <div className="col-12">
                    <div className="d-flex flex-column gap-2">
                      <label className="input-lable" htmlFor="job-desc">
                        {type === "company" || type === "seeker"
                          ? trans("job_edit.job_disc")
                          : trans("center_company.course_descriptin")}
                      </label>
                      <textarea
                        className={`input-data border r-10 p-3 ${
                          errorValidation.hasOwnProperty("description_ar") &&
                          "border-red"
                        }`}
                        name="textaria"
                        id="job-desc"
                        value={description_ar}
                        onChange={(e) => {
                          setDescription(e.target.value);
                        }}
                        placeholder={trans(
                          "company_profile.company_data.company_disc_place"
                        )}
                      ></textarea>
                      <span className="text-error fs-14-400">
                        {errorValidation.hasOwnProperty("description_ar")
                          ? errorValidation.description_ar[0]
                          : null}
                      </span>
                    </div>
                  </div>
                  {/* متطلبات الوظيفة */}
                  <div className="col-12">
                    <div className="d-flex flex-column gap-2">
                      <label className="input-lable" htmlFor="job-order">
                        {type === "company" || type === "seeker"
                          ? trans("job_edit.job_requird")
                          : trans("center_company.course_requierd")}
                      </label>
                      <textarea
                        className={`input-data border r-10 p-3 ${
                          errorValidation.hasOwnProperty("requirements_ar") &&
                          "border-red"
                        }`}
                        name="textaria"
                        id="job-order"
                        value={requirements_ar}
                        onChange={(e) => {
                          setRequirements(e.target.value);
                        }}
                        placeholder={trans(
                          "company_profile.company_data.company_disc_place"
                        )}
                      ></textarea>
                      <span className="text-error fs-14-400">
                        {errorValidation.hasOwnProperty("requirements_ar")
                          ? errorValidation.requirements_ar[0]
                          : null}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              {/* English */}
              <div
                className="tab-pane fade"
                id="pills-profile"
                role="tabpanel"
                aria-labelledby="pills-profile-tab"
              >
                <div className="row g-4">
                  {/* عنوان الوظيف */}
                  <div className="col-12">
                    <div className="d-flex flex-column gap-2">
                      <label className="input-lable" htmlFor="job-adress">
                        {type === "company" || type === "seeker"
                          ? trans("job_edit.job_title")
                          : trans("center_company.course_title")}
                      </label>
                      <input
                        className="input-data border r-10 p-3"
                        type="text"
                        value={title_en}
                        onChange={(e) => {
                          setTitleEn(e.target.value);
                        }}
                        placeholder={
                          type === "company" || type === "seeker"
                            ? trans("center_company.write_job_title")
                            : trans("center_company.write_course_title")
                        }
                      />
                    </div>
                  </div>
                  {/* وصف الوظيفة */}
                  <div className="col-12">
                    <div className="d-flex flex-column gap-2">
                      <label className="input-lable" htmlFor="job-desc">
                        {type === "company" || type === "seeker"
                          ? trans("job_edit.job_disc")
                          : trans("center_company.course_descriptin")}
                      </label>
                      <textarea
                        className="input-data border r-10 p-3"
                        name="textaria"
                        value={description_en}
                        onChange={(e) => {
                          setDescriptionEn(e.target.value);
                        }}
                        placeholder={trans(
                          "company_profile.company_data.company_disc_place"
                        )}
                      ></textarea>
                    </div>
                  </div>
                  {/* متطلبات الوظيفة */}
                  <div className="col-12">
                    <div className="d-flex flex-column gap-2">
                      <label className="input-lable" htmlFor="job-order">
                        {type === "company" || type === "seeker"
                          ? trans("job_edit.job_requird")
                          : trans("center_company.course_requierd")}
                      </label>
                      <textarea
                        className="input-data border r-10 p-3"
                        name="textaria"
                        value={requirements_en}
                        onChange={(e) => {
                          setRequirementsEn(e.target.value);
                        }}
                        placeholder={trans(
                          "company_profile.company_data.company_disc_place"
                        )}
                      ></textarea>
                    </div>
                  </div>
                </div>
              </div>
              {/* Urdo */}
              <div
                className="tab-pane fade"
                id="pills-contact"
                role="tabpanel"
                aria-labelledby="pills-contact-tab"
              >
                <div className="row g-4">
                  {/* عنوان الوظيف */}
                  <div className="col-12">
                    <div className="d-flex flex-column gap-2">
                      <label className="input-lable" htmlFor="job-adress">
                        {type === "company" || type === "seeker"
                          ? trans("job_edit.job_title")
                          : trans("center_company.course_title")}
                      </label>
                      <input
                        className="input-data border r-10 p-3"
                        type="text"
                        value={title_kur}
                        onChange={(e) => {
                          setTitleKur(e.target.value);
                        }}
                        placeholder={
                          type === "company" || type === "seeker"
                            ? trans("center_company.write_job_title")
                            : trans("center_company.write_course_title")
                        }
                      />
                    </div>
                  </div>
                  {/* وصف الوظيفة */}
                  <div className="col-12">
                    <div className="d-flex flex-column gap-2">
                      <label className="input-lable" htmlFor="job-desc">
                        {type === "company" || type === "seeker"
                          ? trans("job_edit.job_disc")
                          : trans("center_company.course_descriptin")}
                      </label>
                      <textarea
                        className="input-data border r-10 p-3"
                        name="textaria"
                        value={description_kur}
                        onChange={(e) => {
                          setDescriptionKur(e.target.value);
                        }}
                        placeholder={trans(
                          "company_profile.company_data.company_disc_place"
                        )}
                      ></textarea>
                    </div>
                  </div>
                  {/* متطلبات الوظيفة */}
                  <div className="col-12">
                    <div className="d-flex flex-column gap-2">
                      <label className="input-lable" htmlFor="job-order">
                        {type === "company" || type === "seeker"
                          ? trans("job_edit.job_requird")
                          : trans("center_company.course_requierd")}
                      </label>
                      <textarea
                        className="input-data border r-10 p-3"
                        name="textaria"
                        value={requirements_kur}
                        onChange={(e) => {
                          setRequirementsKur(e.target.value);
                        }}
                        placeholder={trans(
                          "company_profile.company_data.company_disc_place"
                        )}
                      ></textarea>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row g-4">
            {/* نوع الوظيفة */}
            <div className="col-12">
              <span className="input-lable">
                {type === "company" || type === "seeker"
                  ? trans("filter.Type_of_the_job")
                  : trans("center_company.type_course")}
              </span>
              <div className=" d-flex flex-column flex-md-row gap-3 mt-3">
                {/* Full Time Or Practical */}
                <div className="job-type">
                  <input
                    type="checkbox"
                    name="pricing"
                    id="one"
                    value={type !== "institute" ? full_time : practical}
                    checked={full_time === true || practical === true}
                    onChange={() => {
                      if (type === "institute") {
                        setPractical(!practical);
                      } else {
                        setFull_time(!full_time);
                      }
                    }}
                  />
                  <label
                    htmlFor="one"
                    className="fs-16-400 text-color r-10 border p-3 pointer w-100 w-md-auto text-center"
                  >
                    {type === "company" || type === "seeker"
                      ? trans("filter.all")
                      : trans("filter.practical")}
                  </label>
                </div>
                {/* Part Time Or Theoretical */}
                <div className="job-type">
                  <input
                    type="checkbox"
                    name="pricing"
                    id="two"
                    value={type !== "institute" ? part_time : theoretical}
                    checked={part_time === true || theoretical === true}
                    onChange={() => {
                      if (type === "institute") {
                        setTheoretical(!theoretical);
                      } else {
                        setPart_time(!part_time);
                      }
                    }}
                  />
                  <label
                    htmlFor="two"
                    className="fs-16-400 text-color r-10 border p-3 pointer w-100 w-md-auto text-center"
                  >
                    {type === "company" || type === "seeker"
                      ? trans("filter.part")
                      : trans("filter.theoretical")}
                  </label>
                </div>
                {/* Remotly */}
                {type !== "institute" && (
                  <div className="job-type">
                    <input
                      type="checkbox"
                      name="pricing"
                      id="three"
                      value={remotely}
                      checked={remotely === true}
                      onChange={() => {
                        setRemotely(!remotely);
                      }}
                    />
                    <label
                      htmlFor="three"
                      className="fs-16-400 text-color r-10 border p-3 pointer w-100 w-md-auto text-center"
                    >
                      {trans("filter.home")}
                    </label>
                  </div>
                )}
              </div>
            </div>
            {/* اختر تخصصك */}
            <div className="col-12">
              <div className="end-name d-flex flex-column gap-2">
                <span className="input-lable">
                  {trans("my_personal_data_user.Specialization")}
                </span>
                <ReactSelect
                  options={majors}
                  value={majorsValue}
                  placeholder={trans(
                    "company_profile.company_data.specialty_place"
                  )}
                  isSearchable={true}
                  onChange={majorSelect}
                  styles={colorStyles}
                />
                <span className="text-error fs-14-400">
                  {errorValidation.hasOwnProperty("major_id")
                    ? errorValidation.major_id[0]
                    : null}
                </span>
              </div>
            </div>
            {/* موقع العمل */}
            <h4 className=" input-lable col-12">
              {trans("company_profile.company_data.work_place")}
            </h4>
            {/* countries */}
            <div className="col-12 col-md-6 col-lg-4">
              <ReactSelect
                options={countriesState}
                value={countries}
                placeholder={trans("my_personal_data_user.country")}
                isSearchable={true}
                onChange={selectCountries}
                styles={colorStyles}
              />
              <span className="text-error fs-14-400">
                {errorValidation.hasOwnProperty("country_id")
                  ? errorValidation.country_id[0]
                  : null}
              </span>
            </div>
            {/* goverment */}
            <div className="col-12 col-md-6 col-lg-4">
              <ReactSelect
                options={goverment}
                value={govermentSelect}
                placeholder={trans("my_personal_data_user.government")}
                isSearchable={true}
                onChange={selectGoverment}
                styles={colorStyles}
              />
              <span className="text-error fs-14-400">
                {errorValidation.hasOwnProperty("province_id")
                  ? errorValidation.province_id[0]
                  : null}
              </span>
            </div>
            {/* CITY */}
            <div className="col-12 col-md-6 col-lg-4">
              <ReactSelect
                options={city}
                value={citySelect}
                placeholder={trans("my_personal_data_user.city")}
                isSearchable={true}
                onChange={selectCity}
                styles={colorStyles}
              />
              <span className="text-error fs-14-400">
                {errorValidation.hasOwnProperty("city_id")
                  ? errorValidation.city_id[0]
                  : null}
              </span>
            </div>
            {/* hr */}
            <hr className="mt-5 mb-4" />
            {/* المستوي الوظيفي الحالى */}
            <div className="col-12 col-md-8">
              <div className="input-lable mb-3">
                {type === "seeker"
                  ? trans("job_edit.curent_job_level")
                  : trans("job_edit.job_level")}
              </div>
              <div className="job-level d-flex flex-wrap gap-2">
                <div className="job-level">
                  <input
                    type={
                      type === "company" || type === "institute"
                        ? "checkbox"
                        : "radio"
                    }
                    name="level"
                    id="level-one"
                    value={advanced_level}
                    checked={advanced_level === true}
                    onChange={() => {
                      setAdvanced_level(!advanced_level);
                      if (type === "seeker") {
                        setAverage_level(false);
                        setFresh_graduate(false);
                        setHigh_experience(false);
                        setBoss(false);
                      }
                    }}
                  />
                  <label
                    htmlFor="level-one"
                    className="fs-16-400 text-color r-10 border p-3 pointer"
                  >
                    {trans("job_edit.advanced_level")}
                  </label>
                </div>
                <div className="job-level">
                  <input
                    type={
                      type === "company" || type === "institute"
                        ? "checkbox"
                        : "radio"
                    }
                    name="level"
                    id="level-two"
                    value={average_level}
                    checked={average_level === true}
                    onChange={() => {
                      setAverage_level(!average_level);
                      if (type === "seeker") {
                        setAdvanced_level(false);
                        setFresh_graduate(false);
                        setHigh_experience(false);
                        setBoss(false);
                      }
                    }}
                  />
                  <label
                    htmlFor="level-two"
                    className="fs-16-400 text-color r-10 border p-3 pointer"
                  >
                    {trans("job_edit.average_level")}
                  </label>
                </div>
                <div className="job-level">
                  <input
                    type={
                      type === "company" || type === "institute"
                        ? "checkbox"
                        : "radio"
                    }
                    name="level"
                    id="level-three"
                    value={fresh_graduate}
                    checked={fresh_graduate === true}
                    onChange={() => {
                      setFresh_graduate(!fresh_graduate);
                      if (type === "seeker") {
                        setAdvanced_level(false);
                        setAverage_level(false);
                        setHigh_experience(false);
                        setBoss(false);
                      }
                    }}
                  />
                  <label
                    htmlFor="level-three"
                    className="fs-16-400 text-color r-10 border p-3 pointer"
                  >
                    {trans("filter.Fresh_graduate")}
                  </label>
                </div>
                <div className="job-level">
                  <input
                    type={
                      type === "company" || type === "institute"
                        ? "checkbox"
                        : "radio"
                    }
                    name="level"
                    id="level-four"
                    value={high_experience}
                    checked={high_experience === true}
                    onChange={() => {
                      setHigh_experience(!high_experience);
                      if (type === "seeker") {
                        setAdvanced_level(false);
                        setAverage_level(false);
                        setFresh_graduate(false);
                        setBoss(false);
                      }
                    }}
                  />
                  <label
                    htmlFor="level-four"
                    className="fs-16-400 text-color r-10 border p-3 pointer"
                  >
                    {trans("filter.High_experience")}
                  </label>
                </div>
                <div className="job-level">
                  <input
                    type={
                      type === "company" || type === "institute"
                        ? "checkbox"
                        : "radio"
                    }
                    name="level"
                    id="level-five"
                    value={boss}
                    checked={boss === true}
                    onChange={() => {
                      setBoss(!boss);
                      if (type === "seeker") {
                        setAdvanced_level(false);
                        setAverage_level(false);
                        setFresh_graduate(false);
                        setHigh_experience(false);
                      }
                    }}
                  />
                  <label
                    htmlFor="level-five"
                    className="fs-16-400 text-color r-10 border p-3 pointer"
                  >
                    {trans("filter.boss")}
                  </label>
                </div>
              </div>
            </div>
            {/* سنوات الخبرة */}
            <h4 className=" input-lable col-12">
              {trans("filter.Years_of_Experienc")}
            </h4>
            {/* من */}
            <div className="col-12 col-md-6">
              <input
                className={`input-data border r-10 p-3 ${
                  errorValidation.hasOwnProperty("min_years_experience") &&
                  "border-red"
                }`}
                type="text"
                id="from"
                placeholder={trans("my_personal_data_user.from")}
                onChange={(e) => {
                  setMin_years_experience(e.target.value);
                }}
              />
              <span className="text-error fs-14-400">
                {errorValidation.hasOwnProperty("min_years_experience")
                  ? errorValidation.min_years_experience[0]
                  : null}
              </span>
            </div>
            {/* الى */}
            {type !== "seeker" && (
              <div className="col-12 col-md-6">
                <input
                  className={`input-data border r-10 p-3 ${
                    errorValidation.hasOwnProperty("max_years_experience") &&
                    "border-red"
                  }`}
                  type="text"
                  id="to"
                  placeholder={
                    type !== "seeker"
                      ? trans("my_personal_data_user.to")
                      : trans("filter.Years_of_Experienc")
                  }
                  onChange={(e) => {
                    setMax_years_experience(e.target.value);
                  }}
                />
                <span className="text-error fs-14-400">
                  {errorValidation.hasOwnProperty("max_years_experience")
                    ? errorValidation.max_years_experience[0]
                    : null}
                </span>
              </div>
            )}

            {/* Salary and course price */}
            <h4 className="col-12 input-lable">
              {type === "institute"
                ? trans("company_job_details.corse_price")
                : trans("company_job_details.salary")}
            </h4>
            {/* currency */}
            <div className="col-12 col-lg-4">
              <div className="d-flex flex-column gap-2">
                <ReactSelect
                  options={coins}
                  placeholder={trans("center_company.type_price")}
                  isSearchable={true}
                  styles={colorStylesMulti}
                  onChange={selectCoins}
                />
                <span className="text-error fs-14-400">
                  {errorValidation.hasOwnProperty("currency")
                    ? errorValidation.currency[0]
                    : null}
                </span>
              </div>
            </div>
            {type === "institute" ? (
              <>
                <div className="col-12 col-lg-4">
                  <div
                    className={`from r-10 border p-3 d-flex align-items-center justify-content-between ${
                      errorValidation.hasOwnProperty("price") && "border-red"
                    }`}
                  >
                    <input
                      className={`border-none full-width salary-null`}
                      type="number"
                      placeholder={trans("center_company.price")}
                      onChange={(e) => {
                        setCoursePrice(e.target.value);
                      }}
                    />
                    <span className="tag-price flex-c">د.ع</span>
                  </div>
                  <span className="text-error fs-14-400">
                    {errorValidation.hasOwnProperty("price")
                      ? errorValidation.price[0]
                      : null}
                  </span>
                </div>
              </>
            ) : (
              <>
                {/* الراتب المتوقع */}
                {/* From */}
                <div className="col-12 col-md-4">
                  <div className="from r-10 border p-3 d-flex align-items-center justify-content-between ">
                    {check ? (
                      <input
                        className="border-none full-width salary-null"
                        type="number"
                        placeholder={trans("my_personal_data_user.from")}
                        ref={myRef}
                        disabled
                      />
                    ) : (
                      <input
                        className="border-none full-width salary-null"
                        type="number"
                        placeholder={trans("my_personal_data_user.from")}
                        ref={myRef}
                        onChange={(e) => {
                          setFrom(e.target.value);
                        }}
                      />
                    )}
                    <span className="tag-price flex-c">د.ع</span>
                  </div>
                </div>
                {/* To */}
                <div className="col-12 col-md-4">
                  <div className="from r-10 border p-3 d-flex align-items-center justify-content-between ">
                    {check ? (
                      <input
                        className="border-none full-width salary-null"
                        type="number"
                        placeholder={trans("my_personal_data_user.to")}
                        disabled
                        ref={toRef}
                      />
                    ) : (
                      <input
                        className="border-none full-width salary-null"
                        type="number"
                        placeholder={trans("my_personal_data_user.to")}
                        ref={toRef}
                        onChange={(e) => {
                          setTo(e.target.value);
                        }}
                      />
                    )}
                    <span className="tag-price flex-c">د.ع</span>
                  </div>
                </div>
                {/* checkbox */}
                <div className="col-12">
                  <div className="or d-flex align-items-center gap-3">
                    <span className="input-lable">{trans("job_edit.or")}</span>
                    <div className="cheack-company d-flex align-items-center gap-2">
                      <input
                        type="checkbox"
                        name="check"
                        id="check"
                        onChange={(e) => {
                          handleClick();
                          setCheck(!check);
                          setFrom("");
                          setTo("");
                        }}
                      />
                      <label htmlFor="check" className="pointer">
                        {trans("company_job_details.confirm_with_company")}
                      </label>
                    </div>
                  </div>
                </div>
                <span className="text-error fs-14-400">
                  {errorValidation.hasOwnProperty("to_salary")
                    ? errorValidation.to_salary[0]
                    : null}
                </span>
              </>
            )}

            {/* تاريخ بداية العمل */}
            {type === "company" && (
              <div className="col-12">
                <div className="d-flex flex-column gap-3">
                  <label className="input-lable" htmlFor="jobDate">
                    {trans("job_edit.date_start_job")}
                  </label>
                  <input
                    className={`input-data border r-10 p-3 ${
                      errorValidation.hasOwnProperty("start_date") &&
                      "border-red"
                    }`}
                    type="date"
                    id="jobDate"
                    onChange={(e) => {
                      setStart_date(e.target.value);
                    }}
                  />
                  <span className="text-error fs-14-400">
                    {errorValidation.hasOwnProperty("start_date")
                      ? errorValidation.start_date[0]
                      : null}
                  </span>
                </div>
              </div>
            )}
            {/* المهارارت التقنية */}
            <div className="col-12">
              <div className="d-flex flex-column gap-2">
                <span className="input-lable">
                  {trans("company_job_details.tecnicl")}
                </span>
                <ReactSelect
                  options={technicalSkillsOption}
                  placeholder={trans("job_edit.place")}
                  isSearchable={true}
                  styles={colorStylesMulti}
                  isMulti
                  onChange={selectTechnicalSkills}
                />
                <span className="text-error fs-14-400">
                  {errorValidation.hasOwnProperty("technical_skills")
                    ? errorValidation.technical_skills[0]
                    : null}
                </span>
              </div>
            </div>
            {/* المهارارت الشخصية */}
            <div className="col-12">
              <div className="d-flex flex-column gap-2">
                <span className="input-lable">
                  {trans("company_job_details.personal_skills")}
                </span>
                <ReactSelect
                  options={personalSkills}
                  placeholder={trans("job_edit.place")}
                  isSearchable={true}
                  isMulti
                  onChange={selectPersonalSkills}
                  styles={colorStylesMulti}
                />
                <span className="text-error fs-14-400">
                  {errorValidation.hasOwnProperty("personal_skills")
                    ? errorValidation.personal_skills[0]
                    : null}
                </span>
                <span className=" fs-16-400 text-color">
                  {trans("my_personal_data_user.like")}
                </span>
              </div>
            </div>
            {/* زرار */}
            <div className="col-12 col-sm-10 col-md-6 col-lg-4">
              <button type="submit" className="persnol-data-btn r-10 py-3">
                {trans("center_company.order_now")}
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default JobApplication;

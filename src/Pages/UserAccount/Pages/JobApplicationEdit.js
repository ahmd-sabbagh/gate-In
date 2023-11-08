import axios from "axios";
import React, { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
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

function JobApplicationEdit({ type, route, routEditGet }) {
  const prams = useParams();
  const navigat = useNavigate();
  const token = localStorage.getItem("token");
  // Popub Data
  const popubData = {
    icon: <FormData />,
    title: trans("popubData.title"),
    desc: trans("popubData.desc"),
    btn1To:
      type === "company" ? "/company/dashboard" : "/job_seeker/my-requestes",
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
  // Type of the job
  const [full_time, setFull_time] = useState(false);
  const [part_time, setPart_time] = useState(false);
  const [remotely, setRemotely] = useState(false);
  // Type of the job
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
  // Currency
  const [coins, setCoins] = useRecoilState(repeatCoins);
  const [coinSelect, setCoinsSelect] = useState();
  function selectCoins(data) {
    setCoinsSelect(data);
  }
  // Currency
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
      currency: coinSelect?.value,
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
    };
    try {
      const { data } = await axios.post(
        `${basedUrl}${route}${prams.Id}`,
        FormData,
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setDone(true);
    } catch (error) {
      ErrorComponent(error, navigat, setErrorValidation);
    }
  }
  // Function Submit
  // Return Data
  const getReturnData = () => {
    axios
      .get(`${basedUrl}${routEditGet}${prams.Id}`, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then(({ data }) => {
        setTitle(data.data.job_details.title);
        setDescription(data.data.job_details.description);
        setRequirements(data.data.job_details.requirements);
        setFull_time(data.data.job_details.full_time);
        setPart_time(data.data.job_details.part_time);
        setRemotely(data.data.job_details.remotely);
        setMajorsValue(data.data.job_details.major);
        setCountries(data.data.job_details.country);
        setGoverment(data.data.job_details.provinces_country);
        setGovermentSelect(data.data.job_details.province);
        setCity(data.data.job_details.cities_province);
        setCitySelect(data.data.job_details.city);
        setAdvanced_level(data.data.job_details.advanced_level);
        setAverage_level(data.data.job_details.average_level);
        setFresh_graduate(data.data.job_details.fresh_graduate);
        setHigh_experience(data.data.job_details.high_experience);
        setBoss(data.data.job_details.boss);
        setMin_years_experience(data.data.job_details.min_years_experience);
        setMax_years_experience(data.data.job_details.max_years_experience);
        if (data.data.job_details.not_write_salary !== 0) {
          handleClick();
          setCheck(!check);
          setFrom("");
          setTo("");
        } else {
          setFrom(data.data.job_details.from_salary);
          setTo(data.data.job_details.to_salary);
          setCoinsSelect(data.data.job_details.currency);
        }
        setStart_date(data.data.job_details.start_date);
        setTskills(data.data.job_details.technical_skills);
        setPskills(data.data.job_details.personal_skills);
      })
      .catch((error) => {
        ErrorComponent(error, navigat);
      });
  };
  useEffect(() => {
    getReturnData();
  }, []);
  // Return Data
  return (
    <>
      {done && <SendDataDone {...popubData} />}
      <div className="JobApplication bg-white p-3 p-md-4 r-10">
        <h3 className="fs-32-700 mb-4 mb-md-5">{trans("job_edit.job_edit")}</h3>
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
                        {trans("job_edit.job_title")}
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
                        placeholder={trans("job_edit.job_title")}
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
                        {trans("job_edit.job_disc")}
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
                        placeholder={trans("job_edit.job_disc")}
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
                        {trans("job_edit.job_requird")}
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
                        placeholder={trans("job_edit.job_requird")}
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
                        {trans("job_edit.job_title")}
                      </label>
                      <input
                        className="input-data border r-10 p-3"
                        type="text"
                        value={title_en}
                        onChange={(e) => {
                          setTitleEn(e.target.value);
                        }}
                        placeholder={trans("job_edit.job_title")}
                      />
                    </div>
                  </div>
                  {/* وصف الوظيفة */}
                  <div className="col-12">
                    <div className="d-flex flex-column gap-2">
                      <label className="input-lable" htmlFor="job-desc">
                        {trans("job_edit.job_disc")}
                      </label>
                      <textarea
                        className="input-data border r-10 p-3"
                        name="textaria"
                        value={description_en}
                        onChange={(e) => {
                          setDescriptionEn(e.target.value);
                        }}
                        placeholder={trans("job_edit.job_disc")}
                      ></textarea>
                    </div>
                  </div>
                  {/* متطلبات الوظيفة */}
                  <div className="col-12">
                    <div className="d-flex flex-column gap-2">
                      <label className="input-lable" htmlFor="job-order">
                        {trans("job_edit.job_requird")}
                      </label>
                      <textarea
                        className="input-data border r-10 p-3"
                        name="textaria"
                        value={requirements_en}
                        onChange={(e) => {
                          setRequirementsEn(e.target.value);
                        }}
                        placeholder={trans("job_edit.job_requird")}
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
                        {trans("job_edit.job_title")}
                      </label>
                      <input
                        className="input-data border r-10 p-3"
                        type="text"
                        value={title_kur}
                        onChange={(e) => {
                          setTitleKur(e.target.value);
                        }}
                        placeholder={trans("job_edit.job_title")}
                      />
                    </div>
                  </div>
                  {/* وصف الوظيفة */}
                  <div className="col-12">
                    <div className="d-flex flex-column gap-2">
                      <label className="input-lable" htmlFor="job-desc">
                        {trans("job_edit.job_disc")}
                      </label>
                      <textarea
                        className="input-data border r-10 p-3"
                        name="textaria"
                        value={description_kur}
                        onChange={(e) => {
                          setDescriptionKur(e.target.value);
                        }}
                        placeholder={trans("job_edit.job_disc")}
                      ></textarea>
                    </div>
                  </div>
                  {/* متطلبات الوظيفة */}
                  <div className="col-12">
                    <div className="d-flex flex-column gap-2">
                      <label className="input-lable" htmlFor="job-order">
                        {trans("job_edit.job_requird")}
                      </label>
                      <textarea
                        className="input-data border r-10 p-3"
                        name="textaria"
                        value={requirements_kur}
                        onChange={(e) => {
                          setRequirementsKur(e.target.value);
                        }}
                        placeholder={trans("job_edit.job_requird")}
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
                {trans("filter.Type_of_the_job")}
              </span>
              <div className=" d-flex gap-3 mt-3">
                <div className="job-type">
                  <input
                    type="checkbox"
                    name="pricing"
                    id="one"
                    value={full_time}
                    checked={full_time === true}
                    onChange={() => {
                      setFull_time(!full_time);
                    }}
                  />
                  <label
                    htmlFor="one"
                    className="fs-16-400 text-color r-10 border p-3 pointer"
                  >
                    {trans("filter.all")}
                  </label>
                </div>

                <div className="job-type">
                  <input
                    type="checkbox"
                    name="pricing"
                    id="two"
                    value={part_time}
                    checked={part_time === true}
                    onChange={() => {
                      setPart_time(!part_time);
                    }}
                  />
                  <label
                    htmlFor="two"
                    className="fs-16-400 text-color r-10 border p-3 pointer"
                  >
                    {trans("filter.part")}
                  </label>
                </div>

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
                    className="fs-16-400 text-color r-10 border p-3 pointer"
                  >
                    {trans("filter.home")}
                  </label>
                </div>
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
            <div className="row g-3 mt-4">
              <h4 className=" input-lable m-0">
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
            </div>
            {/* hr */}
            <hr className="mt-5 mb-4" />
            {/* المستوي الوظيفي الحالى */}
            <div className="col-12 col-md-8">
              <div className="input-lable mb-3">
                {type === "company"
                  ? trans("job_edit.job_level")
                  : trans("job_edit.curent_job_level")}
              </div>
              <div className="job-level d-flex flex-wrap gap-2">
                <div className="job-level">
                  <input
                    type={type === "company" ? "checkbox" : "radio"}
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
                    type={type === "company" ? "checkbox" : "radio"}
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
                    type={type === "company" ? "checkbox" : "radio"}
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
                    type={type === "company" ? "checkbox" : "radio"}
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
                    type={type === "company" ? "checkbox" : "radio"}
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
            <div className="row g-3 mt-4">
              <h4 className=" input-lable m-0">
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
                  placeholder={trans("filter.Years_of_Experienc")}
                  value={min_years_experience}
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
            </div>
            {/* الراتب المتوقع */}
            <div className="row g-3 mt-4">
              <h4 className=" input-lable m-0">
                {trans("company_job_details.salary")}
              </h4>
              {/* Curnce */}
              <div className="col-12 col-lg-4">
                <div className="d-flex flex-column gap-2">
                  <ReactSelect
                    options={coins}
                    value={coinSelect}
                    placeholder={trans("job_edit.type_price")}
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
              {/* From */}
              <div className="col-12 col-md-4">
                <div className="from r-10 border p-3 d-flex align-items-center justify-content-between ">
                  {check ? (
                    <input
                      className="border-none full-width salary-null"
                      type="number"
                      placeholder={trans("my_personal_data_user.to")}
                      ref={myRef}
                      disabled
                    />
                  ) : (
                    <input
                      className="border-none full-width salary-null"
                      type="number"
                      placeholder={trans("my_personal_data_user.from")}
                      ref={myRef}
                      value={from}
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
                      placeholder={trans("my_personal_data_user.from")}
                      ref={toRef}
                      value={to}
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
                      checked={check === true}
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
            </div>
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
                    value={start_date}
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
                  value={tSkills}
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
                  value={pSkills}
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
                {trans("new-pass.btn")}
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default JobApplicationEdit;

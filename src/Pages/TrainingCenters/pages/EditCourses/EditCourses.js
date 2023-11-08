import { useNavigate, useParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import { PopubSendData } from "../../../../RecoilState/PopubSendData";
import { useState } from "react";
import {
  repeatCoins,
  repeatCountries,
  repeatMajors,
  repeatPersonalSiklss,
} from "../../../../RecoilState/RepeatFormData";
import { apiHeaders, basedUrl } from "../../../../Api/Apis";
import axios from "axios";
import { ErrorComponent, SuccsesComponent } from "../../../../Others/Error";
import { useEffect } from "react";
import SendDataDone from "../../../../Components/SendDataDone/SendDataDone";
import ReactSelect from "react-select";
import {
  colorStyles,
  colorStylesMulti,
} from "../../../../Others/ColorStyleReactSlick";
import { ReactComponent as FormData } from "./Assets/FormData.svg";
import { trans } from "../../../../Components/Navbar/Navbar";

function EditCourses({ type }) {
  const prams = useParams();
  const navigat = useNavigate();
  const token = localStorage.getItem("token");
  // Popub Data
  const popubData = {
    icon: <FormData />,
    title: "تم تعديل البيانات بنجاح",
    desc: "تم ارسال البيانات بنجاح من فضلك انتظر الى ان يتم تأكيد طلبك من قبل ادارة الموقع فى اقرب وقت",
    btn1To: "/institute/dashboard/",
    btn1: "حسنا",
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
  // Course
  const [practical, setPractical] = useState(false);
  const [theoretical, setTheoretical] = useState(false);
  const [price, setCoursePrice] = useState();
  // Currency
  const [coins, setCoins] = useRecoilState(repeatCoins);
  const [coinSelect, setCoinsSelect] = useState();
  function selectCoins(data) {
    setCoinsSelect(data);
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
    setCitySelect([]);
    setCity([]);
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
    setGovermentSelect([]);
    setGoverment([]);
    setCitySelect([]);
    setCity([]);
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
      // Experiens Years
      min_years_experience,
      max_years_experience,

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
      currency: coinSelect?.value,
    };
    try {
      const { data } = await axios.post(
        `${basedUrl}/institutes/courses/update/${prams.Id}`,
        FormData,
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      SuccsesComponent(data.message);
      setDone(true);
    } catch (error) {
      ErrorComponent(error, navigat, setErrorValidation);
    }
  }
  // Function Submit
  // Return Data
  const getReturnData = () => {
    axios
      .get(`${basedUrl}/institutes/courses/${prams.Id}`, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then(({ data }) => {
        setTitle(data.data.course.title);
        setDescription(data.data.course.description);
        setRequirements(data.data.course.requirements);

        setPractical(data.data.course.practical);
        setTheoretical(data.data.course.theoretical);
        setCoursePrice(data.data.course.price);
        setCoinsSelect(data.data.course.currency);

        setMajorsValue(data.data.course.major);
        setCountries(data.data.course.country);
        setGoverment(data.data.course.provinces_country);
        setGovermentSelect(data.data.course.province);
        setCity(data.data.course.cities_province);
        setCitySelect(data.data.course.city);
        setAdvanced_level(data.data.course.advanced_level);
        setAverage_level(data.data.course.average_level);
        setFresh_graduate(data.data.course.fresh_graduate);
        setHigh_experience(data.data.course.high_experience);
        setBoss(data.data.course.boss);
        setMin_years_experience(data.data.course.min_years_experience);
        setMax_years_experience(data.data.course.max_years_experience);

        setTskills(data.data.course.technical_skills);
        setPskills(data.data.course.personal_skills);
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
        <h3 className="fs-32-700 mb-4 mb-md-5">
          {trans("center.course_edit")}
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
                        {trans("center_company.course_title")}
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
                        placeholder={trans("center_company.write_course_title")}
                      />
                      <span className="text-error fs-14-400">
                        {errorValidation.hasOwnProperty("title_ar")
                          ? errorValidation.title_ar[0]
                          : null}
                      </span>
                    </div>
                  </div>
                  {/* وصف الدورة */}
                  <div className="col-12">
                    <div className="d-flex flex-column gap-2">
                      <label className="input-lable" htmlFor="job-desc">
                        {trans("center_company.course_descriptin")}
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
                  {/* متطلبات الدورة */}
                  <div className="col-12">
                    <div className="d-flex flex-column gap-2">
                      <label className="input-lable" htmlFor="job-order">
                        {trans("center_company.course_requierd")}
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
                        {trans("center_company.course_title")}
                      </label>
                      <input
                        className="input-data border r-10 p-3"
                        type="text"
                        value={title_en}
                        onChange={(e) => {
                          setTitleEn(e.target.value);
                        }}
                        placeholder={trans("center_company.write_course_title")}
                      />
                    </div>
                  </div>
                  {/* وصف الدورة */}
                  <div className="col-12">
                    <div className="d-flex flex-column gap-2">
                      <label className="input-lable" htmlFor="job-desc">
                        {trans("center_company.course_descriptin")}
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
                  {/* متطلبات الدورة */}
                  <div className="col-12">
                    <div className="d-flex flex-column gap-2">
                      <label className="input-lable" htmlFor="job-order">
                        {trans("center_company.course_requierd")}
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
                        {trans("center_company.course_title")}
                      </label>
                      <input
                        className="input-data border r-10 p-3"
                        type="text"
                        value={title_kur}
                        onChange={(e) => {
                          setTitleKur(e.target.value);
                        }}
                        placeholder={trans("center_company.write_course_title")}
                      />
                    </div>
                  </div>
                  {/* وصف الدورة */}
                  <div className="col-12">
                    <div className="d-flex flex-column gap-2">
                      <label className="input-lable" htmlFor="job-desc">
                        {trans("center_company.course_descriptin")}
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
                  {/* متطلبات الدورة */}
                  <div className="col-12">
                    <div className="d-flex flex-column gap-2">
                      <label className="input-lable" htmlFor="job-order">
                        {trans("center_company.course_requierd")}
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
            {/* نوع الدورة */}
            <div className="col-12">
              <span className="input-lable">
                {trans("center_company.type_course")}
              </span>
              <div className=" d-flex gap-3 mt-3">
                {/* Full Time Or Practical */}
                <div className="job-type">
                  <input
                    type="checkbox"
                    name="pricing"
                    id="one"
                    value={practical}
                    checked={practical === true}
                    onChange={() => {
                      setPractical(!practical);
                    }}
                  />
                  <label
                    htmlFor="one"
                    className="fs-16-400 text-color r-10 border p-3 pointer"
                  >
                    {trans("filter.practical")}
                  </label>
                </div>
                {/* Part Time Or Theoretical */}
                <div className="job-type">
                  <input
                    type="checkbox"
                    name="pricing"
                    id="two"
                    value={theoretical}
                    checked={theoretical === true}
                    onChange={() => {
                      setTheoretical(!theoretical);
                    }}
                  />
                  <label
                    htmlFor="two"
                    className="fs-16-400 text-color r-10 border p-3 pointer"
                  >
                    {trans("filter.theoretical")}
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
                {trans("center.center_loction")}
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
                {trans("job_edit.job_level")}
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
                      setAverage_level(false);
                      setFresh_graduate(false);
                      setHigh_experience(false);
                      setBoss(false);
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

                      setAdvanced_level(false);
                      setFresh_graduate(false);
                      setHigh_experience(false);
                      setBoss(false);
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

                      setAdvanced_level(false);
                      setAverage_level(false);
                      setHigh_experience(false);
                      setBoss(false);
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

                      setAdvanced_level(false);
                      setAverage_level(false);
                      setFresh_graduate(false);
                      setBoss(false);
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

                      setAdvanced_level(false);
                      setAverage_level(false);
                      setFresh_graduate(false);
                      setHigh_experience(false);
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
                  placeholder={trans("my_personal_data_user.from")}
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
              {/* الى */}
              <div className="col-12 col-md-6">
                <input
                  className={`input-data border r-10 p-3 ${
                    errorValidation.hasOwnProperty("max_years_experience") &&
                    "border-red"
                  }`}
                  type="text"
                  id="to"
                  placeholder={trans("my_personal_data_user.to")}
                  value={max_years_experience}
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
            </div>
            {/* الراتب المتوقع */}
            <div className="col-12 col-lg-6">
              <div className="d-flex flex-column gap-2">
                <span className="input-lable">
                  {trans("center_company.type_price")}
                </span>
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
            <div className="col-12 col-lg-6">
              <h4 className=" input-lable mb-3">
                {trans("company_job_details.corse_price")}
              </h4>
              <div
                className={`from r-10 border p-3 d-flex align-items-center justify-content-between ${
                  errorValidation.hasOwnProperty("price") && "border-red"
                }`}
              >
                <input
                  className={`border-none full-width salary-null`}
                  type="number"
                  placeholder={trans("center_company.price")}
                  value={price}
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
                {trans("my_personal_data_user.save")}
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default EditCourses;

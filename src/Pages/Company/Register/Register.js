import { useState } from "react";
import ReactSelect from "react-select";
import { useRecoilState } from "recoil";
import { PopubSendData } from "../../../RecoilState/PopubSendData";
import SendDataDone from "../../../Components/SendDataDone/SendDataDone";
import { colorStyles } from "../../../Others/ColorStyleReactSlick";
import {
  repeatCountries,
  repeatMajors,
} from "../../../RecoilState/RepeatFormData";
import axios from "axios";
import { apiHeaders, basedUrl } from "../../../Api/Apis";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ErrorComponent, SuccsesComponent } from "../../../Others/Error";
import { trans } from "../../../Components/Navbar/Navbar";
import { checkJobSeekerData } from "../../../Components/Navbar/GlopalStateRecoil/AllData";
import UploadImageLogo from "../../../Components/UploadImageLogo/UploadImageLogo";

function CompanyRegister({
  type = "company",
  status = "Register",
  linkCheck = null,
  apiSendData,
  popubData,
}) {
  const token = localStorage.getItem("token");
  const navigat = useNavigate();
  const [userChangeData, setUserChangeData] =
    useRecoilState(checkJobSeekerData);
  // Validation State
  const [errorValidation, setErrorValidation] = useState({});
  // Validation State
  // State Description
  const [description_ar, setDescription] = useState();
  const [description_en, setDescriptionEn] = useState();
  const [description_kur, setDescriptionKur] = useState();
  const [date_establishment, setDate_establishment] = useState();
  const [registration_number, setRegistration_number] = useState();
  // State Description
  const [link, setLink] = useState();
  const [logo, setLogo] = useState();
  // State Majors
  const [majors, setMajores] = useRecoilState(repeatMajors);
  const [majorsValue, setMajorsValue] = useState();
  function majorSelect(data) {
    setMajorsValue(data);
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
    setGovermentSelect(null);
    setCitySelect(null);
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
  // Done Data
  const [done, setDone] = useRecoilState(PopubSendData);
  // Done Data
  // Get Data
  useEffect(() => {
    axios
      .get(`${basedUrl}${linkCheck}`, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then(({ data }) => {
        if (data.data !== null) {
          navigat(`/${type}/dashboard/`);
        }
      })
      .catch((error) => {
        ErrorComponent(error, navigat);
      });
  }, []);
  // Get Data
  // Function Submit
  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      description_ar,
      description_en,
      description_kur,
      country_id: countries?.value,
      province_id: govermentSelect?.value,
      city_id: citySelect?.value,
      date_establishment,
      registration_number,
      major_id: majorsValue?.value,
      link,
      logo,
      _method: "POST",
    };
    try {
      const { data } = await axios.post(
        `${basedUrl}${apiSendData}`,
        { ...formData },
        {
          headers: {
            Accept: "application/json",
            "content-type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUserChangeData(4);
      SuccsesComponent(data.message);
      setDone(true);
    } catch (error) {
      ErrorComponent(error, navigat, setErrorValidation);
    }
  };
  return (
    <>
      {done && <SendDataDone {...popubData} />}
      <div className="company-register py-5 bg-smock">
        <div className="container">
          <h3 className="fs-24-700 mb-5">
            {status === "Register"
              ? trans("company_profile.company_data.My_personal_data")
              : trans("my_personal_data_user.My_personal_data")}
          </h3>
          <div className="content p-4 bg-white r-10">
            <form onSubmit={onSubmit}>
              {/* Head Profile Image */}
              <UploadImageLogo logo={logo} setLogo={setLogo} errorValidation={errorValidation} />
              {/* Taps */}
              <div
                className="p-4 mb-4 r-10"
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
                      {/* وصف الوظيفة */}
                      <div className="col-12">
                        <div className="d-flex flex-column gap-2">
                          <label className="input-lable" htmlFor="job-desc">
                            {type === "company"
                              ? trans(
                                  "company_profile.company_data.company_disc"
                                )
                              : trans("institute.center_disc")}
                          </label>
                          <textarea
                            className={`input-data border r-10 p-3 ${
                              errorValidation.hasOwnProperty(
                                "description_ar"
                              ) && "border-red"
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
                      {/* وصف الوظيفة */}
                      <div className="col-12">
                        <div className="d-flex flex-column gap-2">
                          <label className="input-lable" htmlFor="job-desc">
                            {type === "company"
                              ? trans(
                                  "company_profile.company_data.company_disc"
                                )
                              : trans("institute.center_disc")}
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
                      {/* وصف الوظيفة */}
                      <div className="col-12">
                        <div className="d-flex flex-column gap-2">
                          <label className="input-lable" htmlFor="job-desc">
                            {type === "company"
                              ? trans(
                                  "company_profile.company_data.company_disc"
                                )
                              : trans("institute.center_disc")}
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
                    </div>
                  </div>
                </div>
              </div>
              {/* موقع الشركة */}
              <div className="row g-3 mt-4">
                <h4 className=" input-lable m-0">
                  {trans("location")}
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
              <div className="row g-4 mt-1">
                {/* تاريخ تاسيس الشركة */}
                <div className="col-12 col-md-6">
                  <div className="d-flex flex-column gap-2">
                    <label className="input-lable" htmlFor="companyDate">
                      {type === "company"
                        ? trans("company_profile.company_data.company_date")
                        : trans("company_profile.company_data.center_date")}
                    </label>
                    <input
                      className={`input-data border r-10 p-3 ${
                        errorValidation.hasOwnProperty("date_establishment") &&
                        "border-red"
                      }`}
                      type="date"
                      id="companyDate"
                      onChange={(e) => {
                        setDate_establishment(e.target.value);
                      }}
                    />
                    <span className="text-error fs-14-400">
                      {errorValidation.hasOwnProperty("date_establishment")
                        ? errorValidation.date_establishment[0]
                        : null}
                    </span>
                  </div>
                </div>
                {/* رقم تسجيل الشركة */}
                <div className="col-12 col-md-6">
                  <div className="d-flex flex-column gap-2">
                    <label className="input-lable" htmlFor="numberRegistration">
                      {type === "company"
                        ? trans("company_profile.company_data.company_num")
                        : trans("company_profile.company_data.center_num")}
                    </label>
                    <input
                      className={`input-data border r-10 p-3 ${
                        errorValidation.hasOwnProperty("registration_number") &&
                        "border-red"
                      }`}
                      type="number"
                      id="numberRegistration"
                      placeholder={trans("institute.num_reges")}
                      onChange={(e) => {
                        setRegistration_number(e.target.value);
                      }}
                    />
                    <span className="text-error fs-14-400">
                      {errorValidation.hasOwnProperty("registration_number")
                        ? errorValidation.registration_number[0]
                        : null}
                    </span>
                  </div>
                </div>
                {/* تخصص الشركة */}
                <div className="col-12">
                  <div className="d-flex flex-column gap-2">
                    <span className="input-lable">
                      {type === "company"
                        ? trans(
                            "company_profile.company_data.specialty_company"
                          )
                        : trans(
                            "company_profile.company_data.specialty_center"
                          )}
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
                {/* رابط موقع الشركة */}
                <div className="col-12">
                  <div className="d-flex flex-column gap-2">
                    <label className="input-lable" htmlFor="linkCompany">
                      {type === "company"
                        ? trans("company_profile.company_data.company_site")
                        : trans("company_profile.company_data.center_site")}
                    </label>
                    <input
                      className={`input-data border r-10 p-3 ${
                        errorValidation.hasOwnProperty("link") && "border-red"
                      }`}
                      type="text"
                      id="linkCompany"
                      placeholder={
                        type === "company"
                          ? trans("company_profile.company_data.company_site")
                          : trans("company_profile.company_data.center_site")
                      }
                      onChange={(e) => {
                        setLink(e.target.value);
                      }}
                    />
                    <span className="text-error fs-14-400">
                      {errorValidation.hasOwnProperty("link")
                        ? errorValidation.link[0]
                        : null}
                    </span>
                  </div>
                </div>
                {/* submit button */}
                <div className="col-12 col-md-4">
                  <button className="persnol-data-btn r-10 py-3" type="submit">
                    {trans("start_now")}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default CompanyRegister;

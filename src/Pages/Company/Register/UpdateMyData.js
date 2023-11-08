import { useState } from "react";
import ReactSelect from "react-select";
import { useRecoilState } from "recoil";
import { PopubSendData } from "../../../RecoilState/PopubSendData";
import SendDataDone from "../../../Components/SendDataDone/SendDataDone";
import { ReactComponent as Time } from "./Assets/Time.svg";
import { ReactComponent as Import } from "./Assets/import.svg";

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

function UpdateMyData({
  type = "company",
  status = "",
  linkRoute,
  linkSendData,
  linkGetData,
}) {
  // Popub Data
  const popubData = {
    icon: <Time />,
    title: "تم ارسال البيانات بنجاح",
    desc: "تم ارسال البيانات بنجاح من فضلك انتظر الى ان يتم تأكيد طلبك من قبل ادارة الموقع فى اقرب وقت",
    btn1To: linkRoute,
    btn1: "حسنا",
  };
  // Popup Data
  const token = localStorage.getItem("token");
  const navigat = useNavigate();
  // Return Data
  const [returnData, setReturnData] = useState("");
  // Validation State
  const [errorValidation, setErrorValidation] = useState({});
  // Validation State
  // State Description
  const [description_ar, setDescription] = useState();
  const [description_en, setDescriptionEn] = useState();
  const [description_kur, setDescriptionKur] = useState();
  // State Description
  // General State
  const [phoneNum, setPhoneNum] = useState();
  const [date_establishment, setDate_establishment] = useState();
  const [registration_number, setRegistration_number] = useState();
  const [link, setLink] = useState();
  const [image, setImage] = useState("");
  // General State
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
    returnData.city_id = null;
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
    returnData.province_id = null;
    returnData.city_id = null;
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
      .get(`${basedUrl}${linkGetData}`, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then(({ data }) => {
        setReturnData(data.data);
        setDescription(data.data.description);
        setGoverment(data.data.provinces_country);
        setCity(data.data.cities_province);
        setDate_establishment(data.data.date_establishment);
        setRegistration_number(data.data.registration_number);
        setMajorsValue(data.data.major);
        setLink(data.data.link);
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
      logo: image,
      description_ar,
      description_en,
      description_kur,
      province_id:
        govermentSelect !== undefined
          ? govermentSelect?.value
          : returnData.province_id,
      city_id:
        citySelect !== undefined ? citySelect?.value : returnData.city_id,
      country_id:
        countries !== undefined ? countries?.value : returnData.country_id,
      date_establishment,
      registration_number,
      major_id: majorsValue.value,
      link,
      method: "UPDATE",
    };
    try {
      const { data } = await axios.post(
        `${basedUrl}${linkSendData}`,
        { ...formData },
        {
          headers: {
            Accept: "application/json",
            "content-type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      SuccsesComponent(data.message);
      setDone(true);
      localStorage.removeItem("user");
      localStorage.setItem("user", JSON.stringify(data.data));
    } catch (error) {
      ErrorComponent(error, navigat, setErrorValidation);
    }
  };
  // Function Submit
  return (
    <>
      {done && <SendDataDone {...popubData} />}
      <div className="company-register bg-smock">
        <div className="content p-3 p-md-4 bg-white r-10">
          <h3 className="fs-32-700 mb-5">
            {status === "Register"
              ? trans("company_profile.company_data.My_personal_data")
              : trans("user_profile.My_personal_data")}
          </h3>
          {/* Head Profile Image */}
          <div
            className="head-profile-image mb-4 d-flex align-items-center gap-4 r-10 p-4 justify-content-center"
            style={{ backgroundColor: "#f0f8f4" }}
          >
            {/* image */}
            <div className="image flex-c overflow-hidden">
              {image ? (
                <img src={URL.createObjectURL(image)} alt="" />
              ) : (
                <img src={returnData?.logo} alt="" />
              )}
            </div>
            {/* input select image */}
            <div className="select-image d-flex flex-column gap-2">
              <label
                htmlFor="select"
                className=" d-flex align-items-center justify-content-between py-2 px-3 r-10 pointer"
              >
                {trans("my_personal_data_user.add_photo")}
                <span className="flex-c icon">
                  <Import />
                </span>
              </label>
              <p>{trans("my_personal_data_user.mega")}</p>
              <input
                id="select"
                type="file"
                onChange={(e) => {
                  setImage(e.target.files[0]);
                }}
                style={{ display: "none" }}
              />
            </div>
          </div>
          {/* form */}
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
                    {/* وصف الوظيفة */}
                    <div className="col-12">
                      <div className="d-flex flex-column gap-2">
                        <label className="input-lable" htmlFor="job-desc">
                          {trans("company_profile.company_data.company_disc")}
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
                          {trans("company_profile.company_data.company_disc")}
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
                          {trans("company_profile.company_data.company_disc")}
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
                {trans("company_profile.company_data.work_place")}
              </h4>
              {/* countries */}
              {returnData?.country_id && (
                <div className="col-12 col-md-6 col-lg-4">
                  <ReactSelect
                    options={countriesState}
                    value={countries}
                    placeholder={trans("my_personal_data_user.country")}
                    isSearchable={true}
                    onChange={selectCountries}
                    styles={colorStyles}
                    defaultValue={countriesState.filter(
                      (item) => item.value === returnData.country_id
                    )}
                  />
                  <span className="text-error fs-14-400">
                    {errorValidation.hasOwnProperty("country_id")
                      ? errorValidation.country_id[0]
                      : null}
                  </span>
                </div>
              )}
              {/* goverment */}
              {returnData?.provinces_country && (
                <div className="col-12 col-md-6 col-lg-4">
                  <ReactSelect
                    options={goverment}
                    value={govermentSelect}
                    placeholder={trans("my_personal_data_user.government")}
                    isSearchable={true}
                    onChange={selectGoverment}
                    styles={colorStyles}
                    defaultValue={goverment.filter(
                      (item) => item.value === returnData.province_id
                    )}
                  />
                  <span className="text-error fs-14-400">
                    {errorValidation.hasOwnProperty("province_id")
                      ? errorValidation.province_id[0]
                      : null}
                  </span>
                </div>
              )}
              {/* CITY */}
              {returnData && (
                <div className="col-12 col-md-6 col-lg-4">
                  <ReactSelect
                    options={city}
                    value={citySelect}
                    placeholder={trans("my_personal_data_user.city")}
                    isSearchable={true}
                    onChange={selectCity}
                    styles={colorStyles}
                    defaultValue={city.filter(
                      (item) => item.value === returnData.city_id
                    )}
                  />
                  <span className="text-error fs-14-400">
                    {errorValidation.hasOwnProperty("city_id")
                      ? errorValidation.city_id[0]
                      : null}
                  </span>
                </div>
              )}
            </div>
            <div className="row g-4 mt-1">
              {/* رقم الهاتف */}
              <div className="col-12">
                <div className="d-flex flex-column gap-2">
                  <label className="input-lable" htmlFor="numberCompany">
                    {trans("company_profile.company_data.phone_num")}
                  </label>
                  <input
                    className="input-data border r-10 p-3"
                    type="number"
                    id="numberCompany"
                    placeholder={trans(
                      "company_profile.company_data.phone_num"
                    )}
                    onChange={(e) => {
                      setPhoneNum(e.target.value);
                    }}
                  />
                </div>
              </div>
              {/* تاريخ تاسيس الشركة */}
              <div className="col-12 col-md-6">
                <div className="d-flex flex-column gap-2">
                  <label className="input-lable" htmlFor="companyDate">
                    {type === "company"
                      ? trans("company_profile.company_data.company_date")
                      : trans("company_profile.company_data.center_date")}
                  </label>
                  <input
                    className="input-data border r-10 p-3"
                    type="date"
                    placeholder={
                      type === "company"
                        ? trans("company_profile.company_data.company_date")
                        : trans("company_profile.company_data.center_date")
                    }
                    id="companyDate"
                    value={date_establishment}
                    onChange={(e) => {
                      setDate_establishment(e.target.value);
                    }}
                  />
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
                    placeholder={trans(
                      "company_profile.company_data.company_disc_place"
                    )}
                    value={registration_number}
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
                      ? trans("company_profile.company_data.specialty_company")
                      : trans("company_profile.company_data.specialty_center")}
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
                    className="input-data border r-10 p-3"
                    type="text"
                    id="linkCompany"
                    placeholder={
                      type === "company"
                        ? trans("company_profile.company_data.company_site")
                        : trans("company_profile.company_data.center_site")
                    }
                    value={link}
                    onChange={(e) => {
                      setLink(e.target.value);
                    }}
                  />
                </div>
              </div>
              {/* submit button */}
              <div className="col-12 col-md-4">
                <button className="persnol-data-btn r-10 py-3" type="submit">
                  {trans("my_personal_data_user.save")}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default UpdateMyData;

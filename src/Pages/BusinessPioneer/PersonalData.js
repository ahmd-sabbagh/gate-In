import { useState } from "react";
import ReactSelect from "react-select";
import { colorStyles } from "../../Others/ColorStyleReactSlick";
import { useRecoilState } from "recoil";
import {
  repeatCountries,
  repeatMajors,
  repeatNationalities,
  repeatTypesEducation,
} from "../../RecoilState/RepeatFormData";
import axios from "axios";
import { apiHeaders, basedUrl } from "../../Api/Apis";
import { ErrorComponent, SuccsesComponent } from "../../Others/Error";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import SendDataDone from "../../Components/SendDataDone/SendDataDone";
import { PopubSendData } from "../../RecoilState/PopubSendData";
import { ReactComponent as DoneData } from "./Assets/DoneData.svg";
import { trans } from "../../Components/Navbar/Navbar";
import { checkJobSeekerData } from "../../Components/Navbar/GlopalStateRecoil/AllData";
import UploadImageLogo from "../../Components/UploadImageLogo/UploadImageLogo";
// Popub Data
const popubData = {
  icon: <DoneData />,
  title: trans("popubData.title"),
  desc: trans("popubData.desc"),
  btn1To: "/business_pioneer/dashboard",
  btn1: trans("popubData.btn1"),
};
// Popup Data

function PioneerPersonalData() {
  const token = localStorage.getItem("token");
  const navigat = useNavigate();
  const [userChangeData, setUserChangeData] =
    useRecoilState(checkJobSeekerData);
  // Validation State
  const [errorValidation, setErrorValidation] = useState({});
  // Validation State
  // States Form
  const [logo, setLogo] = useState();
  const [full_name, setFull_name] = useState();
  const [title, setTitle] = useState();
  // States Form
  // Nationalty Id
  const [nationalty, setRnationalities] = useRecoilState(repeatNationalities);
  const [nationality_id, setSelectedNationality_id] = useState();
  function handleSelectNationaltyId(data) {
    setSelectedNationality_id(data);
  }
  // Nationalty Id
  // Tips Education
  const [tipsEducation, setRtypesEducation] =
    useRecoilState(repeatTypesEducation);
  const [types_education_id, setSelectedTypes_education_id] = useState();
  function handleSelectTipsEducation(data) {
    setSelectedTypes_education_id(data);
  }
  // Tips Education
  // State Majors
  const [majors, setMajores] = useRecoilState(repeatMajors);
  const [majorsValue, setMajorsValue] = useState();
  function majorSelect(data) {
    setMajorsValue(data);
  }
  // State Majors
  // State of City
  const [city, setCity] = useState([]);
  const [citySelect, setCitySelect] = useState([]);
  function selectCity(data) {
    setCitySelect(data);
  }
  // State of City
  // State of goverment
  const [goverment, setGoverment] = useState([]);
  const [govermentSelect, setGovermentSelect] = useState([]);
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
  // Done Data
  const [done, setDone] = useRecoilState(PopubSendData);
  // Done Data
  // Function Submit
  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      image: logo,
      full_name,
      title,
      nationality_id: nationality_id?.value,
      types_education_id: types_education_id?.value,
      major_id: majorsValue?.value,
      country_id: countries?.value,
      province_id: govermentSelect?.value,
      city_id: citySelect?.value,
    };
    try {
      const { data } = await axios.post(
        `${basedUrl}/business-pioneer/personal-data/create-or-update`,
        formData,
        {
          headers: {
            Accept: "application/json",
            "content-type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUserChangeData(1);
      SuccsesComponent(data.message);
      setDone(true);
    } catch (error) {
      ErrorComponent(error, navigat, setErrorValidation);
    }
  };
  // Function Submit
  // check data
  useEffect(() => {
    axios
      .get(`${basedUrl}/business-pioneer/personal-data`, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then(({ data }) => {
        if (data.data !== null) {
          navigat(`/business_pioneer/dashboard/`);
        }
      })
      .catch((error) => {
        ErrorComponent(error, navigat);
      });
  }, []);
  return (
    <>
      {done && <SendDataDone {...popubData} />}
      <div className="personal-data py-5 bg-smock ">
        <div className="container">
          {/* Head */}
          <h3 className=" fs-32-600 mb-4">
            {trans("business_pioneer.Complete_registration")}
          </h3>
          <div className="bg-white p-4 r-10">
            <div className="head mb-4">
              <h3 className=" fs-24-700 text-center">
                {trans("employe-page.steps.one")}
              </h3>
              <p className="fs-20-400 text-color mt-2 text-center">
                {trans("business_pioneer.desc")}
              </p>
            </div>
            {/* Form */}
            <form onSubmit={onSubmit}>
              {/* Head Profile Image */}
              <UploadImageLogo
                logo={logo}
                setLogo={setLogo}
                errorValidation={errorValidation}
              />
              <div className="row g-4">
                {/* Name */}
                <div className="col-12 col-md-6">
                  <div className="d-flex flex-column gap-2">
                    <label className="input-lable" htmlFor="name">
                      {trans("business_pioneer.first_name")}
                    </label>
                    <input
                      className={`input-data border r-10 p-3 ${
                        errorValidation.hasOwnProperty("full_name") &&
                        "border-red"
                      }`}
                      type="text"
                      id="name"
                      placeholder={trans("business_pioneer.first_name")}
                      onChange={(e) => {
                        setFull_name(e.target.value);
                      }}
                    />
                    <span className="text-error fs-14-400">
                      {errorValidation.hasOwnProperty("full_name")
                        ? errorValidation.full_name[0]
                        : null}
                    </span>
                  </div>
                </div>
                {/* Grand */}
                <div className="col-12 col-md-6">
                  <div className="d-flex flex-column gap-2">
                    <label className="input-lable" htmlFor="grand">
                      {trans("business_pioneer.last_name")}
                    </label>
                    <input
                      className={`input-data border r-10 p-3 ${
                        errorValidation.hasOwnProperty("title") && "border-red"
                      }`}
                      type="text"
                      id="grand"
                      placeholder={trans("business_pioneer.last_name")}
                      onChange={(e) => {
                        setTitle(e.target.value);
                      }}
                    />
                    <span className="text-error fs-14-400">
                      {errorValidation.hasOwnProperty("title")
                        ? errorValidation.title[0]
                        : null}
                    </span>
                  </div>
                </div>
                {/* الجنسية */}
                <div className="col-12">
                  <div className="d-flex flex-column gap-2">
                    <span className="input-lable">
                      {trans("business_pioneer.nationalty")}
                    </span>
                    <ReactSelect
                      options={nationalty}
                      value={nationality_id}
                      placeholder={trans("business_pioneer.nationalty")}
                      isSearchable={true}
                      onChange={handleSelectNationaltyId}
                      styles={colorStyles}
                    />
                    <span className="text-error fs-14-400">
                      {errorValidation.hasOwnProperty("nationality_id")
                        ? errorValidation.nationality_id[0]
                        : null}
                    </span>
                  </div>
                </div>
                {/* نوع التعليم */}
                <div className="col-12 col-md-6">
                  <div className="end-name d-flex flex-column gap-2">
                    <span className="input-lable">
                      {trans("business_pioneer.type_learning")}
                    </span>
                    <ReactSelect
                      options={tipsEducation}
                      value={types_education_id}
                      placeholder={trans(
                        "business_pioneer.type_learning_place"
                      )}
                      isSearchable={true}
                      onChange={handleSelectTipsEducation}
                      styles={colorStyles}
                    />
                    <span className="text-error fs-14-400">
                      {errorValidation.hasOwnProperty("types_education_id")
                        ? errorValidation.types_education_id[0]
                        : null}
                    </span>
                  </div>
                </div>
                {/* التخصص */}
                <div className="col-12 col-md-6">
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
              </div>
              <button className="mt-4 r-10 bg-main resetBtn py-3 px-4 text-white">
                {trans("business_pioneer.save")}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default PioneerPersonalData;

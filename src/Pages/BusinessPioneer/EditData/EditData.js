import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import {
  repeatCountries,
  repeatMajors,
  repeatNationalities,
  repeatTypesEducation,
} from "../../../RecoilState/RepeatFormData";
import { ReactComponent as Import } from "./import.svg";

import { apiHeaders, basedUrl } from "../../../Api/Apis";
import axios from "axios";
import { ErrorComponent, SuccsesComponent } from "../../../Others/Error";
import ReactSelect from "react-select";
import { colorStyles } from "../../../Others/ColorStyleReactSlick";
import { trans } from "../../../Components/Navbar/Navbar";

function EditData() {
  const token = localStorage.getItem("token");
  const navigat = useNavigate();
  // Validation State
  const [errorValidation, setErrorValidation] = useState({});
  // Validation State
  // States Form
  const [full_name, setFull_name] = useState();
  const [title, setTitle] = useState();
  const [image, setImage] = useState("");
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
  // GetData
  const [returnData, setReturnData] = useState("");
  const getData = () => {
    axios
      .get(`${basedUrl}/business-pioneer/personal-data`, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then(({ data }) => {
        setReturnData(data.data);
        setFull_name(data.data.full_name);
        setTitle(data.data.title);
        setSelectedNationality_id(data.data.nationality_id);
        setSelectedTypes_education_id(data.data.types_education_id);
        setMajorsValue(data.data.major_id);
        setCountries(data.data.country_id);
        setGoverment(data.data.provinces_country);
        setGovermentSelect(data.data.province_id);
        setCity(data.data.cities_province);
        setCitySelect(data.data.city_id);
      })
      .catch((error) => {
        ErrorComponent(error, navigat);
      });
  };
  useEffect(() => {
    getData();
  }, []);
  // GetData
  // Function Submit
  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      image,
      full_name,
      title,
      nationality_id: nationality_id?.value,
      types_education_id: types_education_id?.value,
      major_id: majorsValue?.value,
      country_id: countries?.value,
      province_id: govermentSelect?.value,
      city_id: citySelect?.value,
      method: "UPDATE",
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
      SuccsesComponent(data.message);
      localStorage.removeItem("user");
      localStorage.setItem("user", JSON.stringify(data.data));
      navigat("/business_pioneer/dashboard/");
    } catch (error) {
      ErrorComponent(error, navigat, setErrorValidation);
    }
  };
  // Function Submit
  return (
    <>
      {/* Head */}
      <div className="head mb-5">
        <h3 className=" fs-24-700 text-center">
          {trans("my_personal_data_user.My_personal_data")}
        </h3>
        <p className="fs-20-400 text-color mt-2 text-center">
          {trans("business_pioneer.desc")}
        </p>
      </div>
      {/* Head Profile Image */}
      <div
        className="head-profile-image mb-4 d-flex align-items-center gap-4 r-10 p-4 justify-content-center"
        style={{ backgroundColor: "#f0f8f4" }}
      >
        <div className="image flex-c overflow-hidden">
          {image ? (
            <img src={URL.createObjectURL(image)} alt="" />
          ) : (
            <img src={returnData?.image} alt="" />
          )}
        </div>
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
      {/* Form */}
      <form onSubmit={onSubmit}>
        <div className="row g-4">
          {/* Name */}
          <div className="col-12 col-md-6">
            <div className="d-flex flex-column gap-2">
              <label className="input-lable" htmlFor="name">
                {trans("my_personal_data_user.name")}
              </label>
              <input
                className={`input-data border r-10 p-3 ${
                  errorValidation.hasOwnProperty("full_name") && "border-red"
                }`}
                type="text"
                id="name"
                value={full_name}
                placeholder={trans("my_personal_data_user.name")}
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
                {trans("my_personal_data_user.last_name")}
              </label>
              <input
                className={`input-data border r-10 p-3 ${
                  errorValidation.hasOwnProperty("title") && "border-red"
                }`}
                type="text"
                id="grand"
                placeholder={trans("my_personal_data_user.last_name")}
                value={title}
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
                {trans("my_personal_data_user.nationality")}
              </span>
              <ReactSelect
                options={nationalty}
                value={nationality_id}
                placeholder={trans("my_personal_data_user.nationality")}
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
                placeholder={trans("business_pioneer.type_learning_place")}
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
              placeholder={trans("my_personal_data_user.ccountry")}
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
          {trans("my_personal_data_user.save")}
        </button>
      </form>
    </>
  );
}

export default EditData;

import React, { useState } from "react";
import { useRecoilState } from "recoil";
import {
  repeatCountries,
  repeatMajors,
  repeatNationalities,
  repeatTypesEducation,
} from "../../RecoilState/RepeatFormData";
import "./TeamMembers.css";
import axios from "axios";
import { apiHeaders, basedUrl } from "../../Api/Apis";
import { trans } from "../../Components/Navbar/Navbar";

function TeamMembers({ formValues, setFormValues, errorValidation = {} }) {
  // Previous Job
  let handleChange = (i, e) => {
    let newFormValues = [...formValues];
    try {
      newFormValues[i][e.target.name] = JSON.parse(e.target.value);
    } catch (error) {
      newFormValues[i][e.target.name] = e.target.value;
    }
    setFormValues(newFormValues);
  };

  let addFormFields = () => {
    setFormValues([
      ...formValues,
      {
        full_name: "",
        title: "",
        nationality_id: "",
        types_education_id: "",
        major_id: "",
        country_id: "",
        province_id: "",
        city_id: "",
      },
    ]);
  };

  let removeFormFields = (i) => {
    let newFormValues = [...formValues];
    newFormValues.splice(i, 1);
    setFormValues(newFormValues);
  };
  // Previous Job
  // Nationalty Id
  const [nationalty, setRnationalities] = useRecoilState(repeatNationalities);
  // Nationalty Id
  // Tips Education
  const [tipsEducation, setRtypesEducation] =
    useRecoilState(repeatTypesEducation);
  // Tips Education
  const [majors, setMajores] = useRecoilState(repeatMajors);
  // Tips Education
  // State of City
  const [city, setCity] = useState([]);
  // State of City
  // State of goverment
  const [goverment, setGoverment] = useState([]);
  function selectGoverment(id) {
    setCity(null);
    axios
      .get(`${basedUrl}/public/data/cities/${id.value}`, apiHeaders)
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
  function selectCountries(id) {
    setGoverment(null);
    setCity(null);
    axios
      .get(`${basedUrl}/public/data/provinces/${id.value}`, apiHeaders)
      .then(({ data }) => {
        setGoverment(data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  // State of countries
  return (
    <div className="TeamMembers mt-5">
      <div className="d-flex align-items-center gap-4 gap-md-5 mb-4 mt-5">
        <h3 className=" fs-20-500">{trans("business_pioneer.Add_team_members")}</h3>
        <div className="lin"></div>
      </div>
      {formValues.map((element, index) => (
        <div key={index}>
          <div className="row g-4">
            <h3 className="fs-16-700">{`${trans("business_pioneer.member")} (${index + 1})`}</h3>
            {/* Name */}
            <div className="col-12 col-md-6">
              <div className="d-flex flex-column gap-2">
                <label className="input-lable" htmlFor="name">
                {trans("business_pioneer.first_name")}
                </label>
                <input
                  className={`input-data border r-10 p-3 ${
                    errorValidation.hasOwnProperty(`team.${index}.full_name`) &&
                    "border-red"
                  }`}
                  type="text"
                  id="name"
                  placeholder={trans("business_pioneer.first_name")}
                  name="full_name"
                  value={element.full_name}
                  onChange={(e) => handleChange(index, e)}
                />
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
                    errorValidation.hasOwnProperty(`team.${index}.title`) &&
                    "border-red"
                  }`}
                  type="text"
                  id="grand"
                  placeholder={trans("business_pioneer.last_name")}
                  name="title"
                  value={element.title}
                  onChange={(e) => handleChange(index, e)}
                />
              </div>
            </div>
            {/* الجنسية */}
            <div className="col-12 col-lg-6">
              <div className="d-flex flex-column gap-2">
                <span className="input-lable">{trans("business_pioneer.nationalty")}</span>
                <select
                  id={`select-nationalty-${index}`}
                  className={`full-width classic r-10 border ${
                    errorValidation.hasOwnProperty(
                      `team.${index}.nationality_id`
                    ) && "border-red"
                  }`}
                  name="nationality_id"
                  onChange={(e) => handleChange(index, e)}
                >
                  <option
                    value={JSON.stringify(element.nationality_id)}
                    style={{ color: "#757575" }}
                  >
                    {element.nationality_id.label
                      ? element.nationality_id.label
                      : trans("business_pioneer.nationalty")}
                  </option>
                  {nationalty.map((item) => (
                    <option value={JSON.stringify(item)} key={item.value}>
                      {item.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            {/* نوع التعليم */}
            <div className="col-12 col-lg-6">
              <div className="d-flex flex-column gap-2">
                <span className="input-lable">{trans("business_pioneer.type_learning")}</span>
                <select
                  id={`select-tips-education-${index}`}
                  className={`full-width classic r-10 border ${
                    errorValidation.hasOwnProperty(
                      `team.${index}.nationality_id`
                    ) && "border-red"
                  }`}
                  name="types_education_id"
                  onChange={(e) => handleChange(index, e)}
                >
                  <option
                    value={JSON.stringify(element.types_education_id)}
                    style={{ color: "#757575" }}
                  >
                    {element.types_education_id.label
                      ? element.types_education_id.label
                      : trans("business_pioneer.type_learning")}
                  </option>
                  {tipsEducation.map((item) => (
                    <option value={JSON.stringify(item)} key={item.value}>
                      {item.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            {/* التخصص */}
            <div className="col-12">
              <div className="d-flex flex-column gap-2">
                <span className="input-lable">{trans("my_personal_data_user.Specialization")}</span>
                <select
                  id={`select-major-${index}`}
                  className={`full-width classic r-10 border ${
                    errorValidation.hasOwnProperty(`team.${index}.major_id`) &&
                    "border-red"
                  }`}
                  name="major_id"
                  onChange={(e) => handleChange(index, e)}
                >
                  <option
                    value={JSON.stringify(element.major_id)}
                    style={{ color: "#757575" }}
                  >
                    {element.major_id.label
                      ? element.major_id.label
                      : trans("my_personal_data_user.Specialization")}
                  </option>
                  {majors.map((item) => (
                    <option value={JSON.stringify(item)} key={item.value}>
                      {item.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            {/* الدولة */}
            <div className="col-12 col-md-6 col-lg-4">
              <div className="d-flex flex-column gap-2">
                <span className="input-lable">{trans("my_personal_data_user.country")}</span>
                <select
                  id={`select-country-${index}`}
                  className={`full-width classic r-10 border ${
                    errorValidation.hasOwnProperty(
                      `team.${index}.country_id`
                    ) && "border-red"
                  }`}
                  name="country_id"
                  onChange={(e) => {
                    handleChange(index, e);
                    selectCountries(JSON.parse(e.target.value));
                    element.province_id = "";
                    element.city_id = "";
                  }}
                >
                  <option
                    value={JSON.stringify(element.country_id)}
                    style={{ color: "#757575" }}
                  >
                    {element.country_id.label
                      ? element.country_id.label
                      : trans("my_personal_data_user.country")}
                  </option>
                  {countriesState.map((item) => (
                    <option value={JSON.stringify(item)} key={item.value}>
                      {item.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            {/* المحافظة */}
            <div className="col-12 col-md-6 col-lg-4">
              <div className="d-flex flex-column gap-2">
                <span className="input-lable">{trans("my_personal_data_user.government")}</span>
                <select
                  id={`select-country-${index}`}
                  className={`full-width classic r-10 border ${
                    errorValidation.hasOwnProperty(
                      `team.${index}.province_id`
                    ) && "border-red"
                  }`}
                  name="province_id"
                  onChange={(e) => {
                    handleChange(index, e);
                    selectGoverment(JSON.parse(e.target.value));
                    element.city_id = "";
                  }}
                >
                  <option
                    value={JSON.stringify(element.province_id)}
                    style={{ color: "#757575" }}
                  >
                    {element.province_id.label
                      ? element.province_id.label
                      : trans("my_personal_data_user.government")}
                  </option>
                  {goverment?.map((item) => (
                    <option value={JSON.stringify(item)} key={item.value}>
                      {item.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            {/* المدينة */}
            <div className="col-12 col-md-6 col-lg-4">
              <div className="d-flex flex-column gap-2">
                <span className="input-lable">{trans("my_personal_data_user.city")}</span>
                <select
                  id={`select-country-${index}`}
                  className={`full-width classic r-10 border ${
                    errorValidation.hasOwnProperty(`team.${index}.city_id`) &&
                    "border-red"
                  }`}
                  name="city_id"
                  onChange={(e) => {
                    handleChange(index, e);
                  }}
                >
                  <option
                    value={JSON.stringify(element.city_id)}
                    style={{ color: "#757575" }}
                  >
                    {element.city_id.label
                      ? element.city_id.label
                      : trans("my_personal_data_user.city")}
                  </option>
                  {city?.map((item) => (
                    <option value={JSON.stringify(item)} key={item.value}>
                      {item.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          {/* delete */}
          <div
            className="pointer mt-3 ms-0 me-auto r-10 bg-danger resetBtn py-2 px-3 text-white fit-content"
            onClick={() => {
              removeFormFields(index);
            }}
          >
            {trans("business_pioneer.delete")}
          </div>
        </div>
      ))}
      {/* اضافة */}
      <div
        className="pointer mt-3 r-10 bg-main resetBtn py-2 px-5 text-white fit-content"
        onClick={() => {
          addFormFields();
        }}
      >
        {trans("business_pioneer.add")}
      </div>
    </div>
  );
}

export default TeamMembers;

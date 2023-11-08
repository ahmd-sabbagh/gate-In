import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ReactSelect from "react-select";
import { useRecoilState } from "recoil";
import { apiHeaders, basedUrl } from "../../../Api/Apis";
import { colorStyles } from "../../../Others/ColorStyleReactSlick";
import { ErrorComponent } from "../../../Others/Error";
import {
  repeatCountries,
  repeatNationalities,
} from "../../../RecoilState/RepeatFormData";
import { trans } from "../../../Components/Navbar/Navbar";
import { checkJobSeekerData } from "../../../Components/Navbar/GlopalStateRecoil/AllData";

function PersonalData() {
  const token = localStorage.getItem("token");
  const navigat = useNavigate();
  const [userChangeData,setUserChangeData] = useRecoilState(checkJobSeekerData)
  // Validation State
  const [errorValidation, setErrorValidation] = useState({});
  // Validation State
  // Cheak Data
  useEffect(() => {
    axios
      .get(`${basedUrl}/job-seeker/main-data`, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((data) => {
        if (data.data.data.personal_data !== null) {
          navigat("/employ-data/learn");
        }
      })
      .catch((error) => {
        ErrorComponent(error, navigat);
      });
  }, []);
  // Cheak Data
  // Full Name
  const [full_name, setFullName] = useState();
  // Full Name
  // Tiite
  const [title, setTittle] = useState();
  // Tiite
  // gender
  const [gender, setGender] = useState();
  // gender
  // Date
  const [date_of_birth, setDate] = useState();
  // Date
  // Material Status
  const [marital_status, setMaterialStatus] = useState();
  // Material Status
  // TextArea
  const [description, setDescription] = useState();
  // TextArea
  // State of Nationality
  const [nationalityState, setNationalityState] =
    useRecoilState(repeatNationalities);
  const [nationality, setNationality] = useState();
  function selectNationality(data) {
    setNationality(data);
  }
  // State of Nationality
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
  // function Submit
  const onsubmit = async (e) => {
    e.preventDefault();
    const formData = {
      full_name,
      title,
      province_id: govermentSelect?.value,
      city_id: citySelect?.value,
      country_id: countries?.value,
      nationality_id: nationality?.value,
      gender,
      date_of_birth,
      marital_status,
      description,
    };
    try {
      const { data } = await axios.post(
        `${basedUrl}/job-seeker/main-data/personal-data/create-or-update`,
        { ...formData },
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUserChangeData(1)
      navigat("learn");
    } catch (error) {
      ErrorComponent(error, navigat, setErrorValidation);
      console.log(error);
    }
  };
  // function Submit
  return (
    <div className="PersonalData mt-5">
      <div className="container">
        <div className="content r-10 p-3 p-lg-5 bg-white">
          <div className="head mb-5">
            <h3 className=" fs-24-700 text-center">
              {trans("employe-page.steps.one")}
            </h3>
            <p className="fs-20-400 text-color mt-2 text-center">
              {trans("business_pioneer.desc")}
            </p>
          </div>
          <form onSubmit={onsubmit}>
            <div className="row g-4">
              {/* FORM DATA */}
              <div className="col-12 col-md-6">
                {/* Full Name */}
                <div className="name d-flex flex-column gap-2">
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
                      setFullName(e.target.value);
                    }}
                  />
                  <span className="text-error fs-14-400">
                    {errorValidation.hasOwnProperty("full_name")
                      ? errorValidation.full_name[0]
                      : null}
                  </span>
                </div>
              </div>
              {/* Title */}
              <div className="col-12 col-md-6">
                <div className="end-name d-flex flex-column gap-2">
                  <label className="input-lable" htmlFor="end-name">
                    {trans("business_pioneer.last_name")}
                  </label>
                  <input
                    className={`input-data border r-10 p-3 ${
                      errorValidation.hasOwnProperty("title") && "border-red"
                    }`}
                    type="text"
                    id="end-name"
                    placeholder={trans("business_pioneer.last_name")}
                    onChange={(e) => {
                      setTittle(e.target.value);
                    }}
                  />
                  <span className="text-error fs-14-400">
                    {errorValidation.hasOwnProperty("title")
                      ? errorValidation.title[0]
                      : null}
                  </span>
                </div>
              </div>
              {/* Phone Number */}
              {/* <div className="col-12 col-md-6">
                <div className="end-name d-flex flex-column gap-2">
                  <label className="input-lable" htmlFor="phone-number">
                    رقم الموبايل
                  </label>
                  <input
                    className="input-data border r-10 p-3"
                    type="number"
                    id="phone-number"
                    placeholder="رقم الموبايل"
                  />
                </div>
              </div> */}
              {/* Email */}
              {/* <div className="col-12 col-md-6">
                <div className="end-name d-flex flex-column gap-2">
                  <label className="input-lable" htmlFor="email">
                    البريد الالكترونى
                  </label>
                  <input
                    className="input-data border r-10 p-3"
                    type="email"
                    id="email"
                    placeholder="البريد الالكترونى"
                  />
                </div>
              </div> */}
              {/* countries */}
              <div className="col-12 col-md-6 col-lg-4">
                <div className="end-name d-flex flex-column gap-2">
                  <span className="input-lable">
                    {trans("my_personal_data_user.country")}
                  </span>
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
              </div>
              {/* goverment */}
              <div className="col-12 col-md-6 col-lg-4">
                <div className="end-name d-flex flex-column gap-2">
                  <span className="input-lable">
                    {trans("my_personal_data_user.government")}
                  </span>
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
              </div>
              {/* CITY */}
              <div className="col-12 col-md-6 col-lg-4">
                <div className="end-name d-flex flex-column gap-2">
                  <span className="input-lable">
                    {trans("my_personal_data_user.city")}
                  </span>
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
              {/* GENDER */}
              <div className="col-12">
                <h4 className="input-lable">
                  {trans("my_personal_data_user.type")}
                </h4>
                <div className="radio d-flex gap-4 mt-3">
                  <div className="d-flex gap-2 align-items-center">
                    <input
                      type="radio"
                      id="male"
                      name="gender"
                      value="male"
                      onChange={(e) => {
                        setGender(e.target.value);
                      }}
                    />
                    <label htmlFor="male">
                      {trans("my_personal_data_user.male")}
                    </label>
                  </div>
                  <div className="d-flex gap-2 align-items-center">
                    <input
                      type="radio"
                      id="female"
                      name="gender"
                      value="female"
                      onChange={(e) => {
                        setGender(e.target.value);
                      }}
                    />
                    <label htmlFor="female">
                      {trans("my_personal_data_user.famale")}
                    </label>
                  </div>
                </div>
                <span className="text-error fs-14-400">
                  {errorValidation.hasOwnProperty("gender")
                    ? errorValidation.gender[0]
                    : null}
                </span>
              </div>
              {/* BIRTHDAY */}
              <div className="col-12">
                <h4 className="input-lable">
                  {trans("my_personal_data_user.birthday")}
                </h4>
                <div className="row">
                  <div className="col-12 col-md-6">
                    <input
                      className="input-data border r-10 p-3 mt-3"
                      type="date"
                      onChange={(e) => {
                        setDate(e.target.value);
                      }}
                    />
                  </div>
                  <span className="mt-2 d-block text-error fs-14-400">
                    {errorValidation.hasOwnProperty("date_of_birth")
                      ? errorValidation.date_of_birth[0]
                      : null}
                  </span>
                </div>
              </div>
              {/* marital status */}
              <div className="col-12">
                <h4 className="input-lable">
                  {trans("my_personal_data_user.socity")}
                </h4>
                <div className="radio d-flex gap-4 mt-3">
                  <div className="d-flex gap-2 align-items-center">
                    <input
                      type="radio"
                      id="bachelor"
                      name="status"
                      value="single"
                      onChange={(e) => {
                        setMaterialStatus(e.target.value);
                      }}
                    />
                    <label htmlFor="bachelor">
                      {trans("my_personal_data_user.free")}
                    </label>
                  </div>
                  <div className="d-flex gap-2 align-items-center">
                    <input
                      type="radio"
                      id="married"
                      name="status"
                      value="married"
                      onChange={(e) => {
                        setMaterialStatus(e.target.value);
                      }}
                    />
                    <label htmlFor="married">
                      {trans("my_personal_data_user.marrid")}
                    </label>
                  </div>
                  <div className="d-flex gap-2 align-items-center">
                    <input
                      type="radio"
                      id="absolute"
                      name="status"
                      value="absolute"
                      onChange={(e) => {
                        setMaterialStatus(e.target.value);
                      }}
                    />
                    <label htmlFor="absolute">
                      {trans("my_personal_data_user.up_free")}
                    </label>
                  </div>
                  <div className="d-flex gap-2 align-items-center">
                    <input
                      type="radio"
                      id="Widower"
                      name="status"
                      value="widower"
                      onChange={(e) => {
                        setMaterialStatus(e.target.value);
                      }}
                    />
                    <label htmlFor="Widower">
                      {trans("my_personal_data_user.dead")}
                    </label>
                  </div>
                </div>
                <span className="mt-2 d-block text-error fs-14-400">
                  {errorValidation.hasOwnProperty("marital_status")
                    ? errorValidation.marital_status[0]
                    : null}
                </span>
              </div>
              {/* Nationality */}
              <div className="col-12 col-md-6">
                <div className="end-name d-flex flex-column gap-3">
                  <span className="input-lable">
                    {trans("my_personal_data_user.nationality")}
                  </span>
                  <ReactSelect
                    options={nationalityState}
                    value={nationality}
                    placeholder={trans("my_personal_data_user.nationality")}
                    isSearchable={true}
                    onChange={selectNationality}
                    styles={colorStyles}
                  />
                  <span className="text-error fs-14-400">
                    {errorValidation.hasOwnProperty("nationality_id")
                      ? errorValidation.nationality_id[0]
                      : null}
                  </span>
                </div>
              </div>
              {/* TextArea */}
              <div className="col-12">
                <div className="row">
                  <div className="col-md-6 col-12">
                    <div className="end-name d-flex flex-column gap-2">
                      <label className="input-lable" htmlFor="textarea">
                        {trans("my_personal_data_user.disc")}
                      </label>
                      <textarea
                        className="input-data border r-10 p-3"
                        name="textarea"
                        id="textarea"
                        placeholder={trans("my_personal_data_user.disc_place")}
                        onChange={(e) => {
                          setDescription(e.target.value);
                        }}
                      ></textarea>
                      <span className="text-error fs-14-400">
                        {errorValidation.hasOwnProperty("description")
                          ? errorValidation.description[0]
                          : null}
                      </span>
                    </div>
                  </div>
                </div>
                <p className=" fs-14-400 text-color mt-3">
                  {trans("my_personal_data_user.like")}
                </p>
              </div>
              {/* submit button */}
              <div className="col-12 col-md-4">
                <button className="persnol-data-btn r-10 py-3" type="submit">
                  {trans("business_pioneer.save")}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default PersonalData;

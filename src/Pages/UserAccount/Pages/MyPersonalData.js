import person from "../Assets/Vector.png";
import { ReactComponent as Import } from "../Assets/import.svg";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ReactSelect from "react-select";
import { useRecoilState } from "recoil";
import { apiHeaders, basedUrl } from "../../../Api/Apis";
import { colorStyles } from "../../../Others/ColorStyleReactSlick";
import {
  repeatCountries,
  repeatNationalities,
} from "../../../RecoilState/RepeatFormData";
import { useEffect } from "react";
import { ErrorComponent, SuccsesComponent } from "../../../Others/Error";
import { trans } from "../../../Components/Navbar/Navbar";

function MyPersonalData() {
  const token = localStorage.getItem("token");
  // Validation State
  const [errorValidation, setErrorValidation] = useState({});
  // Validation State
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
  //state select image
  const [image, setImage] = useState("");
  //state select image
  // function Submit
  const navigat = useNavigate();
  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      image,
      full_name,
      title,
      province_id:
        govermentSelect !== undefined
          ? govermentSelect?.value
          : returnData.province_id,
      city_id:
        citySelect !== undefined ? citySelect?.value : returnData.city_id,
      country_id:
        countries !== undefined ? countries?.value : returnData.country_id,
      nationality_id:
        nationality !== undefined
          ? nationality?.value
          : returnData.nationality_id,
      gender: gender,
      // image: sendImage,
      marital_status,
      description,
      date_of_birth: date_of_birth || returnData.date_of_birth,
    };
    try {
      const { data } = await axios.post(
        `${basedUrl}/job-seeker/main-data/personal-data/create-or-update`,
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
      localStorage.removeItem("user");
      localStorage.setItem("user", JSON.stringify(data.data));
    } catch (error) {
      ErrorComponent(error, navigat, setErrorValidation);
    }
  };
  // function Submit
  ////////////////////////////////////////////////////////////////////////////////////
  // State Get Data
  const [returnData, setReturnData] = useState("");
  useEffect(() => {
    axios
      .get(`${basedUrl}/job-seeker/main-data/personal-data`, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then(({ data }) => {
        setReturnData(data.data);
        setFullName(data.data.full_name);
        setTittle(data.data.title);
        setGoverment(data.data.provinces_country);
        setCity(data.data.cities_province);
        setGender(data.data.gender);
        setMaterialStatus(data.data.marital_status);
        setDescription(data.data.description);
      })
      .catch((err) => {
        ErrorComponent(err, navigat);
      });
  }, []);
  // State Get Data
  return (
    <div className="my-PersonalData bg-white r-10 p-4 ">
      <div className="content">
        {/* Head Profile Image */}
        <div className="head-profile-image mb-5 d-flex align-items-center gap-4 justify-content-center">
          {/* image */}
          <div className="image flex-c overflow-hidden">
            {image ? (
              <img src={URL.createObjectURL(image)} alt="" />
            ) : (
              <img src={returnData?.image || person} alt="" />
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
        {/* Form */}
        <form onSubmit={onSubmit}>
          <div className="row g-4">
            {/* Name */}
            <div className="col-12 col-md-6">
              <div className="name d-flex flex-column gap-2">
                <label className="input-lable" htmlFor="name">
                  {trans("my_personal_data_user.name")}
                </label>
                <input
                  className={`input-data border r-10 p-3 ${
                    errorValidation.hasOwnProperty("full_name") && "border-red"
                  }`}
                  type="text"
                  id="name"
                  placeholder={trans("my_personal_data_user.name")}
                  defaultValue={full_name}
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
                  {trans("my_personal_data_user.last_name")}
                </label>
                <input
                  className={`input-data border r-10 p-3 ${
                    errorValidation.hasOwnProperty("title") && "border-red"
                  }`}
                  type="text"
                  id="end-name"
                  placeholder={trans("my_personal_data_user.last_name")}
                  defaultValue={title}
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
            <div className="col-12 col-md-6">
              <div className="end-name d-flex flex-column gap-2">
                <label className="input-lable" htmlFor="phone-number">
                  {trans("my_personal_data_user.number_phone")}
                </label>
                <input
                  className="input-data border r-10 p-3"
                  type="number"
                  id="phone-number"
                  placeholder={trans("my_personal_data_user.number_phone")}
                />
              </div>
            </div>
            {/* Mail */}
            <div className="col-12 col-md-6">
              <div className="end-name d-flex flex-column gap-2">
                <label className="input-lable" htmlFor="email">
                  {trans("my_personal_data_user.email")}
                </label>
                <input
                  className="input-data border r-10 p-3"
                  type="email"
                  id="email"
                  placeholder={trans("my_personal_data_user.email")}
                />
              </div>
            </div>
            {/* countries */}
            {returnData.country_id && (
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
                    defaultValue={countriesState.filter(
                      (item) => item.value === returnData.country_id
                    )}
                  />
                </div>
              </div>
            )}
            {/* goverment */}
            {returnData && (
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
              </div>
            )}
            {/* CITY */}
            {returnData && (
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
              </div>
            )}
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
                    checked={gender === "male"}
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
                    checked={gender === "female"}
                    onChange={(e) => {
                      setGender(e.target.value);
                    }}
                  />
                  <label htmlFor="female">
                    {trans("my_personal_data_user.famale")}
                  </label>
                </div>
              </div>
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
                    defaultValue={returnData.date_of_birth}
                    onChange={(e) => {
                      setDate(e.target.value);
                    }}
                  />
                </div>
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
                    checked={marital_status === "single"}
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
                    checked={marital_status === "married"}
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
                    checked={marital_status === "absolute"}
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
                    checked={marital_status === "widower"}
                    onChange={(e) => {
                      setMaterialStatus(e.target.value);
                    }}
                  />
                  <label htmlFor="Widower">
                    {trans("my_personal_data_user.dead")}
                  </label>
                </div>
              </div>
            </div>
            {/* Nationality */}
            {returnData.nationality_id && (
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
                    defaultValue={nationalityState.filter(
                      (item) => item.value === returnData.nationality_id
                    )}
                  />
                </div>
              </div>
            )}
            {/* TextArea */}
            <div className="col-12">
              <div className="row">
                <div className="col-md-6 col-12">
                  <div className="end-name d-flex flex-column gap-2">
                    <label className="input-lable" htmlFor="textarea">
                      {trans("my_personal_data_user.disc")}
                    </label>
                    <textarea
                      className={`input-data border r-10 p-3 ${
                        errorValidation.hasOwnProperty("description") &&
                        "border-red"
                      }`}
                      name="textarea"
                      id="textarea"
                      placeholder={trans("my_personal_data_user.disc_place")}
                      defaultValue={description}
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
                {trans("my_personal_data_user.save")}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default MyPersonalData;

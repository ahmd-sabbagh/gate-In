import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ReactSelect from "react-select";
import { useRecoilState } from "recoil";
import { basedUrl } from "../../../Api/Apis";
import {
  colorStyles,
  colorStylesMulti,
} from "../../../Others/ColorStyleReactSlick";
import { ErrorComponent } from "../../../Others/Error";
import {
  repeatLanguage,
  repeatMajors,
} from "../../../RecoilState/RepeatFormData";
import { trans } from "../../../Components/Navbar/Navbar";
import { checkJobSeekerData } from "../../../Components/Navbar/GlopalStateRecoil/AllData";

function LearningData() {
  const token = localStorage.getItem("token");
  const navigat = useNavigate();
  const [userChangeData, setUserChangeData] =
    useRecoilState(checkJobSeekerData);
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
        if (data.data.data.learning_data !== null) {
          navigat("/employ-data/experience");
        }
      })
      .catch((error) => {
        ErrorComponent(error, navigat);
      });
  }, []);
  // Cheak Data
  // State Majors
  const [majors, setMajores] = useRecoilState(repeatMajors);
  const [majorsValue, setMajorsValue] = useState();
  function majorSelect(data) {
    setMajorsValue(data);
  }
  // State Majors
  // Dates Years
  const [yearsOptions, setYearsOptions] = useState([]);
  function yearsSelect(data) {
    setYearsOptions(data);
  }
  const [years, setYears] = useState([]);
  useEffect(() => {
    const currentYears = new Date().getFullYear();
    const lastYears = currentYears - 50;
    const ArrayYears = [];
    for (let i = lastYears; i <= currentYears; i++) {
      ArrayYears.push({ value: i, label: i });
    }
    setYears(ArrayYears);
  }, []);
  // Dates Years
  // Collage
  const [collage, setCollage] = useState();
  // Collage
  // Languages
  const [languageOptions, setLanguageOptions] = useRecoilState(repeatLanguage);
  const [language, setLanguage] = useState([]);
  function selectLanguages(data) {
    setLanguage(data);
  }
  const languageArray = language.map((item) => item.value);
  // Languages
  // Certificate Add
  const [formValues, setFormValues] = useState([{ name: "" }]);
  let handleChange = (i, e) => {
    let newFormValues = [...formValues];
    newFormValues[i][e.target.name] = e.target.value;
    setFormValues(newFormValues);
  };
  let addFormFields = () => {
    setFormValues([...formValues, { name: "" }]);
  };
  let removeFormFields = (i) => {
    let newFormValues = [...formValues];
    newFormValues.splice(i, 1);
    setFormValues(newFormValues);
  };
  // Certificate Add
  // function Submit

  const onSubmit = async (e) => {
    e.preventDefault();
    // Certificate
    const certificatArray = [];
    formValues.map((item) => certificatArray.push(item.name));
    // Certificate
    const formData = {
      types_education_id: majorsValue?.value || "",
      graduation_year: yearsOptions?.value,
      college_or_institute_name: collage,
      languages: languageArray,
      certificates: certificatArray.filter((el) => el.length > 1),
    };
    try {
      const { data } = await axios.post(
        `${basedUrl}/job-seeker/main-data/learning-data/create-or-update`,
        formData,
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUserChangeData(2);
      navigat("/employ-data/experience");
    } catch (error) {
      ErrorComponent(error, navigat, setErrorValidation);
    }
  };
  // function Submit
  return (
    <div className="LearningData mt-5">
      <div className="container">
        <div className="content r-10 p-3 p-md-5 bg-white">
          {/* Head */}
          <div className="head mb-5">
            <h3 className=" fs-24-700 text-center">
              {trans("employe-page.steps.two")}
            </h3>
            <p className="fs-20-400 text-color mt-2 text-center">
              {trans("business_pioneer.desc")}
            </p>
          </div>
          {/* Line */}
          <div className="line d-flex align-items-center gap-4 gap-md-5 mb-5">
            <h4 className=" fs-20-500">
              {trans("my_personal_data_user.general_lerning")}
            </h4>
            <div className="lin"></div>
          </div>
          {/* Form */}
          <form onSubmit={onSubmit}>
            <div className="row g-4">
              {/* التخصص سلكت*/}
              <div className="col-12 col-md-6">
                <div className="end-name d-flex flex-column gap-2">
                  <span className="input-lable">
                    {trans("business_pioneer.type_learning")}
                  </span>
                  <ReactSelect
                    options={majors}
                    value={majorsValue}
                    placeholder={trans("business_pioneer.type_learning_place")}
                    isSearchable={true}
                    onChange={majorSelect}
                    styles={colorStyles}
                  />
                  <span className="text-error fs-14-400">
                    {errorValidation.hasOwnProperty("types_education_id")
                      ? errorValidation.types_education_id[0]
                      : null}
                  </span>
                </div>
              </div>
              {/*  سنة الحصول على الشهادة سلكت*/}
              <div className="col-12 col-md-6">
                <div className="end-name d-flex flex-column gap-2">
                  <span className="input-lable">
                    {trans("my_personal_data_user.Specialization_year")}
                  </span>
                  <ReactSelect
                    options={years}
                    value={yearsOptions}
                    placeholder={trans(
                      "my_personal_data_user.Specialization_year"
                    )}
                    isSearchable={true}
                    onChange={yearsSelect}
                    styles={colorStyles}
                  />
                  <span className="text-error fs-14-400">
                    {errorValidation.hasOwnProperty("graduation_year")
                      ? errorValidation.graduation_year[0]
                      : null}
                  </span>
                </div>
              </div>
              {/* اذكر الكلية او المعهد */}
              <div className="col-12">
                <div className="name d-flex flex-column gap-2">
                  <label className="input-lable" htmlFor="nameCollage">
                    {trans("my_personal_data_user.mention_institute")}
                  </label>
                  <input
                    className={`input-data border r-10 p-3 ${
                      errorValidation.hasOwnProperty(
                        "college_or_institute_name"
                      ) && "border-red"
                    }`}
                    type="text"
                    id="nameCollage"
                    placeholder={trans(
                      "my_personal_data_user.mention_institute"
                    )}
                    onChange={(e) => {
                      setCollage(e.target.value);
                    }}
                  />
                  <span className="text-error fs-14-400">
                    {errorValidation.hasOwnProperty("college_or_institute_name")
                      ? errorValidation.college_or_institute_name[0]
                      : null}
                  </span>
                </div>
              </div>
              {/* Line */}
              <div className="line d-flex align-items-center gap-4 gap-md-5 mb-3 mt-5">
                <h4 className=" fs-20-500">
                  {trans("my_personal_data_user.education_learning")}
                </h4>
                <div className="lin"></div>
              </div>
              {/* اللغة سلكت */}
              <div className="col-12">
                <div className="end-name d-flex flex-column gap-2">
                  <span className="input-lable">
                    {trans("my_personal_data_user.languages")}
                  </span>
                  <ReactSelect
                    options={languageOptions}
                    value={language}
                    placeholder={trans("my_personal_data_user.languages")}
                    isSearchable={true}
                    onChange={selectLanguages}
                    styles={colorStylesMulti}
                    isMulti
                  />
                </div>
                <div className="languageSelect d-flex gap-2 mt-3">
                  {language?.map((item, idx) => (
                    <div className="py-1 px-3" key={idx}>
                      {item.label}
                    </div>
                  ))}
                </div>
                <span className="text-error fs-14-400">
                  {errorValidation.hasOwnProperty("languages")
                    ? errorValidation.languages[0]
                    : null}
                </span>
              </div>
              {/* الشهادة */}
              <>
                {formValues.map((element, index) => (
                  <div className="col-12" key={index}>
                    <label className="input-lable mb-2">
                      {trans("my_personal_data_user.certificate")}
                    </label>
                    <div className="name d-flex gap-2 full-width align-items-center">
                      <input
                        className="input-data border r-10 p-3"
                        type="text"
                        name="name"
                        value={element.name || ""}
                        onChange={(e) => handleChange(index, e)}
                        placeholder={trans("my_personal_data_user.certificate")}
                      />
                      {index ? (
                        <button
                          type="button"
                          className="bg-danger border-none r-10 py-2 px-3 text-white flex-c"
                          onClick={() => removeFormFields(index)}
                        >
                          {trans("my_personal_data_user.delete")}
                        </button>
                      ) : null}
                    </div>
                  </div>
                ))}
                <span className="text-error fs-14-400">
                  {errorValidation.hasOwnProperty("certificates")
                    ? errorValidation.certificates[0]
                    : null}
                </span>
                <div className="button-section d-flex align-items-center justify-content-between">
                  <button
                    className="add border-none bg-transparent"
                    type="button"
                    onClick={() => addFormFields()}
                  >
                    {trans("my_personal_data_user.add_cirtificate")}
                  </button>
                </div>
              </>
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

export default LearningData;

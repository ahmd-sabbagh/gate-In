import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import ReactSelect from "react-select";
import { useRecoilState } from "recoil";
import { basedUrl } from "../../../Api/Apis";
import {
  colorStyles,
  colorStylesMulti,
} from "../../../Others/ColorStyleReactSlick";
import {
  repeatLanguage,
  repeatMajors,
} from "../../../RecoilState/RepeatFormData";
import { useNavigate } from "react-router-dom";
import { ErrorComponent, SuccsesComponent } from "../../../Others/Error";
import { trans } from "../../../Components/Navbar/Navbar";

function MyLearningData() {
  const token = localStorage.getItem("token");
  const navigat = useNavigate();
  // Validation State
  const [errorValidation, setErrorValidation] = useState({});
  // Validation State
  // State Get Data
  const [returnData, setReturnData] = useState("");
  // State Majors
  const [majors, setMajores] = useRecoilState(repeatMajors);
  const [majorsValue, setMajorsValue] = useState();

  function majorSelect(data) {
    setMajorsValue(data);
  }
  // State Majors
  // Dates Years
  const [yearsOptions, setYearsOptions] = useState();
  function yearsSelect(data) {
    setYearsOptions(data);
  }
  const [years, setYears] = useState();
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
  const [formValues, setFormValues] = useState([]);
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
      types_education_id: majorsValue?.value || returnData?.types_education_id,
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
  useEffect(() => {
    const Array = [];
    // years
    const currentYears = new Date().getFullYear();
    const lastYears = currentYears - 30;
    const ArrayYears = [];
    for (let i = lastYears; i <= currentYears; i++) {
      ArrayYears.push({ value: i, label: i });
    }
    setYears(ArrayYears);
    // years
    axios
      .get(`${basedUrl}/job-seeker/main-data/learning-data`, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then(({ data }) => {
        setReturnData(data.data);
        setLanguage(
          languageOptions.filter(
            (item, idx) => item.value === data.data.languages[idx]
          )
        );
        setYearsOptions({
          value: data.data.graduation_year,
          label: data.data.graduation_year,
        });
        setCollage(data.data.college_or_institute_name);
        data.data.certificates.map((item) => Array.push({ name: item }));
        setFormValues(Array);
      })
      .catch((error) => {
        ErrorComponent(error, navigat);
      });
  }, []);
  // State Get Data
  return (
    <div className="LearningData bg-white p-4 r-10">
      <div className="content">
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
            {returnData.types_education_id && (
              <div className="col-12 col-md-6">
                <div className="end-name d-flex flex-column gap-2">
                  <span className="input-lable">
                    {trans("my_personal_data_user.Specialization")}
                  </span>
                  <ReactSelect
                    options={majors}
                    value={majorsValue}
                    placeholder={trans("my_personal_data_user.Specialization")}
                    isSearchable={true}
                    onChange={majorSelect}
                    styles={colorStyles}
                    defaultValue={majors.filter(
                      (item) => item.value === returnData.types_education_id
                    )}
                  />
                </div>
              </div>
            )}
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
                  placeholder={trans("my_personal_data_user.mention_institute")}
                  value={collage}
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
            {languageOptions && (
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
                  <span className="text-error fs-14-400">
                    {errorValidation.hasOwnProperty("languages")
                      ? errorValidation.languages[0]
                      : null}
                  </span>
                </div>
                <div className="languageSelect d-flex gap-2 mt-3">
                  {language?.map((item, idx) => (
                    <div className="py-1 px-3" key={idx}>
                      {item.label}
                    </div>
                  ))}
                </div>
              </div>
            )}
            {/* الشهادة */}
            <>
              {formValues.map((element, index) => (
                <div className="col-12" key={index}>
                  <label className="input-lable mb-2">
                    {trans("my_personal_data_user.certificate")}
                  </label>
                  <div className="name d-flex gap-2 full-width align-items-center">
                    <input
                      className={`input-data border r-10 p-3 ${
                        errorValidation.hasOwnProperty("certificates") &&
                        "border-red"
                      }`}
                      type="text"
                      name="name"
                      placeholder={trans("my_personal_data_user.certificate")}
                      value={element.name || ""}
                      onChange={(e) => handleChange(index, e)}
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
                  <span className="d-block mt-3 text-error fs-14-400">
                    {errorValidation.hasOwnProperty("certificates")
                      ? errorValidation.certificates[0]
                      : null}
                  </span>
                </div>
              ))}
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
                {trans("my_personal_data_user.save")}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default MyLearningData;

import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ReactSelect from "react-select";
import { useRecoilState } from "recoil";
import { basedUrl } from "../../../Api/Apis";
import { colorStyles } from "../../../Others/ColorStyleReactSlick";
import { ErrorComponent } from "../../../Others/Error";
import { repeatMajors } from "../../../RecoilState/RepeatFormData";
import { trans } from "../../../Components/Navbar/Navbar";
import { checkJobSeekerData } from "../../../Components/Navbar/GlopalStateRecoil/AllData";

function PreviousExperience() {
  const navigat = useNavigate();
  const token = localStorage.getItem("token");
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
        if (data.data.data.experiences !== null) {
          navigat("/job_seeker");
        }
      })
      .catch((error) => {
        ErrorComponent(error, navigat);
      });
  }, []);
  // Cheak Data
  // Previous Job
  const [formValues, setFormValues] = useState([
    { job_name: "", start_year: "", end_year: "", workplace: "" },
  ]);

  let handleChange = (i, e) => {
    let newFormValues = [...formValues];
    newFormValues[i][e.target.name] = e.target.value;
    setFormValues(newFormValues);
  };

  let addFormFields = () => {
    setFormValues([
      ...formValues,
      { job_name: "", start_year: "", end_year: "", workplace: "" },
    ]);
  };

  let removeFormFields = (i) => {
    let newFormValues = [...formValues];
    newFormValues.splice(i, 1);
    setFormValues(newFormValues);
  };
  // Previous Job
  // States Company Name
  const [companyName, setCompanyName] = useState();
  // States Company Name
  // State Majors
  const [majors, setMajores] = useRecoilState(repeatMajors);
  const [majorsValue, setMajorsValue] = useState();
  function majorSelect(data) {
    setMajorsValue(data);
  }
  // State Majors
  // function Submit
  const onSubmit = async (e) => {
    const formData = {
      major_id: majorsValue?.value,
      company_name: companyName,
      previous_jobs: formValues,
    };
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${basedUrl}/job-seeker/main-data/experience/create-or-update`,
        formData,
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUserChangeData(3)
      navigat("/job_seeker");
    } catch (error) {
      console.log(error);
      ErrorComponent(error, navigat, setErrorValidation);
    }
  };
  // function Submit
  return (
    <div className="PreviousExperience mt-5">
      <div className="container">
        <div className="content r-10 p-4 p-md-5 bg-white">
          {/* Head */}
          <div className="head mb-5">
            <h3 className=" fs-24-700 text-center">
              {trans("employe-page.steps.three")}
            </h3>
            <p className="fs-20-400 text-color mt-2 text-center">
              {trans("business_pioneer.desc")}
            </p>
          </div>
          {/* Form */}
          <form onSubmit={onSubmit}>
            <div className="row g-4">
              {/* الوظيفة الحالية */}
              <div className="col-12 col-md-6">
                <div className="end-name d-flex flex-column gap-2">
                  <span className="input-lable">
                    {trans("my_personal_data_user.Current_Position")}
                  </span>
                  <ReactSelect
                    options={majors}
                    value={majorsValue}
                    placeholder={trans(
                      "my_personal_data_user.Current_Position"
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
              {/* اسم الشركة */}
              <div className="col-12 col-md-6">
                <div className="end-name d-flex flex-column gap-2">
                  <label className="input-lable" htmlFor="company-name">
                    {trans("my_personal_data_user.company_name")}
                  </label>
                  <input
                    className="input-data border r-10 p-3"
                    type="text"
                    id="company-name"
                    placeholder={trans("my_personal_data_user.company_name")}
                    onChange={(e) => {
                      setCompanyName(e.target.value);
                    }}
                  />
                  <span className="text-error fs-14-400">
                    {errorValidation.hasOwnProperty("company_name")
                      ? errorValidation.company_name[0]
                      : null}
                  </span>
                </div>
              </div>
              {/* الوظيفة السابقة */}
              <h3 className="input-lable">
                {trans("my_personal_data_user.previous_jobs")}
              </h3>
              {formValues.map((element, index) => (
                <div className="col-12" key={index}>
                  <div className="row g-4">
                    {/* نوع الوظيفة */}
                    <div className="col-12 col-md-8">
                      <div className="d-flex flex-column gap-2">
                        <span className="text-color">{`${trans(
                          "my_personal_data_user.job"
                        )} (${index + 1})`}</span>
                        <input
                          placeholder={trans("my_personal_data_user.job_name")}
                          className={`input-data border r-10 p-3 ${
                            errorValidation.hasOwnProperty(
                              `previous_jobs.${index}.job_name`
                            ) && "border-red"
                          }`}
                          type="text"
                          name="job_name"
                          value={element.job_name || ""}
                          onChange={(e) => handleChange(index, e)}
                        />
                      </div>
                    </div>
                    {/* وقت من */}
                    <div className="col-12 col-md-2">
                      <div className="d-flex flex-column gap-2">
                        <span className="input-lable">
                          {trans("my_personal_data_user.from")}
                        </span>
                        <input
                          placeholder={trans("my_personal_data_user.year")}
                          className={`input-data border r-10 p-3 ${
                            errorValidation.hasOwnProperty(
                              `previous_jobs.${index}.start_year`
                            ) && "border-red"
                          }`}
                          type="number"
                          name="start_year"
                          value={element.start_year || ""}
                          onChange={(e) => handleChange(index, e)}
                        ></input>
                      </div>
                    </div>
                    {/* وقت الى */}
                    <div className="col-12 col-md-2">
                      <div className="d-flex flex-column gap-2">
                        <span className="input-lable">
                          {trans("my_personal_data_user.to")}
                        </span>
                        <input
                          placeholder={trans("my_personal_data_user.year")}
                          className={`input-data border r-10 p-3 ${
                            errorValidation.hasOwnProperty(
                              `previous_jobs.${index}.end_year`
                            ) && "border-red"
                          }`}
                          type="number"
                          name="end_year"
                          value={element.end_year || ""}
                          onChange={(e) => handleChange(index, e)}
                        />
                      </div>
                    </div>
                    {/* مكان العمل */}
                    <div className="col-12">
                      <input
                        placeholder={trans("my_personal_data_user.worke_place")}
                        className={`input-data border r-10 p-3 ${
                          errorValidation.hasOwnProperty(
                            `previous_jobs.${index}.workplace`
                          ) && "border-red"
                        }`}
                        type="text"
                        name="workplace"
                        value={element.workplace || ""}
                        onChange={(e) => handleChange(index, e)}
                      />
                    </div>
                  </div>
                  {index ? (
                    <button
                      type="button"
                      className="mt-3 mb-3 bg-danger border-none r-10 py-2 px-3 text-white flex-c"
                      onClick={() => removeFormFields(index)}
                    >
                      {trans("my_personal_data_user.delete")}
                    </button>
                  ) : null}
                </div>
              ))}
              <div className="mt-4">
                <button
                  className="p-2 add pointer border-none bg-transparent"
                  type="button"
                  onClick={() => addFormFields()}
                >
                  {trans("my_personal_data_user.add_jobs")}
                </button>
              </div>
              {/* الوظيفة السابقة */}
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
  );
}

export default PreviousExperience;

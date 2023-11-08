import { useState } from "react";
import ReactSelect from "react-select";
import { colorStyles } from "../../Others/ColorStyleReactSlick";
import TeamMembers from "./TeamMembers";
import "./ProjectData.css";
import ProblemSolvingForUsers from "./Components/ProblemSolvingForUsers/ProblemSolvingForUsers";
import RadioBoxComponent from "./Components/RadioBoxComponent/RadioBoxComponent";
import TheLocation from "../../Components/TheLocation/TheLocation";
import { repeatTipsProject } from "../../RecoilState/RepeatFormData";
import { useRecoilState } from "recoil";
import axios from "axios";
import { basedUrl } from "../../Api/Apis";
import { ErrorComponent, SuccsesComponent } from "../../Others/Error";
import { useNavigate } from "react-router-dom";
import { PopubSendData } from "../../RecoilState/PopubSendData";
import SendDataDone from "../../Components/SendDataDone/SendDataDone";
import { ReactComponent as Icon } from "./Assets/DoneData.svg";
import { trans } from "../../Components/Navbar/Navbar";

const popubData = {
  icon: <Icon />,
  desc: trans("business_pioneer.desc"),
  btn1To: "/business_pioneer/dashboard/",
  btn1: trans("business_pioneer.btn1"),
};

function ProjectData() {
  const token = localStorage.getItem("token");
  const navigat = useNavigate();
  const [errorValidation, setErrorValidation] = useState({});
  // Done Data
  const [done, setDone] = useRecoilState(PopubSendData);
  // Done Data
  // text
  const [title_ar, setTitle_ar] = useState();
  const [description_ar, setDescription_ar] = useState();
  // tips projects
  const [rTp, setRtipsProject] = useRecoilState(repeatTipsProject);
  const [types_project_id, setProjectTips] = useState();
  function handleSelectProgectTips(data) {
    setProjectTips(data);
  }
  // The nature of the project
  const [industrial, setIndustrial] = useState(false);
  const [agricultural, setAgricultural] = useState(false);
  const [commercial, setCommercial] = useState(false);
  // Foarm member values
  const [formValues, setFormValues] = useState([]);
  // States Of Problem Solving
  const [technical_means, setTechnical_means] = useState(false);
  const [financial_resources, setFinancial_resources] = useState(false);
  const [material_means, setMaterial_means] = useState(false);
  const [human_resources, setHuman_resources] = useState(false);
  const [publications, setPublications] = useState(false);
  const [media, setMedia] = useState(false);
  const [government_approvals, setGovernment_approvals] = useState(false);
  const ProblemSolving = [
    {
      setState: setTechnical_means,
      state: technical_means,
      label: trans("business_pioneer.solution_of_program.one"),
    },
    {
      setState: setFinancial_resources,
      state: financial_resources,
      label: trans("business_pioneer.solution_of_program.two"),
    },
    {
      setState: setMaterial_means,
      state: material_means,
      label: trans("business_pioneer.solution_of_program.three"),
    },
    {
      setState: setHuman_resources,
      state: human_resources,
      label: trans("business_pioneer.solution_of_program.four"),
    },
    {
      setState: setPublications,
      state: publications,
      label: trans("business_pioneer.solution_of_program.five"),
    },
    {
      setState: setMedia,
      state: media,
      label: trans("business_pioneer.solution_of_program.six"),
    },
    {
      setState: setGovernment_approvals,
      state: government_approvals,
      label: trans("business_pioneer.solution_of_program.seven"),
    },
  ];
  // States Of Problem Solving
  // What characterizes the project !
  const [price, setprice] = useState(false);
  const [quality, setQuality] = useState(false);
  const [delivery_service, setDelivery_service] = useState(false);
  const [saving_speed, setSaving_speed] = useState(false);
  const [mobile_app, setMobile_app] = useState(false);
  const [encouragement_incentives, setEncouragement_incentives] =
    useState(false);
  const WhatCharacterizes = [
    {
      setState: setprice,
      state: price,
      label: trans("business_pioneer.distinguishes_proj.one"),
    },
    {
      setState: setQuality,
      state: quality,
      label: trans("business_pioneer.distinguishes_proj.two"),
    },
    {
      setState: setDelivery_service,
      state: delivery_service,
      label: trans("business_pioneer.distinguishes_proj.three"),
    },

    {
      setState: setSaving_speed,
      state: saving_speed,
      label: trans("business_pioneer.distinguishes_proj.four"),
    },
    {
      setState: setMobile_app,
      state: mobile_app,
      label: trans("business_pioneer.distinguishes_proj.five"),
    },
    {
      setState: setEncouragement_incentives,
      state: encouragement_incentives,
      label: trans("business_pioneer.distinguishes_proj.six"),
    },
  ];
  // What characterizes the project !
  // Target group
  const [target, setTarget] = useState();
  const targetGroub = [
    {
      value: "all_people",
      label: trans("business_pioneer.Target_group.one"),
    },
    {
      value: "adults",
      label: trans("business_pioneer.Target_group.two"),
    },
    {
      value: "children",
      label: trans("business_pioneer.Target_group.three"),
    },
    {
      value: "students",
      label: trans("business_pioneer.Target_group.four"),
    },
    {
      value: "women",
      label: trans("business_pioneer.Target_group.five"),
    },
    {
      value: "men",
      label: trans("business_pioneer.Target_group.six"),
    },
  ];
  // Target group
  // Do you need an investor
  const [investor, setInvestor] = useState();
  const investorArray = [
    {
      value: "1",
      label: trans("business_pioneer.need_investor.one"),
    },
    {
      value: "0",
      label: trans("business_pioneer.need_investor.two"),
    },
  ];
  // Do you need an investor
  // geographical area
  const [city, setCity] = useState();
  const [goverment, setGoverment] = useState();
  const [countries, setCountries] = useState();
  // geographical area
  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      title_ar,
      description_ar,
      types_project_id: types_project_id?.value,
      //
      industrial,
      agricultural,
      commercial,
      //
      technical_means,
      material_means,
      human_resources,
      media,
      financial_resources,
      publications,
      government_approvals,
      // مميزات المشروع
      price,
      delivery_service,
      mobile_app,
      quality,
      saving_speed,
      encouragement_incentives,
      //
      target_group: target,
      //
      city_id: city?.value,
      province_id: goverment?.value,
      country_id: countries?.value,
      //
      need_investor: investor,
      //
      team: formValues,
    };
    try {
      const { data } = await axios.post(
        `${basedUrl}/business-pioneer/projects/create`,
        formData,
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      SuccsesComponent(data.message);
      setDone(true);
    } catch (error) {
      ErrorComponent(error, navigat, setErrorValidation);
    }
  };
  return (
    <>
      {done && <SendDataDone {...popubData} />}
      <div className="projectData">
        {/* Head */}
        <div className="head mb-5">
          <h3 className=" fs-24-700 text-center">
            {trans("business_pioneer.project_data")}
          </h3>
          <p className="fs-20-400 text-color mt-2 text-center">
            {trans("business_pioneer.desc")}
          </p>
        </div>
        {/* Form */}
        <form onSubmit={onSubmit}>
          <div className="row g-4">
            {/* Name Projects */}
            <div className="col-12 col-md-6">
              <div className="d-flex flex-column gap-2">
                <label className="input-lable" htmlFor="name-project">
                  {trans("business_pioneer.proj_title")}
                </label>
                <input
                  className={`input-data border r-10 p-3 ${
                    errorValidation.hasOwnProperty("title_ar") && "border-red"
                  }`}
                  type="text"
                  id="name-project"
                  placeholder={trans("business_pioneer.proj_title")}
                  onChange={(e) => {
                    setTitle_ar(e.target.value);
                  }}
                />
                <span className="text-error fs-14-400">
                  {errorValidation.hasOwnProperty("title_ar")
                    ? errorValidation.title_ar[0]
                    : null}
                </span>
              </div>
            </div>
            {/* Project Type */}
            <div className="col-12 col-md-6">
              <div className="d-flex flex-column gap-2">
                <span className="input-lable">
                  {trans("business_pioneer.proj_type")}
                </span>
                <ReactSelect
                  options={rTp}
                  value={types_project_id}
                  placeholder={trans("business_pioneer.proj_type")}
                  isSearchable={true}
                  onChange={handleSelectProgectTips}
                  styles={colorStyles}
                />
                <span className="text-error fs-14-400">
                  {errorValidation.hasOwnProperty("types_project_id")
                    ? errorValidation.types_project_id[0]
                    : null}
                </span>
              </div>
            </div>
            {/* The Nature Of The Project */}
            <div className="col-12">
              <span className="input-lable">
                {trans("business_pioneer.proj_natural")}
              </span>
              <div className=" d-flex justify-content-between gap-3 mt-3 check-none">
                {/* Industrial */}
                <div className="job-type ">
                  <input
                    type="checkbox"
                    name="pricing"
                    checked={industrial === true}
                    id="one"
                    onChange={() => {
                      setIndustrial(!industrial);
                    }}
                  />
                  <label
                    htmlFor="one"
                    className="fs-16-400 text-color r-10 border p-3 pointer"
                  >
                    {trans("business_pioneer.industrial")}
                  </label>
                </div>
                {/* Agricultural */}
                <div className="job-type">
                  <input
                    type="checkbox"
                    name="pricing"
                    value="نظري"
                    id="two"
                    checked={agricultural === true}
                    onChange={() => {
                      setAgricultural(!agricultural);
                    }}
                  />
                  <label
                    htmlFor="two"
                    className="fs-16-400 text-color r-10 border p-3 pointer"
                  >
                    {trans("business_pioneer.agricultural")}
                  </label>
                </div>
                {/* Commercial */}
                <div className="job-type">
                  <input
                    type="checkbox"
                    name="pricing"
                    checked={commercial === true}
                    id="three"
                    onChange={(e) => {
                      setCommercial(!commercial);
                    }}
                  />
                  <label
                    htmlFor="three"
                    className="fs-16-400 text-color r-10 border p-3 pointer"
                  >
                    {trans("business_pioneer.commercial")}
                  </label>
                </div>
              </div>
              <span className="text-error fs-14-400">
                {errorValidation.hasOwnProperty("title_ar")
                  ? errorValidation.title_ar[0]
                  : null}
              </span>
            </div>
            {/* Project Problem Solving */}
            <div className="col-12">
              <div className="d-flex flex-column gap-2">
                <label className="input-lable" htmlFor="project-desc">
                  {trans("business_pioneer.proj_problem")}
                </label>
                <textarea
                  className={`input-data border r-10 p-3 ${
                    errorValidation.hasOwnProperty("description_ar") &&
                    "border-red"
                  }`}
                  name="textaria"
                  id="project-desc"
                  placeholder={trans(
                    "company_profile.company_data.company_disc_place"
                  )}
                  onChange={(e) => {
                    setDescription_ar(e.target.value);
                  }}
                ></textarea>
                <span className="text-error fs-14-400">
                  {errorValidation.hasOwnProperty("description_ar")
                    ? errorValidation.description_ar[0]
                    : null}
                </span>
              </div>
            </div>
          </div>
          {/* ماهو الحل لمشكلة المستخدم */}
          <ProblemSolvingForUsers
            arrayState={ProblemSolving}
            name="problem"
            label={trans("business_pioneer.solution_of_program.title")}
          />
          {/* بماذا يتميز المشروع ؟*/}
          <ProblemSolvingForUsers
            arrayState={WhatCharacterizes}
            name="characterizes"
            label={trans("business_pioneer.distinguishes_proj.title")}
          />
          {/* الفئة المستهدفة */}
          <RadioBoxComponent
            state={target}
            setState={setTarget}
            arrayState={targetGroub}
            name="target-groub"
            label={trans("business_pioneer.Target_group.title")}
          />
          <span className="text-error fs-14-400">
            {errorValidation.hasOwnProperty("target_group")
              ? errorValidation.target_group[0]
              : null}
          </span>
          {/* هل تحتاج الى مستثمر */}
          <RadioBoxComponent
            state={investor}
            setState={setInvestor}
            arrayState={investorArray}
            name="investor"
            label={trans("business_pioneer.need_investor.title")}
          />
          <span className="text-error fs-14-400">
            {errorValidation.hasOwnProperty("need_investor")
              ? errorValidation.need_investor[0]
              : null}
          </span>
          {/* الرقعة الجغرافية */}
          <TheLocation
            city={city}
            setCity={setCity}
            goverment={goverment}
            setGoverment={setGoverment}
            countries={countries}
            setCountries={setCountries}
            label={trans("business_pioneer.Geographical_area")}
            errorValidation={errorValidation}
          />
          {/* Team Member */}
          <TeamMembers
            setFormValues={setFormValues}
            formValues={formValues}
            errorValidation={errorValidation}
          />
          {/* Team Member */}
          <button
            type="submit"
            className="me-auto d-block resetBtn bg-main r-10 text-white py-3 px-5 mt-4"
          >
            {trans("business_pioneer.save")}
          </button>
        </form>
      </div>
    </>
  );
}

export default ProjectData;

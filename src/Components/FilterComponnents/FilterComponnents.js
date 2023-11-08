import { useState } from "react";
import { BsFillFilterSquareFill } from "react-icons/bs";
import { useRecoilState } from "recoil";
import "./FilterComponnents.css";
import "../../Components/SideBarCss/SideBarCss.css";
import {
  repeatCountries,
  repeatMajors,
} from "../../RecoilState/RepeatFormData";
import axios from "axios";
import { apiHeaders, basedUrl } from "../../Api/Apis";
import { ErrorComponent } from "../../Others/Error";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import ScrollarComponent from "../ScrollarComponent/ScrollarComponent";
import { IoIosArrowDown } from "react-icons/io";
import { trans } from "../Navbar/Navbar";
// List City
const checkListCity = [
  "سرس الليان",
  "المحلة",
  "المنوفية",
  "الاسكندرية",
  "القاهرة",
];
// List City
// Number List Option
const NumberList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
// Number List Option
function FilterComponnents(props) {
  const token = localStorage.getItem("token");
  const navigat = useNavigate();
  // Get State Jobs
  // Get State Jobs
  const [getJobs, setGetJobs] = useRecoilState(repeatMajors);
  // Get State Jobs
  // State Filter City
  const [cityFilter, setCityFilter] = useState(checkListCity);
  // State Filter City
  // State open And Close Side Bar
  const [sidebarOpen, setSidebarOpen] = useState(false);
  // State open And Close Side Bar
  // State Open And Close Menu
  const [open, setOpen] = useState(true);
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);
  const [open4, setOpen4] = useState(false);
  const [open5, setOpen5] = useState(false);
  // State Open And Close Menu
  // Add/Remove checked Major
  const [checked, setChecked] = useState([]);
  const handleCheck = (event) => {
    var updatedList = [...checked];
    if (event.target.checked) {
      updatedList = [...checked, event.target.value];
    } else {
      updatedList.splice(checked.indexOf(event.target.value), 1);
    }
    setChecked(updatedList);
  };
  // Countries Filter
  const [countryFilter, setCountryFilter] = useRecoilState(repeatCountries);
  const [country, setCountry] = useState([]);
  const handleCheckCountry = (event) => {
    setGoverment([]);
    var updatedList = [...country];
    if (event.target.checked) {
      updatedList = [...country, event.target.value];
    } else {
      updatedList.splice(country.indexOf(event.target.value), 1);
    }
    setCountry(updatedList);
    getGovermentFunction(updatedList);
  };
  // get Goverment
  const [getGoverment, setGetGoverment] = useState([]);
  function getGovermentFunction(arr) {
    axios
      .post(
        `${basedUrl}/public/data/provinces-countries`,
        { countries: arr },
        apiHeaders
      )
      .then(({ data }) => {
        setGetGoverment(data.data);
      })
      .catch((error) => {
        ErrorComponent(error, navigat);
      });
  }
  // get Goverment
  // Countries Filter
  // Goverment Filter
  const [goverment, setGoverment] = useState([]);
  const handleCheckGoverment = (event) => {
    var updatedList = [...goverment];
    if (event.target.checked) {
      updatedList = [...goverment, event.target.value];
    } else {
      updatedList.splice(goverment.indexOf(event.target.value), 1);
    }
    setGoverment(updatedList);
  };
  // Goverment Filter
  // Jobs Type
  const [full_time, setFulltime] = useState(false);
  const [part_time, setPartTime] = useState(false);
  const [remotely, setRemotely] = useState(false);
  // Jobs Type
  // Jobs Level
  const [fresh_graduate, setFreshGraduate] = useState(false);
  const [average_level, setAverageLevel] = useState(false);
  const [high_experience, setHighExperience] = useState(false);
  const [advanced_level, setAdvancedLevel] = useState(false);
  const [boss, setBoss] = useState(false);
  // Jobs Level
  // Years Expriens
  const [min_years_experience, setMin_years_experience] = useState(0);
  const [max_years_experience, setMax_years_experience] = useState(0);
  // Years Expriens
  // Date Jobs
  const [dateJobs, setDateJobs] = useState();
  // Date Jobs
  // Filter Search Country
  const FilterNamesCountry = (e) => {
    const serach = e.target.value.toLowerCase();
    const filterNames = countryFilter.filter((item) =>
      item.label.toLowerCase().includes(serach)
    );
    setCountryFilter(filterNames);
  };
  // Filter Search Country
  // Filter Search City
  const FilterNamesCity = (e) => {
    const serach = e.target.value.toLowerCase();
    const filterNames = checkListCity.filter((item) =>
      item.toLowerCase().includes(serach)
    );
    setCityFilter(filterNames);
  };
  // Filter Search City
  // Function Submit
  // const [filterData, setFilterData] = useRecoilState(JobFilterData);
  const OnSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      majors: checked,
      countries: country,
      provinces: goverment,
      remotely,
      full_time,
      part_time,
      advanced_level,
      average_level,
      fresh_graduate,
      high_experience,
      boss,
      min_years_experience,
      max_years_experience,
      date_published: dateJobs,
    };
    try {
      const { data } = await axios.post(`${basedUrl}${props.api}`, formData, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      props.setData(data.data.data);
      props?.setStatusP(true);
      props?.setNum(2);
    } catch (error) {
      ErrorComponent(error, navigat);
    }
  };
  // Get Ads
  const [ads, setAds] = useState();
  const getAds = () => {
    axios
      .post(`${basedUrl}/public/data/ads`, { page: "job", apiHeaders })
      .then(({ data }) => {
        setAds(data.data);
      })
      .catch((error) => {
        ErrorComponent(error, navigat);
      });
  };
  useEffect(() => {
    getAds();
  }, []);
  // Get Ads
  return (
    <div
      className={`FilterComponnents  side-bar-position  ${
        sidebarOpen && "side-bar-0"
      }`}
    >
      <div className="icon-open d-lg-none position-relative">
        <div
          className="flex-c r-10 position-absolute bg-white pointer"
          onClick={() => {
            setSidebarOpen(!sidebarOpen);
          }}
        >
          <BsFillFilterSquareFill />
        </div>
      </div>

      <div className="scrool-sidebar-mobile r-10">
        <div className="border bg-white custom">
          <form onSubmit={OnSubmit}>
            <div className="head d-flex justify-content-between border-bottom align-items-center">
              <h4 className="fs-20-500">{trans("filter.jobs_filter")}</h4>
              <button
                type="submit"
                className="resetBtn fs-16-500 bg-main text-white py-1 px-3 r-10"
              >
                {trans("filter.confirm")}
              </button>
            </div>

            {/* Job */}
            {props.JobClassification && (
              <div
                className={`job-classification one border-bottom ${
                  open && "openMenue"
                }`}
              >
                <div
                  className="tittle d-flex justify-content-between pointer"
                  onClick={() => {
                    setOpen(!open);
                  }}
                >
                  <h5 className="fs-16-500">
                    {trans("filter.Job_classification")}
                  </h5>
                  <span className={`icon flex-c ${open && "icon-rotate"}`}>
                    <IoIosArrowDown />
                  </span>
                </div>
                {/* CheckBox */}
                <div className="checkboxes d-flex flex-column gap-2 p-0">
                  {getJobs.map((item, index) => (
                    <div
                      className="d-flex align-items-center gap-2"
                      key={index}
                    >
                      <input
                        value={item.value}
                        type="checkbox"
                        onChange={handleCheck}
                      />
                      <span className={`not-checked-item fs-16-400`}>
                        {item.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Country */}
            <div
              className={`country-classification one border-bottom ${
                open1 && "openMenue"
              }`}
            >
              <div
                className="tittle d-flex justify-content-between pointer "
                onClick={() => {
                  setOpen1(!open1);
                }}
              >
                <h5 className="fs-16-500">{trans("filter.Country")}</h5>
                <span className={`icon flex-c ${open1 && "icon-rotate"}`}>
                  <IoIosArrowDown />
                </span>
              </div>
              {/* Input Search */}
              <input
                className="input-data border r-10 p-2 mb-3"
                type="text"
                placeholder={trans("filter.Country_search")}
                onChange={(e) => {
                  FilterNamesCountry(e);
                }}
              />
              {/* CheckBox */}
              <ScrollarComponent padding="0" height="200px">
                <div className="checkboxes d-flex flex-column gap-2 p-0">
                  {countryFilter.map((item, index) => (
                    <div
                      className="d-flex align-items-center gap-2"
                      key={index}
                    >
                      <input
                        value={item.value}
                        type="checkbox"
                        onChange={handleCheckCountry}
                      />
                      <span className={`not-checked-item fs-16-400`}>
                        {item.label}
                      </span>
                    </div>
                  ))}
                </div>
              </ScrollarComponent>
            </div>
            {/* Goverment */}
            <div
              className={`country-classification one border-bottom  ${
                open2 && "openMenue"
              }`}
            >
              <div
                className="tittle d-flex justify-content-between pointer"
                onClick={() => {
                  setOpen2(!open2);
                }}
              >
                <h5 className="fs-16-500">{trans("filter.Governorate")}</h5>
                <span className={`icon flex-c ${open2 && "icon-rotate"}`}>
                  <IoIosArrowDown />
                </span>
              </div>
              {/* Input Search */}
              <input
                className="input-data border r-10 p-2 mb-3"
                type="text"
                placeholder={trans("filter.Governorate_search")}
                onChange={(e) => {
                  FilterNamesCity(e);
                }}
              />
              {/* CheckBox */}
              <ScrollarComponent padding="0" height="300px">
                <div className="checkboxes d-flex flex-column gap-2 p-0">
                  {getGoverment.map((item, index) => (
                    <div
                      className="d-flex align-items-center gap-2"
                      key={index}
                    >
                      <input
                        value={item.value}
                        type="checkbox"
                        onChange={handleCheckGoverment}
                      />
                      <span className={`not-checked-item fs-16-400`}>
                        {item.label}
                      </span>
                    </div>
                  ))}
                </div>
              </ScrollarComponent>
            </div>
            {/* Job Type */}
            <div
              className={`country-classification one border-bottom  ${
                open3 && "openMenue"
              }`}
            >
              <div
                className="tittle d-flex justify-content-between pointer"
                onClick={() => {
                  setOpen3(!open3);
                }}
              >
                <h5 className="fs-16-500">{trans("filter.Type_of_the_job")}</h5>
                <span className={`icon flex-c ${open3 && "icon-rotate"}`}>
                  <IoIosArrowDown />
                </span>
              </div>
              {/* CheckBox */}
              <div className="checkboxes d-flex flex-column gap-2 p-0">
                <div className="d-flex align-items-center gap-2">
                  <input
                    type="checkbox"
                    onChange={() => {
                      setFulltime(!full_time);
                    }}
                  />
                  <span className={`not-checked-item fs-16-400`}>
                    {trans("filter.all")}
                  </span>
                </div>
                <div className="d-flex align-items-center gap-2">
                  <input
                    type="checkbox"
                    onChange={() => {
                      setPartTime(!part_time);
                    }}
                  />
                  <span className={`not-checked-item fs-16-400`}>
                    {trans("filter.part")}
                  </span>
                </div>
                <div className="d-flex align-items-center gap-2">
                  <input
                    type="checkbox"
                    onChange={() => {
                      setRemotely(!remotely);
                    }}
                  />
                  <span className={`not-checked-item fs-16-400`}>
                    {trans("filter.home")}
                  </span>
                </div>
              </div>
            </div>
            {/* Job Level */}
            <div
              className={`country-classification one border-bottom  ${
                open4 && "openMenue"
              }`}
            >
              <div
                className="tittle d-flex justify-content-between pointer"
                onClick={() => {
                  setOpen4(!open4);
                }}
              >
                <h5 className="fs-16-500">{trans("filter.Career_Level")}</h5>
                <span className={`icon flex-c ${open4 && "icon-rotate"}`}>
                  <IoIosArrowDown />
                </span>
              </div>
              {/* CheckBox */}
              <div className="checkboxes d-flex flex-column gap-2 p-0">
                <div className="d-flex align-items-center gap-2">
                  <input
                    type="checkbox"
                    onChange={() => {
                      setFreshGraduate(!fresh_graduate);
                    }}
                  />
                  <span className={`not-checked-item fs-16-400`}>
                    {trans("filter.Fresh_graduate")}
                  </span>
                </div>
                <div className="d-flex align-items-center gap-2">
                  <input
                    type="checkbox"
                    onChange={() => {
                      setAverageLevel(!average_level);
                    }}
                  />
                  <span className={`not-checked-item fs-16-400`}>
                    {trans("filter.middle")}
                  </span>
                </div>
                <div className="d-flex align-items-center gap-2">
                  <input
                    type="checkbox"
                    onChange={() => {
                      setAdvancedLevel(!advanced_level);
                    }}
                  />
                  <span className={`not-checked-item fs-16-400`}>
                    {trans("filter.expert")}
                  </span>
                </div>
                <div className="d-flex align-items-center gap-2">
                  <input
                    type="checkbox"
                    onChange={() => {
                      setHighExperience(!high_experience);
                    }}
                  />
                  <span className={`not-checked-item fs-16-400`}>
                    {trans("filter.High_experience")}
                  </span>
                </div>
                <div className="d-flex align-items-center gap-2">
                  <input
                    type="checkbox"
                    onChange={() => {
                      setBoss(!boss);
                    }}
                  />
                  <span className={`not-checked-item fs-16-400`}>
                    {trans("filter.boss")}
                  </span>
                </div>
              </div>
            </div>
            {/* Year Experiens */}
            <div className="d-flex flex-column gap-3 py-4 border-bottom">
              <h5 className="fs-16-500">
                {trans("filter.Years_of_Experienc")}
              </h5>
              <div className="d-flex gap-2">
                <select
                  name="least"
                  id="least"
                  className="input-data border r-10 py-1 px-2"
                  onChange={(e) => {
                    setMin_years_experience(e.target.value);
                  }}
                >
                  <option value="">{trans("filter.the_least")}</option>
                  {NumberList.map((item, idx) => (
                    <option value={item} key={idx}>
                      {item}
                    </option>
                  ))}
                </select>
                <select
                  name="above"
                  id="above"
                  className="input-data border r-10 py-1 px-2"
                  onChange={(e) => {
                    setMax_years_experience(e.target.value);
                  }}
                >
                  <option value="">{trans("filter.the_above")}</option>
                  {NumberList.map((item, idx) => (
                    <option value={item} key={idx}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            {/* Dta Job Posted */}
            <div
              className={`country-classification one ${open5 && "openMenue"}`}
            >
              <div
                className="tittle d-flex justify-content-between pointer"
                onClick={() => {
                  setOpen5(!open5);
                }}
              >
                <h5 className="fs-16-500">
                  {trans("filter.Job_posting_date")}
                </h5>
                <span className={`icon flex-c ${open5 && "icon-rotate"}`}>
                  <IoIosArrowDown />
                </span>
              </div>
              {/* CheckBox */}
              <div className="checkboxes d-flex flex-column gap-2 p-0">
                <div className="d-flex align-items-center gap-2">
                  <input
                    value="last_24_hours"
                    name="date"
                    type="radio"
                    onChange={(e) => {
                      setDateJobs(e.target.value);
                    }}
                  />
                  <span className={`not-checked-item fs-16-400`}>
                    {trans("filter.last_24_hour")}
                  </span>
                </div>
                <div className="d-flex align-items-center gap-2">
                  <input
                    value="last_week"
                    name="date"
                    type="radio"
                    onChange={(e) => {
                      setDateJobs(e.target.value);
                    }}
                  />
                  <span className={`not-checked-item fs-16-400`}>
                    {trans("filter.last_week")}
                  </span>
                </div>
                <div className="d-flex align-items-center gap-2">
                  <input
                    value="last_month"
                    name="date"
                    type="radio"
                    onChange={(e) => {
                      setDateJobs(e.target.value);
                    }}
                  />
                  <span className={`not-checked-item fs-16-400`}>
                    {trans("filter.last_month")}
                  </span>
                </div>
              </div>
            </div>
          </form>
        </div>
        {/* Ads */}
        {ads?.length > 0 && (
          <div className="ads-component mt-4 d-flex flex-column gap-3">
            {ads?.map((item) => (
              <Link
                to={item.link}
                style={{ backgroundImage: `url(${item.image})` }}
                key={item.id}
              ></Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default FilterComponnents;

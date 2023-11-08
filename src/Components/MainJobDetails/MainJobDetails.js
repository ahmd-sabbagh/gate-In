import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { basedUrl } from "../../Api/Apis";
import "./MainJobDetails.css";
import moment from "moment";
import "moment/locale/ar";
import TagsScroll from "../TagsScroll/TagsScroll";
import { ErrorComponent, SuccsesComponent } from "../../Others/Error";
import Loader from "../Loader/Loader";
import { trans } from "../Navbar/Navbar";

function MainJobDetails({
  ButoonBottom = true,
  type = "company",
  prop = null,
  linkRoute,
  routeEdit = null,
  aboutCompany = null,
}) {
  const token = localStorage.getItem("token");
  const navigat = useNavigate();
  const prams = useParams();
  const [getData, setGetData] = useState();
  useEffect(() => {
    axios
      .get(`${basedUrl}${linkRoute}${prams.Id}`, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then(({ data }) => {
        setGetData(data.data?.job_details || data.data?.course);
        if (prop !== null) {
          if (type === "company") {
            prop(
              data.data?.last_users_jobs_applicants ||
                data.data?.user ||
                data.data.similar_jobs
            );
          } else if (type === "center") {
            prop(data.data.last_users_course_applicants);
          }
        }
        if (aboutCompany !== null) {
          aboutCompany(data.data.about_company);
        }
      })
      .catch((error) => {
        ErrorComponent(error, navigat);
      });
  }, [prams.Id]);

  var timeago;
  if (localStorage.getItem("i18nextLng") === "ar") {
    timeago = moment(getData?.created_at).locale("ar").fromNow();
  } else {
    timeago = moment(getData?.created_at).locale("en").fromNow();
  }
  // Applay Job
  function applayJob() {
    const formData = {};
    axios
      .post(`${basedUrl}/job-seeker/jobs/apply/${prams.Id}`, formData, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((data) => {
        SuccsesComponent(data.data.message);
      })
      .catch((error) => {
        ErrorComponent(error, navigat);
      });
  }
  return (
    <>
      {getData ? (
        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          {/* Adds */}
          <div className="MainJobDetails adds p-4 r-10 bg-white">
            <div className="top d-flex justify-content-between flex-column flex-md-row gap-3">
              <div className="text d-flex flex-column gap-3">
                <h4 className=" fs-24-500">{getData.title}</h4>
                <div className="desc text-color d-flex align-items-center gap-2">
                  <span className="name-company fs-16-400">
                    {getData.company_name || getData.name}
                  </span>
                  <span className="circle"></span>
                  <span className="time">{timeago}</span>
                </div>
              </div>
              {/* Image Company */}
              {routeEdit !== null && (
                <>
                  {ButoonBottom ? (
                    <div className="logo-image overflow-hidden flex-c">
                      <img src={getData.company_logo} alt="" />
                    </div>
                  ) : (
                    <Link
                      to={`${routeEdit}${prams.Id}`}
                      className="fit-height r-10 border border-main text-main p-3 d-block text-center"
                      style={{ minWidth: "130px" }}
                    >
                      {trans("company_job_details.edit_data")}
                    </Link>
                  )}
                </>
              )}
            </div>
            {/* Details */}
            <div className="details mt-3 job d-flex flex-wrap align-items-center gap-2">
              {getData.full_time && (
                <div className="tag-detail">{trans("filter.all")}</div>
              )}
              {getData.part_time && (
                <div className="tag-detail">{trans("filter.part")}</div>
              )}
              {getData.remotely && (
                <div className="tag-detail"> {trans("filter.home")}</div>
              )}
              <div className="tag-detail">{`${getData.country.label} / ${getData.province.label} / ${getData.city.label}`}</div>
              {getData.advanced_level && (
                <div className="tag-detail">Advanced Level</div>
              )}
              {getData.average_level && (
                <div className="tag-detail">Average Level</div>
              )}
              {getData.fresh_graduate && (
                <div className="tag-detail">Fresh Graduate</div>
              )}
              {getData.high_experience && (
                <div className="tag-detail">High Experience</div>
              )}
              {getData.boss && <div className="tag-detail">Boss</div>}
            </div>
            {/* Buttons Bottom */}
            {ButoonBottom && (
              <div className="bottom d-flex align-items-center gap-4 pt-4 mt-4 border-top">
                {/* <div className="like r-10 flex-c pointer">
                  <FaRegHeart />
                </div> */}
                <button
                  onClick={() => {
                    applayJob();
                  }}
                  className="resetBtn r-10 flex-c bg-main px-5 py-3 text-white"
                >
                  {trans("jobs.btn1")}
                </button>
              </div>
            )}
          </div>
          {/* Description */}
          <div className="details-desc bg-white mt-4 r-10">
            {/* Top */}
            <div className="top p-4 border-bottom d-flex flex-column gap-4">
              {/* Text */}
              <h4 className=" fs-20-500">
                {type === "company"
                  ? trans("company_job_details.job_details")
                  : trans("company_job_details.course_details")}
              </h4>
              <p
                className=" fs-16-400 text-color"
                dangerouslySetInnerHTML={{
                  __html: getData.description.replace(
                    /(?:\r\n|\r|\n)/g,
                    "<br />"
                  ),
                }}
              ></p>
              {/* Points */}
              <div className="points p-4 r-10 border">
                <div className="d-flex align-items-center gap-3">
                  <span className=" fs-16-400 text-color">
                    {trans("filter.Years_of_Experienc")}
                  </span>
                  <span className=" fs-16-500 ">
                    {linkRoute === "/job-seeker/requests-jobs/"
                      ? `${getData.min_years_experience}`
                      : `${trans("my_personal_data_user.from")} ${
                          getData.min_years_experience
                        } ${trans("my_personal_data_user.to")} ${
                          getData.max_years_experience
                        }`}
                  </span>
                </div>
                <div className="d-flex align-items-center gap-3">
                  <span className=" fs-16-400 text-color">
                    {trans("company_job_details.job_level")}
                  </span>
                  <span className=" fs-16-500 ">
                    <>
                      {getData.advanced_level && trans("filter.expert")}
                      {getData.average_level && `/${trans("filter.middle")}`}
                      {getData.fresh_graduate &&
                        `/${trans("filter.Fresh_graduate")}`}
                      {getData.high_experience &&
                        `/${trans("filter.High_experience")}`}
                      {getData.boss && `/${trans("filter.boss")}`}
                    </>
                  </span>
                </div>
                {type === "center" ? (
                  <div className="d-flex align-items-center gap-3">
                    <span className=" fs-16-400 text-color">
                      {trans("company_job_details.corse_price")}
                    </span>
                    <span className=" fs-16-500 ">{`${getData.price} ${getData.currency.value}`}</span>
                  </div>
                ) : (
                  <div className="d-flex align-items-center gap-3">
                    <span className=" fs-16-400 text-color">
                      {trans("company_job_details.salary")}
                    </span>
                    <span className=" fs-16-500 ">
                      {getData.not_write_salary === 0
                        ? `${trans("my_personal_data_user.from")} ${
                            getData.from_salary
                          } ${trans("my_personal_data_user.to")} ${
                            getData.to_salary
                          } (${getData.currency.value})`
                        : trans("company_job_details.confirm_with_company")}
                    </span>
                  </div>
                )}
              </div>
              {/* Tecnical Skills */}
              <div className="skills">
                <h4 className=" fs-20-500 mb-4">
                  {trans("company_job_details.tecnicl")}
                </h4>
                <TagsScroll arr={getData.technical_skills} />
              </div>
            </div>
            {/* Bottom */}
            <div className="bottom p-4">
              {/* Personal Skills */}
              <div className="personal-skills">
                <h4 className=" fs-20-500 mb-4">
                  {trans("company_job_details.personal_skills")}
                </h4>
                <TagsScroll arr={getData.personal_skills} />
              </div>
              {/* Job requirements */}
              <div className="job-requirements mt-4">
                <h4 className=" fs-20-500">
                  {type === "company"
                    ? trans("company_job_details.job_requird")
                    : trans("company_job_details.course_requird")}
                </h4>
                <div className="py-3">
                  <span
                    className="text fs-16-400 text-color"
                    dangerouslySetInnerHTML={{
                      __html: getData.requirements.replace(
                        /(?:\r\n|\r|\n)/g,
                        "<br />"
                      ),
                    }}
                  ></span>
                </div>
              </div>
            </div>
          </div>
        </form>
      ) : (
        <Loader />
      )}
    </>
  );
}

export default MainJobDetails;

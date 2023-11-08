import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { basedUrl } from "../../../../Api/Apis";
import moment from "moment";
import "moment/locale/ar";
import TagsScroll from "../../../../Components/TagsScroll/TagsScroll";
import { ErrorComponent, SuccsesComponent } from "../../../../Others/Error";
import Loader from "../../../../Components/Loader/Loader";

function MainCourseDetails({ ButoonBottom = true }) {
  const navigat = useNavigate();
  const prams = useParams();
  const [getData, setGetData] = useState();
  const token = localStorage.getItem("token");
  useEffect(() => {
    axios
      .get(`${basedUrl}/courses/${prams.Id}`, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then(({ data }) => {
        setGetData(data.data.course_details);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  var timeago;
  if (localStorage.getItem("i18nextLng") === "ar") {
    timeago = moment(getData?.created_at).locale("ar").fromNow();
  } else {
    timeago = moment(getData?.created_at).fromNow();
  }
  // Applay Job
  function applayCourse() {
    const formData = {};
    axios
      .post(`${basedUrl}/job-seeker/courses/apply/${prams.Id}`, formData, {
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
            <div className="top d-flex justify-content-between gap-3">
              <div className="text d-flex flex-column gap-3">
                <h4 className=" fs-24-500">{getData.title}</h4>
                <div className="desc text-color d-flex align-items-center gap-2">
                  <span className="name-company fs-16-400">
                    {getData.company_name}
                  </span>
                  <span className="circle"></span>
                  <span className="time">{timeago}</span>
                </div>
                {/* Details */}
                <div className="details job d-flex align-items-center gap-3 ">
                  {getData.full_time && (
                    <div className="tag-detail">دوام كامل</div>
                  )}
                  {getData.part_time && (
                    <div className="tag-detail">دوام جزئي</div>
                  )}
                  {getData.remotely && (
                    <div className="tag-detail">من المنزل</div>
                  )}
                  <div className="tag-detail">{`${getData.country} ${getData.city} ${getData.province}`}</div>
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
              </div>
              {/* Image Company */}
              {ButoonBottom ? (
                <div className="logo-image overflow-hidden flex-c">
                  <img src={getData.company_logo} alt="" />
                </div>
              ) : (
                <Link
                  className="fit-height r-10 border border-main text-main p-3 d-block text-center"
                  style={{ minWidth: "130px" }}
                >
                  تعديل البيانات
                </Link>
              )}
            </div>
            {/* Buttons Bottom */}
            {ButoonBottom && (
              <div className="bottom d-flex align-items-center justify-content-center justify-content-md-start gap-4 pt-4 mt-4 border-top">
                {/* <div className="like r-10 flex-c pointer">
                    <FaRegHeart />
                  </div> */}
                <button
                  onClick={() => {
                    applayCourse();
                  }}
                  className="resetBtn r-10 flex-c bg-main px-5 py-3 text-white"
                >
                  التقدم للدورة الآن
                </button>
              </div>
            )}
          </div>
          {/* Description */}
          <div className="details-desc bg-white mt-4 r-10">
            {/* Top */}
            <div className="top p-4 border-bottom d-flex flex-column gap-4">
              {/* Text */}
              <h4 className=" fs-20-500">تفاصيل الدورة</h4>
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
                <div className="d-flex align-items-center gap-5">
                  <span className=" fs-16-400 text-color">
                    الخبرة المطلوبة :
                  </span>
                  <span className=" fs-16-500 ">{`من ${getData.min_years_experience} الى ${getData.max_years_experience}`}</span>
                </div>
                <div className="d-flex align-items-center gap-5">
                  <span className=" fs-16-400 text-color">
                    المستوي الوظيفي :
                  </span>
                  <span className=" fs-16-500 ">
                    {getData.advanced_level
                      ? "خبير"
                      : getData.average_level
                      ? "متوسط"
                      : getData.fresh_graduate
                      ? "حديث التخرج"
                      : getData.high_experience
                      ? "عالي"
                      : "مدير"}
                  </span>
                </div>
                <div className="d-flex align-items-center gap-5">
                  <span className=" fs-16-400 text-color">سعر الدورة :</span>
                  <span className=" fs-16-500 ">{`${getData.price} ${getData.currency.value}`}</span>
                </div>
              </div>
              {/* Tecnical Skills */}
              <div className="skills">
                <h4 className=" fs-20-500 mb-4">المهارات التقنية</h4>
                <TagsScroll arr={getData.technical_skills} />
              </div>
            </div>
            {/* Bottom */}
            <div className="bottom p-4">
              {/* Personal Skills */}
              <div className="personal-skills">
                <h4 className=" fs-20-500 mb-4">المهارات الشخصية</h4>
                <TagsScroll arr={getData.personal_skills} />
              </div>
              {/* Job requirements */}
              <div className="job-requirements mt-4">
                <h4 className=" fs-20-500">محاور الدورة</h4>
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

export default MainCourseDetails;

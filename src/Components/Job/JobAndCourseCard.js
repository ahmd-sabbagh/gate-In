import "./JobAndCourseCard.css";
import { FiHeart } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { RiDeleteBin6Line, RiFileEditFill } from "react-icons/ri";
import TagsScroll from "../TagsScroll/TagsScroll";
import moment from "moment";
import "moment/locale/ar";
import axios from "axios";
import { basedUrl } from "../../Api/Apis";
import { ErrorComponent, SuccsesComponent } from "../../Others/Error";
import DeleteItem from "../DeleteItem/DeleteItem";
import { useState } from "react";
import { trans } from "../Navbar/Navbar";
function JobAndCourseCard({
  item = {},
  Btn,
  Share,
  application = false,
  controler,
  detailsUrl,
  applyLink,
  likeLink,
  deleteLink,
  editLink,
  getData,
  // searchEmploy دا تبع الباحثين عن عمل في الشركات
  searchEmploy,
}) {
  // Delete Item Alert
  const [view, setViews] = useState(false);
  const [itemId, setItemId] = useState();
  // Delete Item Alert
  const token = localStorage.getItem("token");
  const navigat = useNavigate();
  var timeago;
  if (localStorage.getItem("i18nextLng") === "ar") {
    timeago = moment(item.created_at).locale("ar").fromNow();
  } else {
    timeago = moment(item.created_at).locale("en").fromNow();
  }
  // Applay Job
  function applayJob(id) {
    const formData = {};
    axios
      .post(`${basedUrl}${applyLink}${id}`, formData, {
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
  // Function Like
  const LikeCard = (id) => {
    axios
      .post(
        `${basedUrl}${likeLink}${id}`,
        {},
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((data) => {
        SuccsesComponent(data.data.message);
        if (getData !== undefined) {
          getData();
        }
      })
      .catch((error) => {
        ErrorComponent(error, navigat);
      });
  };
  // Function Like
  // Function Delete Item

  // function deleteItem(id) {
  //   axios
  //     .post(
  //       `${basedUrl}${deleteLink}${id}`,
  //       {},
  //       {
  //         headers: {
  //           Accept: "application/json",
  //           Authorization: `Bearer ${token}`,
  //         },
  //       }
  //     )
  //     .then((data) => {
  //       SuccsesComponent(data.data.message);
  //       if (getData !== undefined) {
  //         getData();
  //       }
  //     })
  //     .catch((error) => {
  //       ErrorComponent(error, navigat);
  //     });
  // }
  
  // Function Delete Item
  return (
    <>
      {view && (
        <DeleteItem
          setView={setViews}
          deleteLink={deleteLink}
          getData={getData}
          itemId={itemId}
        />
      )}
      <div className="JobAndCourseCard position-relative overflow-hidden r-10 border">
        <div className="position-relative d-flex gap-4 p-4 flex-column flex-lg-row align-items-center align-items-lg-start">
          {/* Image */}
          {!application && (
            <div className="image flex-c">
              <img src={item?.company_logo || item?.user_image} alt="" />
            </div>
          )}
          {/* Description */}
          <div className="description full-width">
            {/* TEXT */}
            <div className="text d-flex flex-column gap-2">
              <div className="d-flex align-items-start gap-3 justify-content-between">
                <h4 className="fs-24-500">{item.title}</h4>
                {/* ICONS */}
                {Share && (
                  <div className="icons">
                    <span
                      className={`like flex-c pointer ${
                        item.is_favorite && "islike"
                      }`}
                      onClick={() => {
                        LikeCard(item.id);
                      }}
                    >
                      <FiHeart />
                    </span>
                  </div>
                )}
                {/* controler */}
                {controler && (
                  <div className="d-flex align-items-center gap-3">
                    <button
                      className="bg-transparent border-none"
                      style={{ color: "#E31E25", fontSize: "20px" }}
                      onClick={() => {
                        setViews(true);
                        setItemId(item.id);
                        // if (status === true) {
                        //   deleteItem(item.id);
                        // }
                      }}
                    >
                      <RiDeleteBin6Line />
                    </button>
                    <Link
                      to={editLink}
                      style={{ color: "#018543", fontSize: "20px" }}
                    >
                      <RiFileEditFill />
                    </Link>
                  </div>
                )}
                {/* Search Employ Details In Company */}
                {searchEmploy !== undefined && (
                  <Link
                    to={`${searchEmploy}${item.id}`}
                    style={{ color: "#018543", fontSize: "20px" }}
                  >
                    <RiFileEditFill />
                  </Link>
                )}
              </div>
              <div className="type-work d-flex align-items-center gap-2">
                {!application && (
                  <>
                    <span className="fs-16-400 text-color">
                      {item.company_name || item.name}
                    </span>
                    <span className="circle"></span>
                  </>
                )}
                {/* job type */}
                {item?.full_time && (
                  <>
                    <span className="fs-16-400 red">{trans("filter.all")}</span>
                    <span className="circle"></span>
                  </>
                )}
                {/* عملي */}
                {item?.practical && (
                  <>
                    <span className="fs-16-400 red">{trans("filter.practical")}</span>
                    <span className="circle"></span>
                  </>
                )}
                {/* job type */}
                {item?.part_time && (
                  <>
                    <span className="fs-16-400 red">{trans("filter.part")}</span>
                    <span className="circle"></span>
                  </>
                )}
                {/* job type */}
                {item?.remotely && (
                  <>
                    <span className="fs-16-400 red">{trans("filter.home")}</span>
                    <span className="circle"></span>
                  </>
                )}
                {/* نظري */}
                {item?.theoretical && (
                  <>
                    <span className="fs-16-400 red">{trans("filter.theoretical")}</span>
                    <span className="circle"></span>
                  </>
                )}
                <span className="fs-16-400 red">{timeago}</span>
              </div>
              <p className="fs-16-600 text-color">
                {item.description?.slice(0, 150)} ...
              </p>
            </div>
            {/* TAGS */}
            {item?.technical_skills && (
              <TagsScroll arr={item?.technical_skills} />
            )}
            {/* course tag */}
            {item.hasOwnProperty("users_applicants_count") && (
              <div className="student-count fit-content px-4 py-2 mt-3">
                {item?.users_applicants_count} {trans("courses.student_count")}
              </div>
            )}

            {/* Btns */}
            {typeof Btn !== "undefined" && (
              <div className="buttons flex-column flex-sm-row flex-lg-column flex-xl-row d-flex align-items-center gap-4 mt-3">
                <button
                  onClick={() => {
                    applayJob(item.id);
                  }}
                  className="resetBtn r-10"
                >
                  {Btn.btn1}
                </button>
                <Link
                  to={`${detailsUrl}${item.id}`}
                  className="resetBtn flex-c r-10"
                >
                  {Btn.btn2}
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default JobAndCourseCard;

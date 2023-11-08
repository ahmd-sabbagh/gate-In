import React from "react";
import "./ConsultantsRecommendations.css";
import { trans } from "../../../../Components/Navbar/Navbar";
import axios from "axios";
import { basedUrl } from "../../../../Api/Apis";
import { Link, useNavigate } from "react-router-dom";
import { ErrorComponent } from "../../../../Others/Error";
import { useEffect } from "react";
import { useState } from "react";
import Loader from "../../../../Components/Loader/Loader";
import NotExist from "./NotExist";

function ConsultantsRecommendations() {
  const token = localStorage.getItem("token");
  const navigat = useNavigate();
  // State
  const [data, setData] = useState();
  const [courses, setCourses] = useState([]);
  const [exist, setExist] = useState(false);
  const [existCourse, setExistCourse] = useState(false);
  const [loader, setLoader] = useState(false);
  // State
  const getRecommendations = () => {
    axios
      .get(`${basedUrl}/job-seeker/nominations`, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then(({ data }) => {
        setData(data.data);
        if (data.data.length !== 0) {
          setExist(true);
          if (data.data[0].courses.length !== 0) {
            setExistCourse(true);
            setCourses(data.data[0].courses);
          } else {
            setExistCourse(false);
          }
        } else {
          setExist(false);
        }
        setLoader(true);
      })
      .catch((error) => {
        ErrorComponent(error, navigat);
      });
  };
  useEffect(() => {
    getRecommendations();
  }, []);
//   console.log(data);
  return (
    <div
      className="ConsultantsRecommendations bg-white p-3 r-10"
      style={{ minHeight: "100%" }}
    >
      <h3 className="fs-24-700 text-center mt-3">
        {trans("recommendations.title")}
      </h3>
      {loader ? (
        <>
          {exist ? (
            <>
              <p className="mt-4 text-center">{data[0]?.description}</p>
              {existCourse ? (
                <div className=" d-flex align-items-center gap-3 flex-wrap p-2 p-md-3 r-10 border mt-4">
                  {courses.map((item) => (
                    <Link
                      to={`/job_seeker/course-detail/${item.id}`}
                      key={item.id}
                      className="course flex-grow-1 text-center"
                    >
                      {item.title}
                    </Link>
                  ))}
                </div>
              ) : (
                <NotExist />
              )}
            </>
          ) : (
            <NotExist />
          )}
        </>
      ) : (
        <Loader />
      )}
    </div>
  );
}

export default ConsultantsRecommendations;

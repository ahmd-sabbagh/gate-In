import React, { useEffect, useState } from "react";
import CourseFilterComponents from "../../Components/CourseFilterComponents/CourseFilterComponents";
import JobAndCourseCard from "../../Components/Job/JobAndCourseCard";
import axios from "axios";

import { useNavigate } from "react-router-dom";
import { basedUrl } from "../../Api/Apis";
import { ErrorComponent } from "../../Others/Error";
import Loader from "../../Components/Loader/Loader";
import { trans } from "../../Components/Navbar/Navbar";

function Courses() {
  const token = localStorage.getItem("token");
  const navigat = useNavigate();
  // Data State
  const [FilterData, setFilterData] = useState([]);
  // Data State
  const formData = {};
  const getData = () => {
    axios
      .post(`${basedUrl}/courses`, formData, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then(({ data }) => {
        setFilterData(data.data);
      })
      .catch((error) => {
        ErrorComponent(error, navigat);
      });
  };
  useEffect(() => {
    getData();
  }, []);
  // CourseFilterComponents
  return (
    <>
      <div className="CoursesPage py-5">
        <div className="container">
          <div className="row">
            {/* side Bar */}
            <div className="col-lg-4">
              <CourseFilterComponents
                setData={setFilterData}
                api="/courses"
                JobClassification={true} 
              />
            </div>
            {/* BODY */}
            <div className="col-12 col-lg-8">
              <div className="body ">
                {FilterData?.data?.length > 0 ? (
                  <>
                    <h3 className="fs-32-600 mb-4">{trans("courses.title")}</h3>
                    <div className="d-flex flex-column gap-4">
                      {FilterData?.data?.map((item) => (
                        <JobAndCourseCard
                          key={item.id}
                          Btn={{
                            btn1: trans("courses.btn1"),
                            btn2: trans("courses.btn2"),
                          }}
                          Share={true}
                          item={item}
                          detailsUrl="/courses/"
                          applyLink="/job-seeker/courses/apply/"
                          likeLink="/job-seeker/courses/favorite/"
                          getData={getData}
                        />
                      ))}
                    </div>
                  </>
                ) : (
                  <Loader />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Courses;

import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { basedUrl } from "../../../../Api/Apis";
import JobAndCourseCard from "../../../../Components/Job/JobAndCourseCard";
import NotFound from "../../../../Components/NotFound/NotFound";
import { trans } from "../../../../Components/Navbar/Navbar";

function FavoriteCourses() {
  const token = localStorage.getItem("token");
  const [data, setData] = useState([]);
  // getData
  const getData = () => {
    axios
      .get(`${basedUrl}/job-seeker/courses/get-favorites`, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((data) => {
        setData(data.data.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    getData();
  }, []);
  return ( 
    <div
      className={`bg-white p-4 r-10 ${data.length < 1 && "flex-c"}`}
      style={{ minHeight: "100%" }}
    >
      {data.length ? (
        <>
          <h3 className="fs-32-600 mb-4">{trans("user_profile.favorite_courses")}</h3>
          <div className="job-cards d-flex flex-column gap-4">
            {data.map((item) => (
              <JobAndCourseCard
                key={item.id}
                item={item}
                Btn={{
                  btn1: trans("courses.btn1"),
                  btn2: trans("courses.btn2"),
                }}
                Share={true}
                detailsUrl="/job_seeker/course-detail/"
                applyLink="/job-seeker/courses/apply/"
                likeLink="/job-seeker/courses/favorite/"
                getData={getData}
              />
            ))}
          </div>
        </>
      ) : (
        <NotFound text={trans("user_profile.no_favorite_courses")} />
      )}
    </div>
  );
}

export default FavoriteCourses;

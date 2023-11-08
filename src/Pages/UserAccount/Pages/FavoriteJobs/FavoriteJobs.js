import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { apiHeadersToken, basedUrl } from "../../../../Api/Apis";
import JobAndCourseCard from "../../../../Components/Job/JobAndCourseCard";
import NotFound from "../../../../Components/NotFound/NotFound";
import { ErrorComponent } from "../../../../Others/Error";
import { useNavigate } from "react-router-dom";
import { trans } from "../../../../Components/Navbar/Navbar";

function FavoriteJobs() {
  const token = localStorage.getItem("token");
  const navigat = useNavigate();
  const [data, setData] = useState([]);
  // Get Data
  const getData = () => {
    axios
      .get(`${basedUrl}/job-seeker/jobs/get-favorites`, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((data) => {
        setData(data.data.data.data);
      })
      .catch((error) => {
        ErrorComponent(error, navigat);
      });
  };
  // Get Data
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
          <div className={`job-cards d-flex flex-column gap-4`}>
            <h3 className="fs-32-600 mb-4">{trans("user_profile.favorite_courses")}</h3>
            {data.map((item) => (
              <JobAndCourseCard
                key={item.id}
                item={item}
                Btn={{
                  btn1: trans("jobs.btn1"),
                  btn2: trans("jobs.btn2"),
                }}
                Share={true}
                detailsUrl="/job_seeker/job-detail/"
                applyLink="/job-seeker/jobs/apply/"
                likeLink="/job-seeker/jobs/favorite/"
                getData={getData}
              />
            ))}
          </div>
        </>
      ) : (
        <NotFound text={trans("user_profile.no_favorite_jobs")} />
      )}
    </div>
  );
}

export default FavoriteJobs;

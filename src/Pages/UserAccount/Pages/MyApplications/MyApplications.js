import React from "react";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import {  basedUrl } from "../../../../Api/Apis";
import { ErrorComponent } from "../../../../Others/Error";
import { useNavigate } from "react-router-dom";
import JobAndCourseCard from "../../../../Components/Job/JobAndCourseCard";
import NotFound from "../../../../Components/NotFound/NotFound";
import { trans } from "../../../../Components/Navbar/Navbar";
function MyApplications() {
  const token = localStorage.getItem("token");
  const navigat = useNavigate();
  // state
  const [data, setData] = useState([]);
  // state
  // Function Get Data
  function getData() {
    axios
      .get(`${basedUrl}/job-seeker/requests-jobs`, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then(({ data }) => {
        setData(data.data.data);
      })
      .catch((error) => {
        ErrorComponent(error, navigat);
      });
  }
  // Function Get Data
  useEffect(() => {
    getData();
  }, []);
  return (
    <>
      <div
        className={`MyApplications bg-white p-3 p-md-4 r-10 ${
          data.length < 1 && "flex-c"
        }`}
        style={{ minHeight: "100%" }}
      >
        {data.length > 0 ? (
          <>
            <h3 className="fs-32-600 mb-4">{trans("user_profile.my_order")}</h3>
            <div className="job-cards d-flex flex-column gap-4">
              {data?.map((item) => (
                <JobAndCourseCard
                  key={item.id}
                  item={item}
                  Share={false}
                  application={true}
                  controler={true}
                  deleteLink="/job-seeker/requests-jobs/delete/"
                  getData={getData}
                  editLink={`/job_seeker/my-requestes/details/${item.id}`}
                />
              ))}
            </div>
          </>
        ) : (
          <NotFound
            text={trans("user_profile.no_have_order")}
            btnText={trans("user_profile.get_jobs_now")}
            link="/job_seeker/job-application"
          />
        )}
      </div>
    </>
  );
}

export default MyApplications;

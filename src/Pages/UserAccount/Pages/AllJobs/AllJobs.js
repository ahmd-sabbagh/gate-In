import JobAndCourseCard from "../../../../Components/Job/JobAndCourseCard";
import "./AllGobs.css";
import FilterComponnents from "../../../../Components/FilterComponnents/FilterComponnents";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { basedUrl } from "../../../../Api/Apis";
import Welcom from "../Welcom/Welcom";
import { ErrorComponent } from "../../../../Others/Error";
import { useNavigate } from "react-router-dom";
import { trans } from "../../../../Components/Navbar/Navbar";

function AllJobs() {
  const token = localStorage.getItem("token");
  const navigat = useNavigate();
  const [message, setMessage] = useState();
  const formData = {};
  // Filter Data state
  // const [filterData, setFilterData] = useRecoilState(JobFilterData);
  const [filterData, setFilterData] = useState([]);
  // Filter Data state
  // Get Data
  const getData = () => {
    axios
      .post(`${basedUrl}/job-seeker/jobs`, formData, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then(({ data }) => {
        setFilterData(data.data.data);
      })
      .catch((error) => {
        setMessage(error.response.data.message);
        ErrorComponent(error, navigat);
      });
  };
  // Get Data
  useEffect(() => {
    getData();
  }, []);
  const Check = JSON.parse(localStorage.getItem("user")).check_course;
  return (
    <>
      {Check === null || Check === "reject" ? (
        <Welcom message={message} dont={true} />
      ) : Check === "waiting" || Check === "accept" ? (
        <Welcom message={message} dont={false} />
      ) : (
        <div className="AllJobs AllFilter row">
          <div className="col-12 col-lg-8">
            <div className="body bg-white p-3 p-md-4 r-10">
              <h3 className="fs-32-600 mb-4">{trans("jobs.title")}</h3>
              <div className="job-cards d-flex flex-column gap-4">
                {filterData?.map((item) => (
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
            </div>
          </div>
          <div className="col-lg-4">
            <FilterComponnents
              setData={setFilterData}
              api="/job-seeker/jobs/best"
            />
          </div>
        </div>
      )}
    </>
  );
}

export default AllJobs;

import "./JobFilter.css";
import JobAndCourseCard from "../../Components/Job/JobAndCourseCard";
import FilterComponnents from "../../Components/FilterComponnents/FilterComponnents";
import { useEffect, useState } from "react";
import axios from "axios";
import { BiSad } from "react-icons/bi";
import { basedUrl } from "../../Api/Apis";
import { ErrorComponent } from "../../Others/Error";
import { useNavigate } from "react-router-dom";
import ScrollToTop from "../../ScrollToTopRouter/ScrollToTopRouter";
import { trans } from "../../Components/Navbar/Navbar";
function JobFilter() {
  const token = localStorage.getItem("token");
  const navigat = useNavigate();
  const [filterData, setFilterData] = useState([]);
  const [status, setStatus] = useState(true);
  const [scroll, setScroll] = useState(false);

  const getData = () => { 
    axios
      .post(
        `${basedUrl}/job-seeker/jobs`,
        {},
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((data) => {
        setFilterData(data.data.data.data);
      })
      .catch((error) => {
        ErrorComponent(error, navigat);
      });
  };

  // Pagination Function
  var pagArr = [];
  const [num, setNum] = useState(2);
  const pagination = (num = 1) => {
    axios
      .post(
        `https://gatein.codeella.com/api/job-seeker/jobs?page=${num}`,
        {},
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((data) => {
        pagArr = data.data.data.data;
        const all = filterData.concat(pagArr);
        setFilterData(all);
        if (data.data.data.links.next === null) {
          setStatus(false);
        } else {
          setStatus(true);
        }
      })
      .catch((error) => {
        ErrorComponent(error, navigat);
      });
  };
  // Pagination Less
  const paginationLess = () => {
    axios
      .post(
        `https://gatein.codeella.com/api/job-seeker/jobs?page=1`,
        {},
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((data) => {
        setFilterData(data.data.data.data);
        setStatus(true);
      })
      .catch((error) => {
        ErrorComponent(error, navigat);
      });
  };
  // Pagination Less
  useEffect(() => {
    getData();
  }, []);
  return (
    <>
      {scroll && <ScrollToTop />}
      {/* {filterData.length > 0 ? ( */}
      <div className="JobFilter AllFilter py-5 ">
        <div className="container">
          <div className="row">
            {/* side Bar */}
            <div className="col-lg-4">
              <FilterComponnents
                JobClassification={true}
                api="/job-seeker/jobs/best"
                setData={setFilterData}
                setStatusP={setStatus}
                setNum={setNum}
              />
            </div>
            {/* BODY */}
            <div className="col-12 col-lg-8">
              <div className="body full-height">
                <h3 className="fs-32-600 mb-4">{trans("jobs.title")}</h3>
                {filterData.length > 0 ? (
                  <>
                    <div className="job-cards d-flex flex-column gap-4">
                      {filterData?.map((item) => (
                        <JobAndCourseCard
                          Btn={{
                            btn1: trans("jobs.btn1"),
                            btn2: trans("jobs.btn2"),
                          }}
                          Share={true}
                          controler={false}
                          key={item.id}
                          item={item}
                          detailsUrl="/job-details/"
                          applyLink="/job-seeker/jobs/apply/"
                          likeLink="/job-seeker/jobs/favorite/"
                          getData={getData}
                        />
                      ))}
                    </div>
                    {status ? (
                      <button
                        className="py-3 px-5 mx-auto bg-main border-0 text-white r-10 d-block mt-4"
                        onClick={(e) => {
                          setNum(num + 1);
                          pagination(num);
                          setScroll(false);
                        }}
                      >
                        {trans("jobs.get_more")}
                      </button>
                    ) : (
                      <button
                        className="py-3 px-5 mx-auto bg-main border-0 text-white r-10 d-block mt-4"
                        onClick={(e) => {
                          setNum(2);
                          paginationLess();
                          setScroll(true);
                        }}
                      >
                        {trans("jobs.less")}
                      </button>
                    )}
                  </>
                ) : (
                  <div className="flex-c full-height">
                    <div className="d-flex flex-column gap-2 align-items-center">
                      <div className="main-color" style={{ fontSize: "85px" }}>
                        <BiSad />
                      </div>
                      <span className="fs-24-700">{trans("jobs.no_jobs")}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* ) : (
        <Loader />
      )} */}
    </>
  );
}

export default JobFilter;

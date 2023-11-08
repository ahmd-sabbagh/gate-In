import "./JobDetails.css";
import { trans } from "../../Components/Navbar/Navbar";
import { SlLocationPin } from "react-icons/sl";
import MainJobDetails from "../../Components/MainJobDetails/MainJobDetails";
import ScrollarComponent from "../../Components/ScrollarComponent/ScrollarComponent";
import { Link } from "react-router-dom";
import { useState } from "react";
import Loader from "../../Components/Loader/Loader";

function JobDetails() {
  const [getSimlarJobs, setGetSimlarJOBS] = useState([]);
  const [aboutCompany, setAboutCompany] = useState([]);
  return (
    <>
      <div className="JobDetails job-and-course-page-detail py-4">
        <div className="container">
          <h3 className="fs-32-700 tittle mb-4">
            {trans("job-course.tittle-job")}
          </h3>
          <div className="row">
            {/* Content */}
            <div className="col-12 col-lg-8">
              <MainJobDetails
                linkRoute="/job-seeker/jobs/"
                prop={setGetSimlarJOBS}
                type="company"
                aboutCompany={setAboutCompany}
              />
            </div>
            {/* Sidebar */}
            <div className="col-12 col-lg-4">
              {/* about-company */}
              <div className="about-company p-4 bg-white r-10">
                <h4 className=" fs-24-500 mb-4">عن الشركة</h4>
                <div className="cont d-flex mb-2 gap-3">
                  <div className="image overflow-hidden flex-c">
                    <img src={aboutCompany?.logo} alt="" />
                  </div>
                  <div className="text d-flex flex-column gap-2">
                    <h4 className=" fs-20-500">{aboutCompany?.name}</h4>
                    <div className="adress d-flex align-items-center gap-2">
                      <span className="icon">
                        <SlLocationPin />
                      </span>
                      <span className="text fs-14-400 text-color">
                        {`${aboutCompany?.country} , ${aboutCompany?.province}`}
                      </span>
                    </div>
                    <p className="text-color">
                      {`${aboutCompany?.description?.substring(0, 100)}${
                        aboutCompany?.description?.length > 100 ? "..." : ""
                      }`}
                    </p>
                  </div>
                </div>
              </div>
              {/* Similar job opportunities */}
              <div className="similar-job p-4 bg-white r-10 mt-4">
                <h4 className=" fs-24-500 mb-4">فرص عمل مشابهة</h4>
                {getSimlarJobs?.length > 0 ? (
                  <ScrollarComponent height="500px">
                    <div className="d-flex flex-column gap-3">
                      {getSimlarJobs?.map((item) => (
                        <Link
                          key={item.id}
                          to={`/job-details/${item.id}`}
                          className="text-color work-componetn p-3 r-10 border d-flex flex-column gap-3"
                        >
                          <h4 className=" fs-16-500">{item.title}</h4>
                          <div className="desc text-color d-flex align-items-center gap-2">
                            {item?.company_name && (
                              <>
                                <span className="fs-16-400 text-color">
                                  {item.company_name}
                                </span>
                              </>
                            )}
                            {/* job type */}
                            {item?.full_time && (
                              <>
                                <span className="circle"></span>
                                <span className="type">دوام كلي</span>
                              </>
                            )}
                            {/* عملي */}
                            {item?.practical && (
                              <>
                                <span className="circle"></span>
                                <span className="type">عملي</span>
                              </>
                            )}
                            {/* job type */}
                            {item?.part_time && (
                              <>
                                <span className="circle"></span>
                                <span className="type">دوام جزئي</span>
                              </>
                            )}
                            {/* job type */}
                            {item?.remotely && (
                              <>
                                <span className="circle"></span>
                                <span className="type">العمل من المنزل</span>
                              </>
                            )}
                            {/* نظري */}
                            {item?.theoretical && (
                              <>
                                <span className="circle"></span>
                                <span className="type">نظري</span>
                              </>
                            )}
                          </div>
                          <p>{`${item?.description.substring(0, 100)}${
                            item?.description.length > 100 && "..."
                          }`}</p>
                        </Link>
                      ))}
                    </div>
                  </ScrollarComponent>
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

export default JobDetails;

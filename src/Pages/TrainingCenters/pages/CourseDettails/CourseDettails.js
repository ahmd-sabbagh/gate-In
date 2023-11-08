import React from "react";
import { BsFillMenuAppFill } from "react-icons/bs";
import { Link, useParams } from "react-router-dom";
import MainJobDetails from "../../../../Components/MainJobDetails/MainJobDetails";
import ScrollarComponent from "../../../../Components/ScrollarComponent/ScrollarComponent";
import SideBarComponent from "../../../../Components/SideBarComponent/SideBarComponent";
import SuggestedEmployeesComponent from "../../../Company/SuggestedEmployees/SuggestedEmployeesComponent";
import { useRecoilState } from "recoil";
import { JobApplicationUser } from "../../../../RecoilState/JobApplicationUser";
import { trans } from "../../../../Components/Navbar/Navbar";

function CourseDettails() {
  const prams = useParams();
  const [courseApplicants, setCourseApplicants] =
    useRecoilState(JobApplicationUser);
  return (
    <div className="row">
      {/* Content */}
      <div className="col-12 col-lg-8">
        <MainJobDetails
          linkRoute="/institutes/courses/"
          routeEdit="/institute/dashboard/ads-course-edit/"
          type="center"
          ButoonBottom={false}
          prop={setCourseApplicants}
        />
      </div>
      {/* SideBar */}
      <div className="col-lg-4">
        <SideBarComponent
          icon={<BsFillMenuAppFill />}
          top="80px"
          fontSizeIcon="29px"
        >
          <div className="SuggestedEmployeesCard p-4 bg-white r-10">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h3 className=" fs-16-700">
                {trans("job_edit.course_applicants")}
              </h3>
              {courseApplicants.length > 0 && (
                <Link
                  to={`/institute/dashboard/applicants/${prams.Id}`}
                  className=" fs-14-400 text-color"
                >
                  {trans("company_job_details.view_all")}
                </Link>
              )}
            </div>
            <ScrollarComponent height="300px">
              {courseApplicants.length > 0 ? (
                <>
                  {courseApplicants.map((item) => (
                    <SuggestedEmployeesComponent
                      api="/institutes/courses/users/approved/user/"
                      typeApi="/course/"
                      route="/institute/dashboard/employe-details/"
                      key={item.id}
                      {...item}
                    />
                  ))}
                </>
              ) : (
                <div
                  className="text-center mt-4 mb-4 red-color r-10 py-5"
                  style={{ backgroundColor: "#01854312 " }}
                >
                  {trans("center.no_applicants")}
                </div>
              )}
            </ScrollarComponent>
          </div>
        </SideBarComponent>
      </div>
    </div>
  );
}

export default CourseDettails;

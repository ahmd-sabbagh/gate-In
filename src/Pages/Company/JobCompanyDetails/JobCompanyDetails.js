import React from "react";
import { BsFillMenuAppFill } from "react-icons/bs";
import { Link, useParams } from "react-router-dom";
import MainJobDetails from "../../../Components/MainJobDetails/MainJobDetails";
import ScrollarComponent from "../../../Components/ScrollarComponent/ScrollarComponent";
import SideBarComponent from "../../../Components/SideBarComponent/SideBarComponent";
import CvAds from "../CvAds/CvAds";
import SuggestedEmployeesComponent from "../SuggestedEmployees/SuggestedEmployeesComponent";
import { useRecoilState } from "recoil";
import { JobApplicationUser } from "../../../RecoilState/JobApplicationUser";
import { trans } from "../../../Components/Navbar/Navbar";

function JobCompanyDetails() {
  const [applicantsEmploye, setApplicants] = useRecoilState(JobApplicationUser);
  const prams = useParams();
  return (
    <div className="JobCompanyDetails">
      <div className="row">
        {/* Content */}
        <div className="col-12 col-lg-8">
          <MainJobDetails
            prop={setApplicants}
            type="company"
            ButoonBottom={false}
            linkRoute="/companies/jobs/"
            routeEdit="/company/ads-job-edit/"
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
                <h3 className=" fs-16-700">{trans("company_job_details.Job_applicants")}</h3>
                {applicantsEmploye.length > 0 && (
                  <Link
                    to={
                      applicantsEmploye.length
                        ? `/company/dashboard/Applicants/${prams.Id}`
                        : ""
                    }
                    className=" fs-14-400 text-color"
                  >
                    {trans("company_job_details.view_all")}
                  </Link>
                )}
              </div>
              <ScrollarComponent height="500px">
                {applicantsEmploye.length > 0 ? (
                  <>
                    {applicantsEmploye.map((item, idx) => (
                      <SuggestedEmployeesComponent
                        api="/companies/jobs/users/approved/user/"
                        typeApi="/job/"
                        route="/company/dashboard/employe-approved-details/"
                        key={idx}
                        {...item}
                      />
                    ))}
                  </>
                ) : (
                  <div
                    className="text-center mt-4 mb-4 red-color r-10 py-5"
                    style={{ backgroundColor: "#01854312 " }}
                  >
                    {trans("company_job_details.no_applicants")}
                  </div>
                )}
              </ScrollarComponent>
            </div>
            {/* Cv */}
            <CvAds />
          </SideBarComponent>
        </div>
      </div>
    </div>
  );
}

export default JobCompanyDetails;

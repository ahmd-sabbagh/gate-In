import { BsFillMenuAppFill } from "react-icons/bs";
import ScrollarComponent from "../../../Components/ScrollarComponent/ScrollarComponent";
import SideBarComponent from "../../../Components/SideBarComponent/SideBarComponent";
import CvAds from "../CvAds/CvAds";
import SuggestedEmployeesComponent from "../SuggestedEmployees/SuggestedEmployeesComponent";
import WelcomNoAdJobs from "../../../Components/WelcomNoAdJobs/WelcomNoAdJobs";
import { useState } from "react";
import axios from "axios";
import { basedUrl } from "../../../Api/Apis";
import { Link, useNavigate } from "react-router-dom";
import { ErrorComponent } from "../../../Others/Error";
import JobAndCourseCard from "../../../Components/Job/JobAndCourseCard";
import { trans } from "../../../Components/Navbar/Navbar";
// WelcomNoAdJobs
const WelcomData = {
  header: trans("company_profile.WelcomData.header"),
  startNow: trans("company_profile.WelcomData.startNow"),
  hent: trans("company_profile.WelcomData.hent"),
  linkTitle: trans("company_profile.WelcomData.linkTitle"),
  linkTo: "/company/add-ads-job",
};

function WelcomYourCompany({ api, type }) {
  const navigat = useNavigate();
  const token = localStorage.getItem("token");
  const [data, setData] = useState([]);
  const [suggestedEmploy, setSuggestedEmploy] = useState([]);
  // Get Data
  const GetData = () => {
    axios
      .get(`${basedUrl}${api}`, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then(({ data }) => {
        setData(data.data.jobs.data);
        setSuggestedEmploy(data.data.suggested_employees);
      })
      .catch((error) => {
        ErrorComponent(error, navigat);
      });
  };
  useState(() => {
    GetData();
  }, []);
  // Get Data
  return (
    <div className="WelcomYourCompany">
      <div className="row">
        {/* Content */}
        <div className="col-12 col-lg-8">
          {data.length > 0 ? (
            <div className="body bg-white r-10 p-3 p-md-4">
              <div className="mb-4 d-flex align-items-center justify-content-between">
                <h3 className="fs-32-600">
                  {type === "welcome"
                    ? trans("user_profile.all_jobs")
                    : trans("company_profile.side_bar.jobs_aproved")}
                </h3>
                <Link
                  to="/company/add-ads-job"
                  className=" d-block fit-content bg-main py-2 px-3 text-white r-10"
                >
                  {trans("company_profile.add_jobs")}
                </Link>
              </div>
              <div className="job-cards d-flex flex-column gap-4">
                {data.map((item) => (
                  <JobAndCourseCard
                    key={item.id}
                    item={item}
                    Share={false}
                    controler={true}
                    application={true}
                    deleteLink="/companies/jobs/delete/"
                    editLink={`/company/dashboard/job-detail/${item.id}`}
                    getData={GetData}
                  />
                ))}
              </div>
            </div>
          ) : (
            <WelcomNoAdJobs {...WelcomData} />
          )}
        </div>
        {/* Right Side Bar */}
        <div className="col-lg-4">
          <SideBarComponent
            icon={<BsFillMenuAppFill />}
            top="80px"
            fontSizeIcon="29px"
          >
            <div className="SuggestedEmployeesCard p-4 bg-white r-10">
              <h3 className=" fs-16-700 mb-4">
                {trans("company_profile.suggest_employer")}
              </h3>
              <ScrollarComponent height="500px">
                {suggestedEmploy.map((item) => (
                  <SuggestedEmployeesComponent
                    type="all"
                    key={item.id}
                    {...item}
                  />
                ))}
              </ScrollarComponent>
            </div>
            <div className="d-none d-lg-block">
              <CvAds />
            </div>
          </SideBarComponent>
        </div>
      </div>
    </div>
  );
}

export default WelcomYourCompany;

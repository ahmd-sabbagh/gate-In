import { FaAd, FaHome, FaIdCard, FaNewspaper } from "react-icons/fa";
import { Outlet } from "react-router-dom";
import SideBar from "../../../Components/SideBarDashboard/SideBar";
import { BsFillClipboard2DataFill } from "react-icons/bs";
import { trans } from "../../../Components/Navbar/Navbar";
const Data = [
  {
    icon: <FaHome />,
    text: trans("company_profile.side_bar.home"),
    link: "/company/dashboard/",
  },
  {
    icon: <BsFillClipboard2DataFill />,
    text: trans("company_profile.side_bar.data"),
    link: "my-data",
  },
  // {
  //   icon: <FaAddressBook />,
  //   text: "طلبات الوظائف",
  //   link: "job-app",
  // },
  {
    icon: <FaIdCard />,
    text: trans("company_profile.side_bar.jobs_aproved"),
    link: "all-jobs",
  },
  {
    icon: <FaNewspaper />,
    text: trans("company_profile.side_bar.employer_search"),
    link: "search ",
  },
  {
    icon: <FaAd />,
    text: trans("company_profile.side_bar.company_ads"),
    link: "ads",
  },
];
function OutletCompany() {
  return (
    <div className="OutletCompany bg-smock">
      <div className="container">
        <div className="row">
          <div className="col-3">
            <SideBar Data={Data} />
          </div>
          <div className="col-12 col-lg-9">
            <div className="py-4 full-height min-full-height">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OutletCompany;

import { FaAd, FaAddressBook, FaHome, FaIdCard } from "react-icons/fa";
import { Outlet } from "react-router-dom";
import SideBar from "../../../../Components/SideBarDashboard/SideBar";
import { BsFillClipboard2DataFill } from "react-icons/bs";
import { trans } from "../../../../Components/Navbar/Navbar";
const Data = [
  {
    icon: <FaHome />,
    text: trans("company_profile.side_bar.home"),
    link: "/institute/dashboard/",
  },
  {
    icon: <BsFillClipboard2DataFill />,
    text: trans("employe-page.steps.one"),
    link: "my-data",
  },
  {
    icon: <FaAddressBook />,
    text: trans("center.add_course"),
    // text: "طلبات الالتحاق بالدورات",
    link: "/institute/dashboard/add-course",
  },
  {
    icon: <FaIdCard />,
    text: trans("center.Courses_offere"),
    link: "courses-approved",
  },
  {
    icon: <FaAd />,
    text: trans("center.Platform_ads"),
    link: "ads",
  },
];

function OutletCenter() {
  return (
    <div className="OutletCompany bg-smock pb-5">
      <div className="container">
        <div className="row">
          <div className="col-3">
            <SideBar Data={Data} />
          </div>
          <div className="col-12 col-lg-9">
            <div className="pt-5 min-full-height full-height ">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OutletCenter;

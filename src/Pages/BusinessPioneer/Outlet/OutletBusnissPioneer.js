import React from "react";
import { BsFillClipboard2DataFill } from "react-icons/bs";
import { FaAddressBook, FaHome } from "react-icons/fa";
import SideBar from "../../../Components/SideBarDashboard/SideBar";
import { Outlet } from "react-router-dom";
import { trans } from "../../../Components/Navbar/Navbar";
const Data = [
  {
    icon: <FaHome />, 
    text:  trans("company_profile.side_bar.home"),
    link: "/business_pioneer/dashboard/",
  },
  {
    icon: <BsFillClipboard2DataFill />,
    text:trans("employe-page.steps.one"),
    link: "/business_pioneer/dashboard/my-data",
  },
  {
    icon: <FaAddressBook />,
    text: trans("business_pioneer.add_project"),
    link: "/business_pioneer/dashboard/add-project",
  },
];
function OutletBusnissPioneer() {
  return (
    <div className="bg-smock pb-5">
      <div className="container">
        <div className="row">
          <div className="col-3">
            <SideBar Data={Data} />
          </div>
          <div className="col-12 col-lg-9">
            <div className="p-3 p-md-4 mt-5 r-10 bg-white min-height">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OutletBusnissPioneer;

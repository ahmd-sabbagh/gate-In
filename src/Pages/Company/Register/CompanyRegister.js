import React from "react";
import { ReactComponent as Time } from "./Assets/Time.svg";
import CompanyRegister from "./Register";
import { trans } from "../../../Components/Navbar/Navbar";

// Popub Data
const popubData = {
  icon: <Time />,
  title: trans("popubData.title"),
  desc: trans("popubData.desc"),
  btn1To: "/company/dashboard",
  btn1: trans("popubData.btn1"),
};
// Popup Data

function CompanyMainRegister() {
  return (
    <CompanyRegister
      apiSendData="/companies/data/create-or-update"
      linkCheck="/companies/data"
      popubData={popubData}
    />
  );
}

export default CompanyMainRegister;

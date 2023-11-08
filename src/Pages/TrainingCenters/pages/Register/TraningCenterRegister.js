import { trans } from "../../../../Components/Navbar/Navbar";
import CompanyRegister from "../../../Company/Register/Register";
import { ReactComponent as Time } from "./Assets/Time.svg";

// Popub Data
const popubData = {
  icon: <Time />,
  title: trans("popubData.title"),
  desc: trans("popubData.desc"),
  btn1To: "/institute/dashboard",
  btn1: trans("popubData.btn1"),
};
// Popup Data
function TraningCenterRegister() {
  return (
    <CompanyRegister
      type="institute"
      status="Register"
      linkCheck="/institutes/data"
      apiSendData="/institutes/data/create-or-update"
      popubData={popubData}
    />
  );
}

export default TraningCenterRegister;

import { Link } from "react-router-dom";
import { trans } from "../../Navbar/Navbar";

function Links() {
  const userAccount = JSON.parse(localStorage.getItem("user"));
  return (
    <div className="footer-links d-flex justify-content-evenly align-items-start">
      <div className="one d-flex flex-column gap-4 ">
        <Link to={"/genral"}>{trans("footer.about_site")}</Link>
        {userAccount?.type !== "business_pioneer" &&
          userAccount?.type !== "institute" && (
            <Link to={!userAccount ? "/register/login" : "jobs"}>{trans("footer.jobs")}</Link>
          )}
        <Link to={!userAccount ? "/register/login" : "courses"}>{trans("footer.courses")}</Link>
      </div>
      <div className="two d-flex flex-column gap-4">
        <Link to={"/genral/policy"}>{trans("footer.usage")}</Link>
        <Link to={"/genral/terms"}>{trans("footer.conditions")}</Link>
        <Link to={"/contact-us"}>{trans("footer.the_support")}</Link>
      </div>
    </div>
  );
}

export default Links;

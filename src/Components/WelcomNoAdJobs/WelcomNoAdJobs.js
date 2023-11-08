import { Link } from "react-router-dom";
import { ReactComponent as Icon } from "./Welcom.svg";

function WelcomNoAdJobs({ header, startNow, hent, linkTitle, linkTo }) {
  const user = JSON.parse(localStorage.getItem("user"))?.data_status;
  return (
    <div className="p-4 r-10 bg-white">
      {/* Header */}
      <div className="head ">
        <h4 className=" fs-20-500">{header}</h4>
      </div>
      {/* Body */}
      <div className="body mt-5">
        {/* icon */}
        <div className="icon flex-c">
          <Icon />
        </div>
        {/* text */}
        <div className="text-center mt-5">
          <h4 className=" fs-20-500">{startNow}</h4>
          <p className="mt-2 fs-16-500 text-color text-center">{hent}</p>
          <Link
            to={user === "approved" && linkTo}
            className="mt-4 d-block fit-content mx-auto bg-main py-3 px-4 text-white r-10"
          >
            {linkTitle}
          </Link>
        </div>
      </div>
    </div>
  );
}

export default WelcomNoAdJobs;

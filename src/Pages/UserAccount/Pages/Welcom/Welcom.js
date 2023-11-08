import "./Welcom.css";
import { ReactComponent as Icon } from "./Svg/Frame.svg";
import { Link } from "react-router-dom";
import { trans } from "../../../../Components/Navbar/Navbar";

function Welcom({ dont, message }) {
  return (
    <div className="acount-welcom-page d-flex gap-4 full-height justify-content-center align-items-center flex-column bg-white r-10">
      <div className="icon">
        <Icon />
      </div>
      <div className="text text-center d-flex flex-column gap-3">
        <h3 className=" fs-24-600">{trans("user_profile.welcome")}</h3>
        <p className=" fs-16-500 text-color">{message}</p>
      </div>
      <div className="buttons full-width">
        <div className="d-flex align-items-center gap-3 mx-auto flex-sm-row flex-column">
          {dont ? (
            <>
              <Link
                to="/program"
                className="p-3  r-10 bg-main text-white text-center full-width d-block"
                style={{ minWidth: "fit-content" }}
              >
                {trans("join_prog")}
              </Link>
              <Link
                to={"/job_seeker/dont"}
                className="p-3 r-10 border-main border text-main text-center full-width"
              >
                {trans("remember_prog")}
              </Link>
            </>
          ) : (
            <Link
              to={"all-courses"}
              className="p-3 r-10 border-main border text-main text-center full-width"
            >
              {trans("user_profile.Browse_courses")}
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default Welcom;

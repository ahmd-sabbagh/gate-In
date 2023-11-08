import { ReactComponent as Cvicon } from "./CvIcon.svg";
import { BsArrowLeftShort } from "react-icons/bs";
import { Link } from "react-router-dom";
import { trans } from "../../../Components/Navbar/Navbar";

function CvAds() {
  return (
    <div className="CvAds bg-main mt-4 r-10">
      <div className="p-4 d-flex flex-column gap-3">
        <div className="icon flex-c mx-auto">
          <Cvicon />
        </div>
        <div className="text text-center text-white">
          <h4 className=" fs-20-500">
            {trans("company_profile.search_by_cv")}
          </h4>
          <p className=" fs-14-400 mt-3">
            {trans("company_profile.search_by_cv_disc")}
          </p>
        </div>
        <div className="d-flex justify-content-end align-items-center">
          <Link
            to="/company/dashboard/search"
            className="d-flex align-items-center gap-1 text-white"
          >
            {trans("company_profile.search_now")}
            <span className="flex-c">
              <BsArrowLeftShort />
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default CvAds;

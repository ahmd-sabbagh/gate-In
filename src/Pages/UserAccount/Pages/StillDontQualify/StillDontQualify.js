import { BsArrowLeft } from "react-icons/bs";
import { Link } from "react-router-dom";
import { ReactComponent as Icon } from "./Svg/Frame.svg";
import "./StillDontQualify.css";
import Card from "../../../QualifyingProgram/Components/Card";
import { trans } from "../../../../Components/Navbar/Navbar";

function StillDontQualify() {
  return (
    <div className="StillDontQualify">
      <div className="top bg-white r-10 p-4">
        <div className="icon flex-c">
          <Icon />
        </div>
        <div className="text mx-auto text-center d-flex flex-column gap-3 mt-4">
          <h3 className=" fs-24-600">{trans("not_avilibal_to_prog")}</h3>
          <p className=" fs-16-500 text-color">{trans("not_join")}</p>
          <Link
            to={"/courses"}
            className="mx-auto d-flex align-items-center gap-3 text-main fs-16-500 fit-content"
          >
            {trans("Explore_now")}
            <span className="flex-c">
              <BsArrowLeft />
            </span>
          </Link>
        </div>
      </div>
      <div className="bottom bg-white r-10 p-4 mt-4">
        <Card />
      </div>
    </div>
  );
}

export default StillDontQualify;

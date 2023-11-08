import { Link } from "react-router-dom";
import "./Landing.css";
import { trans } from "../../../../Components/Navbar/Navbar";

function Landing({last}) {
  return (
    <div
      className="articles-landing position-relative"
      style={{ backgroundImage: `url(${last?.image})` }}
    >
      <div className="container full-height ">
        <div className="cont full-height justify-content-center d-flex flex-column gap-4 text-white">
          <h3 className="fs-32-600">{last?.title}</h3>
          <p className=" fs-15-500">{last?.short_description}</p>
          <Link to={`details/${last?.id}`} className="fit-content text-white px-4 py-2 r-10 bg-main">
            {trans("flyers.details")}
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Landing;

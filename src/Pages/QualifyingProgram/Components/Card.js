import { Link } from "react-router-dom";
import image from "../Assets/meeting.jpg";
import "./Card.css";
import { trans } from "../../../Components/Navbar/Navbar";

function Card() {
  const userAccount = JSON.parse(localStorage.getItem("user"));
  return (
    <div className="card-program">
      <h3 className=" fs-32-700">{trans("qualification.head")}</h3>
      <div className="card-cont d-flex gap-4 mt-5 flex-md-row flex-column">
        {/* Image */}
        <div className="image r-10 overflow-hidden" style={{backgroundImage:`url(${image})`}}>
          {/* <img src={image} alt="" /> */}
        </div>
        {/* Text */}
        <div className="text d-flex flex-column gap-3">
          <h4 className=" fs-24-700">{trans("qualification.card.title")}</h4>
          {/* Info */}
          <div className="info d-flex align-items-center gap-2">
            <span className=" fs-16-400 text-color">
              {trans("qualification.card.name")}
            </span>
            <div className="cercle"></div>
            <span className="date red-color">
              {trans("qualification.card.date")}
            </span>
          </div>
          {/* Desc */}
          <p className=" fs-14-500">{trans("qualification.card.disc")}</p>
          {/* Tags */}
          <div className="tags d-flex align-items-center gap-2">
            <div className="tag py-2 px-4">
              3 {trans("qualification.card.monthes")}
            </div>
            <div className="tag py-2 px-4">
              200 {trans("qualification.card.students")}
            </div>
          </div>
          {/* Bottom */}
          <div className="bottom d-flex gap-4 align-items-center">
            <div className="price fs-24-700">2500 د.ع</div>
            <Link
              className="p-3 r-10 text-center d-block"
              to={
                userAccount?.is_register_data
                  ? "/job_seeker/interview"
                  : "/employ-data"
              }
            >
              {trans("buttons.home.join")}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;

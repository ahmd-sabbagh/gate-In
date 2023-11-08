import { Link } from "react-router-dom";
import "./Articles.css";
import moment from "moment";
import { trans } from "../../../Components/Navbar/Navbar";

function ArticleComponent(props) {
  const { image, title, short_description, created_at, id } = props.item;
  const timeago = moment(created_at).locale("en").format("L");
  return (
    <div
      className="ArticleComponent full-height d-flex flex-column justify-content-between gap-3 p-3 position-relative overflow-hidden r-10"
      data-aos="fade-up"
      data-aos-duration="1000"
    >
      <div className="image r-10 overflow-hidden">
        <img src={image} alt="" />
      </div>
      <div className="date fs-16-500 text-color">{timeago}</div>
      <h4 className="tiitle fs-24-500">{title}</h4>
      <p className="brief fs-16-500 text-color">{short_description}</p>
      <Link
        className="flex-c fs-16-500 r-10 align-self-center align-self-md-auto"
        to={`/all-article/details/${id}`}
      >
        {trans("flyers.details")}
      </Link>
    </div>
  );
}

export default ArticleComponent;

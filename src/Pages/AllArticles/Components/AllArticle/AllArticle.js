import { Link } from "react-router-dom";
import ArticleComponent from "../../../Home/Articles/ArticleComponent";
import "./AllArticle.css";
import Image from "./employ-meeting.jpg";
import { trans } from "../../../../Components/Navbar/Navbar";

function AllArticle({ all }) {
  return (
    <div className="AllArticle py-5">
      <div className="container">
        <div className="row g-4">
          {all?.map((item) => (
            <div className="col-12 col-md-6 col-lg-4" key={item.id}>
              <ArticleComponent item={item} />
            </div>
          ))}
        </div>
        <div className="button d-flex justify-content-center mt-5">
          <Link className="bg-main flex-1 flex-c py-3 r-10 text-white">
            {trans("flyers.more")}
          </Link>
        </div>
      </div>
    </div>
  );
}

export default AllArticle;

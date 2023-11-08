import { useEffect } from "react";
import { trans } from "../../../Components/Navbar/Navbar";
import ArticleComponent from "./ArticleComponent";
import "./Articles.css";
import Image from "./employ-meeting.jpg";
import axios from "axios";
import { ErrorComponent } from "../../../Others/Error";
import { useNavigate } from "react-router-dom";
import { apiHeaders, basedUrl } from "../../../Api/Apis";
import { useState } from "react";

function Articles() {
  const navigat = useNavigate();
  const [articles, setArticle] = useState([]);
  useEffect(() => {
    axios
      .get(`${basedUrl}/public/data/articles/latest`, apiHeaders)
      .then((data) => {
        setArticle(data.data.data);
      })
      .catch((error) => {
        ErrorComponent(error, navigat);
      });
  }, []);
  return (
    <>
      {articles.length >= 1 ? (
        <div className="Articles py-5">
          <div
            className="container"
            data-aos="fade-up"
            data-aos-duration="1000"
          >
            <div className="text mx-auto mb-5">
              <h3 className="fs-32-700 text-center">
                {trans("home.articles.tittle")}
              </h3>
              <p className=" fs-20-500 text-color text-center mt-3">
                {trans("home.articles.brief")}
              </p>
            </div>
            <div className="row g-4">
              {articles?.map((item) => (
                <div className="col-12 col-md-6 col-lg-4" key={item.id}>
                  <ArticleComponent item={item} />
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

export default Articles;

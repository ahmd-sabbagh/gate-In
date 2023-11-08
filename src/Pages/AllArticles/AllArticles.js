import React, { useState } from "react";
import AllArticle from "./Components/AllArticle/AllArticle";
import Landing from "./Components/Landing/Landing";
import axios from "axios";
import { apiHeaders, basedUrl } from "../../Api/Apis";
import { ErrorComponent } from "../../Others/Error";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Loader from "../../Components/Loader/Loader";
function AllArticles() {
  const navigat = useNavigate();

  // Get Article
  const [articles, setArticle] = useState();
  const [lastArticle, setLastArticle] = useState();
  useEffect(() => {
    axios
      .get(`${basedUrl}/public/data/articles`, apiHeaders)
      .then((data) => {
        setArticle(data.data.data.articles.data);
        setLastArticle(data.data.data.last_article);
      })
      .catch((error) => {
        ErrorComponent(error, navigat);
      });
  }, []);
  return (
    <>
      {articles ? (
        <div className="AllArticles">
          <Landing last={lastArticle} />
          <AllArticle all={articles} />
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
}

export default AllArticles;

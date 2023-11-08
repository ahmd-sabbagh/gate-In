import "./ArticleDetails.css";
import {
  FaFacebookSquare,
  FaLinkedin,
  FaTwitter,
  FaWhatsapp,
} from "react-icons/fa";
import Header from "./Components/Header";
import axios from "axios";
import { apiHeaders, basedUrl } from "../../Api/Apis";
import { useNavigate, useParams } from "react-router-dom";
import { ErrorComponent } from "../../Others/Error";
import { useEffect } from "react";
import { useState } from "react";
import moment from "moment";
import Loader from "../../Components/Loader/Loader";
import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
  WhatsappShareButton,
} from "react-share";

function ArticleDetails() {
  const prams = useParams();
  const navigat = useNavigate();
  const [articleDet, setArticleDet] = useState();
  const linkShare = window.location.href;

  useEffect(() => {
    axios
      .get(`${basedUrl}/public/data/articles/${prams.id}`, apiHeaders)
      .then((data) => {
        setArticleDet(data.data.data);
      })
      .catch((error) => {
        ErrorComponent(error, navigat);
      });
  }, []);
  const timeago = moment(articleDet?.created_at).locale("en").format("L");
  return (
    <>
      {articleDet ? (
        <div className="ArticleDetails py-5">
          <div className="container d-flex flex-column gap-5">
            <Header
              tittle={articleDet?.title}
              date={timeago}
              brief={articleDet?.short_description}
            />
            {/* image */}
            <div className="image overflow-hidden flex-c">
              <img src={articleDet?.image} alt="" />
            </div>
            {/* cont */}
            <div className="cont d-flex gap-5 flex-column flex-md-row">
              {/* text */}
              <div
                className="texts d-flex flex-column gap-4"
                dangerouslySetInnerHTML={{ __html: articleDet?.description }}
              ></div>
              {/* icons */}
              <div className="share-icon d-flex justify-content-center flex-md-column  gap-3">
                <span className="flex-c border">
                  <FacebookShareButton
                    url={linkShare}
                    quote={"Gate In Article"}
                    hashtag="#Gate_In"
                  >
                    <FaFacebookSquare />
                  </FacebookShareButton>
                </span>
                <span className="flex-c border">
                  <TwitterShareButton
                    url={linkShare}
                    quote={"Gate In Article"}
                    hashtag="#Gate_In"
                  >
                    <FaTwitter />
                  </TwitterShareButton>
                </span>
                <span className="flex-c border">
                  <LinkedinShareButton
                    url={linkShare}
                    quote={"Gate In Article"}
                    hashtag="#Gate_In"
                  >
                    <FaLinkedin />
                  </LinkedinShareButton>
                </span>
                <span className="flex-c border">
                  <WhatsappShareButton
                    url={linkShare}
                    quote={"Gate In Article"}
                    hashtag="#Gate_In"
                  >
                    <FaWhatsapp />
                  </WhatsappShareButton>
                </span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
}

export default ArticleDetails;

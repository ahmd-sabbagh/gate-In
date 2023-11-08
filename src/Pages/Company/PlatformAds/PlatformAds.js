import { Link, useNavigate } from "react-router-dom";
import Ads from "./Components/Ads";
import { basedUrl } from "../../../Api/Apis";
import axios from "axios";
import { useState } from "react";
import { ErrorComponent } from "../../../Others/Error";
import { useEffect } from "react";
import Nothing from "../../../Components/Nothing/Nothing";
import Baber from "./Assets/Nothing.json";
import { trans } from "../../../Components/Navbar/Navbar";

function PlatformAds({ api, addAdsLink, deleteLink, linkEditRoute }) {
  const navigat = useNavigate();
  const token = localStorage.getItem("token");
  const [data, setData] = useState([]);
  const getData = () => {
    axios
      .get(`${basedUrl}${api}`, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then(({ data }) => {
        setData(data.data);
      })
      .catch((error) => {
        ErrorComponent(error, navigat);
      });
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <div className="PlatformAds min-full-height p-3 p-md-4 r-10 bg-white ">
      <div className="header d-flex align-items-center justify-content-between mb-5">
        <h3 className=" fs-24-700">{trans("company_ads.Platform_ads")}</h3>
        <Link
          to={addAdsLink}
          className=" fs-14-500 d-block py-2 px-4 text-white bg-main r-10"
        >
          {trans("company_ads.add_ads")}
        </Link>
      </div>
      {data.length > 0 ? (
        <div className="row g-4">
          {data.map((item) => (
            <div className="col-12 col-lg-6" key={item.id}>
              <Ads
                image={item.image}
                link={item.link}
                id={item.id}
                getData={getData}
                deleteLink={deleteLink}
                linkEditRoute={linkEditRoute}
              />
            </div>
          ))}
        </div>
      ) : (
        <Nothing josnFile={Baber} text={trans("company_ads.no_ads")} />
      )}
    </div>
  );
}

export default PlatformAds;

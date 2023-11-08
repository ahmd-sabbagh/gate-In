import axios from "axios";
import React from "react";
import { apiHeaders, basedUrl } from "../../Api/Apis";
import { useNavigate } from "react-router-dom";
import { ErrorComponent } from "../../Others/Error";
import { useState } from "react";
import "./PublicInfo.css";
import { useEffect } from "react";
function PublicInfo({ type }) {
  const navigat = useNavigate();
  const [data, setData] = useState("");
  const getData = () => {
    axios
      .get(`${basedUrl}/public/data/abouts`, apiHeaders)
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
    <div className="PublicInfo">
      <div className="container">
        <div className="d-flex flex-column gap-4 mt-5">
          <h3 className="fs-24-500 text-center">
            {type === "about"
              ? "عن الموقع"
              : type === "policy"
              ? "سياسة الخصوصية"
              : "الشروط والاحكام"}
          </h3>
          <p className="text-center mx-auto" style={{maxWidth:'80%'}}>
            {type === "about"
              ? data?.about_us
              : type === "policy"
              ? data?.policy
              : data.terms}
          </p>
        </div>
      </div>
    </div>
  );
}

export default PublicInfo;

import React from "react";
import { HiOutlineMail } from "react-icons/hi";
import { SlCallEnd, SlLocationPin } from "react-icons/sl";
import ProfileEmployeImage from "../../../Components/ProfileEmployeImage/ProfileEmployeImage";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { basedUrl } from "../../../Api/Apis";
import { ErrorComponent, SuccsesComponent } from "../../../Others/Error";
import { useEffect } from "react";
import { useState } from "react";
import Loader from "../../../Components/Loader/Loader";
import { saveAs } from "file-saver";
import { trans } from "../../../Components/Navbar/Navbar";

function EmployDetails({
  type = "company",
  approved = false,
  apiGet,
  apiApproved,
  apiType,
}) {
  const prams = useParams();
  const navigat = useNavigate();
  const token = localStorage.getItem("token");
  const [data, setData] = useState();
  // Get Data
  const GetData = () => {
    axios
      .get(`${basedUrl}${apiGet}${prams.Id}`, {
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
    GetData();
  }, []);
  // Approved User
  const approvedUser = () => {
    axios
      .post(
        `${basedUrl}${apiApproved}${prams.Id}${apiType}${prams.JobId}`,
        {},
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(({ data }) => {
        SuccsesComponent(data.message);
      })
      .catch((error) => {
        ErrorComponent(error, navigat);
      });
  };
  // Approved User
  // get cv
  const handleDownload = (url) => {
    saveAs(url, "cv.docx");
  };
  return (
    <>
      {data ? (
        <>
          <div className="EmployDetails p-4 bg-white r-10">
            <h3 className="fs-32-600 mb-5">
              {type === "company"
                ? trans("employe_details.employe_details")
                : trans("employe_details.Apprentice_details")}
            </h3>
            <div className="d-flex justify-content-between flex-column flex-md-row gap-3 ">
              {/* top Details */}
              <div className="top-details d-flex align-items-start flex-column flex-md-row gap-4">
                <ProfileEmployeImage
                  image={data?.image}
                  status={data?.course_success}
                />
                <div className="d-flex flex-column gap-1 ">
                  <h4 className=" fs-24-500">{data?.name}</h4>
                  <p className=" fs-16-400">{data?.major}</p>
                  <div className="d-flex gap-3 flex-column flex-lg-row">
                    <div className="d-flex gap-2 ">
                      <div className="icon main-color">
                        <SlCallEnd />
                      </div>
                      {data?.mobile}
                    </div>
                    {data?.email && (
                      <div className="d-flex gap-2">
                        <div className="icon main-color">
                          <HiOutlineMail />
                        </div>
                        {data?.email}
                      </div>
                    )}

                    <div className="d-flex gap-2">
                      <div className="icon main-color">
                        <SlLocationPin />
                      </div>
                      {`${data?.province},${data?.city}`}
                    </div>
                  </div>
                </div>
              </div>
              {/* Approved */}
              {approved ? (
                <div
                  className="pointer fit-height fit-content r-10 border border-main text-main p-3 d-block text-center"
                  style={{ minWidth: "130px" }}
                  onClick={() => {
                    approvedUser();
                  }}
                >
                  {trans("employe_details.approved")}
                </div>
              ) : (
                <button
                  disabled={!data.cv}
                  onClick={() => {
                    handleDownload(data.cv);
                  }}
                  className="py-3 px-4 bg-main text-white r-10 fit-height text-center fit-content mx-auto mx-md-0 border-0"
                >
                  {data.cv
                    ? trans("employe_details.cv_download")
                    : trans("employe_details.no_cv")}
                </button>
              )}
            </div>
            {/* Education */}
            <div className="Education mt-5">
              <h3 className=" fs-16-700 mb-3">
                {trans("employe_details.learning")}
              </h3>
              <div className="text-color d-flex gap-2">
                <span className="text-color">
                  {data?.education_data.college}
                </span>
                <span className="text-c">
                  {data?.education_data.graduation_year}
                </span>
              </div>
            </div>
            {/* Cetifcate */}
            <div className="Cetifcate mt-5 mb-5">
              <h3 className=" fs-16-700 mb-3">
                {trans("employe_details.certificate")}
              </h3>
              <ul style={{ listStyle: "inside" }}>
                {data?.certificates.map((item) => (
                  <li className="px-3 text-color" key={item.value}>
                    {item.label}
                  </li>
                ))}
              </ul>
            </div>
            {/* hr */}
            <hr />
            {/* hr */}
            {/* Language */}
            <div className="Language mt-5">
              <h3 className=" fs-16-700 mb-3">
                {trans("employe_details.languages")}
              </h3>
              <ul style={{ listStyle: "inside" }}>
                {data?.languages.map((item) => (
                  <li className="px-3 text-color" key={item.value}>
                    {item.label}
                  </li>
                ))}
              </ul>
            </div>
            {/* Skills */}
            {/* <div className="skills mt-5">
        <h3 className=" fs-16-700 mb-3">المهارات</h3>
        <div className="d-flex gap-2">
          {data?.languages.map((item) => (
            <div className="tag-detail" key={item.value}>
              {item.label}
            </div>
          ))}
        </div>
      </div> */}
          </div>
        </>
      ) : (
        <Loader />
      )}
    </>
  );
}

export default EmployDetails;

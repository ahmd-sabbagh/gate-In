import axios from "axios";
import React, { useEffect, useState } from "react";
import { basedUrl } from "../../../Api/Apis";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ErrorComponent, SuccsesComponent } from "../../../Others/Error";
import ProfileEmployeImage from "../../../Components/ProfileEmployeImage/ProfileEmployeImage";
import Loader from "../../../Components/Loader/Loader";
import { FiUploadCloud } from "react-icons/fi";
import { saveAs } from "file-saver";
import { trans } from "../../../Components/Navbar/Navbar";

function Applicants({ url, type, details, api, typeApi }) {
  const prams = useParams();
  const navigat = useNavigate();
  const token = localStorage.getItem("token");
  const [user, setUser] = useState();
  const getData = () => {
    axios
      .get(`${basedUrl}${url}${prams.Id}`, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then(({ data }) => {
        setUser(data.data);
      })
      .catch((error) => {
        ErrorComponent(error, navigat);
      });
  };
  useEffect(() => {
    getData();
  }, []);
  // Function Download Image
  const handleDownload = (url) => {
    saveAs(url, "cv.docx");
  };
  // Function Download Image
  // Approved User
  const approvedUser = (id) => {
    axios
      .post(
        `${basedUrl}${api}${id}${typeApi}${prams.Id}`,
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
        const filterUser = user.filter((item) => item.id !== id);
        setUser(filterUser);
      })
      .catch((error) => {
        ErrorComponent(error, navigat);
      });
  };
  return (
    <div className="Applicants full-height min-full-height r-10 p-4 bg-white">
      {user?.length ? (
        <>
          <h3 className="fs-24-700 mb-4">
            {type === "للوظيفة"
              ? trans("company_job_details.Job_applicants")
              : trans("job_edit.course_applicants")}
          </h3>
          <div className="row g-4">
            {user?.map((item) => (
              <div className="col-12 col-md-6" key={item.id}>
                <div className="user-card p-4 border r-10 d-flex gap-3 flex-column align-items-center align-items-xxl-start flex-xxl-row">
                  <ProfileEmployeImage
                    image={item.image}
                    status={item.course_success}
                  />
                  <div className="d-flex flex-1 flex-column gap-2 mt-2 full-width">
                    <div className="d-flex justify-content-between ">
                      <div className="d-flex flex-column gap-2">
                        <h3 className="fs-16-700">{item.name}</h3>
                        <div className="education d-flex align-items-center gap-1">
                          <p className="fs-16-400 red-color">{item.major}</p>
                          <span className="circle-type"></span>
                          <p className="fs-16-400">{item.type_education}</p>
                        </div>
                        <div className="adress d-flex align-items-center gap-1">
                          <p className="fs-16-400">{item.country}</p>
                          <span className="circle-type"></span>
                          <p className="fs-16-400">{item.province}</p>
                          <span className="circle-type"></span>
                          <p className="fs-16-400 red-color">{item.city}</p>
                        </div>
                      </div>
                      {/* Cv */}
                      {item.cv && (
                        <div
                          className="d-flex align-items-end gap-2 p-2 fs-16-700 border border-main main-color r-10 fit-height pointer"
                          onClick={(e) => {
                            handleDownload(item.cv);
                          }}
                        >
                          <FiUploadCloud
                            style={{ transform: "rotate(180deg)" }}
                          />
                          cv
                        </div>
                      )}
                    </div>
                    <div className="buttons mt-3 d-flex gap-3 flex-md-column flex-xxl-row">
                      <button
                        className="resetBtn d-block full-width text-center py-2 px-1 r-10 bg-main text-white fs-16-700"
                        onClick={() => {
                          approvedUser(item.id);
                        }}
                      >
                        {trans("employe_details.approved")}
                      </button>
                      <Link
                        to={`${details}${item.id}/${prams.Id}`}
                        className="d-block full-width border border-main text-center py-2 px-1 r-10 text-main fs-16-700"
                      >
                        {trans("employe_details.employe_details")}
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <Loader />
      )}
    </div>
  );
}

export default Applicants;

import "./Cv.css";
import { useState } from "react";
import { FiUploadCloud } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { basedUrl } from "../../../../Api/Apis";
import axios from "axios";
import { ErrorComponent, SuccsesComponent } from "../../../../Others/Error";

function Cv() {
  const token = localStorage.getItem("token");
  const navigat = useNavigate();
  const [loading, setLoading] = useState(false);
  // Validation State
  const [errorValidation, setErrorValidation] = useState({});
  // Validation State
  //state select image
  const [cv, setCv] = useState("");
  //state select image
  // Function OnSubmit
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${basedUrl}/job-seeker/cv/upload`,
        { file: cv },
        {
          headers: {
            Accept: "application/json",
            "content-type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      SuccsesComponent(data.message);
      navigat("/job_seeker");
    } catch (error) {
      ErrorComponent(error, navigat, setErrorValidation);
    }
  };
  // Function OnSubmit
  return (
    <div className="Cv-page p-4 bg-white r-10">
      <h3 className="fs-24-600 mb-5">السيرة الذاتية</h3>
      <div className="select-component">
        <div className="window px-2">
          <h4 className=" fs-16-500 mb-3">رفع ملف السيرة الذاتية</h4>
          <form onSubmit={onSubmit}>
            <label
              htmlFor="select"
              className={`d-flex flex-column gap-3 align-items-center px-4 py-5 r-10 border border-main ${
                errorValidation.hasOwnProperty("file") && "border-red"
              }`}
            >
              <div className="icon">
                <FiUploadCloud />
              </div>
              <p className=" fs-14-400 text-color text-center">
                قم بفتح الملف التى تريد اضافتها او قم بفتحها من <span>هنا</span>
              </p>
              <p>{cv?.name}</p>
            </label>
            {/* Input Display None */}
            <input
              id="select"
              type="file"
              accept="application/pdf"
              onChange={(e) => {
                setCv(e.target.files[0]);
                setLoading(true);
              }}
              style={{ display: "none" }}
            />
            <span className="text-error fs-14-400">
              {errorValidation.hasOwnProperty("file")
                ? errorValidation.file[0]
                : null}
            </span>
            <button
              className={`persnol-data-btn mt-4 r-10 py-3 ${
                !loading && "disabled"
              }`}
              disabled={!loading}
              type="submit"           
              onClick={() => {
                setLoading(false);
              }}
            >
              ارسال
            </button>
          </form>
          {/* Or */}
          <div className="bottom mt-4">
            <div className="or d-flex justify-content-center position-relative">
              <span>او</span>
            </div>
            <div className="or-option d-flex flex-column align-items-center gap-4 mt-4">
              <p className=" fs-16-700 text-center">
                يمكنك عمل سيرة ذاتية متميزة من خلال بعض النماذج الجاهزة التى
                نوفرها لك
              </p>
              <Link to="/cv" className="py-3 px-4 text-white bg-main r-10 ">
                نماذج السيرة الذاتية
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cv;

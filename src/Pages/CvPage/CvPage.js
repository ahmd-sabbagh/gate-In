import axios from "axios";
import SomeQuestion from "../UserAccount/Pages/Cv/SomeQuestion/SomeQuestion";
import "./CvPage.css";
import { basedUrl } from "../../Api/Apis";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ErrorComponent } from "../../Others/Error";
import { saveAs } from "file-saver";

function CvPage() {
  const token = localStorage.getItem("token");
  const [cv, setCv] = useState();
  const navigat = useNavigate();
  // Function Download Image
  const handleDownload = (url) => {
    saveAs(url, "cv.docx");
  };
  // Function Download Image
  // Get Cv
  const getCv = () => {
    axios
      .get(`${basedUrl}/job-seeker/cv/files-and-questions`, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then(({ data }) => {
        setCv(data.data);
      })
      .catch((error) => {
        ErrorComponent(error, navigat);
      });
  };
  // Get Cv
  useEffect(() => {
    getCv();
  }, []);
  // console.log(cv);
  return (
    <div className="CvPage">
      {/* Landing */}
      <div className="landing">
        <div className="container full-height d-flex align-items-center">
          <div className="text text-white">
            <h3 className=" fs-32-600">انشاء السيرة الذاتية</h3>
            <p className=" fs-24-400 mt-3">
              ابدأ الآن بانشاء سيرة ذاتية احترافية تؤهلك للالتحاق بافضل الوظائف
              فى افضل الاماكن
            </p>
          </div>
        </div>
      </div>
      {/* Content */}
      <div className="content py-5">
        <div className="container">
          {/* Body */}
          <div className="body mb-5">
            <h3 className=" fs-32-600 text-center">
              بعض النماذج الجاهزة للسيرة الذاتية
            </h3>
            <div className="Cvs py-5">
              <div className="row g-4">
                {cv?.files?.map((item) => (
                  <div className="col-12 col-md-6 col-lg-4" key={item.id}>
                    <div
                      className="full-height cover-cv pointer "
                      style={{backgroundImage:`url(${item.image})`}}
                      onClick={() => {
                        handleDownload(item.file);
                      }}
                    >
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          {/* Some Question */}
          <SomeQuestion />
        </div>
      </div>
    </div>
  );
}

export default CvPage;

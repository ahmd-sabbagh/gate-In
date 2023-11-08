import axios from "axios";
import React from "react";
import { useState } from "react";
import { FaVideo } from "react-icons/fa";
import { basedUrl } from "../../../../Api/Apis";
import "./JoinCourse.css";
import { useNavigate } from "react-router-dom";
import { ErrorComponent, SuccsesComponent } from "../../../../Others/Error";

function JoinCourse() {
  const token = localStorage.getItem("token");
  const navigat = useNavigate();
  const [type, setType] = useState();
  // Function Submit
  const submit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${basedUrl}/job-seeker/join-course`,
        { type },
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      SuccsesComponent(data.message);
    } catch (error) {
      ErrorComponent(error, navigat);
    }
  };
  // Function Submit
  return (
    <div className="JoinCourse bg-white p-4 r-10 full-height">
      <h3 className="fs-24-600 mb-4">الانضمام الى الدورة التأهيلة</h3>
      <p className="fs-20-500 mb-4">من فضلك حدد نوع المقابلة</p>
      <form onSubmit={submit}>
        <div className="row g-4">
          <div className="col-12 col-lg-6">
            <div className="online">
              <input
                onChange={(e) => {
                  setType(e.target.value);
                }}
                name="join"
                className="d-none"
                id="online"
                type="radio"
                value="online"
              />
              <label
                className="full-width d-flex flex-column align-items-center pointer p-4 gap-3"
                htmlFor="online"
              >
                <span className="icon flex-c">
                  <FaVideo />
                </span>
                <span className="text fs-16-700 text-main">مقابلة اونلاين</span>
              </label>
            </div>
          </div>
          {/* headquarters */}
          <div className="col-12 col-lg-6">
            <div className="headquarters">
              <input
                onChange={(e) => {
                  setType(e.target.value);
                }}
                name="join"
                className="d-none"
                id="headquarters"
                type="radio"
                value="offline"
              />
              <label
                className="full-width d-flex flex-column align-items-center pointer p-4 gap-3"
                htmlFor="headquarters"
              >
                <span className="icon flex-c">
                  <FaVideo />
                </span>
                <span className="text fs-16-700 text-main">
                  من مقر مركز التأهيل
                </span>
              </label>
            </div>
          </div>
          {/* submit button */}
          <div className="col-12 col-md-4">
            <button className="persnol-data-btn r-10 py-3" type="submit">
              ارسال الطلب الآن
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default JoinCourse;

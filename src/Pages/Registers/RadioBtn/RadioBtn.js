import "./RadioBtn.css";
import { ReactComponent as SearchEmploy } from "./Assets/searchEmploy.svg";
import { ReactComponent as SearchWork } from "./Assets/searchWork.svg";
import { ReactComponent as SmallProject } from "./Assets/smallProject.svg";
import { ReactComponent as Traning } from "./Assets/traning.svg";
import Btn from "../Components/Btn";
import { trans } from "../../../Components/Navbar/Navbar";
import { Link } from "react-router-dom";
import { useRecoilState } from "recoil";
import { RadioCreateAccount } from "../../../RecoilState/RadioCreateAccount";
import { useEffect } from "react";

function RadioBtn() {
  const [type, setType] = useRecoilState(RadioCreateAccount);
  useEffect(() => {
    setType("");
  }, []);
  return (
    <div className="RadioBtn py-5">
      <div className="container">
        <div className="content p-4 d-flex align-items-center justify-content-center flex-column gap-5">
          <h3 className="fs-32-700">{trans("Radio.tittle")}</h3>
          <div className="row g-4 full-width">
            {/* Bussnis Pioneer */}
            <div className="col-12 col-sm-6 col-md-4 col-lg-3">
              <div className="card">
                <input
                  type="radio"
                  name="pricing"
                  id="card4"
                  value={"business_pioneer"}
                  onChange={(e) => {
                    setType(e.target.value);
                  }}
                />
                <label htmlFor="card4">
                  <span className="flex-c">
                    <SmallProject />
                  </span>
                  <h4 className="fs-16-700"> {trans("Radio.inputs.four")} </h4>
                </label>
              </div>
            </div>
            {/* Company */}
            <div className="col-12 col-sm-6 col-md-4 col-lg-3">
              <div className="card">
                <input
                  type="radio"
                  name="pricing"
                  id="card2"
                  value="company"
                  onChange={(e) => {
                    setType(e.target.value);
                  }}
                />
                <label htmlFor="card2">
                  <span className="flex-c">
                    <SearchEmploy />
                  </span>
                  <h4 className="fs-16-700">{trans("Radio.inputs.two")}</h4>
                </label>
              </div>
            </div>
            {/* Institute */}
            <div className="col-12 col-sm-6 col-md-4 col-lg-3">
              <div className="card">
                <input
                  type="radio"
                  name="pricing"
                  id="card3"
                  value="institute"
                  onChange={(e) => {
                    setType(e.target.value);
                  }}
                />
                <label htmlFor="card3">
                  <span className="flex-c">
                    <Traning />
                  </span>
                  <h4 className="fs-16-700"> {trans("Radio.inputs.three")} </h4>
                </label>
              </div>
            </div>
            {/* Job Seeker */}
            <div className="col-12 col-sm-6 col-md-4 col-lg-3">
              <div className="card">
                <input
                  type="radio"
                  name="pricing"
                  id="card1"
                  value="job_seeker"
                  onChange={(e) => {
                    setType(e.target.value);
                  }}
                />
                <label htmlFor="card1">
                  <span className="flex-c">
                    <SearchWork />
                  </span>
                  <h4 className="fs-16-700"> {trans("Radio.inputs.one")} </h4>
                </label>
              </div>
            </div>
          </div>
          {/* Login Btn Now */}
          <div className="Btn">
            <Btn
              text={trans("Radio.login-now")}
              path={
                type === "job_seeker"
                  ? "job_seeker"
                  : type === "institute" ||
                    type === "company" ||
                    type === "business_pioneer"
                  ? "all-create"
                  : null
              }
            />
          </div>
          {/* You Have Account */}
          <div className="bottom">
            <span className="fs-20-400 text-color">
              {trans("Btns.haveaemail")}
            </span>
            <Link className="fs-20-500 text-black" to={"login"}>
              {trans("Btns.login")}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RadioBtn;

import "./EducationProgra.css";
// Images
import One from "./Assets/1.png";
import Two from "./Assets/2.png";
import Three from "./Assets/3.png";
import Four from "./Assets/4.png";
import Five from "./Assets/5.png";
import Six from "./Assets/6.png";
// Images
// Svg
import { ReactComponent as TopLeft } from "./Assets/top-left.svg";
import { ReactComponent as BottomRight } from "./Assets/bottom-right.svg";
import RoundBtn from "../../../Components/RoundBtn/RoundBtn";
import { trans } from "../../../Components/Navbar/Navbar";
// Svg
function EducationProgra() {
  const user = JSON.parse(localStorage.getItem("user"));
  return (
    <div className="EducationProgra py-5">
      <div className="container" data-aos="fade-up" data-aos-duration="1000">
        <div className="row justify-content-center align-content-center gx-4">
          {/* Images */}
          <div className="col-12 col-lg-6 flex-c">
            <div className="image-circle position-relative flex-c">
              <img src={One} alt="" />
              <img src={Two} alt="" />
              <img src={Three} alt="" />
              <img src={Four} alt="" />
              <img src={Five} alt="" />
              <img src={Six} alt="" />
              <div className="counter text-center p-3 d-flex flex-column justify-content-between">
                <span className="icon flex-c">
                  <TopLeft />
                </span>
                <span className="icon flex-c">
                  <BottomRight />
                </span>
                <span className="fs-24-700">+100,00 K</span>
                <p className="fs-14-400 text-color">
                  تلقو تدريبات التأهيل الوظيفي من خلال البوابة
                </p>
              </div>
            </div>
          </div>
          {/* Text */}
          <div className="col-12 col-lg-6 flex-c">
            <div className="text d-flex flex-column gap-4">
              <h4 className="fs-32-700 text-center text-lg-end">
                {trans("home.program_help.title")}
              </h4>
              <p className="fs-20-500 text-center text-lg-end text-color">
                {trans("home.program_help.desc")}
              </p>
              {user?.type === "job_seeker" && (
                <RoundBtn
                  link={user?.is_register_data ? "/program" : "/employ-data"}
                  btn="RoundBtnBgMainColor"
                  text={trans("buttons.home.join")}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EducationProgra;

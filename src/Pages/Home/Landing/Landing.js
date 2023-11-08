import "./Landing.css";
import { trans } from "../../../Components/Navbar/Navbar";
import Logo from "../../../Assets/Images/mainLogo.png";

function Landing() {
  return (
    <div className="Landing">
      <div
        className="container full-height d-flex flex-column justify-content-center align-items-center gap-3"
        data-aos="fade-up"
        data-aos-duration="1500"
      >
        <div className="header text-center">
          <h1 className="fs-24-700">{trans("tittle.nav")}</h1>
          <div className="logo mx-auto mt-3" style={{ width: "120px" }}>
            <img src={Logo} alt="" />
          </div>
        </div>
        <p className="fs-24-300 text-center">{trans("home.landing.two")}</p>
        <p className="fs-24-300 text-center">{trans("home.landing.three")}</p>
      </div>
    </div>
  );
}

export default Landing;

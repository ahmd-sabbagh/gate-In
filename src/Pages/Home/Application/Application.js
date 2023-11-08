import { trans } from "../../../Components/Navbar/Navbar";
import "./Application.css";
import Image1 from "./Assets/screen-1.png";
import Image2 from "./Assets/screen-2.png";

function Application() {
  return (
    <div className="Application py-5">
      <div className="container" data-aos="fade-up" data-aos-duration="1000">
        <div className="row">
          <div className="col-12 col-md-6">
            <div className="text-align py-5">
              <h3 className="fs-32-700 mx-auto m-md-0">
                {trans("home.store.title")}
              </h3>
              <p className="fs-16-400 mt-3">{trans("home.store.disc")}</p>
            </div>
          </div>
          <div className="col-12 col-md-6 position-relative d-none d-md-block">
            <img className="position-absolute" src={Image1} alt="" />
            <img className="position-absolute" src={Image2} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Application;

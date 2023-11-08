import { trans } from "../../../Components/Navbar/Navbar";
import RoundBtn from "../../../Components/RoundBtn/RoundBtn";
import "./Bosses.css";

function Bosses() {
  const user = JSON.parse(localStorage.getItem("user"));
  return (
    <div className="Bosses">
      <div className="container-fluid">
        <div className="row">
          <div className="col-12 col-lg-6 flex-c">
            <div
              className="text text-white d-flex flex-column gap-4"
              data-aos="fade-up"
              data-aos-duration="1000"
            >
              <h4 className="fs-20-500 mb-3 pb-2 position-relative fit-content">
                {trans("home.bosses.head")}
              </h4>

              <h3 className="fs-32-700">{trans("home.bosses.title")}</h3>
              <p className="fs-20-500">{trans("home.bosses.desc")}</p>
              <RoundBtn
                link={
                  !user
                    ? "/register/login"
                    : user?.type === "company"
                    ? user?.is_register_data
                      ? "/company/dashboard/search"
                      : "/company"
                    : "/"
                }
                btn="RoundBtnBgG"
                text={trans("buttons.home.search")}
              />
            </div>
          </div>
          <div className="col-12 col-lg-6 p-0"></div>
        </div>
      </div>
    </div>
  );
}

export default Bosses;

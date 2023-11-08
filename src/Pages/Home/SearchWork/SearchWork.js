import { trans } from "../../../Components/Navbar/Navbar";
import RoundBtn from "../../../Components/RoundBtn/RoundBtn";
import "./SearchWork.css";

function SearchWork() {
  const user = JSON.parse(localStorage.getItem("user"));
  return (
    <div className="SearchWork">
      <div className="container-fluid">
        <div className="row">
          <div className="col-12 col-lg-6 flex-c">
            <div
              className="text text-white d-flex flex-column gap-4"
              data-aos="fade-up"
              data-aos-duration="1000"
            >
              <h4 className="fs-20-500 mb-3 pb-2 position-relative">
                {trans("home.search_work.head")}
              </h4>

              <h3 className="fs-32-700">{trans("home.search_work.title")}</h3>
              <p className="fs-20-500">{trans("home.search_work.desc")}</p>
              {user?.type === "job_seeker" && (
                <RoundBtn
                  link="/jobs"
                  btn="RoundBtnBg"
                  text={trans("buttons.home.get")}
                />
              )}
            </div>
          </div>
          <div className="col-12 col-lg-6 p-0"></div>
        </div>
      </div>
    </div>
  );
}

export default SearchWork;

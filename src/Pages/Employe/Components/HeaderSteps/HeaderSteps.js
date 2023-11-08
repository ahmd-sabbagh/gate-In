import "./HeaderSteps.css";
import { trans } from "../../../../Components/Navbar/Navbar";
import { useLocation } from "react-router-dom";
function HeaderSteps() {
    const location = useLocation().pathname
  return (
    <div className="HeaderSteps">
      <div className="container">
        <h3 className=" fs-32-600">{trans("employe-page.tittle")}</h3>
        <div className="steps d-flex justify-content-center py-4 mt-5">
          <div className="one step d-flex flex-column align-items-center gap-2">
            <div className="circle flex-c">1</div>
            <span className=" fs-20-500 text-center">
              {trans("employe-page.steps.one")}
            </span>
          </div>
          <div
            className={`path mt-4 ${
              location === "/employ-data/learn" || location === "/employ-data/experience"
                ? "done-circle"
                : null
            }`}
          ></div>
          <div className="two step d-flex flex-column align-items-center gap-2">
            <div
              className={`circle flex-c ${
                location === "/employ-data/learn" || location === "/employ-data/experience"
                  ? "done-circle"
                  : null
              }`}
            >
              2
            </div>
            <span className=" fs-20-500 text-center">
              {trans("employe-page.steps.two")}
            </span>
          </div>
          <div
            className={`path mt-4 ${
              location === "/employ-data/experience" && "done-circle"
            }`}
          ></div>
          <div className="three step d-flex flex-column align-items-center gap-2">
            <div
              className={`circle flex-c ${
                location === "/employ-data/experience" && "done-circle"
              }`}
            >
              3
            </div>
            <span className=" fs-20-500 text-center">
              {trans("employe-page.steps.three")}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeaderSteps;

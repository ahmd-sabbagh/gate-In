import { trans } from "../../../Components/Navbar/Navbar";
import Card from "./Card";

function ProgramComponent(props) {
  return (
    <div className={props.padding ? "bg-white p-4 r-10" : null}>
      <Card />
      <div className="program-details d-flex flex-column gap-5">
        {/* details */}
        <div className="details">
          <h4 className=" fs-20-500 mb-3">
            {trans("qualification.details_prog.title")}
          </h4>
          <p className=" fs-16-400 text-color">
            {trans("qualification.details_prog.disc")}
          </p>
        </div>
        {/* content */}
        <div className="content">
          <h4 className="fs-20-500 mb-3">
            {trans("qualification.prog_content.title")}
          </h4>
          <ul className="d-flex flex-column gap-2 m-0">
            <li className="text-color">
              1 - {trans("qualification.prog_content.disc1")}
            </li>
            <li className="text-color">
              2 - {trans("qualification.prog_content.disc1")}
            </li>
            <li className="text-color">
              3 - {trans("qualification.prog_content.disc1")}
            </li>
          </ul>
        </div>
        {/* What Lerning */}
        <div className="what-lerning">
          <h4 className="fs-20-500 mb-3">
            {trans("qualification.what_learning.title")}
          </h4>
          <ul className="d-flex flex-column gap-2">
            <li className="text-color">
              {trans("qualification.what_learning.disc1")}
            </li>
            <li className="text-color">
              {trans("qualification.what_learning.disc1")}
            </li>
            <li className="text-color">
              {trans("qualification.what_learning.disc1")}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default ProgramComponent;

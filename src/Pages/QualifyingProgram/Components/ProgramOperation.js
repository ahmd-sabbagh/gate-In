import React from "react";
import { trans } from "../../../Components/Navbar/Navbar";

function ProgramOperation() {
  return (
    <div className="mt-5">
      <div className="ProgramOperation">
        <h3 className="fs-32-700 mb-4">
          {trans("qualification.processes.title")}
        </h3>
        {/* case one */}
        <div className="case-one">
          <div className="head">
            <h4 className="fs-20-500">
              {trans("qualification.processes.first_case.tit")}
            </h4>
            <p className=" fs-16-500 text-color mt-2">
              {trans("qualification.processes.first_case.disc")}
            </p>
          </div>
          <ul className="m-0 d-flex flex-column gap-2 mt-4">
            <li className=" fs-16-500">
              1 - {trans("qualification.processes.first_case.point")}
            </li>
            <li className=" fs-16-500">
              2 - {trans("qualification.processes.first_case.point")}
            </li>
            <li className=" fs-16-500">
              3 - {trans("qualification.processes.first_case.point")}
            </li>
            <li className=" fs-16-500">
              4 - {trans("qualification.processes.first_case.point")}
            </li>
          </ul>
        </div>
        {/* case two */}
        <div className="case-two mt-5">
          <div className="head">
            <h4 className="fs-20-500">
              {trans("qualification.processes.second_case.tit")}
            </h4>
            <p className=" fs-16-500 text-color mt-2">
              {trans("qualification.processes.second_case.disc")}
            </p>
          </div>
          <ul className="m-0 d-flex flex-column gap-2 mt-4">
            <li className=" fs-16-500">
              1 - {trans("qualification.processes.second_case.point")}
            </li>
            <li className=" fs-16-500">
              2 - {trans("qualification.processes.second_case.point")}
            </li>
            <li className=" fs-16-500">
              3 - {trans("qualification.processes.second_case.point")}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default ProgramOperation;
